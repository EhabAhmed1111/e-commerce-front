# Styling System Documentation

## Overview

This Angular e-commerce platform uses a comprehensive, theme-based styling system built with SCSS. The styling architecture follows a modular approach with clear separation of concerns, making it easy to maintain and customize.

## File Structure

```
src/
├── styles.scss                 # Main global styles file
└── styles/
    ├── _theme.scss             # Core theme variables and configuration
    ├── _components.scss        # Component-specific theme variables
    └── _mixins.scss           # Reusable SCSS mixins and utilities
```

## Core Architecture

### 1. Theme System (`_theme.scss`)

The theme system is the foundation of the styling architecture. It defines all design tokens including:

#### Brand Colors
- **Primary Color**: `#6366f1` (Indigo) - Main brand color
- **Secondary Color**: `#d946ef` (Purple) - Supporting brand color  
- **Accent Color**: `#22c55e` (Green) - Call-to-action and success states

#### Background Colors
- **Primary**: `#ffffff` - Main background
- **Secondary**: `#f8fafc` - Cards and sections
- **Tertiary**: `#f1f5f9` - Subtle sections

#### Text Colors
- **Primary**: `#1e293b` - Headings and main content
- **Secondary**: `#64748b` - Descriptions and labels
- **Tertiary**: `#94a3b8` - Muted text and placeholders
- **Inverse**: `#ffffff` - White text for dark backgrounds

#### Status Colors
- **Success**: `#10b981` - Success messages and positive actions
- **Warning**: `#f59e0b` - Warnings and caution states
- **Error**: `#ef4444` - Errors and destructive actions
- **Info**: `#3b82f6` - Information and neutral states

#### Spacing Scale
- **xs**: `0.25rem` (4px)
- **sm**: `0.5rem` (8px)
- **md**: `1rem` (16px)
- **lg**: `1.5rem` (24px)
- **xl**: `2rem` (32px)
- **2xl**: `3rem` (48px)
- **3xl**: `4rem` (64px)

#### Typography
- **Font Family**: System fonts with fallbacks
- **Font Sizes**: From `0.75rem` (12px) to `2.25rem` (36px)
- **Font Weights**: Light (300) to Extra Bold (800)
- **Line Heights**: Tight (1.25), Normal (1.5), Relaxed (1.75)

#### Border Radius
- **sm**: `0.125rem` (2px)
- **md**: `0.375rem` (6px)
- **lg**: `0.5rem` (8px)
- **xl**: `0.75rem` (12px)
- **2xl**: `1rem` (16px)
- **full**: `9999px` (Fully rounded)

#### Shadows
- **sm**: Subtle shadow for cards
- **md**: Standard shadow for elevated elements
- **lg**: Prominent shadow for hover states
- **xl**: Strong shadow for modals
- **2xl**: Maximum shadow for overlays

#### Breakpoints
- **sm**: `640px` (Mobile landscape)
- **md**: `768px` (Tablet)
- **lg**: `1024px` (Desktop)
- **xl**: `1280px` (Large desktop)
- **2xl**: `1536px` (Extra large desktop)

### 2. Component Themes (`_components.scss`)

This file contains component-specific variables derived from the main theme:

#### Button Themes
- **Primary**: Brand color with white text
- **Secondary**: White background with brand color text
- **Accent**: Success color with white text
- **Ghost**: Transparent background
- **Danger**: Error color with white text

#### Input Themes
- Base styling for form inputs
- Focus states with brand color
- Error and success states
- Different sizes (sm, md, lg)

#### Card Themes
- Background and border colors
- Shadow definitions
- Padding variations

#### Form Themes
- Label styling
- Error and success message styling
- Hint text styling

### 3. Mixins (`_mixins.scss`)

Reusable SCSS mixins for consistent styling:

#### Button Mixins
- `@mixin button-base` - Base button styling
- `@mixin button-size($size)` - Size variations (sm, md, lg)
- `@mixin button-variant($variant)` - Color variants

#### Input Mixins
- `@mixin input-base` - Base input styling
- `@mixin input-size($size)` - Size variations

#### Typography Mixins
- `@mixin heading($level)` - Heading styles (h1-h6)
- `@mixin text($variant)` - Text variants (body, small, muted, caption)

#### Layout Mixins
- `@mixin container` - Responsive container
- `@mixin flex-center` - Centered flexbox
- `@mixin flex-between` - Space-between flexbox
- `@mixin flex-column` - Column flexbox
- `@mixin grid($columns, $gap)` - CSS Grid

#### Responsive Mixins
- `@mixin mobile-only` - Mobile-specific styles
- `@mixin tablet-up` - Tablet and up
- `@mixin desktop-up` - Desktop and up
- `@mixin large-desktop-up` - Large desktop and up

