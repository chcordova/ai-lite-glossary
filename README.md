# 📚 Glosario IA — Conceptos & Tecnologías

Diccionario interactivo y bilingüe (Español/English) de Inteligencia Artificial y Automatización. Diseñado para que cualquier persona pueda entender el vocabulario técnico que está transformando el mundo — de la generación de texto pasiva a los agentes autónomos.

## ✨ Funcionalidades

- **Búsqueda en tiempo real** por término, nombre completo o descripción
- **Filtros por categoría** para navegar por áreas temáticas
- **119 términos** organizados en 6 categorías
- **Selector de idioma ES/EN** — traduce el nombre completo y la descripción de cada término al vuelo, con preferencia persistida (`localStorage`)
- **Contador dinámico** de términos mostrados, según el filtro y la búsqueda activos
- **Animaciones fluidas** en la aparición de tarjetas
- **Diseño responsivo** — funciona en móvil, tablet y escritorio
- **Jerarquía visual didáctica y minimalista** — el contenido (tarjetas) es siempre el protagonista; encabezado, filtros e idioma son controles discretos y accesorios

## 🗂️ Categorías

| Categoría | Ejemplos |
|---|---|
| 🧠 **Fundamentales** | IA, ML, DL, LLM, AGI, ASI, Multimodal |
| ⚡ **Arquitectura** | RAG, Transformer, MoE, GAN, Embeddings, NeRF |
| 🤖 **Automatización** | RPA, MCP, AI Agent, API, ReAct, HITL |
| 💬 **Uso Diario** | Prompt, Token, Context Window, CoT, Hallucination, Sycophancy |
| 🎯 **Entrenamiento** | RLHF, LoRA, QLoRA, DPO, Quantization, Scaling Laws |
| 🖥️ **Producción** | MLOps, LLMOps, KV Cache, GPU/TPU, Hugging Face, Model Drift |

## 🗃️ Estructura del proyecto

```
ai-lite-glossary/
├── index.html              # Estructura HTML y layout principal
└── assets/
    ├── css/
    │   └── styles.css      # Estilos personalizados y animaciones
    └── js/
        ├── tailwind.config.js  # Configuración de Tailwind CSS
        ├── data.json           # Fuente de datos — términos del glosario (bilingüe)
        └── app.js              # Lógica de búsqueda, filtros, idioma y render
```

## 🚀 Uso local

Este proyecto es un sitio estático. Requiere un servidor HTTP para que `fetch()` cargue `data.json` correctamente.

```bash
# Python (recomendado)
python -m http.server 8080

# Node.js
npx serve .
```

Luego abre `http://localhost:8080` en tu navegador.

## 🛠️ Tecnologías

- **[Tailwind CSS](https://tailwindcss.com/)** — utilidades CSS via CDN
- **[Phosphor Icons](https://phosphoricons.com/)** — iconografía
- **[Anime.js](https://animejs.com/)** — animaciones
- **[Inter](https://fonts.google.com/specimen/Inter)** — tipografía (Google Fonts)

## 🌐 Internacionalización (ES/EN)

Cada término en `data.json` guarda su nombre completo (`full`) y descripción (`desc`) como un objeto con una clave por idioma:

```json
{
  "term": "RAG",
  "full": { "es": "Retrieval-Augmented Generation", "en": "Retrieval-Augmented Generation" },
  "desc": {
    "es": "Técnica donde un LLM se conecta a una base de datos externa...",
    "en": "A technique where an LLM connects to an external database..."
  },
  "category": "arquitectura",
  "icon": "ph-magnifying-glass-plus",
  "color": "fuchsia"
}
```

Los labels de categoría, el panel de descripción de categoría y otros textos de la interfaz también viven en diccionarios `{ es: {...}, en: {...} }` dentro de `app.js` (`categoryLabels`, `categoryDescriptions`, `uiStrings`).

### ➕ Agregar un nuevo idioma

El selector de idioma se genera dinámicamente desde `SUPPORTED_LANGS` en `assets/js/app.js`, por lo que agregar un idioma (p. ej. Portugués) solo requiere tocar 3 lugares, sin cambiar lógica:

1. **`app.js`** — añade la entrada al array `SUPPORTED_LANGS` (ej. `{ code: 'pt', label: 'PT' }`) y la clave `pt` en `categoryLabels`, `categoryDescriptions` y `uiStrings`.
2. **`data.json`** — añade la clave `pt` en el `full`/`desc` de cada término.
3. Listo — el botón de idioma, las tarjetas y los textos de la interfaz se sincronizan automáticamente.

## ➕ Agregar términos

Edita `assets/js/data.json` y añade un objeto con esta estructura:

```json
{
  "term": "SIGLA",
  "full": { "es": "Nombre completo en español", "en": "Full name in English" },
  "desc": { "es": "Descripción clara y accesible del concepto.", "en": "Clear, accessible description of the concept." },
  "category": "fundamentales",
  "icon": "ph-brain",
  "color": "indigo"
}
```

**Categorías disponibles:** `fundamentales` · `arquitectura` · `automatizacion` · `uso` · `optimizacion` · `operaciones`

**Colores disponibles:** `indigo` · `fuchsia` · `emerald` · `amber` · `rose` · `cyan`

**Iconos:** consulta el catálogo en [phosphoricons.com](https://phosphoricons.com/)

---

Recurso educativo sobre IA & Machine Learning, con terminología sintetizada a partir de fuentes como Stanford HAI, MIT Media Lab, Andreessen Horowitz (a16z) y CNET.

