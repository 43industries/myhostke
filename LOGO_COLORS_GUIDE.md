# Logo Color Theme Guide

## How to Update App Colors to Match Your Logo

The app theme now uses CSS variables based on your logo colors. To update the colors:

### Step 1: Identify Your Logo Colors

Your logo colors should be extracted from your logo image. You can:
1. Use an online tool like [Coolors.co](https://coolors.co/image-picker) to extract colors from your logo
2. Use a design tool like Photoshop/GIMP to identify the main colors
3. Use the browser DevTools to inspect your logo image

### Step 2: Update CSS Variables

Open `src/index.css` and update the color variables in the `:root` section:

```css
:root {
  --logo-primary: #YOUR_MAIN_COLOR;      /* Main logo color */
  --logo-secondary: #YOUR_SECONDARY_COLOR; /* Secondary logo color */
  --logo-accent: #YOUR_ACCENT_COLOR;      /* Accent logo color */
  --logo-dark: #YOUR_DARK_VARIANT;        /* Dark variant (darker version of primary) */
  --logo-light: #YOUR_LIGHT_VARIANT;      /* Light variant (lighter version of primary) */
  --logo-gradient-start: #YOUR_MAIN_COLOR;
  --logo-gradient-mid: #YOUR_SECONDARY_COLOR;
  --logo-gradient-end: #YOUR_ACCENT_COLOR;
}
```

### Example

If your logo has:
- Main color: Blue (#1a73e8)
- Secondary color: Green (#34a853)
- Accent color: Red (#ea4335)

Update the CSS like this:

```css
:root {
  --logo-primary: #1a73e8;
  --logo-secondary: #34a853;
  --logo-accent: #ea4335;
  --logo-dark: #0d47a1;
  --logo-light: #4285f4;
  --logo-gradient-start: #1a73e8;
  --logo-gradient-mid: #34a853;
  --logo-gradient-end: #ea4335;
}
```

### Step 3: Restart Dev Server

After updating the colors, restart your development server to see the changes:

```bash
npm run dev
```

## Current Default Colors

The app currently uses these default colors (Google-inspired):
- Primary: #1a73e8 (Blue)
- Secondary: #34a853 (Green)
- Accent: #ea4335 (Red)

Update these to match your actual logo colors!




