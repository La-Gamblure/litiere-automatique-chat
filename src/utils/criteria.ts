export const CRITERIA_LABELS: Record<string, string> = {
  facilite_utilisation: "Facilité d'utilisation",
  bruit: "Niveau sonore",
  securite: "Sécurité",
  application: "Application mobile",
  capacite: "Capacité",
  rapport_qualite_prix: "Rapport qualité-prix",
};

export const CRITERIA_ORDER = [
  "facilite_utilisation",
  "bruit",
  "securite",
  "application",
  "capacite",
  "rapport_qualite_prix",
] as const;

export type CriterionKey = (typeof CRITERIA_ORDER)[number];
