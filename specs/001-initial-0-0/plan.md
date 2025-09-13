# Implementation Plan: Initial 0.0.1 Release - FluentPlus File Upload Core Components

**Branch**: `001-initial-0-0` | **Date**: September 6, 2025 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-initial-0-0/spec.md`

## Execution Flow (/plan command scope)
```
1. Load feature spec from Input path
   → If not found: ERROR "No feature spec at {path}"
2. Fill Technical Context (scan for NEEDS CLARIFICATION)
   → Detect Project Type from context (web=frontend+backend, mobile=app+api)
   → Set Structure Decision based on project type
3. Evaluate Constitution Check section below
   → If violations exist: Document in Complexity Tracking
   → If no justification possible: ERROR "Simplify approach first"
   → Update Progress Tracking: Initial Constitution Check
4. Execute Phase 0 → research.md
   → If NEEDS CLARIFICATION remain: ERROR "Resolve unknowns"
5. Execute Phase 1 → contracts, data-model.md, quickstart.md, agent-specific template file (e.g., `CLAUDE.md` for Claude Code, `.github/copilot-instructions.md` for GitHub Copilot, or `GEMINI.md` for Gemini CLI).
6. Re-evaluate Constitution Check section
   → If new violations: Refactor design, return to Phase 1
   → Update Progress Tracking: Post-Design Constitution Check
