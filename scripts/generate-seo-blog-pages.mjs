import { mkdirSync, writeFileSync } from 'node:fs';

const site = 'https://kimuramassage.ca';
const today = '2026-05-29';
const topics = [
  'Tight shoulders',
  'Tight neck',
  'Tight upper traps',
  'Tight back',
  'Tight upper back',
  'Tight mid back',
  'Tight lower back',
  'Muscle stiffness',
  'Muscle tightness',
  'Muscle knots',
  'Muscle tension',
  'Stiff neck',
  'Stiff shoulders',
  'Stiff back',
  'Stiff lower back',
  'Neck and shoulder tension',
  'Upper back tension',
  'Lower back tension',
  'Back stiffness',
  'Shoulder stiffness',
  'Neck stiffness',
  'Tight hips',
  'Tight hip flexors',
  'Tight glutes',
  'Tight hamstrings',
  'Tight calves',
  'Tight quads',
  'Tight chest',
  'Tight pecs',
  'Tight forearms',
  'Tight hands',
  'Tight jaw',
  'Tight traps',
  'Tight lats',
  'Tight IT band area',
  'Tight piriformis',
  'Tight scalenes',
  'Tight SCM',
  'Tight suboccipitals',
  'Tight rhomboids',
  'Tight erector spinae',
  'Tight QL',
  'Tight quadratus lumborum',
  'Tight adductors',
  'Tight ankles',
  'Tight feet',
  'Tight plantar fascia',
  'Sore muscles',
  'Achy muscles',
  'Overworked muscles',
  'Work-related muscle tension',
  'Desk posture tension',
  'Computer posture pain',
  'Tech neck',
  'Text neck',
  'Rounded shoulders',
  'Hunched shoulders',
  'Shoulder blade pain',
  'Pain between shoulder blades',
  'Tension between shoulder blades',
  'Neck knots',
  'Back knots',
  'Shoulder knots',
  'Trigger points',
  'Myofascial pain',
  'Myofascial tightness',
  'Fascia tightness',
  'Deep muscle tension',
  'Chronic muscle tension',
  'Full body stiffness',
  'Morning stiffness',
  'Post-workout stiffness',
  'Gym soreness',
  'Weightlifting soreness',
  'Sports muscle tightness',
  'Running tightness',
  'Cycling back tightness',
  'BJJ neck tightness',
  'BJJ shoulder tightness',
  'BJJ hip tightness',
  'Headache from neck tension',
  'Tension headaches',
  'Jaw tension',
  'TMJ muscle tightness',
  'Clenching-related jaw tightness',
  'Stress-related muscle tension',
  'Stress knots',
  'Anxiety-related muscle tension',
  'Poor posture tightness',
  'Postural tension',
  'Mobility restriction',
  'Limited range of motion',
  'Restricted shoulder mobility',
  'Restricted hip mobility',
  'Tight rotator cuff',
  'Tight pec minor',
  'Tight levator scapulae',
  'Tight thoracic spine',
  'Tight lumbar spine',
  'Tight sacroiliac area',
  'Tight SI joint area',
  'Tight glute medius',
  'Tight TFL',
  'Tight tensor fasciae latae',
  'Tight biceps',
  'Tight triceps',
  'Tight wrist flexors',
  'Tight wrist extensors',
  'Tight neck after sleeping',
  'Tight back after sleeping',
  'Tight shoulders from stress',
  'Tight hips from sitting',
  'Tight back from sitting',
  'Tight neck from computer work',
  'Tight forearms from typing',
  'Tight calves from standing',
  'Tight feet from standing',
  'Tight legs after workout',
  'Heavy legs',
  'Stiff legs',
  'Stiff hips',
  'Stiff calves',
  'Stiff ankles',
  'Stiff feet',
  'Sore upper back',
  'Sore lower back',
  'Sore neck',
  'Sore shoulders',
  'Sore hips',
  'Sore glutes',
  'Sore hamstrings',
  'Sore calves',
  'Sore feet',
  'Muscle recovery massage',
  'Sports recovery massage',
  'Deep tissue massage for tight muscles',
  'Massage for tight shoulders',
  'Massage for tight neck',
  'Massage for tight back',
  'Massage for lower back tightness',
  'Massage for upper back tension',
  'Massage for muscle knots',
  'Massage for muscle stiffness',
  'Massage for muscle tension',
  'Massage for stiff neck',
  'Massage for stiff shoulders',
  'Massage for tight hips',
  'Massage for tight hamstrings',
  'Massage for tight calves',
  'Massage for tight chest',
  'Massage for posture-related tension',
  'Massage for desk workers',
  'Massage for gym soreness',
  'Massage for athletes',
  'Massage for stress tension',
  'Massage for headache tension',
  'Massage for jaw tension',
  'RMT for tight shoulders',
  'RMT for tight neck',
  'RMT for tight back',
  'RMT for muscle stiffness',
  'RMT for muscle knots',
  'RMT for posture tension',
  'RMT for sports recovery',
  'RMT for desk posture pain',
  'RMT for lower back tightness',
  'RMT for upper back tightness',
  'RMT for tight hips',
  'RMT for tight calves',
  'RMT for tension headaches',
  'Registered massage therapy for tight muscles',
  'Registered massage therapy for muscle stiffness',
  'Registered massage therapy for back tightness',
  'Registered massage therapy for shoulder tension',
  'Registered massage therapy for neck stiffness',
  'Deep tissue massage for shoulder knots',
  'Deep tissue massage for back knots',
  'Deep tissue massage for neck tension',
  'Deep tissue massage for tight hips',
  'Deep tissue massage for tight legs',
  'Therapeutic massage for tight muscles',
  'Therapeutic massage for stiff back',
  'Therapeutic massage for shoulder tension',
  'Therapeutic massage for neck pain and tightness',
  'Therapeutic massage for muscle recovery',
  'Tight muscles from sitting all day',
  'Tight shoulders from working at a desk',
  'Tight back from standing all day',
  'Tight legs from walking all day',
  'Tight hips from driving',
  'Tight neck from phone use',
  'Tight shoulders from stress and posture',
  'Tight low back from lifting',
  'Tight traps from stress',
  'Tight chest from rounded shoulders',
  'Tight glutes from sitting',
  'Tight calves from running',
  'Tight hamstrings from workouts',
  'Tight forearms from computer work',
  'Tight jaw from clenching'
];

