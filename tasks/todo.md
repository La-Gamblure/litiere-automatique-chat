# Litière Automatique Chat - TODO

## Phase 1 (MVP) — DONE

- [x] Scaffolding projet (fork Au-bon-cadeau, nettoyage)
- [x] package.json, astro.config.mjs, tsconfig.json, netlify.toml
- [x] BaseLayout.astro (nav, footer, OG tags, mobile menu)
- [x] Composants : ProductCard, Breadcrumbs, FAQ, AffiliateDisclosure
- [x] Homepage (hero, grille categories, trust signals, FAQ, JSON-LD)
- [x] Hub /litieres-automatiques/ (grille groupee, methode)
- [x] Page comparatif [slug].astro (produits, filtres budget, FAQ, related)
- [x] 3 categories JSON (meilleure 7 produits, pas-cher 3, fermee 4)
- [x] Redirects /go/ (11 liens affiliation)
- [x] Produits mis a jour avec recherche Exa
- [x] Legal (mentions legales, confidentialite, a-propos)
- [x] Deploy Netlify + Cloudflare Pages

## Phase 2A (Content Collections) — DONE

- [x] Content Collections setup (content.config.ts, schema Zod, glob loader)
- [x] ArticleLayout.astro (JSON-LD Article, breadcrumbs, TOC, FAQ, related)
- [x] Route dynamique guides/[slug].astro
- [x] Premier article : comment-choisir-litiere-automatique.md

## Phase 2B (Fiches Produit + Quiz + YouTube) — EN COURS

### Module 1 : Data enrichment — DONE
- [x] src/data/products.json (7 produits, specs, quiz_attributes)
- [x] src/utils/products.ts (helpers, types)
- [x] src/utils/criteria.ts (labels FR, ordre)

### Module 2 : Fiches produit /avis/[slug]/ — DONE
- [x] Review JSON pour les 7 produits (src/data/reviews/)
- [x] Review markdown pour les 7 produits (src/content/reviews/)
- [x] Collection reviews dans content.config.ts
- [x] 8 composants review/ (VerdictBox, CriteriaRatings, ProsCons, InlineCTA, PriceComparisonTable, RecommendationBox, RelatedProducts, StickyMobileCTA)
- [x] ProductJsonLd (schema Product + Review + AggregateOffer)
- [x] Page /avis/[slug].astro (route dynamique)
- [x] ProductCard : lien conditionnel "Lire notre avis"

### Module 3 : Quiz — DONE
- [x] quiz-engine.js (questions, scoring, recommendations)
- [x] quiz-renderer.js (DOM rendering, progress, result, email form)
- [x] Page /quiz/ (standalone)
- [x] QuizModal (<dialog>, data-quiz-trigger)
- [x] QuizModal integre dans BaseLayout
- [x] CTA quiz sur homepage hero + comparatifs
- [x] CF Pages Function /api/quiz-email (KV storage)
- [x] wrangler.toml avec binding QUIZ_EMAILS

### Module 4 : YouTube outlines — DONE
- [x] 4 outlines generaux (guide achat, top 7, pas cher, fermee)
- [x] 7 outlines produit (1 par fiche)

## TODO restant

- [ ] Creer KV namespace QUIZ_EMAILS dans CF dashboard
- [ ] Remplacer liens affiliation placeholder par vrais liens
- [ ] Deploy CF Pages avec Functions
- [x] 8 articles guides (entretien, habituer, grand chat, silencieuse, connectee, multi-chats, budget, problemes)
- [x] Maillage interne (guides ↔ reviews ↔ comparatifs ↔ quiz)
- [x] CTAs affiliés dans tous les guides (88 /go/ links)
- [x] Fix wrangler.toml KV placeholder → deploy CF Pages OK

## Phase 2D (UX LeWizards-inspired) — TODO

Référence : ~/leswizards-analysis.json (analyse complète du site leswizards.com)
Objectif : appliquer les patterns UX de LeWizards à notre site (sauf codes promo)

- [ ] **Cards 100% clickables** — ProductCard.astro : wrapper toute la card dans un lien, pas seulement le CTA. Garder le double CTA (Voir prix + Lire avis) mais rendre la surface entière cliquable vers /go/
- [ ] **Classement visuel numéroté** — Pages comparatif [slug].astro : ajouter 🥇🥈🥉 + rang numérique sur les ProductCards. Utiliser le champ `position` déjà présent dans les données catégorie
- [ ] **Badges "Idéal pour"** — ProductCard.astro : ajouter un badge contextuel sous le titre (ex: "Idéal multi-chats", "Meilleur rapport qualité-prix"). Data source: ajouter champ `ideal_pour` dans categories JSON
- [ ] **Section détaillée par produit sur comparatifs** — [slug].astro : après la grille, ajouter une section avec mini pros/cons + CTA par produit (similaire au format LeWizards). Data source: reviews JSON (pros/cons déjà présents)
- [ ] **Double CTA dans les guides** — dans les tableaux markdown des guides, ajouter une colonne "Avis" avec lien vers /avis/[slug]/ en plus du "Voir le prix" /go/
- [ ] Images Cloudinary
- [ ] Custom domain
- [ ] Backlinks, GEO
- [ ] Google Search Console - soumettre sitemap