7. Plan Phase 2 → Describe task generation approach (DO NOT create tasks.md)
8. STOP - Ready for /tasks command
```

**IMPORTANT**: The /plan command STOPS at step 7. Phases 2-4 are executed by other commands:
- Phase 2: /tasks command creates tasks.md
- Phase 3-4: Implementation execution (manual or via tools)

## Summary
Create initial 0.0.1 release of FluentPlus file upload components providing three composable core components (FileUpload, FileList, FileItem) that extend Fluent UI v9 capabilities. Technical approach uses react-dropzone for drag-and-drop functionality with slot-based architecture following Fluent UI v9 patterns. Components will be distributed as @fluent-plus/file-upload@0.0.1 and re-exported through @fluent-plus/react-components@0.0.1 packages.

## Technical Context
**Language/Version**: TypeScript 5.2+, React 18+ with modern JSX transform  
**Primary Dependencies**: @fluentui/react-components v9, react-dropzone 14.x, React 18+  
**Storage**: N/A - Component library with external state management  
**Testing**: Jest 29+ with React Testing Library, @testing-library/jest-dom for accessibility testing  
**Target Platform**: Modern browsers (ES2020+), Node.js 18+ for build tools
**Project Type**: Component library (specialized variant of single project)  
**Performance Goals**: <50ms component render time, tree-shakeable exports, <10KB gzipped per component  
**Constraints**: Zero runtime dependencies beyond react-dropzone, WCAG 2.1 AA accessibility compliance, full Fluent UI v9 theme compatibility  
**Scale/Scope**: 3 core components, comprehensive Storybook documentation, full TypeScript definitions

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 2 (component library package + re-export package) (max 3 ✓)
- Using framework directly? Yes - direct Fluent UI v9 usage without wrapper classes ✓
- Single data model? Yes - file data structure passed via props, no internal DTOs ✓
- Avoiding patterns? Yes - no Repository/UoW patterns, simple component props/state ✓

**Architecture**:
- EVERY feature as library? Yes - @fluent-plus/file-upload as standalone library ✓
- Libraries listed: [@fluent-plus/file-upload (file upload components), @fluent-plus/react-components (re-export convenience)] ✓
- CLI per library: N/A - Component libraries don't require CLIs ✓
- Library docs: Yes - llms.txt format planned via Storybook and TypeScript definitions ✓

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Yes - tests written first, must fail before implementation ✓
- Git commits show tests before implementation? Yes - TDD workflow enforced ✓
- Order: Contract→Integration→E2E→Unit strictly followed? Yes - Component tests → Integration → Visual (Storybook) → Unit ✓
- Real dependencies used? Yes - actual React components, real DOM testing ✓
- Integration tests for: Yes - new library components, component composition, accessibility patterns ✓
- FORBIDDEN: Implementation before test, skipping RED phase ✓

**Observability**:
- Structured logging included? N/A - Component library with prop-based state, no server logging ✓
- Frontend logs → backend? N/A - Pure component library ✓
- Error context sufficient? Yes - TypeScript types and prop validation provide error context ✓

**Versioning**:
- Version number assigned? Yes - 0.0.1 (MAJOR.MINOR.BUILD) ✓
- BUILD increments on every change? Yes - semver compliance planned ✓
- Breaking changes handled? Yes - initial release, future breaking changes via major version ✓

## Project Structure

### Documentation (this feature)
```
specs/[###-feature]/
├── plan.md              # This file (/plan command output)
├── research.md          # Phase 0 output (/plan command)
├── data-model.md        # Phase 1 output (/plan command)
├── quickstart.md        # Phase 1 output (/plan command)
├── contracts/           # Phase 1 output (/plan command)
└── tasks.md             # Phase 2 output (/tasks command - NOT created by /plan)
```

### Source Code (repository root)
```
# Nx Monorepo Structure (FluentPlus) - Existing and New
packages/
├── file-upload/                 # ✅ EXISTING PACKAGE (requires bundler migration)
│   ├── library/                 # Main component library (existing)
│   │   ├── src/
│   │   │   ├── file-upload/     # FileUpload component (generated + extended)
│   │   │   │   ├── file-upload.tsx                    # ✅ Generated - extend with implementation
│   │   │   │   ├── file-upload.types.ts               # ✅ Generated - extend with props/slots
│   │   │   │   ├── file-upload.test.tsx               # 🆕 Component tests
│   │   │   │   ├── use-file-upload.ts                 # ✅ Generated - extend with state logic
│   │   │   │   ├── render-file-upload.tsx             # ✅ Generated - extend with JSX/slots
│   │   │   │   ├── use-file-upload-styles.ts          # ✅ Generated - extend with styling
│   │   │   │   └── index.ts                           # ✅ Generated - exports component
│   │   │   ├── file-list/       # FileList component (generated + extended)
│   │   │   │   ├── file-list.tsx                      # ✅ Generated - extend with implementation
│   │   │   │   ├── file-list.types.ts                 # ✅ Generated - extend with props/slots
│   │   │   │   ├── file-list.test.tsx                 # 🆕 Component tests
│   │   │   │   ├── use-file-list.ts                   # ✅ Generated - extend with state logic
│   │   │   │   ├── render-file-list.tsx               # ✅ Generated - extend with JSX/slots
│   │   │   │   ├── use-file-list-styles.ts            # ✅ Generated - extend with styling
│   │   │   │   └── index.ts                           # ✅ Generated - exports component
│   │   │   ├── file-item/       # FileItem component (generated + extended)
│   │   │   │   ├── file-item.tsx                      # ✅ Generated - extend with implementation
│   │   │   │   ├── file-item.types.ts                 # ✅ Generated - extend with props/slots
│   │   │   │   ├── file-item.test.tsx                 # 🆕 Component tests
│   │   │   │   ├── use-file-item.ts                   # ✅ Generated - extend with state logic
│   │   │   │   ├── render-file-item.tsx               # ✅ Generated - extend with JSX/slots
│   │   │   │   ├── use-file-item-styles.ts            # ✅ Generated - extend with styling
│   │   │   │   └── index.ts                           # ✅ Generated - exports component
│   │   │   ├── shared/          # 🆕 Additional - create as needed
│   │   │   │   ├── types.ts                           # FileEntity, FileStatus, etc.
│   │   │   │   └── utils.ts                           # File validation utilities
│   │   │   └── index.ts         # ✅ Generated - extend with exports
│   │   └── package.json         # @fluent-plus/file-upload (migrate to rollup)
│   └── stories/                 # Storybook documentation (existing)
│       ├── src/
│       │   └── file-upload/     # Component stories (generated + extended)
│       │       ├── index.stories.ts                       # ✅ Generated - exports in display order
│       │       ├── default.stories.tsx                    # ✅ Generated - basic usage story
│       │       ├── file-upload/                           # Self-contained story files
│       │       │   ├── file-upload-default.stories.tsx    # ✅ Generated - extend with basic scenarios
│       │       │   ├── file-upload-slots.stories.tsx      # 🆕 Individual slot customizations
│       │       │   ├── file-upload-props.stories.tsx      # 🆕 Individual prop variations
│       │       │   ├── file-upload-constraints.stories.tsx # 🆕 Validation and constraint scenarios
│       │       │   ├── file-upload-states.stories.tsx     # 🆕 Component state variations
│       │       │   ├── file-upload-events.stories.tsx     # 🆕 Event handling demonstrations
│       │       │   ├── file-upload-drag-drop.stories.tsx  # 🆕 Drag and drop specific scenarios
│       │       │   ├── file-upload-accessibility.stories.tsx # 🆕 A11y focused examples
│       │       │   └── file-upload-edge-cases.stories.tsx # 🆕 Error states and edge cases
│       │       ├── file-list/                             # Self-contained story files
│       │       │   ├── file-list-default.stories.tsx      # ✅ Generated - extend with basic scenarios
│       │       │   ├── file-list-slots.stories.tsx        # 🆕 Slot customization examples
│       │       │   ├── file-list-props.stories.tsx        # 🆕 Individual prop demonstrations
│       │       │   ├── file-list-layouts.stories.tsx      # 🆕 Layout variations (list, grid)
│       │       │   ├── file-list-selection.stories.tsx    # 🆕 Selection state management
│       │       │   ├── file-list-sorting.stories.tsx      # 🆕 Sorting functionality
│       │       │   ├── file-list-filtering.stories.tsx    # 🆕 Filtering demonstrations
│       │       │   ├── file-list-virtualization.stories.tsx # 🆕 Large list handling
│       │       │   └── file-list-accessibility.stories.tsx # 🆕 A11y keyboard navigation
│       │       ├── file-item/                             # Self-contained story files
│       │       │   ├── file-item-default.stories.tsx      # ✅ Generated - extend with basic scenarios
│       │       │   ├── file-item-slots.stories.tsx        # 🆕 All slot customizations
│       │       │   ├── file-item-props.stories.tsx        # 🆕 Individual prop variations
│       │       │   ├── file-item-status-states.stories.tsx # 🆕 All status variations
│       │       │   ├── file-item-progress.stories.tsx     # 🆕 Progress indicator variations
│       │       │   ├── file-item-actions.stories.tsx      # 🆕 Action button scenarios
│       │       │   ├── file-item-variants.stories.tsx     # 🆕 Visual variant demonstrations
│       │       │   ├── file-item-file-types.stories.tsx   # 🆕 Different file type displays
│       │       │   ├── file-item-errors.stories.tsx       # 🆕 Error state handling
│       │       │   └── file-item-accessibility.stories.tsx # 🆕 A11y focus and screen reader
│       │       ├── composition/                           # Self-contained story files
│       │       │   ├── basic-composition.stories.tsx      # 🆕 Simple component combinations
│       │       │   ├── advanced-composition.stories.tsx   # 🆕 Complex multi-component usage
│       │       │   ├── controlled-uncontrolled.stories.tsx # 🆕 State management patterns
│       │       │   └── form-integration.stories.tsx       # 🆕 Form library integration
│       │       ├── patterns/                              # Self-contained story files
│       │       │   ├── upload-workflows.stories.tsx       # 🆕 Complete upload scenarios
│       │       │   ├── validation-patterns.stories.tsx    # 🆕 Validation strategy examples
│       │       │   ├── customization-patterns.stories.tsx # 🆕 Common customization needs
│       │       │   └── integration-patterns.stories.tsx   # 🆕 Backend integration examples
│       │       └── research/                              # Self-contained story files
│       │           ├── design-system-alignment.stories.tsx # 🆕 Fluent UI design token usage
│       │           ├── performance-scenarios.stories.tsx  # 🆕 Large file handling
│       │           └── browser-compatibility.stories.tsx  # 🆕 Cross-browser scenarios
│       └── package.json         # (existing)
└── react-components/            # 🆕 NEW PACKAGE TO GENERATE
    ├── library/                 # Generated with rollup bundler
    │   ├── src/
    │   │   └── index.ts         # ✅ Generated - extend with re-exports from @fluent-plus/file-upload
    │   ├── package.json         # ✅ Generated - @fluent-plus/react-components
    │   ├── README.md            # ✅ Generated - extend with usage
    │   └── project.json         # ✅ Generated - Nx configuration
    └── package.json             # Nx project configuration

apps/
└── public-docsite/             # Storybook build and documentation site (existing)
```

**Structure Decision**: 
- **Existing**: file-upload package already set up, need to implement components and migrate from vite to rollup bundler
- **New**: react-components package needs to be generated with rollup bundler for re-exports

## Phase 0: Package Structure Transition (Prerequisites - Sequential)
1. **Backup Research Assets**: Save `packages/file-upload/stories/src/file-upload/study.mdx` and document custom content
2. **Update react-lib Generator**: Modify `tools/workspace-plugin/src/generators/react-lib/react-lib.ts` to use rollup bundler
3. **Clean Package Recreation**: Delete existing file-upload directory, clean references, regenerate with rollup
4. **Validation**: Verify rollup configuration and test build process

## Phase 1: Package Setup (Sequential)
1. Generate react-components package: `nx g @nx/react:library react-components --directory=packages --importPath=@fluent-plus/react-components --publishable --bundler=rollup`
2. Generate FileUpload component: `nx g @fluent-plus/workspace-plugin:react-component --name file-upload --project file-upload`
3. Generate FileList component: `nx g @fluent-plus/workspace-plugin:react-component --name file-list --project file-upload`
4. Generate FileItem component: `nx g @fluent-plus/workspace-plugin:react-component --name file-item --project file-upload`

## Phase 1: Design & Contracts
*Prerequisites: research.md complete*

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Generate contract tests** from contracts:
   - One test file per endpoint
   - Assert request/response schemas
   - Tests must fail (no implementation yet)

4. **Extract test scenarios** from user stories:
   - Each story → integration test scenario
   - Quickstart test = story validation steps

5. **Update agent file incrementally** (O(1) operation):
   - Run `/scripts/update-agent-context.sh [claude|gemini|copilot]` for your AI assistant
   - If exists: Add only NEW tech from current plan
   - Preserve manual additions between markers
   - Update recent changes (keep last 3)
   - Keep under 150 lines for token efficiency
   - Output to repository root

**Output**: data-model.md, /contracts/*, failing tests, quickstart.md, agent-specific file

## Phase 2: Task Planning Approach
*This section describes what the /tasks command will do - DO NOT execute during /plan*

**Task Generation Strategy**:
- Load `/templates/tasks-template.md` as base template
- Generate tasks from Phase 1 design docs (contracts/, data-model.md, quickstart.md)
- Create component-specific test tasks:
  * FileUpload component contract tests (located: file-upload.test.tsx) [P]
  * FileList component contract tests (located: file-list.test.tsx) [P] 
  * FileItem component contract tests (located: file-item.test.tsx) [P]
- Generate library setup tasks:
  * Create @fluent-plus/file-upload package structure [P]
  * Create @fluent-plus/react-components re-export package [P]
  * Setup Nx workspace configuration for packages
- Create component implementation tasks:
  * FileUpload implementation to pass contract tests
  * FileList implementation to pass contract tests
  * FileItem implementation to pass contract tests
- Generate Storybook documentation tasks:
  * FileUpload stories with all slots and variations
  * FileList stories with semantic options
  * FileItem stories with all status states
- Add integration and accessibility testing tasks:
  * Component composition integration tests
  * WCAG 2.1 AA accessibility compliance tests
  * Keyboard navigation test scenarios

**Ordering Strategy**:
- TDD order: Contract tests → Implementation → Integration tests → Documentation
- Dependency order: Package setup → Component models → Component logic → Component UI → Storybook
- Mark [P] for parallel execution when tasks operate on independent files/components
- Group related tasks for efficient development workflow

**Component Library Specific Considerations**:
- Each component will have failing contract tests written first (RED phase)
- Implementation tasks focused on making tests pass (GREEN phase)
- Storybook stories serve as living documentation and visual testing
- TypeScript definition validation throughout development
- react-dropzone integration testing for FileUpload component

**Estimated Output**: 
- 35-40 numbered, ordered tasks in tasks.md
- 15 TDD test tasks (contract + integration + accessibility, located with components)
- 12 implementation tasks (components + utilities)
- 8 documentation tasks (Storybook stories + TypeScript definitions)
- 5 package setup and configuration tasks

**Quality Gates**:
- All contract tests must fail before implementation begins
- Each component must pass its contract tests before moving to next component
- Accessibility tests must pass before marking component complete
- Storybook stories must render without errors
- TypeScript compilation must succeed with strict mode

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan

## Phase 3+: Future Implementation
*These phases are beyond the scope of the /plan command*

**Phase 3**: Task execution (/tasks command creates tasks.md)  
**Phase 4**: Implementation (execute tasks.md following constitutional principles)  
**Phase 5**: Validation (run tests, execute quickstart.md, performance validation)

## Complexity Tracking
*Fill ONLY if Constitution Check has violations that must be justified*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |


## Progress Tracking
*This checklist is updated during execution flow*

**Phase Status**:
- [x] Phase 0: Research complete (/plan command)
- [x] Phase 1: Design complete (/plan command)
- [x] Phase 2: Task planning complete (/plan command - describe approach only)
- [x] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [ ] Complexity deviations documented

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*