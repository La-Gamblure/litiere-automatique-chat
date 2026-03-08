/**
 * Quiz Engine — pure logic, no DOM.
 * Questions, state machine, scoring.
 */

export const QUESTIONS = [
  {
    id: "budget",
    question: "Quel est votre budget ?",
    options: [
      { label: "Moins de 300 €", value: "low" },
      { label: "300 – 500 €", value: "mid" },
      { label: "Plus de 500 €", value: "high" },
      { label: "Pas de budget fixe", value: "any" },
    ],
  },
  {
    id: "cats",
    question: "Combien de chats avez-vous ?",
    options: [
      { label: "1 chat", value: "1" },
      { label: "2 chats", value: "2" },
      { label: "3 ou plus", value: "3+" },
    ],
  },
  {
    id: "cat_size",
    question: "Quelle est la taille de votre chat (le plus gros) ?",
    options: [
      { label: "Petit (moins de 4 kg)", value: "small" },
      { label: "Moyen (4 – 6 kg)", value: "medium" },
      { label: "Grand (6 – 8 kg)", value: "large" },
      { label: "Très grand (plus de 8 kg)", value: "xlarge" },
    ],
  },
  {
    id: "noise",
    question: "Le bruit est-il un critère important ?",
    options: [
      { label: "Très important", value: "critical" },
      { label: "Un peu", value: "moderate" },
      { label: "Pas important", value: "none" },
    ],
  },
  {
    id: "smart",
    question: "Voulez-vous une litière connectée (app mobile) ?",
    options: [
      { label: "Indispensable", value: "must" },
      { label: "Ce serait un plus", value: "nice" },
      { label: "Non", value: "no" },
    ],
  },
  {
    id: "space",
    question: "Quel espace avez-vous pour la litière ?",
    options: [
      { label: "Petit (coin, sous un meuble)", value: "small" },
      { label: "Moyen (couloir, buanderie)", value: "medium" },
      { label: "Grand (pièce dédiée)", value: "large" },
    ],
  },
  {
    id: "priority",
    question: "Quelle est votre priorité principale ?",
    options: [
      { label: "Le plus simple à utiliser", value: "easiest" },
      { label: "Le moins cher", value: "cheapest" },
      { label: "Le plus silencieux", value: "quietest" },
      { label: "Le meilleur pour plusieurs chats", value: "multi_cat" },
    ],
  },
];

/**
 * Score a product against user answers.
 * Higher score = better match.
 */
export function scoreProduct(product, answers) {
  let score = 0;
  const q = product.quiz_attributes;
  const s = product.specs;

  // Budget
  const budgetAnswer = answers.budget;
  if (budgetAnswer === "any") {
    score += 5;
  } else if (budgetAnswer === "low" && (q.budget_tier === "entry" || q.budget_tier === "budget")) {
    score += 10;
  } else if (budgetAnswer === "mid" && (q.budget_tier === "budget" || q.budget_tier === "mid")) {
    score += 10;
  } else if (budgetAnswer === "high" && (q.budget_tier === "mid" || q.budget_tier === "premium")) {
    score += 10;
  } else {
    score -= 5;
  }

  // Number of cats
  const cats = answers.cats;
  if (cats === "1") {
    score += 3;
  } else if (cats === "2" && s.max_cats >= 2) {
    score += 5;
  } else if (cats === "3+" && s.max_cats >= 3) {
    score += 8;
  } else if (cats === "3+" && s.max_cats < 3) {
    score -= 5;
  }

  // Cat size
  const size = answers.cat_size;
  if (size === "xlarge" && s.max_cat_weight_kg >= 10) {
    score += 10;
  } else if (size === "xlarge" && s.max_cat_weight_kg < 8) {
    score -= 10;
  } else if (size === "large" && s.max_cat_weight_kg >= 8) {
    score += 5;
  } else if (size === "large" && s.max_cat_weight_kg < 7) {
    score -= 5;
  } else if (size === "medium" || size === "small") {
    score += 3;
  }

  // Noise sensitivity
  const noise = answers.noise;
  if (noise === "critical") {
    if (s.noise_db <= 45) score += 10;
    else if (s.noise_db <= 50) score += 5;
    else score -= 5;
  } else if (noise === "moderate") {
    if (s.noise_db <= 50) score += 5;
    else score += 0;
  }

  // Smart / connectivity
  const smart = answers.smart;
  if (smart === "must" && s.has_app) {
    score += 8;
    if (s.has_health_tracking) score += 3;
  } else if (smart === "must" && !s.has_app) {
    score -= 10;
  } else if (smart === "nice" && s.has_app) {
    score += 3;
  } else if (smart === "no" && !s.has_app) {
    score += 5;
  }

  // Space
  const space = answers.space;
  if (space === "small" && q.footprint === "small") {
    score += 8;
  } else if (space === "small" && q.footprint === "large") {
    score -= 5;
  } else if (space === "medium") {
    score += 3;
  } else if (space === "large") {
    score += 5;
  }

  // Priority tags
  const priority = answers.priority;
  if (q.priority_tags.includes(priority)) {
    score += 10;
  }

  // Bonus for higher rating
  score += product.rating * 2;

  return score;
}

/**
 * Get top N products sorted by score, tie-break by rating.
 */
export function getRecommendations(products, answers, topN = 2) {
  const scored = products.map((p) => ({
    product: p,
    score: scoreProduct(p, answers),
  }));

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.product.rating - a.product.rating;
  });

  return scored.slice(0, topN);
}

/**
 * Build a personalized reasoning text based on user answers and product.
 */
export function buildReasoning(product, answers) {
  const r = product.quiz_attributes.reasoning_fr;
  const parts = [];

  if (answers.budget && r.budget) parts.push(r.budget);
  if (answers.noise === "critical" && r.noise) parts.push(r.noise);
  if (answers.smart === "must" && r.smart) parts.push(r.smart);
  if (answers.space === "small" && r.space) parts.push(r.space);
  if ((answers.cats === "2" || answers.cats === "3+") && r.multi_cat) parts.push(r.multi_cat);

  return parts.length > 0
    ? parts.join(". ") + "."
    : `Le ${product.title} correspond le mieux à votre profil.`;
}
