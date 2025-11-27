# Theme variables

This file documents the CSS custom properties defined in `src/styles/theme.css` and gives quick examples for usage.

## Core tokens

- `--accent-start`, `--accent-mid`, `--accent-end`: Brand accent colors (green hues).
- `--accent-gradient`: A linear-gradient combining the accent colors.
- `--button-bg`, `--button-bg-hover`: Button background gradients for primary CTAs.
- `--accent-shadow`: Accent shadow color used for elevated elements.

## Layout / theme tokens

- `--bg-color`: Page background color (adapts for dark/light via `prefers-color-scheme`).
- `--text-color`: Primary text color.
- `--muted-color`: Secondary/muted text color.
- `--link-color`: Link color used across pages.
- `--card-border`: Border color for subtle cards.

## Usage examples

- Apply link color:

  .my-link {
  color: var(--link-color);
  text-decoration: none;
  }

- Use accent gradient for a section background:

  .hero {
  background: var(--accent-gradient);
  color: white;
  padding: 2rem;
  border-radius: 8px;
  }

- Use the global CTA utility class:

  <a class="button" href="/subscribe">Subscribe</a>

## Notes

- The tokens are defined to prefer a dark theme by default and adapt for light using `prefers-color-scheme: light` in `theme.css`.
- Prefer using the central tokens where possible instead of hard-coded hex colors to maintain theme consistency.

If you'd like, I can extend this README with code snippets for disabled states, accessible focus styles, and examples of mixing local CSS Modules with the global tokens.
