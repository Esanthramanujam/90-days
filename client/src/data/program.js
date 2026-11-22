// Reforge 90 — the program content.
// Every daily habit points at a protocol in SCIENCE, which carries the evidence level and sources.

export const PHASES = [
  {
    id: 1,
    name: 'Foundation',
    days: [1, 30],
    tagline: 'Fix sleep, learn the lifts, build the streak.',
    focus: [
      'Lock a consistent wake time, 7 days a week',
      'Full-body training 3× per week, learning technique at moderate effort',
      'Hit your protein target every day — this is when habits form',
      'Easy confidence reps: eye contact, small talk, speaking first',
    ],
  },
  {
    id: 2,
    name: 'Build',
    days: [31, 60],
    tagline: 'More volume, more muscle, bigger social reps.',
    focus: [
      'Switch to a 4-day upper/lower split (10–20 hard sets per muscle per week)',
      'Add a retinoid at night for skin; keep daily SPF',
      'Optional deliberate cold exposure (≈11 min per week total)',
      'Medium confidence reps: opinions, invitations, asking for what you want',
    ],
  },
  {
    id: 3,
    name: 'Peak',
    days: [61, 90],
    tagline: 'Progressive overload, sharpen the look, own the room.',
    focus: [
      'Days 57–63 are a deload week — lighter weights, same habits',
      'Push for rep and load PRs on the main lifts',
      'If body fat is the bottleneck, run a small deficit (~300–500 kcal) while keeping protein high',
      'Hard confidence reps: public speaking, leadership, rejection practice',
    ],
  },
];

export const phaseForDay = (day) => PHASES.find((p) => day >= p.days[0] && day <= p.days[1]) || PHASES[0];

// ---------- Daily habits ----------
export const HABITS = [
  { id: 'light', label: 'Morning light', detail: 'Go outside within an hour of waking: 5–10 min if sunny, 15–20 min if cloudy. No sunglasses, never look straight at the sun.', science: 'circadian', pillar: 'Mind' },
  { id: 'train', label: "Today's training", detail: 'Do the session in the Training tab. On a rest day, a 20–30 min walk counts.', science: 'resistance', pillar: 'Body' },
  { id: 'protein', label: 'Protein target', detail: '≈1.6 g per kg of body weight per day, spread over 3–4 meals (≈0.4 g/kg each).', science: 'protein', pillar: 'Body' },
  { id: 'steps', label: '8,000+ steps', detail: 'Daily movement outside the gym. Walk after meals to make it easy.', science: 'steps', pillar: 'Body' },
  { id: 'sleep', label: 'Sleep 7–9 h, same wake time', detail: 'No caffeine within ~8 h of bed, dim lights after sunset, cool dark room.', science: 'sleep', pillar: 'Mind' },
  { id: 'skinAM', label: 'AM skin: cleanse + SPF 30+', detail: 'Gentle cleanser, moisturiser, broad-spectrum SPF 30+ every single day — even indoors near windows.', science: 'sunscreen', pillar: 'Look' },
  { id: 'skinPM', label: 'PM skin: cleanse + moisturise (+ retinoid from day 31)', detail: 'Start a retinoid (adapalene 0.1% or retinol) 2–3 nights a week from day 31 and build up. Pea-sized amount.', science: 'retinoid', pillar: 'Look' },
  { id: 'groom', label: 'Grooming & posture check', detail: 'Hair, beard, nails, clean fitted clothes. Stand tall, shoulders down, chin level. It changes how you feel and how others read you.', science: 'posture', pillar: 'Look' },
  { id: 'calm', label: '5 min cyclic sighing or 10 min NSDR', detail: 'Cyclic sighing: two inhales through the nose, one long exhale through the mouth, for 5 minutes.', science: 'breathing', pillar: 'Mind' },
  { id: 'rep', label: "Today's confidence rep", detail: 'Do the social challenge shown for today. Discomfort is the dose.', science: 'exposure', pillar: 'Confidence' },
  { id: 'noAlcohol', label: 'No alcohol', detail: 'Alcohol fragments sleep and blunts recovery. 90 days without it is a cheap, large win.', science: 'alcohol', pillar: 'Mind' },
];

