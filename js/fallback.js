// ============================================
// PSYCHONUTRI — FALLBACK.JS
// Smart pre-written AI responses
// Works 100% without API key
// ============================================

const FALLBACK = {

  // ── ORACLE CHAT RESPONSES ─────────────────
  oracle: {
    keywords: {
      stress: "Stress triggers cortisol which directly suppresses your digestive system and spikes cravings for salt and sugar. Magnesium-rich foods — dark chocolate, almonds, spinach — physiologically down-regulate your stress axis. Your nervous system is asking for minerals, not willpower.",
      sleep: "Sleep deprivation drops leptin (fullness hormone) and raises ghrelin (hunger hormone) by up to 24%. After a poor night, your brain's reward centre becomes 45% more reactive to junk food. Prioritise tryptophan-rich foods — turkey, banana, oats — before bed to support melatonin synthesis.",
      anxiety: "Anxiety is your nervous system stuck in sympathetic mode. GABA — your brain's natural calm signal — is supported by fermented foods, green tea (L-theanine), and magnesium. The gut produces 95% of your serotonin, so gut health directly shapes anxiety levels.",
      sugar: "Sugar cravings signal a dopamine deficit or blood sugar crash. The brain's reward pathway evolved to seek sweetness — it was rare and calorie-dense in nature. Try chromium-rich foods (broccoli, eggs) which stabilise insulin, and swap refined sugar for dates or mango for natural sweetness with fibre.",
      focus: "Brain fog is often a choline, omega-3, or B12 deficiency. Your prefrontal cortex — responsible for focus — is 60% fat and runs on acetylcholine. Eggs, fatty fish, and walnuts are neurologically the most evidence-based foods for sustained cognitive performance.",
      protein: "Protein provides tyrosine — the precursor to dopamine and norepinephrine. Low protein = low motivation and drive. Aim for complete proteins like eggs, lentils with rice, or Greek yoghurt. Students often under-eat protein during exam season, directly impacting cognitive stamina.",
      gut: "Your gut and brain communicate constantly via the vagus nerve — the gut-brain axis. 70% of your immune system lives in your gut, and gut bacteria produce neurotransmitters including serotonin, GABA, and dopamine. Fermented foods, diverse plant fibre, and prebiotic foods rebuild this system.",
      mood: "Mood is fundamentally biochemical. Serotonin requires tryptophan + B6 + sunlight. Dopamine requires tyrosine + iron. GABA requires fermented foods + magnesium. If your diet is ultra-processed, your neurotransmitter production is compromised at the molecular level.",
      energy: "Chronic low energy often signals iron deficiency, B12 deficiency, or adrenal fatigue from sustained cortisol output. Before reaching for caffeine, try iron-rich foods with vitamin C (lentils + lemon), and ashwagandha — clinically shown to reduce cortisol by up to 30%.",
      chocolate: "Chocolate cravings reveal a magnesium need — your body is genuinely asking for a mineral. Dark chocolate (70%+) delivers magnesium, theobromine (a gentle stimulant), and phenylethylamine which triggers a mild endorphin release. The craving is nutritionally intelligent.",
      water: "Dehydration of just 1-2% impairs cognitive function measurably — attention, memory, and mood all decline. Your brain is 75% water. Often what feels like hunger or brain fog is simply mild dehydration. The recommendation is 2-3 litres daily, more during stress or heat.",
      caffeine: "Caffeine works by blocking adenosine receptors — adenosine is your brain's 'tiredness' signal. This creates borrowed energy. When caffeine wears off, accumulated adenosine floods in causing a crash. L-theanine in green tea provides calm focus without the cortisol spike that coffee triggers.",
      vitamin: "Vitamin D deficiency affects 40-80% of university students — especially in winter or indoor-heavy lifestyles. Low vitamin D is directly linked to depression, fatigue, and weakened immunity. Beyond supplements, fatty fish, egg yolks, and fortified foods are your dietary sources.",
      eating: "Emotional eating is not a weakness — it is a neurological pattern. Food activates the same dopamine pathways as social connection. When connection, safety, or calm are missing, the brain reroutes to food. The insight is not to stop eating emotionally, but to understand what emotion is driving it.",
    },
    defaults: [
      "Your body and mind are deeply connected through your gut-brain axis — every meal sends neurochemical signals that shape your mood, focus, and emotional resilience. What would you like to explore?",
      "Nutritional psychiatry shows that what you eat directly influences neurotransmitter production. Serotonin, dopamine, and GABA are all built from dietary precursors. Food is literally brain medicine.",
      "The relationship between food and psychology runs deeper than most people realise. Cravings are not random — they are your body's communication system. Learning to decode them is a form of self-knowledge.",
      "Your microbiome — the 38 trillion bacteria in your gut — produces neurotransmitters, regulates immunity, and influences mood. Diversity of plant foods is the single best predictor of microbiome health.",
      "Stress eating is physiologically rational: cortisol increases appetite and specifically drives cravings for calorie-dense foods. Your body is not broken — it is responding exactly as evolution designed it to.",
    ],
    getResponse(msg) {
      const lower = msg.toLowerCase();
      for (const [keyword, response] of Object.entries(this.keywords)) {
        if (lower.includes(keyword)) return response;
      }
      // check for question words
      if (lower.includes('why') || lower.includes('how') || lower.includes('what')) {
        return this.defaults[Math.floor(Math.random() * this.defaults.length)];
      }
      return this.defaults[Math.floor(Math.random() * this.defaults.length)];
    }
  },

  // ── SHADOW REALM READINGS ─────────────────
  shadowRealm: {
    void: [
      "The foods you reach for at night are not feeding your stomach — they are searching for something your waking life has not yet given you. The void you feel is real, and it is older than your hunger.",
      "Your pattern reveals a psyche that has learned to substitute sweetness in food for sweetness in connection. This is not a flaw — it is an adaptation. But the void knows the difference.",
      "In reaching for food when something feels unfinished, you are attempting to close an emotional loop through a physical act. The shadow here whispers: what is the real thing left undone?"
    ],
    fog: [
      "Your relationship with rest reveals a nervous system that has forgotten it is safe to stop. The caffeine is not the problem — it is the symptom of a mind that fears what stillness might bring.",
      "The fog is not tiredness. It is your psyche asking for permission to slow down in a world that rewards relentless movement. Your brain chemistry reflects the cost of that relentlessness.",
      "You are running on fumes because you have not allowed yourself to refuel — not just with food, but with stillness, space, and the radical act of doing nothing. The fog lifts when you stop fighting it."
    ],
    cave: [
      "The rules you have built around food are not about nutrition — they are architecture. You built them in a season when chaos felt dangerous, and they have stayed long past that season.",
      "Your shadow here is a sovereign who learned that control equals safety. But the body cannot thrive under perpetual legislation. Some of your deepest hunger is for the freedom to eat without a verdict.",
      "Perfectionism in eating is perfectionism in life wearing a different mask. The cave you have built is orderly and safe — and a little airless. What would happen if you left the door open?"
    ],
    sea: [
      "You do not eat the food. You eat the memory it carries — the warmth, the belonging, the moment someone made you feel held. Your hunger is a form of time travel.",
      "The comfort foods you return to are not crutches — they are anchors. They connect you to versions of yourself who were loved and fed and safe. Your shadow is not homesick for a place. It is homesick for a feeling.",
      "What you call comfort eating, a psychologist would call state-dependent memory retrieval. You are not weak — you are human. The question is not how to stop, but what feeling you are truly searching for."
    ],
    kitchen: [
      "Every unsaid thing lives somewhere in the body. The salt and crunch you reach for after conflict is your nervous system trying to discharge energy it was not allowed to express through words.",
      "You swallow your anger and then wonder why you are hungry. The two are the same act. What you could not say found another exit — through your appetite, not your voice.",
      "The rage kitchen is not about food. It is about all the moments you were told — directly or indirectly — that your feelings were too much. Your body kept the score. The cravings are its handwriting."
    ],
    getResponse(realmId) {
      const responses = this[realmId] || this.void;
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },

  // ── SHADOW FINAL PROFILE ──────────────────
  shadowProfile: {
    void: "You carry the archetype of the Void Feeder — a soul who has learned to translate emotional hunger into physical appetite. Your shadow realm reveals a deep longing for connection and meaning that no meal can satisfy, but that awareness alone begins to heal. Your nutritional path forward lies not in restriction, but in feeding yourself with the same tenderness you would offer someone you love.",
    fog: "You carry the archetype of the Fog Wanderer — a mind of extraordinary capacity that has forgotten how to rest without guilt. Your shadow reveals a nervous system stretched thin by the relentless demand to perform. The nutrition your brain most needs is not a supplement — it is permission. Permission to be tired, to stop, and to trust that rest is not failure.",
    cave: "You carry the archetype of the Sovereign — a psyche that built order as a fortress against an unpredictable world. Your food rules are not about health; they are about safety. The profound work ahead is not dietary — it is learning that you are safe even when the plan breaks, even when dinner is unplanned, even when you eat the thing you swore you would not.",
    sea: "You carry the archetype of the Memory Keeper — a soul for whom every meal is a doorway to another time. Your comfort foods are not weaknesses; they are your most honest emotional vocabulary. The nutritional wisdom here is to honour what food means to you while slowly expanding what feeds you — so that connection, not just memory, can nourish you.",
    kitchen: "You carry the archetype of the Suppressed Flame — a being of depth and feeling who was taught that expression was unsafe. Your body has become the container for everything your voice could not hold. The nutritional truth is that magnesium and adaptogens can help your physiology, but the real medicine is learning that your anger is not too much — it is information.",
    getResponse(dominantRealm) {
      return this[dominantRealm] || this.void;
    }
  },

  // ── MOOD LAB AI ANALYSIS ─────────────────
  moodLab(mood, stress, sleep, food, chem) {
    const responses = {
      Anxious: `Your brain chemistry reflects the physiological signature of anxiety — elevated cortisol is suppressing your GABA system, which normally provides calm. With ${sleep} hours of sleep and stress at ${stress}/10, your nervous system is operating in threat-detection mode. The meal prescription focuses on GABA-supportive foods and magnesium to physically down-regulate your stress axis.`,
      Stressed: `Stress at ${stress}/10 is measurably impacting your neurotransmitter balance — cortisol is crowding out serotonin precursor absorption. Your food intake today is feeding the stress cycle rather than interrupting it. The prescribed foods target your HPA axis directly, providing the minerals your adrenals are burning through under sustained pressure.`,
      Sad: `Low serotonin and dopamine are the neurochemical language of sadness. Your ${sleep}h of sleep and current diet are not providing the tryptophan and tyrosine your brain needs to synthesise mood-regulating neurotransmitters. The meal prescription works upstream — providing the raw materials your brain is asking for but not receiving.`,
      Tired: `Fatigue at this level often signals adenosine accumulation, iron depletion, or sustained cortisol output that has exhausted your adrenal reserves. ${sleep} hours of sleep was not restorative enough, likely because your nervous system stayed activated. The prescribed foods target your mitochondria and iron levels — the energy systems at the root of your tiredness.`,
      Happy: `Your brain chemistry today shows what nutritional psychiatry calls an "optimal neurological state" — a balance worth studying. Notice what you ate, how you slept, and what your stress level was. These conditions are reproducible. Today is data about what your specific brain and body need to thrive.`,
      Focused: `Focus is a function of acetylcholine, dopamine, and stable blood glucose — all three of which your current profile partially supports. With targeted nutritional adjustments, particularly around choline and omega-3 intake, this focused state can become your baseline rather than a peak experience.`,
      Angry: `Anger has a clear physiological signature — elevated cortisol, adrenaline, and reduced prefrontal activity. Your body is in fight mode, and ${food} is not providing the magnesium needed to bring your nervous system back online. The prescribed foods work at the cellular level to down-regulate your stress response.`,
      Numb: `Emotional numbness is often the nervous system's shutdown response to chronic overstimulation — a form of dissociation from feeling. Low dopamine and serotonin create exactly this flat affect. Your nutrition prescription targets the precursors to these neurotransmitters, but the deeper work is asking what your system needed to protect itself from.`,
    };
    return responses[mood] || `Your brain chemistry today reflects the complex interplay between ${mood.toLowerCase()} mood, ${stress}/10 stress, and ${sleep} hours of sleep. The nutritional prescription targets your specific neurotransmitter gaps with evidence-based food medicine.`;
  },

  // ── CRAVING DECODER AI ────────────────────
  craving(cravingType, context) {
    const responses = {
      chocolate: `Your chocolate craving is nutritionally intelligent — your body is signalling a magnesium deficit, one of the most common deficiencies in students under academic stress. ${context ? `The context you shared (${context}) reinforces the emotional dimension: ` : ''}the shadow underneath this craving is often a longing for comfort and reward in a season that feels relentlessly demanding.`,
      salty: `Salt cravings under stress are physiologically hardwired — cortisol causes your kidneys to excrete more sodium, so your body literally replaces what stress drains. ${context ? `Given that ${context}, ` : ''}your adrenal system is working overtime. The crunch is not just about taste — it is your nervous system seeking physical tension release through the act of chewing.`,
      carbs: `Your carb craving is your brain's serotonin system speaking. Carbohydrates trigger insulin which clears competing amino acids from the bloodstream, letting tryptophan flood the brain and convert to serotonin. ${context ? `With ${context}, ` : ''}this is a biochemically rational mood regulation attempt. Your brain is not broken — it is self-medicating intelligently.`,
      sugar: `Sugar cravings reveal a dopamine system seeking a fast reward — often triggered by blood sugar instability or emotional flatness. ${context ? `The context (${context}) suggests ` : ''}your brain is searching for a quick win in a moment that feels low or depleted. The swap is not about willpower — it is about giving your reward system a slower, steadier signal.`,
      caffeine: `Your caffeine craving signals adenosine debt — your brain's tiredness chemical has accumulated and is demanding acknowledgment. ${context ? `Given ${context}, ` : ''}you are likely running on a sleep or rest deficit that caffeine cannot solve, only delay. Your body is asking to stop; caffeine is the way you have learned to override that request.`,
      comfort: `Comfort food cravings are memory-encoded emotional responses — your amygdala has linked specific foods to feelings of safety and care. ${context ? `In the context of ${context}, ` : ''}your nervous system is seeking a return to a state of being held. This is not weakness. It is one of the most human things there is.`,
      meat: `Your protein craving often signals genuine physical depletion — from cognitive work, stress, or inadequate intake. ${context ? `With ${context} as context, ` : ''}your amino acid reserves may be running low, affecting both physical energy and the neurotransmitters built from protein. Iron and zinc deficiency often present exactly this way.`,
      dairy: `Dairy cravings often involve casein — a slow-digesting protein that produces mild opioid-like compounds (casomorphins) in the gut. ${context ? `Given ${context}, ` : ''}your brain may be seeking the calming effect of these compounds. There is also a calcium and tryptophan dimension — both found in dairy and both relevant to sleep and mood.`,
      nothing: `Loss of appetite is your nervous system in shutdown mode — when cortisol and adrenaline dominate, the digestive system is deprioritised as a survival response. ${context ? `The context you shared (${context}) points to ` : ''}a system that perceives threat, real or psychological. The body is not hungry because it believes this is not a safe moment to be vulnerable.`,
    };
    return responses[cravingType] || `Your craving carries a message worth decoding. The body speaks in appetite when words are not available — and this specific craving has both a nutritional and a psychological signature worth understanding.`;
  },

  // ── PLATE PERSONALITY PROFILES ────────────────
  platePersonality: {
    nurturer: "You are The Nurturer — someone who experiences food primarily as an act of love and care. You feed others as a form of emotional expression, and your own eating reflects deep relational values. Your psychological pattern shows secure attachment tendencies with a risk of self-neglect; you pour into others and forget to fill your own plate. Nutritionally, you need foods that are as comforting to make as they are to eat.",
    explorer: "You are The Explorer — drawn to novelty, variety, and the cultural stories behind food. Your eating reflects a curious, open psychology with low food-related anxiety. You experience meals as adventures rather than routines. The shadow of this archetype is inconsistency — your nutritional gaps often come from variety without depth. Building a few anchor meals would serve your underlying need for grounding.",
    controller: "You are The Controller — someone who uses food structure as a form of psychological order in a world that feels chaotic or unpredictable. Your eating rules are not really about nutrition — they are about safety. The profound nutritional irony is that chronic restriction creates the very physiological chaos you are trying to avoid: dysregulated hunger, cortisol spikes, and nutrient gaps.",
    healer: "You are The Healer — deeply attuned to the relationship between what you eat and how you feel. You approach food with intention and often have more nutritional knowledge than most. Your shadow is perfectionism and the anxiety that comes from treating food as medicine rather than pleasure. Your body needs nourishment AND joy — and the research shows that food eaten with pleasure is metabolised differently.",
    rebel: "You are The Rebel — someone whose eating is a form of autonomy and self-expression, often in response to external control or diet culture. Your food choices declare independence. The psychology here is healthy; the nutritional risk is that rebellion can sometimes mean under-nourishment as a form of protest. Discovering foods that feel genuinely yours — not chosen against something, but for yourself — is the path forward.",
  },

};

// ── SMART API CALLER ─────────────────────────
// Tries real API first, falls back automatically
async function smartAI(prompt, fallbackFn, ...fallbackArgs) {
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!res.ok) throw new Error('API error');
    const data = await res.json();
    const text = data.content?.find(c => c.type === 'text')?.text;
    if (!text) throw new Error('No content');
    return text;
  } catch (e) {
    // Silently fall back — user never sees an error
    return typeof fallbackFn === 'function'
      ? fallbackFn(...fallbackArgs)
      : fallbackFn;
  }
}
