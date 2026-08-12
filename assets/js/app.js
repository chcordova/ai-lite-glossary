let dictionaryData = [];

const colorConfig = {
  indigo:  { bgLight: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'border-indigo-100',  iconBg: 'bg-indigo-100'  },
  fuchsia: { bgLight: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-100', iconBg: 'bg-fuchsia-100' },
  emerald: { bgLight: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
  amber:   { bgLight: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-100',   iconBg: 'bg-amber-100'   },
  rose:    { bgLight: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-100',    iconBg: 'bg-rose-100'    },
  cyan:    { bgLight: 'bg-cyan-50',    text: 'text-cyan-600',    border: 'border-cyan-100',    iconBg: 'bg-cyan-100'    }
};

// Add a new language by adding an entry here (e.g. { code: 'pt', label: 'PT' }).
const SUPPORTED_LANGS = [
  { code: 'es', label: 'ES' },
  { code: 'en', label: 'EN' }
];

// Filter button labels, per language. "all" covers the "Todos/All" button.
const categoryLabels = {
  es: {
    all:             'Todos',
    fundamentales:   'Fundamentales',
    arquitectura:    'Arquitectura',
    automatizacion:  'Automatización',
    uso:             'Uso Diario',
    optimizacion:    'Entrenamiento',
    operaciones:     'Producción'
  },
  en: {
    all:             'All',
    fundamentales:   'Core Concepts',
    arquitectura:    'Architecture',
    automatizacion:  'Automation',
    uso:             'Daily Usage',
    optimizacion:    'Training',
    operaciones:     'Production'
  }
};

// Category description panel, per language.
const categoryDescriptions = {
  es: {
    all:             'Explora las seis etapas del ciclo de vida de un sistema de IA: desde los fundamentos teóricos hasta la operación en producción.',
    fundamentales:   'Conceptos teóricos y éticos que definen la naturaleza de los sistemas inteligentes: de la IA Estrecha a la hipotética AGI/ASI, y el equilibrio entre aprendizaje basado en datos y en conocimiento.',
    arquitectura:    'Los bloques matemáticos y estructurales de los modelos: Transformers, GANs, Difusión, Mixture of Experts, embeddings y bases de datos vectoriales.',
    automatizacion:  'La evolución de la automatización rígida (RPA) hacia agentes autónomos que planifican, invocan herramientas y ejecutan flujos con protocolos como MCP y ReAct.',
    uso:             'La capa de interacción humano-máquina: prompt engineering, ventana de contexto, tokens y fenómenos como la alucinación o la sicofancia del modelo.',
    optimizacion:    'Técnicas post-entrenamiento (RLHF, DPO, LoRA, cuantización) que alinean y comprimen los modelos para hacerlos más seguros, eficientes y accesibles.',
    operaciones:     'La logística de desplegar IA a escala: GPUs/TPUs, MLOps/LLMOps, monitoreo de drift y caches KV que mantienen los sistemas en producción.'
  },
  en: {
    all:             'Explore the six stages of an AI system\'s lifecycle: from theoretical foundations to production operation.',
    fundamentales:   'Theoretical and ethical concepts that define the nature of intelligent systems: from Narrow AI to hypothetical AGI/ASI, and the balance between data-driven and knowledge-driven learning.',
    arquitectura:    'The mathematical and structural building blocks of models: Transformers, GANs, Diffusion, Mixture of Experts, embeddings, and vector databases.',
    automatizacion:  'The evolution from rigid automation (RPA) to autonomous agents that plan, invoke tools, and execute workflows using protocols like MCP and ReAct.',
    uso:             'The human-machine interaction layer: prompt engineering, context window, tokens, and phenomena like hallucination or model sycophancy.',
    optimizacion:    'Post-training techniques (RLHF, DPO, LoRA, quantization) that align and compress models to make them safer, more efficient, and more accessible.',
    operaciones:     'The logistics of deploying AI at scale: GPUs/TPUs, MLOps/LLMOps, drift monitoring, and KV caches that keep systems running in production.'
  }
};

// Small standalone UI strings that don't belong to categories.
const uiStrings = {
  es: { termsLabel: 'términos' },
  en: { termsLabel: 'terms' }
};

const cardsGrid        = document.getElementById('cardsGrid');
const emptyState       = document.getElementById('emptyState');
const searchInput      = document.getElementById('searchInput');
const filterBtns       = document.querySelectorAll('.filter-btn');
const statTotal        = document.getElementById('statTotal');
const statTotalLabel   = document.getElementById('statTotalLabel');
const categoryInfoText = document.getElementById('categoryInfoText');
const langSwitch       = document.getElementById('langSwitch');

let currentFilter = 'all';
let searchQuery   = '';
let currentLang   = localStorage.getItem('glossaryLang') || 'es';
if (!SUPPORTED_LANGS.some(l => l.code === currentLang)) currentLang = SUPPORTED_LANGS[0].code;

function label(key) {
  const dict = categoryLabels[currentLang] || categoryLabels.es;
  return dict[key] || categoryLabels.es[key];
}

function description(key) {
  const dict = categoryDescriptions[currentLang] || categoryDescriptions.es;
  return dict[key] || categoryDescriptions.es[key];
}

// Refreshes all chrome text that depends on language/filter but isn't part of the cards grid.
function updateStaticTexts() {
  filterBtns.forEach(btn => {
    const key = btn.getAttribute('data-filter');
    const span = btn.querySelector('.filter-label');
    if (span) span.textContent = label(key);
  });
  categoryInfoText.textContent = description(currentFilter);
  if (statTotalLabel) statTotalLabel.textContent = (uiStrings[currentLang] || uiStrings.es).termsLabel;
}

function setActiveLangButton() {
  langSwitch.querySelectorAll('.lang-btn').forEach(b => {
    const isActive = b.getAttribute('data-lang') === currentLang;
    b.classList.toggle('active', isActive);
    b.classList.toggle('bg-slate-700', isActive);
    b.classList.toggle('text-white', isActive);
    b.classList.toggle('text-slate-400', !isActive);
  });
}

function renderLangSwitch() {
  langSwitch.innerHTML = SUPPORTED_LANGS.map(l => `
    <button class="lang-btn text-[10px] font-semibold px-1.5 py-0.5 rounded-full transition-all" data-lang="${l.code}">${l.label}</button>
  `).join('');

  setActiveLangButton();

  langSwitch.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      if (lang === currentLang) return;

      currentLang = lang;
      localStorage.setItem('glossaryLang', currentLang);

      setActiveLangButton();
      updateStaticTexts();
      renderCards();
    });
  });
}