// ---------- Confidence ladder: one rep per day, gets harder over time ----------
export const CONFIDENCE_REPS = [
  // Phase 1 — easy (1–30)
  'Hold eye contact and smile at 3 strangers today.',
  'Say "good morning" first to 5 people.',
  'Ask a shop or café staff member how their day is going — and listen.',
  'Give one specific, sincere compliment to someone.',
  'Ask a stranger for a recommendation (food, book, route).',
  'Speak up once in a meeting or group chat with an idea.',
  'Call someone instead of texting.',
  'Introduce yourself by name to someone new.',
  'Write down 3 things you did well today.',
  'Walk somewhere busy at a slower pace with your head up — no phone.',
  'Ask a colleague a question about their life outside work.',
  'Order something in a restaurant you have never tried, and ask the waiter about it.',
  'Send a message to an old friend you have not spoken to in months.',
  'Hold a conversation for 2 minutes with someone you usually just nod at.',
  'Take a photo of yourself after training. Save it — no judging.',
  'Say "no" to one request you would normally accept out of politeness.',
  'Ask for a small discount or extra (it is okay to hear no).',
  'Give feedback to someone in a kind, direct way.',
  'Sit in the front row or the centre of a room today.',
  'Record a 60-second voice note or video explaining something you know well.',
  'Start a conversation while waiting in a queue.',
  'Thank someone in detail for something they did for you.',
  'Share a personal goal with a friend out loud.',
  'Ask a question in public (class, meetup, meeting).',
  'Wear the outfit you like but feel "too bold" for.',
  'Compliment a stranger on something they chose (shoes, bag, haircut).',
  'Spend 10 minutes at a gym or park without headphones and nod to regulars.',
  'Tell a short story at lunch or dinner.',
  'Ask a mentor or senior colleague for 15 minutes of advice.',
  'Review your first 30 days: write what changed and what scared you less.',
  // Phase 2 — medium (31–60)
  'Share a real opinion in a group, even if others might disagree.',
  'Invite someone for coffee, a walk or a meal.',
  'Ask for help with something you are stuck on.',
  'Start a conversation with someone you find attractive or impressive — just to talk.',
  'Post something you made or learned on social media or LinkedIn.',
  'Lead a small decision for a group (where to eat, what to do).',
  'Ask a follow-up question three levels deep in a conversation.',
  'Make a phone call you have been putting off.',
  'Return or exchange something without over-explaining.',
  'Join a new group, class or community event.',
  'Tell someone something you appreciate about them face to face.',
  'Disagree politely with a decision and give your reason.',
  'Ask for feedback on your work and only say "thank you" afterwards.',
  'Speak first when entering a room or a call.',
  'Teach someone a skill for 10 minutes.',
  'Go to a café, sit alone without a phone for 20 minutes.',
  'Ask a stranger to take a photo of you.',
  'Volunteer to present or demo something.',
  'Negotiate something small: a deadline, a price, a time.',
  'Hold a pause of 3 seconds before you answer a question — calm, not rushed.',
  'Reconnect with someone and suggest a specific plan.',
  'Say exactly what you want in one sentence, without apologising.',
  'Introduce two people who should know each other.',
  'Dance, sing or play something in front of at least one person.',
  'Tell a joke or a funny story in a group.',
  'Ask someone how they got good at their craft.',
  'Wear something that makes you noticeable and act normal.',
  'Admit a mistake openly and state what you will do differently.',
  'Ask for a stretch task or more responsibility at work.',
  'Review days 31–60: list your top 5 brave moments.',
  // Phase 3 — hard (61–90)
  'Rejection rep: ask for something you will probably be refused.',
  'Give a 3-minute talk to a group (team meeting, friends, meetup).',
  'Ask someone out, or ask a new friend to hang out one-on-one.',
  'Lead a meeting or a group activity from start to finish.',
  'Post a video of yourself talking about something you care about.',
  'Strike up a conversation with a group of strangers at an event.',
  'Ask for a raise, a promotion conversation or a referral.',
  'Hold strong eye contact during a full conversation.',
  'Organise a meetup or dinner and invite at least 4 people.',
  'Give a toast or a short speech at a gathering.',
  'Have a hard conversation you have been avoiding — calmly.',
  'Ask a question at a public event with a microphone.',
  'Go to an event alone and leave with one new contact.',
  'Pitch an idea to someone senior.',
  'Spend a day saying yes to every reasonable social invite.',
  'Mentor someone newer than you.',
  'Ask three people what they think your strengths are.',
  'Record and watch a video of yourself speaking; note one fix and redo it.',
  'Start a conversation with someone you admire online and ask a smart question.',
  'Be the first to speak in a group of strangers.',
  'Turn down something that does not fit your goals, clearly and kindly.',
  'Ask someone for honest feedback on how you come across.',
  'Lead a workout or walk for a friend.',
  'Make a public commitment to a goal with a date.',
  'Help a stranger with something without being asked.',
  'Share a vulnerable story with someone you trust.',
  'Ask for exactly what you want in a negotiation and wait in silence.',
  'Plan your next 90 days and tell someone about it.',
  'Take your day-90 photos and measurements — compare with day 1.',
  'Write a letter to your day-1 self. You earned this.',
];

