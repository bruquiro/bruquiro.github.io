# AGENTS.md - Directrices para Desarrolladores de bruquiro.github.io

## Descripcion del Proyecto

Este es un portafolio personal construido con HTML, CSS y JavaScript vanilla. Es un sitio estatico alojado en GitHub Pages sin herramientas de build, frameworks o suites de pruebas.

## Comandos de Desarrollo

### Ejecutar Localmente

Como es un sitio estatico sin proceso de build:

```bash
# Servir el sitio localmente (Python)
python3 -m http.server 8000

# O con Node.js (si esta instalado)
npx serve .
```

Luego abre `http://localhost:8000` en tu navegador.

### Pruebas

No hay pruebas automatizadas - este es un sitio HTML/CSS/JS estatico sin framework de pruebas configurado.

**Lista de Verificacion de Pruebas Manuales:**

- El cambio de tema (modo oscuro/claro) funciona en todos los tamanos de viewport
- La navegacion con scroll suave funciona correctamente
- El menu hamburguesa mobile se abre/cierra correctamente
- Las imagenes con lazy loading se muestran correctamente
- Las animaciones y transiciones son suaves
- El diseno responsive funciona en todos los breakpoints (mobile < 600px, desktop >= 601px)
- La navegacion con teclado funciona (Tab, Enter, Escape)
- Los estados de foco son visibles en todos los elementos interactivos

### Linting

No hay herramientas de linting pre-configuradas. Para linting en JavaScript:

```bash
# Instalar ESLint localmente (una vez)
npm init -y && npm install eslint --save-dev

# Ejecutar ESLint en script.js
npx eslint script.js

# O ejecutar con auto-correccion
npx eslint script.js --fix
```

**Configuracion Recomendada para ESLint (.eslintrc.json):**

```json
{
  "env": { "browser": true, "es2021": true },
  "parserOptions": { "ecmaVersion": "latest" },
  "rules": {
    "no-unused-vars": "warn",
    "no-undef": "warn"
  }
}
```

## Directrices de Estilo de Codigo

### Principios Generales

- Mantenlo simple - es un sitio estatico, evita complejidad innecesaria
- Mantén consistencia con los patrones de codigo existentes
- Usa HTML semantico y patrones accesibles
- Asegurate de que el diseno responsive funcione en todos los breakpoints

### HTML (index.html)

- Usa elementos semanticos (`nav`, `section`, `article`, etc.)
- Incluye atributos `aria-label` apropiados para elementos interactivos
- Usa `loading="lazy"` en imagenes debajo del pliegue
- Asegura una jerarquia de encabezados correcta (h1 -> h2 -> h3)

### CSS (style.css)

**Convenciones de Nombres:**
- Usa minusculas con guiones para nombres de clases (ej., `.content`, `.fade-in`)
- Usa camelCase para IDs de JavaScript (ej., `#toggle-theme`, `#back-to-top`)
- Prefija clases de visibilidad con nombres significativos (ej., `.visible`, `.open`)

**Organizacion:**
- Agrupa estilos relacionados
- Usa custom properties de CSS (variables) para colores y tamanos
- Coloca estilos mobile en media queries al final
- Usa orden logico: layout -> componentes -> animaciones -> responsive

**Formato:**
- Un selector por linea para reglas de multiples lineas
- Usa espacios alrededor de dos puntos y punto y coma
- Indenta con 2 espacios
- Usa colores hex cortos donde sea posible (#111, #fff)

**Mejores Practicas:**
- Usa flexbox para layout
- Usa `rem` para tamanos de fuente, `px` para bordes/sombras
- Incluye fallbacks para navegadores antiguos si es necesario
- Usa `box-sizing: border-box` globalmente

### JavaScript (script.js)

**Convenciones de Nombres:**
- Usa camelCase para funciones y variables (ej., `toggleTheme`, `smoothScrollTo`)
- Usa PascalCase para clases (si hay)
- Usa UPPER_SNAKE_CASE para constantes (si hay)
- Prefija elementos DOM con el tipo relevante: `$btn`, `el`, `input`

**Funciones:**
- Escribe funciones pequenas y enfocadas (< 30 lineas cada una)
- Usa arrow functions para callbacks
- Usa async/await para operaciones asincronicas
- Siempre verifica null/undefined antes de acceder a elementos DOM

**Manejo de Errores:**
- Usa encadenamiento opcional (`?.`) y coalescencia nula (`??`) cuando sea posible
- Agrega verificaciones de null para elementos DOM: `if (element) { ... }`
- Envuelve codigo que puede fallar en try/catch donde sea apropiado

**Estructura del Codigo:**
```javascript
// 1. Constantes y configuracion
const CONFIG = {};

// 2. Referencias a elementos DOM
const elements = {
  nav: document.querySelector('nav'),
  // ...
};

// 3. Funciones utilitarias
function utility() {}

// 4. Funciones principales
function mainFunction() {}

// 5. Event listeners e inicializacion
document.addEventListener('DOMContentLoaded', () => {});
```

**Formato:**
- Usa punto y coma consistentemente (siempre o nunca)
- Usa comillas simples para strings en JavaScript
- Prefiere const sobre let, evita var
- Usa template literals para interpolacion de strings

### Accesibilidad

- Incluye `aria-label` en botones de iconos
- Usa atributos `role` cuando sea apropiado
- Asegurate de que la navegacion con teclado funcione
- Mantén contraste de color suficiente en ambos temas
- Usa estados de foco apropiados

### Flujo de Git

```bash
# Crear una nueva rama para cambios
git checkout -b feature/descripcion

# Stage y commit
git add -A
git commit -m "descripcion de cambios"

# Push y crear PR
git push -u origin feature/descripcion
```

### Agregando Nuevas Funcionalidades

Cuando agregues nueva funcionalidad:

1. **HTML**: Agrega markup semantico con atributos ARIA apropiados
2. **CSS**: Sigue los patrones de nombres y organizacion existentes; agrega estilos responsive
3. **JS**: Sigue la estructura de codigo de arriba; agrega verificaciones de null
4. **Pruebas**: Prueba manualmente en viewports mobile y desktop

### Consideraciones de Rendimiento

- Manten JavaScript minimalista
- Usa lazy loading para imagenes
- Minimiza manipulaciones del DOM
- Usa animaciones CSS sobre JavaScript donde sea posible
- Evita operaciones costosas en handlers de scroll (considera debouncing)

### Soporte de Navegadores

Apunta a navegadores modernos (Chrome, Firefox, Safari, Edge - ultimas 2 versiones).