const clinicalTopics = [
  'Mechanical low back pain',
  'Acute lumbar strain/sprain',
  'Chronic low back pain',
  'Lumbar disc herniation / disc lesion',
  'Sciatica / lumbar radiculopathy',
  'Degenerative disc disease',
  'Facet joint irritation / facet syndrome',
  'Spondylosis',
  'Spondylolisthesis',
  'Spinal stenosis',
  'Sacroiliac joint dysfunction',
  'Lumbar hyperlordosis-related pain',
  'Thoracic outlet-related postural tension',
  'Thoracic spine hypomobility',
  'Rib dysfunction / intercostal strain',
  'Costovertebral / costotransverse joint irritation',
  'Whiplash-associated disorder',
  'Cervical strain/sprain',
  'Mechanical neck pain',
  'Cervical disc herniation',
  'Cervical radiculopathy',
  'Cervicogenic headache',
  'Tension-type headache',
  'Migraine with MSK triggers',
  'Torticollis / wry neck',
  'Forward head posture-related pain',
  'Scoliosis-related pain',
  'Kyphosis-related discomfort',
  'Ankylosing spondylitis',
  'Osteoarthritis of spine',
  'Osteoporosis-related back pain',
  'Carpal tunnel syndrome',
  'Cubital tunnel syndrome',
  'Radial tunnel syndrome',
  'Pronator teres syndrome',
  'Thoracic outlet syndrome',
  'Piriformis syndrome / deep gluteal syndrome',
  'Meralgia paresthetica',
  'Sciatic nerve irritation',
  'Peripheral nerve entrapment',
  'Double crush syndrome',
  'Rotator cuff tendinopathy',
  'Supraspinatus tendinopathy',
  'Infraspinatus / teres minor tendinopathy',
  'Subscapularis dysfunction',
  'Rotator cuff tear',
  'Shoulder impingement / subacromial pain syndrome',
  'Bicipital tendinopathy',
  'Adhesive capsulitis / frozen shoulder',
  'Glenohumeral instability',
  'Shoulder dislocation history',
  'AC joint sprain',
  'SC joint irritation',
  'Labral injury',
  'Scapular dyskinesis',
  'Upper crossed syndrome',
  'Pectoralis minor syndrome',
  'Levator scapulae syndrome',
  'Rhomboid strain',
  'Serratus anterior weakness-related pain',
  'Post-mastectomy shoulder restriction',
  'Post-fracture shoulder stiffness',
  'Lateral epicondylitis / tennis elbow',
  'Medial epicondylitis / golfer’s elbow',
  'Olecranon bursitis',
  'Elbow sprain',
  'Ulnar collateral ligament irritation',
  'Biceps strain',
  'Triceps strain',
  'Forearm flexor strain',
  'Forearm extensor strain',
  'Repetitive strain injury of forearm',
  'Compartment syndrome',
  'Wrist sprain',
  'De Quervain’s tenosynovitis',
  'Trigger finger / stenosing tenosynovitis',
  'Dupuytren’s contracture',
  'TFCC irritation',
  'Thumb CMC osteoarthritis',
  'Rheumatoid arthritis of hand/wrist',
  'Hand/wrist osteoarthritis',
  'Ganglion cyst',
  'Post-fracture wrist stiffness',
  'Tendon repair rehab support',
  'Hip osteoarthritis',
  'Hip flexor strain',
  'Iliopsoas dysfunction',
  'Adductor strain',
  'Hamstring strain',
  'Gluteal strain',
  'Gluteus medius/minimus tendinopathy',
  'Greater trochanteric pain syndrome',
  'Trochanteric bursitis',
  'Femoroacetabular impingement',
  'Labral tear of hip',
  'SI joint dysfunction',
  'Pelvic floor-related hip/back tension',
  'Pregnancy-related pelvic girdle pain',
  'Pubic symphysis dysfunction',
  'Snapping hip syndrome',
  'IT band-related lateral hip pain',
  'Knee osteoarthritis',
  'Patellofemoral pain syndrome',
  'Chondromalacia patellae',
  'Patellar tendinopathy / jumper’s knee',
  'Quadriceps tendinopathy',
  'IT band syndrome',
  'Pes anserine bursitis/tendinopathy',
  'Meniscus injury',
  'MCL sprain',
  'LCL sprain',
  'ACL injury',
  'PCL injury',
  'Baker’s cyst',
  'Osgood-Schlatter disease',
  'Post-surgical knee stiffness',
  'Total knee replacement recovery support',
  'Lateral ankle sprain',
  'Medial ankle sprain',
  'Chronic ankle instability',
  'Achilles tendinopathy',
  'Achilles rupture',
  'Plantar fasciitis / plantar heel pain',
  'Morton’s neuroma',
  'Tarsal tunnel syndrome',
  'Shin splints / medial tibial stress syndrome',
  'Stress fracture',
  'Metatarsalgia',
  'Hallux valgus / bunion pain',
  'Hallux rigidus',
  'Flat feet / pes planus-related pain',
  'High arches / pes cavus-related pain',
  'Sever’s disease',
  'Post-fracture ankle stiffness',
  'Muscle strain',
  'Ligament sprain',
  'Tendinopathy',
  'Tenosynovitis',
  'Bursitis',
  'Myofascial pain syndrome',
  'Trigger points',
  'Delayed-onset muscle soreness',
  'Muscle spasm / guarding',
  'Fascial restriction',
  'Postural strain',
  'Repetitive strain injury',
  'Overuse syndrome',
  'Scar tissue adhesions',
  'Contusion',
  'Hematoma',
  'Cramps',
  'Fibromyalgia',
  'Chronic pain syndrome',
  'Central sensitization-related MSK pain',
  'Osteoarthritis',
  'Rheumatoid arthritis',
  'Psoriatic arthritis',
  'Gout',
  'Osteoporosis',
  'Osteopenia',
  'Fracture',
  'Joint hypermobility syndrome',
  'Ehlers-Danlos syndrome/hypermobility type',
  'Postural dysfunction',
  'Deconditioning-related MSK pain',
  'Post-surgical orthopedic recovery',
  'Amputation/prosthetic-related MSK pain',
  'Limb-length discrepancy-related pain',
  'Temporomandibular disorder',
  'Bruxism-related jaw tension',
  'Masseter/temporalis myalgia',
  'Jaw clicking without locking',
  'Jaw locking/open lock/closed lock',
  'Cervicogenic dizziness',
  'Runner’s knee',
  'Jumper’s knee',
  'Swimmer’s shoulder',
  'Thrower’s shoulder',
  'Weightlifting-related strains',
  'BJJ/grappling neck strain',
  'BJJ rib/intercostal strain',
  'BJJ shoulder sprain',
  'Cycling-related neck/back pain',
  'Desk-work neck/shoulder pain',
  'Occupational overuse injuries'
];

const postureTopics = [
  'Kyphosis',
  'Lordosis / hyperlordosis',
  'Scoliosis',
  'Kypholordosis',
  'Flat back posture',
  'Swayback posture',
  'Forward head posture',
  'Rounded shoulders',
  'Upper crossed syndrome',
  'Lower crossed syndrome',
  'Anterior pelvic tilt',
  'Posterior pelvic tilt',
  'Lateral pelvic tilt',
  'Pelvic rotation',
  'Scapular winging',
  'Scapular protraction',
  'Scapular elevation/depression imbalance',
  'Thoracic rotation/asymmetry',
  'Genu valgum / knock knees',
  'Genu varum / bow legs',
  'Genu recurvatum / knee hyperextension',
  'Foot overpronation',
  'Foot oversupination',
  'Functional leg length discrepancy'
];

const existingPosts = [
  {
    href: '/blog/does-insurance-cover-rmt-massage-ontario.html',
    tag: 'Insurance &amp; Benefits',
    title: 'Does Insurance Cover RMT Massage Therapy in Ontario?',
    excerpt: "Most extended health benefit plans cover RMT massage, but only when performed by a Registered Massage Therapist. Here's how to find out what your plan covers and how to submit a claim.",
    meta: 'By Ricky Arora, RMT · May 1, 2025 · 5 min read'
  },
  {
    href: '/blog/deep-tissue-vs-swedish-massage.html',
    tag: 'Choosing a Treatment',
    title: 'Deep Tissue vs. Swedish Massage: Which Should You Choose?',
    excerpt: 'Both are popular, but they serve very different goals. This guide breaks down the differences and helps you choose the right treatment based on what your body actually needs.',
    meta: 'By Ricky Arora, RMT · April 15, 2025 · 6 min read'
  },
  {
    href: '/blog/what-to-expect-rmt-massage-brampton.html',
    tag: 'First-Time Clients',
    title: 'What to Expect at Your First RMT Massage in Brampton',
    excerpt: "First appointment with an RMT? Here's exactly what happens: intake, draping, pressure communication, and what you'll feel in the 24 hours after. No surprises.",
    meta: 'By Ricky Arora, RMT · June 1, 2025 · 5 min read'
  },
  {
    href: '/blog/how-often-should-you-get-a-massage.html',
    tag: 'Treatment Frequency',
    title: "How Often Should You Get a Massage? A Brampton RMT's Guide",
    excerpt: "The right frequency depends entirely on your goal. Stress management, chronic pain, sports recovery, and general maintenance all call for different schedules. Here's how to think about it.",
    meta: 'By Ricky Arora, RMT · April 1, 2025 · 5 min read'
  }
];

const escapeHtml = (value) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;');

const slugify = (value) => value
  .toLowerCase()
  .replaceAll('&', 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const topicSlugs = new Set(topics.map((topic) => slugify(topic)));
const clinicalSlugs = new Set(clinicalTopics.map((topic) => {
  const slug = slugify(topic);
  return topicSlugs.has(slug) ? `${slug}-condition` : slug;
}));
const clinicalSlugFor = (topic) => {
  const slug = slugify(topic);
  return topicSlugs.has(slug) ? `${slug}-condition` : slug;
};
const postureSlugFor = (topic) => {
  const slug = slugify(topic);
  return topicSlugs.has(slug) || clinicalSlugs.has(slug) ? `${slug}-posture` : slug;
};

const sentence = (value) => value.charAt(0).toUpperCase() + value.slice(1);
const titleCase = (value) => value.replace(/\b[a-z]/g, (letter) => letter.toUpperCase());

const regionFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(neck|scm|scalenes|suboccipitals|headache|text neck|tech neck)/.test(t)) return 'neck';
  if (/(shoulder|trap|rotator|pec|chest|rhomboid|blade|upper back|thoracic|lats)/.test(t)) return 'shoulders and upper back';
  if (/(lower back|low back|lumbar|ql|quadratus|sacroiliac|si joint|erector|mid back|back)/.test(t)) return 'back';
  if (/(hip|glute|piriformis|tfl|tensor|it band|hamstring|quad|adductor)/.test(t)) return 'hips and legs';
  if (/(calf|calves|ankle|feet|foot|plantar|legs|running|standing|walking)/.test(t)) return 'lower legs and feet';
  if (/(forearm|wrist|hand|typing|biceps|triceps)/.test(t)) return 'arms and hands';
  if (/(jaw|tmj|clenching)/.test(t)) return 'jaw';
  return 'muscles and joints';
};

const causeFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(desk|computer|typing|phone|tech neck|text neck|sitting|posture|rounded|hunched)/.test(t)) {
    return 'Long periods in one position can make some muscles work too hard while others stop helping. Over time, your body starts to treat that posture as normal, so the area can feel tight, tired, or stuck.';
  }
  if (/(stress|anxiety|clenching|jaw|tmj|headache)/.test(t)) {
    return 'Stress can make your nervous system hold muscles on guard. The jaw, neck, shoulders, and upper back are common places where that tension collects because they react quickly to breathing, clenching, and mental load.';
  }
  if (/(gym|workout|weightlifting|sports|running|cycling|bjj|athlete|recovery|overworked|lifting)/.test(t)) {
    return 'Training creates small amounts of muscle damage and fatigue. That is normal, but if recovery is rushed or the same movement is repeated often, the area can stay guarded and feel tight between sessions.';
  }
  if (/(sleeping|morning)/.test(t)) {
    return 'Sleep position, pillow height, mattress support, and how long you stay still can all affect morning stiffness. Muscles may feel tight because they have been shortened, compressed, or under-supported overnight.';
  }
  if (/(standing|walking|driving)/.test(t)) {
    return 'Standing, walking, and driving can load the same muscles for a long time. When the body does not get enough position changes, circulation and joint movement can drop, which can make the area feel heavy or stiff.';
  }
  return 'Muscle tightness often happens when tissue has been overloaded, under-moved, stressed, or held in the same position for too long. The body may tighten the area to protect it, even when there is no serious injury.';
};

const stretchSetFor = (region) => {
  if (region === 'neck') return [
    'Slow chin tucks: gently glide your chin back, hold 3 seconds, and repeat 8 to 10 times.',
    'Upper trap stretch: sit tall, let one ear move toward the same shoulder, and hold 20 to 30 seconds each side.',
    'Levator scapulae stretch: look toward your armpit and gently nod down until you feel a mild stretch.'
  ];
  if (region === 'shoulders and upper back') return [
    'Doorway pec stretch: place your forearm on a door frame and step through until the front of the chest opens.',
    'Thread-the-needle stretch: from hands and knees, reach one arm under your body and breathe into the upper back.',
    'Scapular squeezes: pull shoulder blades gently back and down, hold 3 seconds, and repeat 10 times.'
  ];
  if (region === 'back') return [
    'Cat-cow: move slowly between rounding and arching the back for 8 to 12 easy reps.',
    'Child pose breathing: sit hips back and breathe into the ribs and lower back for 30 to 60 seconds.',
    'Knee-to-chest stretch: pull one knee toward your chest and hold 20 to 30 seconds each side.'
  ];
  if (region === 'hips and legs') return [
    'Half-kneeling hip flexor stretch: tuck your pelvis slightly and shift forward until the front of the hip opens.',
    'Figure-four glute stretch: cross one ankle over the opposite thigh and gently pull in.',
    'Hamstring floss: straighten and bend the knee slowly while keeping the stretch mild.'
  ];
  if (region === 'lower legs and feet') return [
    'Wall calf stretch: keep the back heel down and hold 20 to 30 seconds each side.',
    'Bent-knee soleus stretch: bend the back knee slightly to target the deeper calf.',
    'Foot roll: roll the sole of the foot over a ball for 30 to 60 seconds using comfortable pressure.'
  ];
  if (region === 'arms and hands') return [
    'Wrist flexor stretch: straighten your elbow, palm up, and gently extend the wrist.',
    'Wrist extensor stretch: straighten your elbow, palm down, and gently flex the wrist.',
    'Finger opening drill: spread the fingers wide, then relax, for 10 slow reps.'
  ];
  if (region === 'jaw') return [
    'Jaw resting position: lips closed, teeth apart, tongue resting lightly on the roof of the mouth.',
    'Controlled opening: open and close the jaw slowly in a straight line for 6 to 8 reps.',
    'Temple and cheek massage: use light circles over the jaw muscles for 30 to 60 seconds.'
  ];
  return [
    'Gentle range of motion: move the area slowly through a comfortable range for 30 to 60 seconds.',
    'Breathing reset: take slow nasal breaths and let the shoulders, ribs, and belly soften.',
    'Easy walk: light movement can help circulation and reduce the feeling of stiffness.'
  ];
};

const treatmentFor = (topic, region) => {
  const t = topic.toLowerCase();
  if (/(sports|running|cycling|bjj|athlete|gym|workout|weightlifting|recovery)/.test(t)) return 'sports massage';
  if (/(deep|knot|trigger|chronic|myofascial|fascia|tension|tight|stiff|back|trap|hip|leg)/.test(t)) return 'deep tissue massage';
  if (/(stress|anxiety|full body|morning|achy|sore)/.test(t)) return 'Swedish relaxation massage or therapeutic massage';
  if (region === 'jaw') return 'therapeutic massage with gentle jaw, neck, and shoulder work';
  return 'therapeutic massage';
};

const relatedFor = (region) => {
  if (region === 'neck') return ['Tight shoulders', 'Tension headaches', 'Tech neck'];
  if (region === 'shoulders and upper back') return ['Tight neck', 'Pain between shoulder blades', 'Rounded shoulders'];
  if (region === 'back') return ['Tight hips', 'Lower back tension', 'Tight QL'];
  if (region === 'hips and legs') return ['Tight lower back', 'Tight hip flexors', 'Tight hamstrings'];
  if (region === 'lower legs and feet') return ['Tight calves', 'Tight plantar fascia', 'Running tightness'];
  if (region === 'arms and hands') return ['Tight forearms from typing', 'Tight wrist flexors', 'Computer posture pain'];
  if (region === 'jaw') return ['Tension headaches', 'Tight neck', 'Stress-related muscle tension'];
  return ['Muscle stiffness', 'Muscle tension', 'Deep tissue massage for tight muscles'];
};

const clinicalRegionFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(lumbar|low back|sciatica|sacroiliac|spine|spondyl|stenosis|disc|facet|back pain|hyperlordosis)/.test(t)) return 'low back and spine';
  if (/(cervical|neck|whiplash|headache|migraine|torticollis|dizziness)/.test(t)) return 'neck and head';
  if (/(thoracic|rib|intercostal|costovertebral|costotransverse|scoliosis|kyphosis)/.test(t)) return 'mid back and ribs';
  if (/(carpal|cubital|radial|pronator|forearm|wrist|hand|finger|thumb|tfcc|dupuytren|ganglion)/.test(t)) return 'arm, wrist, and hand';
  if (/(shoulder|rotator|supraspinatus|infraspinatus|subscapularis|bicipital|glenohumeral|scapular|pectoralis|levator|rhomboid|serratus|mastectomy)/.test(t)) return 'shoulder and upper back';
  if (/(hip|glute|piriformis|meralgia|adductor|hamstring|iliopsoas|trochanteric|femoroacetabular|pelvic|pubic|snapping|it band-related)/.test(t)) return 'hip and pelvis';
  if (/(knee|patellar|quadriceps|meniscus|mcl|lcl|acl|pcl|baker|osgood)/.test(t)) return 'knee';
  if (/(ankle|achilles|plantar|morton's|tarsal|shin|stress fracture|metatarsalgia|hallux|bunion|flat feet|high arches|sever)/.test(t)) return 'ankle and foot';
  if (/(jaw|temporomandibular|bruxism|masseter|temporalis)/.test(t)) return 'jaw';
  return 'muscles and joints';
};

const clinicalCauseFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(fracture|rupture|dislocation|tear|acl|pcl|mcl|lcl|meniscus|labral)/.test(t)) {
    return 'This can happen after a clear injury, overload, twist, fall, or forceful movement. These conditions should be assessed by a qualified health professional before massage or exercise is used around the area.';
  }
  if (/(arthritis|osteoarthritis|rheumatoid|psoriatic|gout|spondylitis|osteoporosis|osteopenia|fibromyalgia|central sensitization|chronic pain)/.test(t)) {
    return 'This may be related to joint changes, inflammation, pain sensitivity, or a longer-term health condition. Symptoms can change from day to day, so care should be coordinated with your doctor or primary health provider.';
  }
  if (/(radiculopathy|sciatica|nerve|tunnel|entrapment|paresthetica|double crush|thoracic outlet|carpal|cubital|tarsal)/.test(t)) {
    return 'This can involve irritation or compression of a nerve. Nerve symptoms may feel like tingling, numbness, burning, shooting pain, or weakness, and should be assessed if they are new, spreading, or worsening.';
  }
  if (/(tendinopathy|tenosynovitis|bursitis|strain|sprain|overuse|repetitive|epicondylitis|jumper|runner|swimmer|thrower|weightlifting|bjj|cycling|desk-work|occupational)/.test(t)) {
    return 'This often comes from repeated load, a sudden increase in activity, poor recovery, or a movement pattern that asks one area to do too much work for too long.';
  }
  if (/(post-surgical|replacement|post-fracture|repair rehab|prosthetic|amputation)/.test(t)) {
    return 'This can happen during healing or adaptation after surgery, immobilization, bracing, casting, or changes in how you move. Massage should fit within the plan from your surgeon, doctor, or rehabilitation provider.';
  }
  if (/(posture|forward head|upper crossed|hyperlordosis|scoliosis|kyphosis|deconditioning|limb-length)/.test(t)) {
    return 'This is often influenced by posture, strength, mobility, work position, and how the body distributes load. The painful area may not be the only area that needs attention.';
  }
  return 'This can happen when joints, muscles, tendons, nerves, or connective tissue are overloaded, irritated, under-recovered, or affected by posture and daily habits.';
};