function renderCards() {
  const filteredData = dictionaryData.filter(item => {
    const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
    const full = item.full[currentLang] || item.full.es;
    const desc = item.desc[currentLang] || item.desc.es;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.term.toLowerCase().includes(q) ||
      full.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q);
    return matchesFilter && matchesSearch;
  });

  if (statTotal) statTotal.textContent = filteredData.length;

  cardsGrid.innerHTML = '';

  if (filteredData.length === 0) {
    cardsGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    emptyState.classList.add('flex');
  } else {
    cardsGrid.classList.remove('hidden');
    emptyState.classList.add('hidden');
    emptyState.classList.remove('flex');

    filteredData.forEach((item, index) => {
      const theme = colorConfig[item.color];
      const card  = document.createElement('div');
      const full  = item.full[currentLang] || item.full.es;
      const desc  = item.desc[currentLang] || item.desc.es;

      card.style.animationDelay = `${index * 50}ms`;
      card.className = `card-enter bg-white rounded-2xl p-6 border ${theme.border} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group cursor-default`;

      card.innerHTML = `
        <div class="absolute -right-10 -top-10 w-32 h-32 ${theme.bgLight} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out z-0"></div>
        <div class="relative z-10 flex flex-col h-full">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-xl ${theme.iconBg} ${theme.text} flex items-center justify-center text-2xl shadow-sm">
              <i class="${item.icon}"></i>
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full ${theme.bgLight} ${theme.text}">
              ${label(item.category)}
            </span>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-1 tracking-tight">${item.term}</h3>
          <p class="text-sm font-medium ${theme.text} mb-3">${full}</p>
          <p class="text-slate-600 text-sm leading-relaxed mt-auto">${desc}</p>
        </div>
      `;
      cardsGrid.appendChild(card);
    });
  }
}

searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderCards();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => {
      b.classList.remove('active', 'bg-brand-50', 'text-brand-700', 'border-brand-200');
      b.classList.add('bg-transparent', 'text-slate-500', 'border-transparent');
    });

    const targetBtn = e.currentTarget;
    targetBtn.classList.remove('bg-transparent', 'text-slate-500', 'border-transparent');
    targetBtn.classList.add('active', 'bg-brand-50', 'text-brand-700', 'border-brand-200');

    currentFilter = targetBtn.getAttribute('data-filter');
    updateStaticTexts();
    renderCards();
  });
});

renderLangSwitch();
updateStaticTexts();

fetch('assets/js/data.json')
  .then(res => {
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
  })
  .then(data => {
    dictionaryData = data;
    renderCards();
  })
  .catch(err => console.error('Error cargando data.json:', err));