// ---------- Training ----------
const WORKOUTS = {
  fullA: {
    title: 'Full Body A',
    exercises: [
      ['Goblet squat or back squat', '3 × 8–10'],
      ['Push-ups or bench press', '3 × 8–12'],
      ['One-arm dumbbell row', '3 × 10 each side'],
      ['Romanian deadlift', '3 × 10'],
      ['Plank', '3 × 30–45 s'],
    ],
  },
  fullB: {
    title: 'Full Body B',
    exercises: [
      ['Reverse lunges', '3 × 10 each leg'],
      ['Overhead press (dumbbell)', '3 × 8–10'],
      ['Lat pulldown or band pull-down / inverted row', '3 × 10–12'],
      ['Hip thrust or glute bridge', '3 × 12'],
      ['Dead bug', '3 × 10 each side'],
    ],
  },
  upperA: {
    title: 'Upper A — Strength',
    exercises: [
      ['Bench press or weighted push-ups', '4 × 6–8'],
      ['Barbell or chest-supported row', '4 × 6–8'],
      ['Overhead press', '3 × 8'],
      ['Pull-ups / assisted pull-ups', '3 × max (leave 1–2 in reserve)'],
      ['Lateral raises', '3 × 12–15'],
      ['Curls + triceps pushdowns', '2 × 12 each'],
    ],
  },
  lowerA: {
    title: 'Lower A — Strength',
    exercises: [
      ['Back squat', '4 × 6–8'],
      ['Romanian deadlift', '3 × 8'],
      ['Walking lunges', '3 × 10 each leg'],
      ['Leg curl or Nordic negatives', '3 × 10'],
      ['Standing calf raise', '3 × 12–15'],
      ['Hanging knee raise', '3 × 10–12'],
    ],
  },
  upperB: {
    title: 'Upper B — Hypertrophy',
    exercises: [
      ['Incline dumbbell press', '3 × 10–12'],
      ['Lat pulldown', '3 × 10–12'],
      ['Seated cable row', '3 × 12'],
      ['Dips or close-grip push-ups', '3 × 10–12'],
      ['Lateral raises', '4 × 15'],
      ['Face pulls (posture)', '3 × 15'],
      ['Hammer curls + overhead triceps extension', '3 × 12 each'],
    ],
  },
  lowerB: {
    title: 'Lower B — Hypertrophy',
    exercises: [
      ['Leg press or Bulgarian split squat', '3 × 10–12'],
      ['Hip thrust', '3 × 10–12'],
      ['Leg extension or step-ups', '3 × 12–15'],
      ['Leg curl', '3 × 12–15'],
      ['Seated calf raise', '3 × 15'],
      ['Cable crunch or ab wheel', '3 × 10–12'],
    ],
  },
  zone2: {
    title: 'Zone 2 cardio',
    exercises: [
      ['Brisk walk, cycle, jog or swim — you can talk but not sing', '30–45 min'],
      ['Mobility: hips, thoracic spine, shoulders', '10 min'],
    ],
  },
  intervals: {
    title: 'Conditioning + Zone 2',
    exercises: [
      ['Warm-up easy cardio', '10 min'],
      ['Intervals: 4 min hard / 3 min easy', '4 rounds'],
      ['Easy cool-down', '5–10 min'],
    ],
  },
  walk: {
    title: 'Active recovery',
    exercises: [
      ['Walk outside', '20–30 min'],
      ['Stretch or yoga', '10 min'],
    ],
  },
  rest: {
    title: 'Rest day',
    exercises: [
      ['Full rest — keep steps, protein and sleep on point', '—'],
      ['Optional: 10-min NSDR / yoga nidra', '10 min'],
    ],
  },
};

