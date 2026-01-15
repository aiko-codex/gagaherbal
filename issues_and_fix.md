# Issues and Fixes

## Issue: Fixed Header Not Working on Scroll Up

### Date: 2026-01-15

### Problem
The header with `position: fixed` was not appearing at the top of the viewport when scrolling up from the middle of the page. Instead, it remained stuck at the top of the document body.

### Root Cause
The `.high-quality-text` CSS class applied to the `<body>` element contained:
```css
transform: translateZ(0);
backface-visibility: hidden;
```

**Why this breaks `position: fixed`:**
In CSS, when any ancestor element has a `transform`, `filter`, or `perspective` property (even an identity transform like `translateZ(0)`), it creates a new **containing block** for all fixed-position descendants.

This means:
- Instead of being fixed to the **viewport**, the header became fixed to the **body**
- As the user scrolled down, the header stayed at the top of the body (which scrolled away) rather than the top of the screen
- When scrolling up, the header was physically located hundreds of pixels above the viewport

### Solution
Removed the transform-related properties from `.high-quality-text` in `app/globals.css`:

**Before:**
```css
@layer utilities {
  .high-quality-text {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    letter-spacing: 0.2px;
    backface-visibility: hidden;
    transform: translateZ(0);
    -webkit-text-stroke: 0.25px transparent;
  }
}
```

**After:**
```css
@layer utilities {
  .high-quality-text {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    letter-spacing: 0.2px;
  }
}
```

### Files Modified
- `app/globals.css`

### Key Takeaway
**Never apply `transform`, `filter`, or `perspective` to ancestor elements** (especially `body` or `html`) if you have fixed-position elements in your layout. These properties break the fixed positioning behavior by creating a new containing block.
