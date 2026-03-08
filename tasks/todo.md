# Litière Automatique Chat - TODO

## Phase 1 (MVP)

### DONE
- [x] Scaffolding projet (fork Au-bon-cadeau, nettoyage)
- [x] package.json, astro.config.mjs, tsconfig.json, netlify.toml
- [x] BaseLayout.astro (nav, footer, OG tags, mobile menu)
- [x] Composants : ProductCard, Breadcrumbs, FAQ, AffiliateDisclosure
- [x] Homepage (hero, grille categories, trust signals, FAQ, JSON-LD)
- [x] Hub /litieres-automatiques/ (grille groupee, methode)
- [x] Page comparatif [slug].astro (produits, filtres budget, FAQ, related)
- [x] 3 categories JSON (meilleure 7 produits, pas-cher 3, fermee 4)
- [x] Redirects /go/ (11 liens affiliation)
- [x] Produits mis a jour avec recherche Exa (prix verifies, vrais best-sellers)
- [x] Legal (mentions legales, confidentialite, a-propos)
- [x] robots.txt, favicon.svg
- [x] config.ts (constantes site)
- [x] global.css (Tailwind v4)

- [x] npm install + npm run build (18 pages, 607ms)
- [x] Git init + commit initial + push GitHub (La-Gamblure/litiere-automatique-chat)
- [x] Deploy Netlify — https://litiere-auto.netlify.app (site ID: b347e54a-ac2f-43bd-ab24-5297058efbd4)

### TODO
- [ ] Google Search Console - soumettre sitemap
- [ ] Remplacer liens affiliation placeholder par vrais liens
- [ ] Completer infos editeur dans mentions legales
- [ ] Generer og-default.png

## Phase 2
- [x] Content Collections setup (content.config.ts, schema Zod, glob loader)
- [x] ArticleLayout.astro (JSON-LD Article, breadcrumbs, TOC, FAQ, related categories)
- [x] TableOfContents.astro (sticky sidebar, H2/H3)
- [x] Route dynamique guides/[slug].astro
- [x] Page listing guides/index.astro
- [x] Prose styles dans global.css
- [x] Nav "Guides" dans header + footer
- [x] Section "Nos derniers guides" sur homepage
- [x] Premier article draft : comment-choisir-litiere-automatique.md (~1500 mots)
- [x] Passer l'article par /humanizer et publier (draft: false)
- [x] Migration Cloudflare Pages (wrangler.toml, _headers, npm run deploy)
- [ ] 5-10 articles P1 (types litiere, fermee, XXL, distributeurs)
- [ ] Maillage interne
- [ ] Images Cloudinary
- [ ] CloudinaryImage.astro component

## Phase 3
- [ ] Custom domain
- [ ] Backlinks
- [ ] GEO optimization
