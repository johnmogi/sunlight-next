# V2 Core Components

This directory contains the **refactored core UI primitives** for the V2 redesign.

## Philosophy

- **Compound Components** - For flexible, composable APIs
- **Accessibility First** - WCAG AA compliant by default
- **Mobile Optimized** - Touch targets, responsive design
- **Performance** - Lazy loading, minimal re-renders
- **Design System** - Uses tokens from `lib/design-system`

## Structure

```
core/
├── Button/          # Button component with variants
├── Card/            # Card primitive (different from tarot cards)
├── Input/           # Form inputs
├── Modal/           # Dialog/modal system
└── ...
```

## Usage Example

```tsx
import { Button } from '@/components/v2/core/Button'
import { tokens } from '@/lib/design-system/tokens'

export function MyComponent() {
  return (
    <Button variant="primary" size="lg">
      Click me
    </Button>
  )
}
```

## Migration from Legacy

When refactoring an old component:
1. Copy to `v2/` directory
2. Update imports to use design tokens
3. Add accessibility features
4. Test thoroughly
5. Update parent components to use new version
6. Remove old component when migration complete