const clinicalCareFor = (topic, region) => {
  const t = topic.toLowerCase();
  if (/(fracture|rupture|dislocation|tear|compartment syndrome|hematoma|gout|osteoporosis|ankylosing|rheumatoid|psoriatic|ehlers|pregnancy|post-surgical|replacement|amputation)/.test(t)) {
    return [
      'Get a clear diagnosis or clearance from your doctor, surgeon, or primary care provider before starting hands-on treatment.',
      'Avoid aggressive stretching or deep pressure over painful, swollen, unstable, healing, or medically restricted areas.',
      'Use gentle movement, rest, heat or ice only if it has been recommended for your situation.'
    ];
  }
  if (/(radiculopathy|sciatica|nerve|tunnel|entrapment|paresthetica|double crush|dizziness|migraine)/.test(t)) {
    return [
      'Track symptoms such as numbness, tingling, weakness, burning, or pain that travels into an arm or leg.',
      'Avoid positions that increase nerve symptoms or make symptoms spread farther from the spine or joint.',
      'Seek medical advice if symptoms are new, worsening, linked with weakness, or affecting balance or daily function.'
    ];
  }
  if (/(strain|sprain|tendinopathy|tenosynovitis|bursitis|overuse|repetitive|spasm|guarding|soreness|cramps)/.test(t)) {
    return [
      'Reduce the activity that flares symptoms for a short period instead of pushing through sharp pain.',
      'Use gentle, pain-free range of motion to keep the area moving without forcing it.',
      'Return to loading gradually so the tissue has time to adapt.'
    ];
  }
  return [
    `Use gentle movement for the ${region} and avoid forcing painful ranges.`,
    'Change positions often during work, driving, or training so one area is not loaded all day.',
    'Book an assessment if symptoms keep returning, limit movement, or interfere with sleep, work, or exercise.'
  ];
};

const clinicalRelatedFor = (region) => {
  if (region === 'low back and spine') return ['Mechanical low back pain', 'Sciatica / lumbar radiculopathy', 'Sacroiliac joint dysfunction'];
  if (region === 'neck and head') return ['Mechanical neck pain', 'Cervicogenic headache', 'Forward head posture-related pain'];
  if (region === 'mid back and ribs') return ['Thoracic spine hypomobility', 'Rib dysfunction / intercostal strain', 'Kyphosis-related discomfort'];
  if (region === 'arm, wrist, and hand') return ['Carpal tunnel syndrome', 'Repetitive strain injury of forearm', 'Wrist sprain'];
  if (region === 'shoulder and upper back') return ['Rotator cuff tendinopathy', 'Shoulder impingement / subacromial pain syndrome', 'Scapular dyskinesis'];
  if (region === 'hip and pelvis') return ['Hip flexor strain', 'Piriformis syndrome / deep gluteal syndrome', 'Greater trochanteric pain syndrome'];
  if (region === 'knee') return ['Patellofemoral pain syndrome', 'Knee osteoarthritis', 'IT band syndrome'];
  if (region === 'ankle and foot') return ['Lateral ankle sprain', 'Achilles tendinopathy', 'Plantar fasciitis / plantar heel pain'];
  if (region === 'jaw') return ['Temporomandibular disorder', 'Bruxism-related jaw tension', 'Masseter/temporalis myalgia'];
  return ['Muscle strain', 'Tendinopathy', 'Myofascial pain syndrome'];
};

const postureRegionFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(kyphosis|forward head|rounded shoulders|upper crossed|scapular|thoracic)/.test(t)) return 'neck, shoulders, and upper back';
  if (/(lordosis|hyperlordosis|lower crossed|pelvic|swayback|flat back|leg length)/.test(t)) return 'low back, pelvis, and hips';
  if (/(genu|knee)/.test(t)) return 'knees and legs';
  if (/(foot|pronation|supination)/.test(t)) return 'feet and ankles';
  if (/scoliosis|kypholordosis/.test(t)) return 'spine and trunk';
  return 'posture and movement';
};

const postureCauseFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(scoliosis|kyphosis|lordosis|kypholordosis|genu|leg length)/.test(t)) {
    return 'Some posture patterns are structural, some are functional, and many are a mix of both. They can be influenced by anatomy, growth, old injuries, work habits, sport demands, strength, mobility, and how your body has learned to move.';
  }
  if (/(scapular|rounded shoulders|forward head|upper crossed|thoracic)/.test(t)) {
    return 'This often develops when the neck, chest, shoulder blades, and upper back spend a lot of time in one position. Desk work, phone use, driving, training habits, and stress can all contribute.';
  }
  if (/(pelvic|swayback|flat back|lower crossed|hyperlordosis)/.test(t)) {
    return 'This can be influenced by hip mobility, core control, glute strength, breathing, standing habits, sitting time, and how the pelvis and rib cage stack over each other.';
  }
  if (/(foot|pronation|supination)/.test(t)) {
    return 'Foot posture can be influenced by ankle mobility, arch structure, footwear, hip strength, training load, and how the body absorbs force while walking or running.';
  }
  return 'Posture is not about one perfect position. It is usually about how well your body can move, recover, and share load across muscles and joints.';
};

const postureCareFor = (region) => [
  `Use gentle mobility for the ${region} instead of forcing a "perfect" posture.`,
  'Take movement breaks during sitting, standing, driving, or computer work.',
  'Build strength gradually around the areas that support the posture pattern.',
  'Get assessed if the posture change is new, painful, worsening, or linked with numbness, weakness, balance changes, or breathing symptoms.'
];

const postureRelatedFor = (topic) => {
  const t = topic.toLowerCase();
  if (/(kyphosis|forward head|rounded shoulders|upper crossed|scapular|thoracic)/.test(t)) return ['Forward head posture', 'Rounded shoulders', 'Upper crossed syndrome'];
  if (/(lordosis|pelvic|swayback|flat back|lower crossed|leg length)/.test(t)) return ['Anterior pelvic tilt', 'Lower crossed syndrome', 'Lordosis / hyperlordosis'];
  if (/(genu|knee)/.test(t)) return ['Genu valgum / knock knees', 'Genu varum / bow legs', 'Genu recurvatum / knee hyperextension'];
  if (/(foot|pronation|supination)/.test(t)) return ['Foot overpronation', 'Foot oversupination', 'Functional leg length discrepancy'];
  return ['Kyphosis', 'Lordosis / hyperlordosis', 'Scoliosis'];
};

