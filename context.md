# Litière Automatique Chat - Context

## Objectif
Site de comparatif indépendant de litières automatiques pour chat. Monetisation par affiliation (Amazon Associates, liens directs marques). Cible les keywords transactionnels FR autour de "litière automatique chat" (~195K recherches/mois).

## Stack technique
- **SSG** : Astro 5 (output: static)
- **Style** : Tailwind CSS v4 (Vite plugin)
- **Data** : JSON (categories/produits/reviews) + Astro Content Collections avec glob loader (guides, reviews)
- **Hosting** : Cloudflare Pages (litiere-auto.pages.dev) + Netlify legacy (litiere-auto.netlify.app)
- **Functions** : CF Pages Functions (functions/api/) pour capture email quiz
- **Images** : Placeholder SVG pour le MVP, Cloudinary prevu

## Architecture
- Fork de Au-bon-cadeau (meme stack), adapte pour le vertical litiere auto
- 100% statique (SSG) sauf CF Function pour email quiz
- Routes :
  - `/litieres-automatiques/[slug]/` — comparatifs par categorie
  - `/avis/[slug]/` — fiches produit detaillees (review)
  - `/guides/[slug]/` — articles guides
  - `/quiz/` — quiz recommandation (vanilla JS, client-side scoring)
  - `/go/[slug]/[merchant]/` — redirects affiliation
- Data centralisee : `src/data/products.json` (source unique 7 produits)
- Reviews : JSON structuré (data/) + markdown editorial (content/)
- Quiz : vanilla JS (quiz-engine.js + quiz-renderer.js), data injectee au build via define:vars
- QuizModal (`<dialog>`) inclus dans BaseLayout, activable via `data-quiz-trigger`

## Decisions prises
- Palette : Emerald/Teal (proprete) + Orange/Coral (CTA chat) + Slate (neutre)
- 3 categories : meilleure-litiere-automatique, pas-cher, fermee
- 7 produits : Litter-Robot 4, PETKIT Pura Max 2, Neakasa M1, CATLINK Baymax, Devoko 90L, PetSafe ScoopFree, PetSnowy SNOW+
- Brand name : LitièreAuto
- Fiches produit hybrid : JSON (structured data) + Markdown (editorial) pour separer contenu structuré du contenu libre
- Quiz : vanilla JS, pas de framework, soft gate email (contenu visible sans email, raisonnement floute)
- Email quiz : CF Pages Function + KV (QUIZ_EMAILS namespace, à creer dans dashboard CF)
- CTA strategy : VerdictBox (above fold), InlineCTA (every 2-3 sections), PriceComparisonTable (per merchant), StickyMobileCTA (fixed bottom mobile, hidden when price table visible)

## Conventions
- URLs : kebab-case partout
- JSON data dans src/data/
- Composants review dans src/components/review/
- Scripts client dans src/scripts/
- Utilitaires dans src/utils/

## Etat actuel
- Phase 1 MVP : DONE
- Phase 2A content collections : DONE
- Phase 2B fiches produit : DONE — 7 fiches /avis/[slug]/ avec tous les composants
- Phase 2B quiz : DONE — /quiz/ + modal + CF Function
- Phase 2B YouTube outlines : EN COURS
- 29 pages generees, build en 2s
- Site live : https://litiere-auto.pages.dev
- GitHub : https://github.com/La-Gamblure/litiere-automatique-chat

## Points d'attention
- wrangler.toml contient un placeholder pour le KV namespace ID (REPLACE_WITH_KV_NAMESPACE_ID) — a remplacer apres creation dans le dashboard CF
- Les liens affiliation sont des placeholders (B0EXAMPLE*) — a remplacer par les vrais ASINs
- Images produit : null pour le moment, a ajouter via Cloudinary
- PetSafe ScoopFree : seul modele ouvert (pas enclosed), seul modele sans app/wifi

## Prochaines etapes
- Creer le KV namespace QUIZ_EMAILS dans le dashboard CF et mettre a jour wrangler.toml
- Deployer sur CF Pages avec les Functions
- 5-10 articles guides supplementaires
- Maillage interne (guides <-> fiches produit <-> comparatifs)
- Images Cloudinary
- Custom domain
- Backlinks, GEO
