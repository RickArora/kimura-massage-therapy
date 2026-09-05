import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
function analytics(host) {
 const listeners = {}, events = [];
 const window = {location:{hostname:host,pathname:'/',href:`https://${host}/`},dataLayer:[],gtag:(...args)=>events.push(args)};
 const document = {querySelector:()=>true,querySelectorAll:()=>[],addEventListener:(type,fn)=>listeners[type]=fn};
 vm.runInNewContext(readFileSync('assets/analytics.js','utf8'),{window,document,URL});
 function click(href) {
  const link={href,textContent:'Book',getAttribute:()=>null,closest:()=>null};
  listeners.click({target:{closest:()=>link}});
 }
 return {events,click};
}
const production=analytics('kimuramassage.com');
production.click('https://kimuramassage.noterro.com/book-online/service/314303/Initial-Appointment-first-time-clients-only');
assert.equal(production.events.filter(e=>e[0]==='event'&&e[1]==='book_online_click').length,1);
assert.equal(production.events.find(e=>e[1]==='book_online_click')[2].visit_type,'first_visit');
assert.equal(production.events.filter(e=>e[1]==='generate_lead').length,0);
production.click('https://kimuramassage.noterro.com/book-online/service/314304/Follow-up-Appointment');
assert.equal(production.events.filter(e=>e[1]==='book_online_click')[1][2].visit_type,'returning_visit');
const count=production.events.length;
production.click('https://kimuramassage.noterro.com.evil.example/');
assert.equal(production.events.length,count);
const preview=analytics('127.0.0.1');
preview.click('https://kimuramassage.noterro.com/book-online/service/314303/initial');
assert.equal(preview.events.length,0);
const fields=Object.fromEntries(['#km-rate','#km-rate-context','#km-main-label','#km-inclusions'].map(id=>[id,{}]));
const link={dataset:{}};
const buttons=['first','returning'].map(visit=>({dataset:{visit},setAttribute(k,v){this[k]=v;},addEventListener(type,fn){this.click=fn;}}));
const options={hidden:true,querySelectorAll:()=>buttons};
const root={querySelector:selector=>selector==='.km-segments'?options:selector==='#home-book-link'?link:fields[selector]};
vm.runInNewContext(readFileSync('assets/home.js','utf8'),{document:{querySelector:()=>root}});
assert.equal(options.hidden,false);
buttons[1].click();
assert.equal(fields['#km-rate'].textContent,'$120');
assert.match(link.href,/314304/);
assert.equal(buttons[1]['aria-pressed'],'true');
buttons[0].click();
assert.equal(fields['#km-rate'].textContent,'$109');
assert.match(link.href,/314303/);
assert.equal(buttons[1]['aria-pressed'],'false');
console.log('PASS: first/returning prices and booking routes, one GA4 booking event per click, no false lead event, strict booking hostname, and silent preview analytics.');