const nav = (active = 'Blog') => `
<a class="skip-link" href="#main-content">Skip to main content</a>

<header>
  <nav class="container" aria-label="Main">
    <a href="/" class="nav-logo">Kimura Massage <span>Therapy &amp; Rehab · Brampton RMT</span></a>
    <ul class="nav-links">
      <li class="nav-dropdown">
        <a href="/#services">Services ▾</a>
        <div class="nav-dropdown-menu">
          <a href="/swedish-massage-brampton.html">Swedish Massage</a>
          <a href="/deep-tissue-massage-brampton.html">Deep Tissue Massage</a>
          <a href="/sports-massage-brampton.html">Sports Massage</a>
        </div>
      </li>
      <li><a href="/#prices">Prices</a></li>
      <li><a href="/blog/" style="color:var(--orange);font-weight:600;">${active}</a></li>
      <li><a href="/#about">About</a></li>
      <li><a href="/#reviews">Reviews</a></li>
      <li><a href="/#faq">FAQ</a></li>
    </ul>
    <div class="nav-right">
      <span class="nav-phone" style="display:none" id="navPhone">905-226-6336</span>
      <a href="/#book" class="btn-primary" style="font-size:14px;padding:10px 20px;">Book Now</a>
      <div class="nav-hamburger" id="hamburger"><span></span><span></span><span></span></div>
    </div>
  </nav>
</header>

<div class="mobile-nav" id="mobileNav">
  <div class="mobile-nav-inner">
    <button class="mobile-nav-close" id="mobileNavClose">x</button>
    <a href="/#services" onclick="closeMobileNav()">Services</a>
    <a href="/swedish-massage-brampton.html" onclick="closeMobileNav()" style="padding-left:16px;font-size:15px;border-color:transparent;">Swedish Massage</a>
    <a href="/deep-tissue-massage-brampton.html" onclick="closeMobileNav()" style="padding-left:16px;font-size:15px;border-color:transparent;">Deep Tissue</a>
    <a href="/sports-massage-brampton.html" onclick="closeMobileNav()" style="padding-left:16px;font-size:15px;">Sports Massage</a>
    <a href="/#prices" onclick="closeMobileNav()">Prices</a>
    <a href="/blog/" onclick="closeMobileNav()">Blog</a>
    <a href="/#about" onclick="closeMobileNav()">About</a>
    <a href="/#faq" onclick="closeMobileNav()">FAQ</a>
    <a href="/#book" onclick="closeMobileNav()">Book Now</a>
    <a href="tel:9052266336" style="margin-top:8px;">Call 905-226-6336</a>
  </div>
</div>`;

const footer = `
<footer>
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <div class="logo">Kimura Massage Therapy &amp; Rehab</div>
        <p>Registered Massage Therapy in Brampton, Ontario. Insurance receipts provided. Serving Brampton, Mississauga, and Caledon.</p>
        <div class="footer-nap">
          <p>14 Block Road, Brampton, ON L7A 5B2</p>
          <p>905-226-6336</p>
        </div>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="/swedish-massage-brampton.html">Swedish Massage</a></li>
          <li><a href="/deep-tissue-massage-brampton.html">Deep Tissue Massage</a></li>
          <li><a href="/sports-massage-brampton.html">Sports Massage</a></li>
          <li><a href="/#prices">Pricing</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Info</h4>
        <ul>
          <li><a href="/#about">About Ricky Arora RMT</a></li>
          <li><a href="/#reviews">Client Reviews</a></li>
          <li><a href="/blog/">Blog</a></li>
          <li><a href="/#faq">FAQ</a></li>
          <li><a href="/#book">Book Now</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Service Area</h4>
        <ul>
          <li><a href="/">Brampton</a></li>
          <li><a href="/">Mississauga</a></li>
          <li><a href="/">Caledon</a></li>
          <li><a href="/">Greater Toronto Area</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 Kimura Massage Therapy &amp; Rehab. All rights reserved.</p>
      <span class="footer-rmt-badge">Ricky Arora · Registered Massage Therapist</span>
    </div>
  </div>
</footer>

<script>
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  document.getElementById('mobileNavClose').addEventListener('click', () => mobileNav.classList.remove('open'));
  mobileNav.addEventListener('click', e => { if (e.target === mobileNav) mobileNav.classList.remove('open'); });
  function closeMobileNav() { mobileNav.classList.remove('open'); }
  function checkNavPhone() { document.getElementById('navPhone').style.display = window.innerWidth >= 960 ? 'block' : 'none'; }
  checkNavPhone(); window.addEventListener('resize', checkNavPhone);
</script>`;

const pageFor = (topic) => {
  const slug = slugify(topic);
  const displayTopic = titleCase(topic);
  const title = `${displayTopic}: Why It Happens and What Can Help`;
  const safeTopic = escapeHtml(topic);
  const safeDisplayTopic = escapeHtml(displayTopic);
  const safeTitle = escapeHtml(title);
  const region = regionFor(topic);
  const cause = causeFor(topic);
  const stretches = stretchSetFor(region);
  const treatment = treatmentFor(topic, region);
  const related = relatedFor(region).filter((item) => item !== topic).slice(0, 3);
  const description = `Simple guide to ${topic.toLowerCase()}: why it happens, stretches that may help, and when to book RMT massage therapy in Brampton.`;
  const url = `${site}/blog/${slug}.html`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | Kimura Massage Therapy Brampton</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:locale" content="en_CA" />
  <meta property="article:published_time" content="${today}" />
  <meta name="author" content="Ricky Arora, RMT" />
  <meta name="theme-color" content="#0F2742" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalBusiness',
        '@id': `${site}/#business`,
        name: 'Kimura Massage Therapy & Rehab',
        url: site,
        telephone: '+1-905-226-6336'
      },
      {
        '@type': 'Article',
        headline: title,
        description,
        author: { '@type': 'Person', name: 'Ricky Arora', jobTitle: 'Registered Massage Therapist', honorificSuffix: 'RMT' },
        publisher: { '@id': `${site}/#business` },
        datePublished: today,
        dateModified: today,
        mainEntityOfPage: url
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog/` },
          { '@type': 'ListItem', position: 3, name: topic, item: url }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Why do I have ${topic.toLowerCase()}?`,
            acceptedAnswer: { '@type': 'Answer', text: cause }
          },
          {
            '@type': 'Question',
            name: `Can massage help with ${topic.toLowerCase()}?`,
            acceptedAnswer: { '@type': 'Answer', text: `Massage therapy may help reduce muscle guarding, improve comfort, and support easier movement. The right treatment depends on your health history and what your RMT finds during assessment.` }
          }
        ]
      }
    ]
  }, null, 2)}
  </script>
</head>
<body>
${nav()}

<main id="main-content">
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li>${safeDisplayTopic}</li>
    </ol>
  </div>
</nav>

<section class="article-hero">
  <div class="container">
    <div class="post-meta">
      <span class="post-tag">Muscle Tightness Guide</span>
      <span class="post-date">May 29, 2026</span>
      <span class="post-read-time">4 min read</span>
    </div>
    <h1>${safeTitle}</h1>
    <p class="post-intro">A simple guide to <strong>${safeTopic}</strong>: why it happens, what you can try at home, and when massage therapy may be useful.</p>
    <div class="post-author">
      <div class="post-author-avatar">RA</div>
      <div>
        <div class="post-author-name">Ricky Arora, RMT</div>
        <div class="post-author-title">Registered Massage Therapist · Kimura Massage Therapy &amp; Rehab, Brampton</div>
      </div>
    </div>
  </div>
</section>

