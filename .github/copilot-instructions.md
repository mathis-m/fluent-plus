# fluent-plus Development Guidelines

Auto-generated from all feature plans. Last updated: 2025-09-06

## Active Technologies
- TypeScript 5.2+ + React 18+ with Fluent UI v9 (001-initial-0-0)

## Project Structure
```
# Nx Monorepo Structure
packages/                        # Component library packages
├── {component-name}/            # Individual component packages
│   ├── library/                 # Main component library
│   │   ├── src/
│   │   │   ├── {component}/     # Component implementation
│   │   │   │   ├── {component}.tsx              # Main component
│   │   │   │   ├── {component}.types.ts         # Props/slots interfaces
│   │   │   │   ├── {component}.test.tsx         # Component tests
│   │   │   │   ├── use-{component}.ts           # State management hook
│   │   │   │   ├── render-{component}.tsx       # JSX rendering logic
│   │   │   │   ├── use-{component}-styles.ts    # Styling hook
│   │   │   │   └── index.ts                     # Component exports
│   │   │   ├── shared/          # Shared utilities and types
│   │   │   └── index.ts         # Package main export
│   │   └── package.json         # @fluent-plus/{component-name}
│   └── stories/                 # Storybook documentation
│       ├── src/
│       │   └── {component}/     # Component stories
│       │       ├── index.stories.ts            # Story exports
│       │       ├── default.stories.tsx         # Basic usage
│       │       ├── {component}/                # Component-specific stories
│       │       ├── composition/                # Multi-component usage
│       │       ├── patterns/                   # Usage patterns
│       │       └── research/                   # Design exploration
│       └── package.json
└── react-components/            # Convenience re-export package
    └── library/
        ├── src/
        │   └── index.ts         # Re-exports from all component packages
        └── package.json         # @fluent-plus/react-components

apps/
└── public-docsite/             # Storybook build and documentation site

tools/
└── workspace-plugin/           # Nx generators and utilities

specs/                          # Feature specifications and plans
├── {feature-id}/
│   ├── spec.md                 # Feature requirements
│   ├── plan.md                 # Implementation plan
│   ├── research.md             # Technical research
│   ├── data-model.md           # Data structures
│   ├── quickstart.md           # Usage guide
│   ├── contracts/              # Component API contracts
│   └── tasks.md                # Implementation tasks

templates/                      # Project templates
assets/                         # Static assets (logos, etc.)
memory/                         # Project documentation and constitution
```

## Commands
```bash
# Component development
nx build {package-name}         # Build component package
nx test {package-name}          # Run component tests
nx lint {package-name}          # Lint component code
nx storybook {package-name}     # Start Storybook dev server

# Monorepo operations
nx build-storybook {package-name}  # Build static Storybook
nx affected:build               # Build affected packages
nx affected:test                # Test affected packages
nx affected:lint                # Lint affected packages
```

## Code Style
TypeScript: Follow Fluent UI v9 patterns with slot-based architecture
React: Functional components with hooks, strict TypeScript
Testing: Jest + React Testing Library with TDD approach
Storybook: Comprehensive documentation with accessibility examples

## Recent Changes
- 001-initial-0-0: Added  + 

<!-- MANUAL ADDITIONS START -->
<!-- MANUAL ADDITIONS END -->