let dictionaryData = [];

const colorConfig = {
  indigo:  { bgLight: 'bg-indigo-50',  text: 'text-indigo-600',  border: 'border-indigo-100',  iconBg: 'bg-indigo-100'  },
  fuchsia: { bgLight: 'bg-fuchsia-50', text: 'text-fuchsia-600', border: 'border-fuchsia-100', iconBg: 'bg-fuchsia-100' },
  emerald: { bgLight: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-100', iconBg: 'bg-emerald-100' },
  amber:   { bgLight: 'bg-amber-50',   text: 'text-amber-600',   border: 'border-amber-100',   iconBg: 'bg-amber-100'   },
  rose:    { bgLight: 'bg-rose-50',    text: 'text-rose-600',    border: 'border-rose-100',    iconBg: 'bg-rose-100'    },
  cyan:    { bgLight: 'bg-cyan-50',    text: 'text-cyan-600',    border: 'border-cyan-100',    iconBg: 'bg-cyan-100'    }
};

const categoryLabels = {
  'fundamentales': 'Conceptos Fundamentales',
  'arquitectura':  'Arquitectura y Proc.',
  'automatizacion':'Automatización',
  'uso':           'Uso Diario',
  'optimizacion':  'Entrenamiento',
  'operaciones':   'Producción (MLOps)'
};

const cardsGrid   = document.getElementById('cardsGrid');
const emptyState  = document.getElementById('emptyState');
const searchInput = document.getElementById('searchInput');
const filterBtns  = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';
let searchQuery   = '';

function renderCards() {
  const filteredData = dictionaryData.filter(item => {
    const matchesFilter = currentFilter === 'all' || item.category === currentFilter;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.full.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
              ${categoryLabels[item.category]}
            </span>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 mb-1 tracking-tight">${item.term}</h3>
          <p class="text-sm font-medium ${theme.text} mb-3">${item.full}</p>
          <p class="text-slate-600 text-sm leading-relaxed mt-auto">${item.desc}</p>
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
      b.classList.remove('bg-slate-800', 'text-white', 'shadow-md');
      b.classList.add('bg-white', 'text-slate-600');
    });

    const targetBtn = e.currentTarget;
    targetBtn.classList.remove(
      'bg-white', 'text-slate-600',
      'hover:bg-indigo-50', 'hover:bg-fuchsia-50', 'hover:bg-emerald-50',
      'hover:bg-amber-50',  'hover:bg-rose-50',    'hover:bg-cyan-50'
    );
    targetBtn.classList.add('bg-slate-800', 'text-white', 'shadow-md');

    currentFilter = targetBtn.getAttribute('data-filter');
    renderCards();
  });
});

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