<section class="article-layout">
  <div class="container">
    <div class="article-inner">
      <article class="article-body">
        <div class="article-callout">
          <p><strong>Disclaimer:</strong> This article is for general education only and is not medical advice. If your pain is sharp, spreading, caused by an injury, or linked with numbness, weakness, fever, chest pain, or trouble breathing, speak with your doctor or another qualified health professional.</p>
        </div>

        <h2 id="why-it-happens">Why This Happens</h2>
        <p><strong>${safeTopic}</strong> can happen for many reasons. ${escapeHtml(cause)}</p>
        <p>Sometimes the problem is not only the sore spot. For example, tightness in the ${escapeHtml(region)} can be affected by breathing, sleep, training load, stress, work position, or how often you move during the day.</p>

        <h2 id="what-it-can-feel-like">What It Can Feel Like</h2>
        <p>People often describe <strong>${safeTopic.toLowerCase()}</strong> as a pulling feeling, a dull ache, reduced range of motion, or a hard band in the muscle. Some people notice it more after sitting, standing, workouts, sleep, or stressful days.</p>
        <ul>
          <li>A stiff or heavy feeling in the affected area</li>
          <li>Less comfortable movement than usual</li>
          <li>Tender points or muscle knots</li>
          <li>Relief after heat, movement, stretching, or massage</li>
        </ul>

        <h2 id="stretches">Common Stretches That May Help</h2>
        <p>Keep stretches gentle. A mild pull is okay; sharp pain is not. Try slow breathing and stop if symptoms get worse.</p>
        <ul>
          ${stretches.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>

        <h2 id="massage">How Massage Therapy May Help</h2>
        <p>For <strong>${safeTopic.toLowerCase()}</strong>, ${escapeHtml(treatment)} may help calm overactive muscles, improve local circulation, and make movement feel easier. At Kimura Massage Therapy &amp; Rehab, your session starts with a short assessment so the pressure and techniques match your body.</p>
        <p>Massage is not about forcing a muscle to relax. A good session should work with your nervous system, your comfort level, and your goals. If an area is very sensitive, lighter work may be more useful than heavy pressure.</p>

        <h2 id="when-to-book">When to Book</h2>
        <p>Consider booking if the tightness keeps coming back, affects work or training, limits your movement, or does not improve with basic self-care. RMT massage in Brampton may be especially helpful when the issue is connected to posture, stress, workouts, or repetitive daily habits.</p>
        <p>Insurance receipts are available for RMT sessions. If you are not sure which treatment to choose, start with a regular RMT massage appointment and Ricky can adjust the plan during your assessment.</p>

        <div class="article-cta">
          <div class="article-cta-text">
            <h3>Ready to Feel Less Tight?</h3>
            <p>Book a massage therapy session in Brampton with Ricky Arora, RMT. Same-day appointments are often available.</p>
          </div>
          <div class="article-cta-btns">
            <a href="/#book" class="btn-white">Book Now</a>
            <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
          </div>
        </div>

        <h2 id="related">Related Guides</h2>
        <ul>
          ${related.map((item) => `<li><a href="/blog/${slugify(item)}.html">${escapeHtml(item)}</a></li>`).join('\n          ')}
        </ul>
      </article>

      <aside class="article-sidebar">
        <div class="sidebar-book">
          <h3>Book RMT Massage</h3>
          <p>Get treatment for muscle tightness, stiffness, knots, and posture-related tension in Brampton.</p>
          <a href="/#book" class="btn-white" style="margin-bottom:10px;">Book Now</a>
          <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
        </div>
        <div class="sidebar-toc">
          <h4>In This Article</h4>
          <ul>
            <li><a href="#why-it-happens">Why It Happens</a></li>
            <li><a href="#what-it-can-feel-like">What It Feels Like</a></li>
            <li><a href="#stretches">Stretches</a></li>
            <li><a href="#massage">Massage Therapy</a></li>
            <li><a href="#when-to-book">When to Book</a></li>
            <li><a href="#related">Related Guides</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>
</main>
${footer}
</body>
</html>
`;
};

const clinicalPageFor = (topic) => {
  const slug = clinicalSlugFor(topic);
  const displayTopic = titleCase(topic);
  const title = `${displayTopic}: Massage Therapy Guide`;
  const safeTopic = escapeHtml(topic);
  const safeDisplayTopic = escapeHtml(displayTopic);
  const safeTitle = escapeHtml(title);
  const region = clinicalRegionFor(topic);
  const cause = clinicalCauseFor(topic);
  const care = clinicalCareFor(topic, region);
  const related = clinicalRelatedFor(region).filter((item) => clinicalSlugFor(item) !== slug).slice(0, 3);
  const description = `Simple guide to ${topic.toLowerCase()}: common causes, symptoms, safe self-care, and when RMT massage therapy in Brampton may help.`;
  const url = `${site}/blog/${slug}.html`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | Kimura Massage Therapy Brampton</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:locale" content="en_CA" />
  <meta property="article:published_time" content="${today}" />
  <meta name="author" content="Ricky Arora, RMT" />
  <meta name="theme-color" content="#0F2742" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalBusiness',
        '@id': `${site}/#business`,
        name: 'Kimura Massage Therapy & Rehab',
        url: site,
        telephone: '+1-905-226-6336'
      },
      {
        '@type': 'Article',
        headline: title,
        description,
        author: { '@type': 'Person', name: 'Ricky Arora', jobTitle: 'Registered Massage Therapist', honorificSuffix: 'RMT' },
        publisher: { '@id': `${site}/#business` },
        datePublished: today,
        dateModified: today,
        mainEntityOfPage: url
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog/` },
          { '@type': 'ListItem', position: 3, name: topic, item: url }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Can massage fix ${topic.toLowerCase()}?`,
            acceptedAnswer: { '@type': 'Answer', text: 'Massage therapy does not diagnose or cure medical conditions. It may help with related muscle tension, guarding, mobility limits, and comfort when it is appropriate for the person and condition.' }
          },
          {
            '@type': 'Question',
            name: `When should I see a doctor for ${topic.toLowerCase()}?`,
            acceptedAnswer: { '@type': 'Answer', text: 'Speak with a doctor or qualified health professional if symptoms are new, severe, worsening, caused by trauma, linked with numbness or weakness, or affecting bladder, bowel, balance, breathing, or daily function.' }
          }
        ]
      }
    ]
  }, null, 2)}
  </script>
</head>
<body>
${nav()}

<main id="main-content">
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li>${safeDisplayTopic}</li>
    </ol>
  </div>
</nav>

<section class="article-hero">
  <div class="container">
    <div class="post-meta">
      <span class="post-tag">Condition Guide</span>
      <span class="post-date">May 29, 2026</span>
      <span class="post-read-time">4 min read</span>
    </div>
    <h1>${safeTitle}</h1>
    <p class="post-intro">A simple guide to <strong>${safeTopic}</strong>: what it may involve, what to watch for, and when massage therapy may support comfort and movement.</p>
    <div class="post-author">
      <div class="post-author-avatar">RA</div>
      <div>
        <div class="post-author-name">Ricky Arora, RMT</div>
        <div class="post-author-title">Registered Massage Therapist · Kimura Massage Therapy &amp; Rehab, Brampton</div>
      </div>
    </div>
  </div>
</section>

