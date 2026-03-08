# Litière Automatique Chat - Context

## Objectif
Site de comparatif indépendant de litières automatiques pour chat. Monetisation par affiliation (Amazon Associates, liens directs marques). Cible les keywords transactionnels FR autour de "litière automatique chat" (~195K recherches/mois).

## Stack technique
- **SSG** : Astro 5 (output: static)
- **Style** : Tailwind CSS v4 (Vite plugin)
- **Data** : JSON (categories/produits) + Markdown Content Collections (guides, Phase 2)
- **Hosting** : Netlify (litiere-auto.netlify.app)
- **Images** : Placeholder SVG pour le MVP, Cloudinary en Phase 2

## Architecture
- Fork de Au-bon-cadeau (meme stack), adapte pour le vertical litiere auto
- 100% statique (SSG)
- Routes : `/litieres-automatiques/[slug]/` pour les comparatifs
- Redirects affiliate : `/go/[slug]/`
- Pas de Preact, pas de quiz, pas de Supabase, pas de dashboard

## Decisions prises
- Palette : Emerald/Teal (proprete) + Orange/Coral (CTA chat) + Slate (neutre)
- 3 categories MVP : meilleure-litiere-automatique, pas-cher, fermee
- 6 produits dans le comparatif principal (Litter-Robot 4, PETKIT Pura Max 2, CATLINK, PetRee ARC, MeoWant, POOPOUT)
- Brand name : LitièreAuto
- Pas de quiz/interactif pour le MVP, focus sur le contenu SEO

## Conventions
- URLs : /litieres-automatiques/[slug]/ pour les comparatifs
- Slugs : kebab-case
- JSON data dans src/data/
- Schema version "1.0" dans tous les JSON

## Etat actuel
- MVP Phase 1 : DONE — 19 pages, build OK, deploy OK
- Site live : https://litiere-auto.netlify.app
- GitHub : https://github.com/La-Gamblure/litiere-automatique-chat
- Netlify site ID : b347e54a-ac2f-43bd-ab24-5297058efbd4
- Produits verifies via recherche Exa (PETKIT Pura Max 2, Devoko 90L, Litter-Robot 4, Neakasa M1, CATLINK Baymax, PetSnowy SNOW+, PetSafe ScoopFree)

## Prochaines etapes
- Phase 1 : build, deploy Netlify, GSC
- Phase 2 : 5-10 articles guides, maillage interne, images Cloudinary
- Phase 3 : backlinks, GEO, custom domain
