# Refactoring Guide - V2 Redesign

**Branch:** `refactor/v2-redesign`  
**Created:** 2025-12-16  
**Strategy:** Incremental refactor

---

## Goals

1. **Modern Design System** - Unified tokens, consistent styling
2. **Better Component Architecture** - Separation of concerns, reusability
3. **Improved Performance** - Optimizations, lazy loading
4. **Enhanced DX** - Better TypeScript, documentation
5. **Mobile-First** - Responsive, touch-optimized

---

## Refactor Structure

### New Directories

```
components/
├── v2/                    # New refactored components
│   ├── core/             # Core UI primitives
│   ├── cards/            # Card-related components
│   ├── gallery/          # Gallery components
│   └── layout/           # Layout components
├── ui/                    # Keep shadcn/ui (existing)
└── [legacy]/             # Old components (gradual migration)

lib/
├── design-system/        # Design tokens and utilities
│   ├── tokens.ts         # Colors, spacing, typography
│   ├── animations.ts     # Animation utilities
│   └── breakpoints.ts    # Responsive utilities
└── hooks/                # Custom React hooks
```

---

## Migration Strategy

### Phase 1: Foundation (Current)
- [x] Create branch
- [ ] Set up design system tokens
- [ ] Create base component structure
- [ ] Refactor one example component

### Phase 2: Core Components
- [ ] Refactor card components
- [ ] Refactor gallery/deck components
- [ ] Update daily spread
- [ ] Migrate studio components

### Phase 3: Features
- [ ] Enhanced comment system
- [ ] Improved reactions
- [ ] Multiple card versions
- [ ] Better mobile UX

### Phase 4: Polish
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] Visual regression tests
- [ ] Documentation

---

## Design System Principles

### Colors
- Use HSL for better control
- Support light/dark modes seamlessly
- Semantic naming (primary, accent, success, etc.)

### Typography
- Fluid type scale
- Proper hierarchy
- Better readability

### Spacing
- Consistent spacing scale (4px base)
- Logical property names

### Components
- Compound components for flexibility
- Consistent API across components
- Accessible by default

---

## Next Steps

Run through Phase 1 checklist above, starting with design tokens.