<section class="article-layout">
  <div class="container">
    <div class="article-inner">
      <article class="article-body">
        <div class="article-callout">
          <p><strong>Disclaimer:</strong> This article is for general education only and is not medical advice, diagnosis, or a treatment plan. Massage therapy does not replace care from your doctor, physiotherapist, chiropractor, surgeon, or other qualified health professional. If symptoms are severe, spreading, traumatic, or linked with numbness, weakness, fever, chest pain, breathing trouble, or bowel/bladder changes, seek medical care.</p>
        </div>

        <h2 id="what-it-means">What This Can Mean</h2>
        <p><strong>${safeTopic}</strong> can involve muscles, joints, tendons, ligaments, nerves, or connective tissue around the ${escapeHtml(region)}. The exact cause matters, so the safest next step is a proper assessment if symptoms are new, intense, or not improving.</p>
        <p>${escapeHtml(cause)}</p>

        <h2 id="what-it-can-feel-like">What It Can Feel Like</h2>
        <p>Symptoms can vary. Some people notice local aching and stiffness, while others feel pain that changes with movement, work posture, sleep, training, or stress. Nerve-related problems can feel sharper, hotter, numb, tingly, or travel into an arm or leg.</p>
        <ul>
          <li>Stiffness, soreness, pressure, or guarded movement</li>
          <li>Pain with certain positions or repeated tasks</li>
          <li>Reduced range of motion or confidence moving the area</li>
          <li>Muscle tension around the painful or irritated region</li>
        </ul>

        <h2 id="safe-self-care">Safe Self-Care Basics</h2>
        <p>These are general starting points, not a replacement for diagnosis. Use comfort as your guide and stop anything that increases pain, numbness, weakness, or symptoms that travel.</p>
        <ul>
          ${care.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>

        <h2 id="massage">How Massage Therapy May Help</h2>
        <p>Massage therapy may help with the muscle tension, guarding, stress load, and movement restriction that often come with <strong>${safeTopic.toLowerCase()}</strong>. It is not a cure for structural or medical conditions, but it can be part of a broader care plan when massage is appropriate.</p>
        <p>At Kimura Massage Therapy &amp; Rehab, your session starts with a short intake and assessment. Pressure is adjusted to your comfort level, and treatment is modified if there are medical precautions, recent injuries, surgery, nerve symptoms, pregnancy, inflammatory conditions, or bone health concerns.</p>

        <h2 id="when-to-book">When to Book</h2>
        <p>Book RMT massage if your main goal is to reduce related muscle tension, improve comfort, support recovery, or make daily movement feel easier. If you are unsure whether massage is appropriate, ask your doctor first or book an assessment and share your diagnosis, medications, imaging results, and current restrictions.</p>
        <p>Insurance receipts are available for RMT sessions in Brampton. Same-day appointments are often available.</p>

        <div class="article-cta">
          <div class="article-cta-text">
            <h3>Need Help With Pain or Tension?</h3>
            <p>Book a massage therapy session in Brampton with Ricky Arora, RMT. Your treatment will be adjusted to your comfort, goals, and health history.</p>
          </div>
          <div class="article-cta-btns">
            <a href="/#book" class="btn-white">Book Now</a>
            <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
          </div>
        </div>

        <h2 id="related">Related Guides</h2>
        <ul>
          ${related.map((item) => `<li><a href="/blog/${clinicalSlugFor(item)}.html">${escapeHtml(item)}</a></li>`).join('\n          ')}
        </ul>
      </article>

      <aside class="article-sidebar">
        <div class="sidebar-book">
          <h3>Book RMT Massage</h3>
          <p>Get massage therapy support for pain, stiffness, muscle guarding, and recovery in Brampton.</p>
          <a href="/#book" class="btn-white" style="margin-bottom:10px;">Book Now</a>
          <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
        </div>
        <div class="sidebar-toc">
          <h4>In This Article</h4>
          <ul>
            <li><a href="#what-it-means">What It Means</a></li>
            <li><a href="#what-it-can-feel-like">What It Feels Like</a></li>
            <li><a href="#safe-self-care">Safe Self-Care</a></li>
            <li><a href="#massage">Massage Therapy</a></li>
            <li><a href="#when-to-book">When to Book</a></li>
            <li><a href="#related">Related Guides</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>
</main>
${footer}
</body>
</html>
`;
};

const posturePageFor = (topic) => {
  const slug = postureSlugFor(topic);
  const displayTopic = titleCase(topic);
  const title = `${displayTopic}: Posture and Massage Therapy Guide`;
  const safeTopic = escapeHtml(topic);
  const safeDisplayTopic = escapeHtml(displayTopic);
  const safeTitle = escapeHtml(title);
  const region = postureRegionFor(topic);
  const cause = postureCauseFor(topic);
  const care = postureCareFor(region);
  const related = postureRelatedFor(topic).filter((item) => postureSlugFor(item) !== slug).slice(0, 3);
  const description = `Simple guide to ${topic.toLowerCase()}: why posture patterns happen, what they can feel like, and when RMT massage therapy in Brampton may help.`;
  const url = `${site}/blog/${slug}.html`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${safeTitle} | Kimura Massage Therapy Brampton</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${safeTitle}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:locale" content="en_CA" />
  <meta property="article:published_time" content="${today}" />
  <meta name="author" content="Ricky Arora, RMT" />
  <meta name="theme-color" content="#0F2742" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'MedicalBusiness', '@id': `${site}/#business`, name: 'Kimura Massage Therapy & Rehab', url: site, telephone: '+1-905-226-6336' },
      {
        '@type': 'Article',
        headline: title,
        description,
        author: { '@type': 'Person', name: 'Ricky Arora', jobTitle: 'Registered Massage Therapist', honorificSuffix: 'RMT' },
        publisher: { '@id': `${site}/#business` },
        datePublished: today,
        dateModified: today,
        mainEntityOfPage: url
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog/` },
          { '@type': 'ListItem', position: 3, name: topic, item: url }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: `Can massage fix ${topic.toLowerCase()}?`,
            acceptedAnswer: { '@type': 'Answer', text: 'Massage therapy does not force posture into a perfect shape. It may help with related muscle tension, stiffness, guarding, stress, and comfort while movement and strengthening habits address the bigger pattern.' }
          },
          {
            '@type': 'Question',
            name: `Should I see a doctor for ${topic.toLowerCase()}?`,
            acceptedAnswer: { '@type': 'Answer', text: 'Speak with a doctor or qualified health professional if the posture change is new, painful, worsening, caused by injury, or linked with numbness, weakness, balance changes, breathing symptoms, or daily function limits.' }
          }
        ]
      }
    ]
  }, null, 2)}
  </script>
</head>
<body>
${nav()}
<main id="main-content">
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li><a href="/blog/">Blog</a></li>
      <li>${safeDisplayTopic}</li>
    </ol>
  </div>
</nav>

<section class="article-hero">
  <div class="container">
    <div class="post-meta">
      <span class="post-tag">Posture Guide</span>
      <span class="post-date">May 29, 2026</span>
      <span class="post-read-time">4 min read</span>
    </div>
    <h1>${safeTitle}</h1>
    <p class="post-intro">A simple guide to <strong>${safeTopic}</strong>: why it may happen, what it can feel like, and when massage therapy may support comfort and movement.</p>
    <div class="post-author">
      <div class="post-author-avatar">RA</div>
      <div>
        <div class="post-author-name">Ricky Arora, RMT</div>
        <div class="post-author-title">Registered Massage Therapist · Kimura Massage Therapy &amp; Rehab, Brampton</div>
      </div>
    </div>
  </div>
</section>

<section class="article-layout">
  <div class="container">
    <div class="article-inner">
      <article class="article-body">
        <div class="article-callout">
          <p><strong>Disclaimer:</strong> This article is for general education only and is not medical advice, diagnosis, or a posture correction plan. Posture can be structural, functional, or both. If symptoms are painful, new, worsening, or linked with numbness, weakness, breathing issues, balance changes, or an injury, consult your doctor or another qualified health professional.</p>
        </div>

        <h2 id="what-it-means">What This Can Mean</h2>
        <p><strong>${safeTopic}</strong> describes a posture or movement pattern around the ${escapeHtml(region)}. It does not automatically mean something is wrong. Many people have posture differences without pain.</p>
        <p>${escapeHtml(cause)}</p>

        <h2 id="what-it-can-feel-like">What It Can Feel Like</h2>
        <p>When posture is connected with symptoms, people may notice tension, stiffness, fatigue, pressure, or limited movement. The feeling can build during desk work, driving, standing, training, or stress.</p>
        <ul>
          <li>Tightness around the muscles working too hard</li>
          <li>Stiffness after staying in one position</li>
          <li>Reduced comfort with reaching, walking, bending, or turning</li>
          <li>Muscle fatigue, guarding, or recurring knots</li>
        </ul>

        <h2 id="self-care">Simple Self-Care Ideas</h2>
        <p>The goal is not to hold a perfect posture all day. It is to move well, change positions, and build capacity gradually.</p>
        <p>Small changes are usually more realistic than trying to sit or stand perfectly. Start with short movement breaks, comfortable breathing, and one or two exercises recommended by a qualified provider if you have pain or a known condition.</p>
        <ul>
          ${care.map((item) => `<li>${escapeHtml(item)}</li>`).join('\n          ')}
        </ul>

        <h2 id="massage">How Massage Therapy May Help</h2>
        <p>Massage therapy may help reduce muscle tension, calm guarding, improve comfort, and make it easier to move when <strong>${safeTopic.toLowerCase()}</strong> is associated with stiffness or soreness. It works best when paired with regular movement and strengthening habits.</p>
        <p>At Kimura Massage Therapy &amp; Rehab, your RMT session is adjusted to your comfort, health history, and goals. Treatment may focus on the neck, shoulders, back, hips, legs, or feet depending on what is contributing to the pattern.</p>

        <h2 id="when-to-book">When to Book</h2>
        <p>Book RMT massage if your posture-related tension keeps returning, affects work or training, limits movement, or makes daily activities uncomfortable. Bring any diagnosis, imaging, medical precautions, or exercise recommendations you already have.</p>
        <p>Insurance receipts are available for RMT sessions in Brampton. Same-day appointments are often available.</p>

        <div class="article-cta">
          <div class="article-cta-text">
            <h3>Want Help With Posture-Related Tension?</h3>
            <p>Book a massage therapy session in Brampton with Ricky Arora, RMT. Treatment is adjusted to your comfort, posture pattern, and goals.</p>
          </div>
          <div class="article-cta-btns">
            <a href="/#book" class="btn-white">Book Now</a>
            <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
          </div>
        </div>

        <h2 id="related">Related Guides</h2>
        <ul>
          ${related.map((item) => `<li><a href="/blog/${postureSlugFor(item)}.html">${escapeHtml(item)}</a></li>`).join('\n          ')}
        </ul>
      </article>

      <aside class="article-sidebar">
        <div class="sidebar-book">
          <h3>Book RMT Massage</h3>
          <p>Get massage therapy support for posture-related tension, stiffness, and muscle guarding in Brampton.</p>
          <a href="/#book" class="btn-white" style="margin-bottom:10px;">Book Now</a>
          <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
        </div>
        <div class="sidebar-toc">
          <h4>In This Article</h4>
          <ul>
            <li><a href="#what-it-means">What It Means</a></li>
            <li><a href="#what-it-can-feel-like">What It Feels Like</a></li>
            <li><a href="#self-care">Self-Care Ideas</a></li>
            <li><a href="#massage">Massage Therapy</a></li>
            <li><a href="#when-to-book">When to Book</a></li>
            <li><a href="#related">Related Guides</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>
</main>
${footer}
</body>
</html>
`;
};

const indexPage = () => {
  const cards = existingPosts.map((post) => `
      <a href="${post.href}" class="blog-card">
        <div class="blog-card-top">
          <span class="blog-card-tag">${post.tag}</span>
          <h2>${post.title}</h2>
        </div>
        <div class="blog-card-body">
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <p class="blog-card-meta">${post.meta}</p>
          <span class="blog-card-link">Read more</span>
        </div>
      </a>`).join('\n');
  const library = topics.map((topic) => {
    const slug = slugify(topic);
    return `<li><a href="/blog/${slug}.html">${escapeHtml(topic)}</a></li>`;
  }).join('\n              ');
  const clinicalLibrary = clinicalTopics.map((topic) => {
    const slug = clinicalSlugFor(topic);
    return `<li><a href="/blog/${slug}.html">${escapeHtml(topic)}</a></li>`;
  }).join('\n              ');
  const postureLibrary = postureTopics.map((topic) => {
    const slug = postureSlugFor(topic);
    return `<li><a href="/blog/${slug}.html">${escapeHtml(topic)}</a></li>`;
  }).join('\n              ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Massage Therapy Blog — Brampton RMT Tips | Kimura Massage Therapy &amp; Rehab</title>
  <meta name="description" content="Massage therapy insights from Brampton RMT Ricky Arora. Learn about muscle tightness, stiffness, knots, posture tension, insurance coverage, and massage treatment options." />
  <link rel="canonical" href="${site}/blog/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Massage Therapy Blog — Brampton RMT Tips | Kimura Massage Therapy &amp; Rehab" />
  <meta property="og:description" content="Massage therapy insights from Brampton RMT Ricky Arora for tight muscles, stiff backs, posture tension, recovery, and RMT treatment planning." />
  <meta property="og:url" content="${site}/blog/" />
  <meta property="og:locale" content="en_CA" />
  <meta name="theme-color" content="#0F2742" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../style.css" />
  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'MedicalBusiness', '@id': `${site}/#business`, name: 'Kimura Massage Therapy & Rehab', url: site, telephone: '+1-905-226-6336' },
      { '@type': 'Blog', name: 'Kimura Massage Therapy & Rehab Blog', url: `${site}/blog/`, publisher: { '@id': `${site}/#business` }, description: 'Massage therapy insights and guides from Brampton RMT Ricky Arora.' },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${site}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site}/blog/` }
      ] }
    ]
  }, null, 2)}
  </script>
</head>
<body>
${nav()}
<main id="main-content">
<nav class="breadcrumb-nav" aria-label="Breadcrumb">
  <div class="container">
    <ol class="breadcrumb-list">
      <li><a href="/">Home</a></li>
      <li>Blog</li>
    </ol>
  </div>
</nav>

<section class="page-hero">
  <div class="container">
    <span class="page-hero-badge">From Your Brampton RMT</span>
    <h1>Massage Therapy Blog</h1>
    <p>Simple massage therapy guides for tight muscles, stiff backs, posture tension, recovery, insurance coverage, and choosing the right treatment. Written by Ricky Arora, RMT.</p>
  </div>
</section>

<section class="blog-listing">
  <div class="container">
    <div class="blog-listing-header">
      <span class="section-label">Featured Posts</span>
      <h2 class="section-title">Massage Therapy Guides</h2>
    </div>
    <div class="blog-grid">
${cards}
    </div>
  </div>
</section>

<section class="content-section bg-white">
  <div class="container">
    <div class="blog-listing-header">
      <span class="section-label">Tightness &amp; Recovery Library</span>
      <h2 class="section-title">Find Your Muscle Tightness Guide</h2>
      <p class="section-sub">Browse simple guides on why common muscle tightness happens, stretches that may help, and when to book RMT massage therapy in Brampton.</p>
    </div>
    <div class="content-panel">
      <ul class="benefit-list seo-link-list">
              ${library}
      </ul>
    </div>
  </div>
</section>

<section class="content-section">
  <div class="container">
    <div class="blog-listing-header">
      <span class="section-label">Pain &amp; Condition Library</span>
      <h2 class="section-title">Find Your Pain or Injury Guide</h2>
      <p class="section-sub">Simple, cautious guides on common musculoskeletal conditions, what they may feel like, when to seek medical care, and how RMT massage therapy may support comfort and movement.</p>
    </div>
    <div class="content-panel">
      <ul class="benefit-list seo-link-list">
              ${clinicalLibrary}
      </ul>
    </div>
  </div>
</section>

<section class="content-section bg-white">
  <div class="container">
    <div class="blog-listing-header">
      <span class="section-label">Posture &amp; Alignment Library</span>
      <h2 class="section-title">Find Your Posture Guide</h2>
      <p class="section-sub">Simple guides on common posture and alignment patterns, why they may happen, what they can feel like, and how RMT massage therapy may support comfort and movement.</p>
    </div>
    <div class="content-panel">
      <ul class="benefit-list seo-link-list">
              ${postureLibrary}
      </ul>
    </div>
  </div>
</section>

<section class="booking-section" style="border-top:1px solid var(--border);">
  <div class="container">
    <div class="booking-panel">
      <div class="booking-panel-text">
        <h2>Ready to Book in Brampton?</h2>
        <p>Swedish, deep tissue, and sports massage by Registered Massage Therapist Ricky Arora. Insurance receipts provided every RMT session.</p>
      </div>
      <div class="booking-panel-actions">
        <a href="/#book" class="btn-white">Book Online</a>
        <a href="tel:9052266336" class="btn-white-outline">Call 905-226-6336</a>
      </div>
    </div>
  </div>
</section>
</main>
${footer}
</body>
</html>
`;
};

