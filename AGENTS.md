# AGENTS.md - Developer Guidelines for bruquiro.github.io

## Project Overview

This is a personal portfolio website built with vanilla HTML, CSS, and JavaScript. It is a static site hosted on GitHub Pages with no build tools, frameworks, or test suites.

## Development Commands

### Running Locally

Since this is a static site with no build process:

```bash
# Serve the site locally (Python)
python3 -m http.server 8000

# Or with Node.js (if installed)
npx serve .
```

Then open `http://localhost:8000` in your browser.

### Testing

There are no automated tests - this is a static HTML/CSS/JS site with no test framework configured.

**Manual Testing Checklist:**

- Theme toggle (dark/light mode) works on all viewport sizes
- Navigation smooth scrolling functions correctly
- Mobile hamburger menu opens/closes properly
- Lazy loading images display correctly
- Animations and transitions are smooth
- Responsive design works at all breakpoints (mobile < 600px, desktop >= 601px)
- Keyboard navigation works (Tab, Enter, Escape)
- Focus states visible on all interactive elements

### Linting

No linting tools are pre-configured. To lint JavaScript:

```bash
# Install ESLint locally (one-time)
npm init -y && npm install eslint --save-dev

# Run ESLint on script.js
npx eslint script.js

# Or run with auto-fix
npx eslint script.js --fix
```

**ESLint Recommended Config (.eslintrc.json):**

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

## Code Style Guidelines

### General Principles

- Keep it simple - this is a static site, avoid unnecessary complexity
- Maintain consistency with existing code patterns
- Use semantic HTML and accessible patterns
- Ensure responsive design works across all breakpoints

### HTML (index.html)

- Use semantic elements (`nav`, `section`, `article`, etc.)
- Include proper `aria-label` attributes for interactive elements
- Use `loading="lazy"` on images below the fold
- Ensure proper heading hierarchy (h1 -> h2 -> h3)

### CSS (style.css)

**Naming Conventions:**
- Use lowercase with hyphens for class names (e.g., `.content`, `.fade-in`)
- Use camelCase for JavaScript IDs (e.g., `#toggle-theme`, `#back-to-top`)
- Prefix visibility classes with meaningful names (e.g., `.visible`, `.open`)

**Organization:**
- Group related styles together
- Use CSS custom properties (variables) for colors and sizes
- Place mobile styles in media queries at the bottom
- Use logical ordering: layout -> components -> animations -> responsive

**Formatting:**
- One selector per line for multi-line rules
- Use spaces around colons and semicolons
- Indent with 2 spaces
- Use short hex colors where possible (#111, #fff)

**Best Practices:**
- Use flexbox for layout
- Use `rem` for font sizes, `px` for borders/shadows
- Include fallbacks for older browsers if needed
- Use `box-sizing: border-box` globally

### JavaScript (script.js)

**Naming Conventions:**
- Use camelCase for functions and variables (e.g., `toggleTheme`, `smoothScrollTo`)
- Use PascalCase for classes (if any)
- Use UPPER_SNAKE_CASE for constants (if any)
- Prefix DOM elements with relevant type: `$btn`, `el`, `input`

**Functions:**
- Write small, focused functions (< 30 lines each)
- Use arrow functions for callbacks
- Use async/await for asynchronous operations
- Always check for null/undefined before accessing DOM elements

**Error Handling:**
- Use optional chaining (`?.`) and nullish coalescing (`??`) when possible
- Add null checks for DOM elements: `if (element) { ... }`
- Wrap potentially failing code in try/catch where appropriate

**Code Structure:**
```javascript
// 1. Constants and configuration
const CONFIG = {};

// 2. DOM element references
const elements = {
  nav: document.querySelector('nav'),
  // ...
};

// 3. Utility functions
function utility() {}

// 4. Main functions
function mainFunction() {}

// 5. Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {});
```

**Formatting:**
- Use semicolons consistently (either always or never)
- Use single quotes for strings in JavaScript
- Prefer const over let, avoid var
- Use template literals for string interpolation

### Accessibility

- Include `aria-label` on icon buttons
- Use `role` attributes when appropriate
- Ensure keyboard navigation works
- Maintain sufficient color contrast in both themes
- Use proper focus states

### Git Workflow

```bash
# Create a new branch for changes
git checkout -b feature/description

# Stage and commit
git add -A
git commit -m "description of changes"

# Push and create PR
git push -u origin feature/description
```

### Adding New Features

When adding new functionality:

1. **HTML**: Add semantic markup with appropriate ARIA attributes
2. **CSS**: Follow existing naming and organization patterns; add responsive styles
3. **JS**: Follow the code structure section above; add null checks
4. **Testing**: Manually test on both mobile and desktop viewports

### Performance Considerations

- Keep JavaScript minimal
- Use lazy loading for images
- Minimize DOM manipulations
- Use CSS animations over JavaScript where possible
- Avoid expensive operations in scroll handlers (consider debouncing)

### Browser Support

Target modern browsers (Chrome, Firefox, Safari, Edge - latest 2 versions).
