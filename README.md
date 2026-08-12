# 📚 Glosario IA — Conceptos & Tecnologías

Diccionario interactivo de Inteligencia Artificial y Automatización en español. Diseñado para que cualquier persona pueda entender el vocabulario técnico que está transformando el mundo.

## ✨ Funcionalidades

- **Búsqueda en tiempo real** por término, nombre completo o descripción
- **Filtros por categoría** para navegar por áreas temáticas
- **36 términos** organizados en 6 categorías
- **Animaciones fluidas** en la aparición de tarjetas
- **Diseño responsivo** — funciona en móvil, tablet y escritorio

## 🗂️ Categorías

| Categoría | Ejemplos |
|---|---|
| 🧠 **Fundamentales** | IA, ML, DL, LLM, AGI, Multimodal |
| ⚡ **Arquitectura** | RAG, Transformer, MoE, GAN, Embeddings |
| 🤖 **Automatización** | RPA, MCP, AI Agent, API, ReAct |
| 💬 **Uso Diario** | Prompt, Token, Context Window, CoT, Hallucination |
| 🎯 **Entrenamiento** | RLHF, LoRA, QLoRA, DPO, Quantization |
| 🖥️ **Producción** | MLOps, KV Cache, Hugging Face |

## 🗃️ Estructura del proyecto

```
ai-lite-glossary/
├── index.html              # Estructura HTML y layout principal
└── assets/
    ├── css/
    │   └── styles.css      # Estilos personalizados y animaciones
    └── js/
        ├── tailwind.config.js  # Configuración de Tailwind CSS
        ├── data.json           # Fuente de datos — términos del glosario
        └── app.js              # Lógica de búsqueda, filtros y render
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

## ➕ Agregar términos

Edita `assets/js/data.json` y añade un objeto con esta estructura:

```json
{
  "term": "SIGLA",
  "full": "Nombre completo del término",
  "desc": "Descripción clara y accesible del concepto.",
  "category": "fundamentales",
  "icon": "ph-brain",
  "color": "indigo"
}
```

**Categorías disponibles:** `fundamentales` · `arquitectura` · `automatizacion` · `uso` · `optimizacion` · `operaciones`

**Colores disponibles:** `indigo` · `fuchsia` · `emerald` · `amber` · `rose` · `cyan`

**Iconos:** consulta el catálogo en [phosphoricons.com](https://phosphoricons.com/)

---

Recurso literario y didáctico de IA & Machine Learning.
