/**
 * Quiz Renderer — DOM rendering, progress bar, result display.
 * Depends on quiz-engine.js for logic.
 */
import { QUESTIONS, getRecommendations, buildReasoning } from "./quiz-engine.js";

/**
 * Format price in EUR (fr-FR).
 */
function formatPrice(price) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Initialize the quiz in a container element.
 * @param {HTMLElement} container - The DOM element to render into.
 * @param {Array} products - Product data array (injected at build time).
 */
export function initQuiz(container, products) {
  let currentStep = 0;
  const answers = {};

  function render() {
    if (currentStep < QUESTIONS.length) {
      renderQuestion(container, currentStep, answers, products);
    } else {
      renderResult(container, answers, products);
    }
  }

  function renderQuestion(el, step, answers, products) {
    const q = QUESTIONS[step];
    const total = QUESTIONS.length;
    const pct = ((step) / total) * 100;

    el.innerHTML = `
      <div class="mb-6">
        <div class="flex items-center justify-between text-xs text-slate-500 mb-2">
          <span>Question ${step + 1} / ${total}</span>
          <span>${Math.round(pct)}%</span>
        </div>
        <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div class="h-full bg-emerald-500 rounded-full transition-all duration-300" style="width: ${pct}%"></div>
        </div>
      </div>
      <h2 class="text-xl font-bold text-slate-900 mb-6">${q.question}</h2>
      <div class="space-y-3" id="quiz-options"></div>
      ${step > 0 ? `<button id="quiz-back" class="mt-4 text-sm text-slate-500 hover:text-emerald-600 transition-colors">&larr; Question précédente</button>` : ""}
    `;

    const optionsEl = el.querySelector("#quiz-options");
    q.options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className =
        "w-full text-left px-4 py-3 border border-slate-200 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-all text-sm font-medium text-slate-700";
      btn.textContent = opt.label;
      btn.addEventListener("click", () => {
        answers[q.id] = opt.value;
        currentStep++;
        render();
      });
      optionsEl.appendChild(btn);
    });

    const backBtn = el.querySelector("#quiz-back");
    if (backBtn) {
      backBtn.addEventListener("click", () => {
        currentStep--;
        render();
      });
    }
  }

  function renderResult(el, answers, products) {
    const recommendations = getRecommendations(products, answers, 2);
    const top = recommendations[0];
    const runner = recommendations[1];

    const topProduct = top.product;
    const reasoning = buildReasoning(topProduct, answers);

    const priceRange =
      topProduct.price_min === topProduct.price_max
        ? formatPrice(topProduct.price_min)
        : `${formatPrice(topProduct.price_min)} – ${formatPrice(topProduct.price_max)}`;

    const primaryMerchant =
      topProduct.merchants.find((m) => m.is_primary) || topProduct.merchants[0];
    const merchantSlug = primaryMerchant.merchant_name
      .toLowerCase()
      .replace(/[\s.]+/g, "-")
      .replace(/-+/g, "-");
    const affiliateHref = `/go/${topProduct.slug}/${merchantSlug}/`;

    el.innerHTML = `
      <div class="mb-6">
        <div class="w-full h-2 bg-emerald-500 rounded-full"></div>
      </div>
      <div class="text-center mb-6">
        <p class="text-sm font-medium text-emerald-600 mb-1">Notre recommandation pour vous</p>
        <h2 class="text-2xl font-bold text-slate-900 mb-1">${topProduct.title}</h2>
        <p class="text-emerald-600 font-bold text-lg">${priceRange}</p>
        <div class="flex items-center justify-center gap-1 mt-1">
          <span class="text-orange-400 text-sm">${"★".repeat(Math.round(topProduct.rating))}</span>
          <span class="text-xs text-slate-400">${topProduct.rating}/5 (${topProduct.rating_count} avis)</span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-3 mb-6">
        <a href="${affiliateHref}" rel="sponsored nofollow"
           class="inline-flex items-center justify-center flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-colors">
          Voir le prix &rarr;
        </a>
        <a href="/avis/${topProduct.slug}/"
           class="inline-flex items-center justify-center flex-1 px-6 py-3 border border-slate-200 hover:border-emerald-500 text-slate-700 font-medium rounded-lg transition-colors">
          Lire notre avis
        </a>
      </div>

      <div id="quiz-reasoning" class="relative mb-6">
        <h3 class="font-semibold text-slate-900 mb-2">Pourquoi ce modèle est fait pour vous</h3>
        <div id="reasoning-content" class="quiz-blurred">
          <p class="text-sm text-slate-600 leading-relaxed">${reasoning}</p>
        </div>
        <div id="reasoning-overlay" class="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-white via-white/90 to-transparent pt-8">
          <div class="text-center pb-2 w-full">
            <p class="text-sm text-slate-600 mb-3">Recevez votre recommandation complète par email</p>
            <form id="quiz-email-form" class="flex gap-2 max-w-sm mx-auto">
              <input type="email" name="email" placeholder="votre@email.com" required
                     class="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500" />
              <button type="submit"
                      class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors">
                Envoyer
              </button>
            </form>
            <p id="quiz-email-status" class="text-xs text-slate-400 mt-2"></p>
          </div>
        </div>
      </div>

      ${runner ? `
      <div class="border-t border-slate-200 pt-4">
        <p class="text-xs text-slate-500 mb-2">Alternative recommandée</p>
        <div class="flex items-center justify-between">
          <div>
            <p class="font-semibold text-slate-900 text-sm">${runner.product.title}</p>
            <p class="text-xs text-emerald-600 font-bold">${runner.product.price_min === runner.product.price_max ? formatPrice(runner.product.price_min) : formatPrice(runner.product.price_min) + " – " + formatPrice(runner.product.price_max)}</p>
          </div>
          <a href="/avis/${runner.product.slug}/" class="text-xs text-emerald-600 hover:text-emerald-700 font-medium">Voir l'avis &rarr;</a>
        </div>
      </div>` : ""}

      <button id="quiz-restart" class="mt-6 text-sm text-slate-500 hover:text-emerald-600 transition-colors block mx-auto">
        Recommencer le quiz
      </button>
    `;

    // Email form handler
    const form = el.querySelector("#quiz-email-form");
    const overlay = el.querySelector("#reasoning-overlay");
    const content = el.querySelector("#reasoning-content");
    const status = el.querySelector("#quiz-email-status");

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = new FormData(form).get("email");
        status.textContent = "Envoi en cours...";

        try {
          const resp = await fetch("/api/quiz-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              result: {
                top: topProduct.slug,
                runner: runner?.product.slug,
                answers,
              },
            }),
          });

          if (resp.ok) {
            overlay.style.display = "none";
            content.classList.remove("quiz-blurred");
            status.textContent = "";
          } else {
            status.textContent = "Erreur, veuillez réessayer.";
          }
        } catch {
          // Offline or function not deployed — just reveal anyway
          overlay.style.display = "none";
          content.classList.remove("quiz-blurred");
        }
      });
    }

    // Restart
    const restartBtn = el.querySelector("#quiz-restart");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        currentStep = 0;
        Object.keys(answers).forEach((k) => delete answers[k]);
        render();
      });
    }
  }

  render();
}