export function workoutForDay(day) {
  const dow = (day - 1) % 7; // 0..6 relative to your start day
  const deload = day >= 57 && day <= 63;
  let key;
  if (day <= 30) {
    key = ['fullA', 'walk', 'fullB', 'walk', 'fullA', 'zone2', 'rest'][dow];
    // alternate A/B each week so both get equal practice
    if (Math.floor((day - 1) / 7) % 2 === 1) key = { fullA: 'fullB', fullB: 'fullA' }[key] || key;
  } else {
    key = ['upperA', 'lowerA', 'zone2', 'upperB', 'lowerB', 'intervals', 'rest'][dow];
  }
  const w = WORKOUTS[key];
  const isLift = !['zone2', 'intervals', 'walk', 'rest'].includes(key);
  return {
    key,
    title: w.title + (deload && isLift ? ' (deload)' : ''),
    exercises: w.exercises,
    isLift,
    deload,
    note: deload && isLift
      ? 'Deload week: use ~60% of your normal sets and lighter weights. Recovery is where growth happens.'
      : isLift
        ? 'Take most sets to 1–3 reps short of failure. Add a rep or a little weight each week (progressive overload). Rest 2–3 min on big lifts, 60–90 s on small ones.'
        : null,
  };
}

// ---------- Science library ----------
export const SCIENCE = {
  circadian: {
    title: 'Morning light sets your body clock',
    pillar: 'Mind',
    evidence: 'Moderate',
    summary:
      'Bright light early in the day anchors the circadian rhythm, which improves alertness in the morning and makes it easier to fall asleep at night. Huberman recommends outdoor light within the first hour after waking; outdoor light is far brighter than indoor light even on cloudy days.',
    protocol: '5–10 min outside on clear mornings, 15–20 min on cloudy ones, ideally daily. Avoid bright light late at night.',
    sources: [
      { label: 'Huberman Lab — Toolkit for Sleep', url: 'https://www.hubermanlab.com/newsletter/toolkit-for-sleep' },
      { label: 'Huberman Lab — Sleep Toolkit episode', url: 'https://www.hubermanlab.com/episode/sleep-toolkit-tools-for-optimizing-sleep-and-sleep-wake-timing' },
    ],
  },
  sleep: {
    title: 'Sleep is the base of everything',
    pillar: 'Mind',
    evidence: 'Strong',
    summary:
      'Adults need 7 or more hours per night. Short sleep worsens mood, appetite control, training recovery, and testosterone. Caffeine taken even 6 hours before bed measurably disrupts sleep.',
    protocol: 'Fixed wake time, 7–9 h in bed, caffeine cut-off about 8 h before bed, cool dark room, screens dimmed in the last hour.',
    sources: [
      { label: 'Watson et al. 2015 — AASM/SRS sleep duration consensus (Sleep)', url: 'https://doi.org/10.5665/sleep.4716' },
      { label: 'Drake et al. 2013 — caffeine 0, 3 or 6 h before bed (J Clin Sleep Med)', url: 'https://doi.org/10.5664/jcsm.3170' },
      { label: 'Huberman Lab — Toolkit for Sleep', url: 'https://www.hubermanlab.com/newsletter/toolkit-for-sleep' },
    ],
  },
  resistance: {
    title: 'Resistance training builds muscle and confidence',
    pillar: 'Body',
    evidence: 'Strong',
    summary:
      'Muscle growth rises with weekly training volume: about 10 or more hard sets per muscle group per week beats fewer sets. Progressive overload (adding reps or load over time) drives the adaptation. Training also reliably improves mood and reduces symptoms of anxiety and depression.',
    protocol: '3 full-body sessions per week for 30 days, then 4 upper/lower sessions per week. Sets 1–3 reps from failure, add load gradually, deload every 6–8 weeks.',
    sources: [
      { label: 'Schoenfeld et al. 2017 — volume dose-response meta-analysis (J Sports Sci)', url: 'https://doi.org/10.1080/02640414.2016.1210197' },
      { label: 'Singh et al. 2023 — exercise for depression & anxiety umbrella review (BJSM)', url: 'https://doi.org/10.1136/bjsports-2022-106195' },
      { label: 'Huberman Lab — Foundational Fitness Protocol', url: 'https://www.hubermanlab.com/newsletter/foundational-fitness-protocol' },
      { label: 'Huberman Lab — Fitness Toolkit episode', url: 'https://www.hubermanlab.com/episode/fitness-toolkit-protocol-and-tools-to-optimize-physical-health' },
    ],
  },
  protein: {
    title: 'Protein: ≈1.6 g/kg per day',
    pillar: 'Body',
    evidence: 'Strong',
    summary:
      'A meta-analysis of 49 trials found protein boosts muscle gains from resistance training, with benefits plateauing at around 1.6 g per kg of body weight per day. Spreading it over several meals is practical and sensible.',
    protocol: 'Body weight (kg) × 1.6 = daily grams. Example: 70 kg → ~112 g. Eggs, paneer, curd, chicken, fish, dal + soy, whey.',
    sources: [
      { label: 'Morton et al. 2018 — protein meta-analysis (BJSM)', url: 'https://doi.org/10.1136/bjsports-2017-097608' },
    ],
  },
  creatine: {
    title: 'Creatine monohydrate (optional)',
    pillar: 'Body',
    evidence: 'Strong',
    summary:
      'The most researched sports supplement. 3–5 g per day improves strength and lean mass gains alongside training and is considered safe for healthy adults. Check with a doctor if you have kidney problems.',
    protocol: '3–5 g creatine monohydrate daily, any time of day. No loading needed.',
    sources: [
      { label: 'Kreider et al. 2017 — ISSN position stand on creatine (JISSN)', url: 'https://doi.org/10.1186/s12970-017-0173-z' },
    ],
  },
  steps: {
    title: 'Daily steps',
    pillar: 'Body',
    evidence: 'Strong',
    summary:
      'In pooled data from 15 cohorts, more daily steps were linked with lower mortality, with the benefit levelling off around 6,000–8,000 steps for adults over 60 and 8,000–10,000 for younger adults. Walking also helps fat loss without hurting recovery from lifting.',
    protocol: '8,000+ steps per day. Short walks after meals are the easiest way to get there.',
    sources: [
      { label: 'Paluch et al. 2022 — steps and mortality meta-analysis (Lancet Public Health)', url: 'https://doi.org/10.1016/S2468-2667(21)00302-9' },
    ],
  },
  sunscreen: {
    title: 'Daily sunscreen slows skin ageing',
    pillar: 'Look',
    evidence: 'Strong',
    summary:
      'In a randomised trial, people who used sunscreen daily showed no detectable increase in skin ageing over 4.5 years, while the discretionary-use group aged measurably. UV is the main driver of wrinkles, uneven tone and dark spots.',
    protocol: 'Broad-spectrum SPF 30+ every morning; reapply when outdoors for long periods.',
    sources: [
      { label: 'Hughes et al. 2013 — sunscreen RCT (Annals of Internal Medicine)', url: 'https://doi.org/10.7326/0003-4819-158-11-201306040-00002' },
    ],
  },
  retinoid: {
    title: 'Retinoids for clearer, smoother skin',
    pillar: 'Look',
    evidence: 'Strong',
    summary:
      'Topical retinoids are the best-studied ingredients for acne and for photo-ageing (fine lines, texture, pigmentation). Expect dryness at first — start slow. Avoid if pregnant or trying to conceive, and see a dermatologist for persistent acne.',
    protocol: 'From day 31: pea-sized amount at night 2–3× per week, increase as tolerated. Always pair with daily SPF.',
    sources: [
      { label: 'Mukherjee et al. 2006 — retinoids in skin ageing review (Clin Interv Aging)', url: 'https://doi.org/10.2147/ciia.2006.1.4.327' },
    ],
  },
  posture: {
    title: 'Posture & presentation',
    pillar: 'Look',
    evidence: 'Mixed',
    summary:
      'Honest note: the famous "power pose" hormone findings did not replicate. Later analysis still supports a smaller effect — upright, open posture can make you feel more confident. Grooming, fitted clothes and a stronger physique are easy, visible upgrades to how others perceive you.',
    protocol: 'Daily grooming checklist; stand and sit tall; face pulls and rows in training to pull the shoulders back.',
    sources: [
      { label: 'Ranehill et al. 2015 — power pose replication (Psychological Science)', url: 'https://doi.org/10.1177/0956797614553946' },
      { label: 'Cuddy et al. 2018 — p-curve of postural feedback (Psychological Science)', url: 'https://doi.org/10.1177/0956797617746749' },
      { label: 'Frederick & Haselton 2007 — muscularity and attractiveness (PSPB)', url: 'https://doi.org/10.1177/0146167207301027' },
    ],
  },
  breathing: {
    title: 'Cyclic sighing & NSDR for stress',
    pillar: 'Mind',
    evidence: 'Moderate',
    summary:
      'In a randomised study from Huberman and Spiegel at Stanford, 5 minutes per day of cyclic sighing (exhale-focused breathing) improved mood and lowered breathing rate more than mindfulness meditation over one month. Non-sleep deep rest (NSDR / yoga nidra) is a useful way to recover and calm down.',
    protocol: '5 minutes of cyclic sighing daily, or a 10–20 min NSDR recording in the afternoon.',
    sources: [
      { label: 'Balban et al. 2023 — brief breathwork RCT (Cell Reports Medicine)', url: 'https://doi.org/10.1016/j.xcrm.2022.100895' },
    ],
  },
  cold: {
    title: 'Deliberate cold exposure (optional)',
    pillar: 'Mind',
    evidence: 'Emerging',
    summary:
      'Cold exposure raises alertness and dopamine and can be good resilience practice. Huberman suggests about 11 minutes per week in total, based on Søberg et al. Do not take an ice bath right after hypertrophy training — it can blunt muscle gains. Avoid it if you have heart conditions.',
    protocol: 'From day 31, optional: cold showers or plunges of 1–3 min, totalling ~11 min per week, away from lifting sessions.',
    sources: [
      { label: 'Søberg et al. 2021 — winter swimming & cold exposure (Cell Reports Medicine)', url: 'https://doi.org/10.1016/j.xcrm.2021.100408' },
    ],
  },
  exposure: {
    title: 'Confidence is trained by exposure',
    pillar: 'Confidence',
    evidence: 'Strong',
    summary:
      'Cognitive-behavioural therapy for social anxiety is built on graded exposure: doing the feared thing in small steps until it stops being scary. Each success builds self-efficacy, the belief that you can handle it. The daily confidence reps follow that idea, from easy to hard over 90 days.',
    protocol: 'One social rep every day, escalating by phase. Write down what you feared and what actually happened.',
    sources: [
      { label: 'Hofmann et al. 2012 — CBT efficacy meta-analysis review (Cognitive Therapy & Research)', url: 'https://doi.org/10.1007/s10608-012-9476-1' },
    ],
  },
  alcohol: {
    title: 'Alcohol and sleep',
    pillar: 'Mind',
    evidence: 'Strong',
    summary:
      'Alcohol may help you fall asleep faster, but it disrupts sleep in the second half of the night and suppresses REM sleep, worsening recovery, mood and appetite the next day.',
    protocol: 'Zero alcohol for the 90 days, or at minimum none within 4 hours of bed.',
    sources: [
      { label: 'Ebrahim et al. 2013 — alcohol and sleep review (Alcohol Clin Exp Res)', url: 'https://doi.org/10.1111/acer.12006' },
    ],
  },
};

export const PILLARS = ['Body', 'Look', 'Mind', 'Confidence'];

// ---------- helpers ----------
export function currentDay(startDate) {
  if (!startDate) return 1;
  const [y, m, d] = startDate.split('-').map(Number);
  const start = new Date(y, m - 1, d);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today - start) / 86400000) + 1;
  return Math.max(1, Math.min(90, diff));
}

export function dateForDay(startDate, day) {
  const [y, m, d] = startDate.split('-').map(Number);
  const dt = new Date(y, m - 1, d + day - 1);
  return dt.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
}

export function proteinTarget(weightKg) {
  return weightKg ? Math.round(weightKg * 1.6) : null;
}
