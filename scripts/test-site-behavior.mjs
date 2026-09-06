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
function booking(saved = null, fixedFirst = false, blockedStorage = false) {
 const fields = Object.fromEntries(['#km-rate','#km-rate-context','#km-inclusions'].map(id=>[id,{}]));
 const buttons=['first','return'].map(visit=>({dataset:{visit},setAttribute(k,v){this[k]=v;},addEventListener(type,fn){this.click=fn;}}));
 const links=['hero','header','dock','bottom','service'].map(placement=>({dataset:{bookingChoice:placement},label:{},querySelector(){return this.label;},setAttribute(k,v){this[k]=v;}}));
 const summary={}; const options={hidden:true};
 const document={querySelector:selector=>selector==='[data-first-visit-page]'?fixedFirst:fields[selector],querySelectorAll:selector=>selector==='[data-visit]'?buttons:selector==='[data-booking-choice]'?links:selector==='[data-visit-summary]'?[summary]:selector==='.km-segments'?[options]:[]};
 const storage={value:saved,getItem(){if(blockedStorage)throw Error('disabled');return this.value;},setItem(k,v){if(blockedStorage)throw Error('disabled');this.value=v;}};
 vm.runInNewContext(readFileSync('assets/booking.js','utf8'),{document,sessionStorage:storage});
 return {fields,buttons,links,summary,options,storage};
}
const ui=booking();
assert.equal(ui.options.hidden,false);
assert.equal(ui.fields['#km-rate'].textContent,'$109');
ui.buttons[1].click();
assert.equal(ui.fields['#km-rate'].textContent,'$120');
assert.match(ui.fields['#km-rate-context'].textContent,/Returning client/);
assert.equal(ui.buttons[1]['aria-pressed'],'true');
for(const link of ui.links){assert.match(link.href,/314304/);assert.match(link['aria-label'],/returning visit/);}
assert.match(ui.summary.textContent,/Returning.*120/);
assert.equal(ui.storage.value,'return');
const nextPage=booking(ui.storage.value);
assert.match(nextPage.links[2].href,/314304/);
ui.buttons[0].click();
assert.match(ui.fields['#km-rate-context'].textContent,/Regular \$120 \+ HST/);
assert.equal(ui.buttons[1]['aria-pressed'],'false');
for(const link of ui.links)assert.match(link.href,/314303/);
assert.match(booking('return',true).links[2].href,/314303/);
assert.doesNotThrow(()=>booking(null,false,true));
console.log('PASS: synchronized first/return booking links, base prices plus HST, cross-page visit preference, first-visit landing context, disabled storage, and analytics intent events.');
// The dock stays hidden while any prominent booking control is visible.
const classes = new Set();
const dock = {classList:{add:name=>classes.add(name),remove:name=>classes.delete(name),toggle(name,on){if(on)classes.add(name);else classes.delete(name);}}};
const controls = [{matches:()=>true},{matches:()=>true}];
const listeners = {};
const summary = {focus(){this.focused=true;}};
const answer = {open:false,matches:()=>true,querySelector:()=>summary};
let onIntersection;
const observerWindow = {location:{hash:''},addEventListener:(type,fn)=>listeners[type]=fn,IntersectionObserver:true};
const observerDocument = {
 querySelector:s=>s==='.booking-dock'?dock:null,
 querySelectorAll:s=>s.startsWith('main a[')?controls:[],
 getElementById:id=>id==='insurance-answer'?answer:null,
 addEventListener:(type,fn)=>listeners[type]=fn
};
class Observer { constructor(fn){onIntersection=fn;} observe(){} }
vm.runInNewContext(readFileSync('assets/site.js','utf8'),{document:observerDocument,window:observerWindow,IntersectionObserver:Observer});
onIntersection([{target:controls[0],isIntersecting:true,intersectionRatio:1}]);
assert.equal(classes.has('dock-hidden'),true);
onIntersection([{target:controls[0],isIntersecting:false,intersectionRatio:0},{target:controls[1],isIntersecting:true,intersectionRatio:1}]);
assert.equal(classes.has('dock-hidden'),true);
onIntersection([{target:controls[1],isIntersecting:false,intersectionRatio:0}]);
assert.equal(classes.has('dock-hidden'),false);
observerWindow.location.hash='#insurance-answer';listeners.hashchange();
assert.equal(answer.open,true);
listeners.focusin({target:{matches:()=>true}});assert.equal(classes.has('dock-keyboard'),true);
listeners.focusout();assert.equal(classes.has('dock-keyboard'),false);
console.log('PASS: dock responds to multiple visible booking buttons, insurance deep links open the answer, and focused inputs hide the dock.');