const sitemap = () => {
  const urls = [
    ['/', '2025-05-01', 'monthly', '1.0'],
    ['/swedish-massage-brampton.html', '2025-05-01', 'monthly', '0.9'],
    ['/deep-tissue-massage-brampton.html', '2025-05-01', 'monthly', '0.9'],
    ['/sports-massage-brampton.html', '2025-05-01', 'monthly', '0.9'],
    ['/blog/', today, 'weekly', '0.8'],
    ['/blog/what-to-expect-rmt-massage-brampton.html', '2025-06-01', 'monthly', '0.7'],
    ['/blog/does-insurance-cover-rmt-massage-ontario.html', '2025-05-01', 'monthly', '0.7'],
    ['/blog/deep-tissue-vs-swedish-massage.html', '2025-04-15', 'monthly', '0.7'],
    ['/blog/how-often-should-you-get-a-massage.html', '2025-04-01', 'monthly', '0.7'],
    ...topics.map((topic) => [`/blog/${slugify(topic)}.html`, today, 'monthly', '0.6']),
    ...clinicalTopics.map((topic) => [`/blog/${clinicalSlugFor(topic)}.html`, today, 'monthly', '0.6']),
    ...postureTopics.map((topic) => [`/blog/${postureSlugFor(topic)}.html`, today, 'monthly', '0.6'])
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([path, lastmod, changefreq, priority]) => `  <url>
    <loc>${site}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
};

mkdirSync('blog', { recursive: true });
for (const topic of topics) {
  writeFileSync(`blog/${slugify(topic)}.html`, pageFor(topic));
}
for (const topic of clinicalTopics) {
  writeFileSync(`blog/${clinicalSlugFor(topic)}.html`, clinicalPageFor(topic));
}
for (const topic of postureTopics) {
  writeFileSync(`blog/${postureSlugFor(topic)}.html`, posturePageFor(topic));
}
writeFileSync('blog/index.html', indexPage());
writeFileSync('sitemap.xml', sitemap());

console.log(`Generated ${topics.length + clinicalTopics.length + postureTopics.length} SEO blog pages, updated blog/index.html, and updated sitemap.xml.`);