#### Utility Mixins
- `@mixin visually-hidden` - Screen reader only content
- `@mixin truncate` - Text truncation
- `@mixin fade-in($duration)` - Fade in animation
- `@mixin slide-up($duration)` - Slide up animation

## Global Styles (`styles.scss`)

The main styles file imports all theme files and applies global styles:

### Global Resets
- Box-sizing border-box for all elements
- Font smoothing and text size adjustment
- Base body styling with theme variables

### Typography System
- Heading styles using theme mixins
- Paragraph and small text styling
- Link styling with hover and focus states

### Form Elements
- Input, textarea, and select styling
- Button styling with theme variants
- Focus states and accessibility

### Utility Classes

#### Layout Utilities
- `.container` - Responsive container
- `.flex-center` - Centered flexbox
- `.flex-between` - Space-between flexbox
- `.flex-column` - Column flexbox

#### Text Utilities
- `.text-center`, `.text-left`, `.text-right` - Text alignment
- `.text-primary`, `.text-secondary`, `.text-muted`, `.text-inverse` - Text colors

#### Spacing Utilities
- `.m-0` to `.m-5` - Margin utilities
- `.p-0` to `.p-5` - Padding utilities

#### Background Utilities
- `.bg-primary`, `.bg-secondary`, `.bg-accent` - Background colors
- `.bg-success`, `.bg-warning`, `.bg-error` - Status background colors

#### Utility Classes
- `.visually-hidden` - Screen reader only
- `.truncate` - Text truncation

## Component Styling

### Component-Specific Styles

Each component can have its own SCSS file that imports the theme system:

```scss
@import '../../../../styles/theme';
@import '../../../../styles/components';
@import '../../../../styles/mixins';

.component-class {
  // Component-specific styles using theme variables
}
```

### Example: Register Component

The register component demonstrates the styling system in action:

#### Key Classes:
- `.register-container` - Full-height centered container with gradient background
- `.register-card` - Card component with theme-based styling
- `.register-form` - Form layout using flexbox mixins
- `.form-field` - Individual form field styling
- `.submit-button` - Custom button styling with PrimeNG overrides

#### Responsive Design:
- Uses responsive mixins for different breakpoints
- Mobile-first approach with progressive enhancement
- Tablet and desktop specific adjustments

#### Dark Mode Support:
- Media query for `prefers-color-scheme: dark`
- Automatic theme switching based on user preference

## PrimeNG Integration

The styling system integrates with PrimeNG components using `::ng-deep` selectors:

```scss
::ng-deep .p-button {
  // Override PrimeNG button styles
}

::ng-deep .p-inputtext {
  // Override PrimeNG input styles
}
```

This allows for consistent theming across custom components and PrimeNG components.

## Best Practices

### 1. Use Theme Variables
Always use theme variables instead of hardcoded values:
```scss
// Good
color: $text-primary;
padding: $spacing-md;

// Bad
color: #1e293b;
padding: 16px;
```

### 2. Use Mixins for Consistency
Leverage mixins for common patterns:
```scss
// Good
.my-button {
  @include button-base;
  @include button-variant(primary);
}

// Bad
.my-button {
  display: inline-flex;
  align-items: center;
  // ... many more properties
}
```

### 3. Responsive Design
Use responsive mixins for breakpoint-specific styles:
```scss
.component {
  // Mobile styles
  
  @include tablet-up {
    // Tablet and up styles
  }
  
  @include desktop-up {
    // Desktop and up styles
  }
}
```

### 4. Component Isolation
Import theme files in each component that needs styling:
```scss
@import '../../../../styles/theme';
@import '../../../../styles/components';
@import '../../../../styles/mixins';
```

### 5. Accessibility
Always include focus states and use semantic HTML:
```scss
.button {
  &:focus-visible {
    outline: 2px solid $border-focus;
    outline-offset: 2px;
  }
}
```

## Customization

### Changing Brand Colors
To change the brand colors, modify the variables in `_theme.scss`:

```scss
$primary-color: #your-color;
$secondary-color: #your-color;
$accent-color: #your-color;
```

### Adding New Components
1. Add component-specific variables to `_components.scss`
2. Create mixins in `_mixins.scss` if needed
3. Import theme files in your component SCSS

### Adding New Utilities
Add utility classes to `styles.scss` in the appropriate section.

## Performance Considerations

- SCSS files are compiled to CSS during build
- Theme variables are resolved at compile time
- Mixins are expanded at compile time
- No runtime CSS-in-JS overhead
- Tree-shaking removes unused styles

## Browser Support

The styling system supports modern browsers with CSS Grid, Flexbox, and CSS Custom Properties support:
- Chrome 60+
- Firefox 60+
- Safari 12+
- Edge 79+

## Conclusion

This styling system provides a robust foundation for building consistent, maintainable, and scalable user interfaces. The theme-based approach ensures design consistency while the mixin system promotes code reuse and reduces duplication.
