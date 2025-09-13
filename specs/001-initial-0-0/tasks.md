````markdown
# Tasks: Initial 0.0.1 Release - FluentPlus File Upload Core Components

**Input**: Design documents from `/specs/001-initial-0-0/`
**Prerequisites**: plan.md (required), research.md, quickstart.md

## Execution Flow (main)
```
1. Load plan.md from feature directory
   → Extract: TypeScript 5.2+, React 18+, Fluent UI v9, react-dropzone
   → Structure: Nx monorepo with file-upload package (existing) + react-components package (new)
2. Load design documents:
   → research.md: Component architecture, react-dropzone integration, slot-based patterns
   → quickstart.md: Component composition patterns, usage scenarios
3. Generate tasks by category:
   → Setup: Package migration (vite→rollup), new package generation, dependencies
   → Tests: Component contract tests for FileUpload, FileList, FileItem (TDD)
   → Core: Component implementations with hooks, styles, rendering logic
   → Integration: Component composition, accessibility validation
   → Polish: Storybook stories, TypeScript validation, package builds
4. Apply task rules:
   → Different files = mark [P] for parallel
   → Same file = sequential (no [P])
   → Tests before implementation (TDD)
5. Number tasks sequentially (T001, T002...)
6. Generate dependency graph
7. Create parallel execution examples
8. Validate task completeness:
   → All components have contract tests?
   → All component files implemented?
   → All Storybook stories created?
9. Return: SUCCESS (tasks ready for execution)
```

## Format: `[ID] [P?] Description`
- **[P]**: Can run in parallel (different files, no dependencies)
- Include exact file paths in descriptions

## Path Conventions
- **Nx Monorepo Structure**: `packages/file-upload/library/src/`, `packages/react-components/library/src/`
- **Stories**: `packages/file-upload/stories/src/file-upload/`
- Paths are absolute from repository root

## Phase 3.1: Setup & Package Structure
- [x] T001 Backup existing research assets from packages/file-upload/stories/src/file-upload/study.mdx
- [x] T002 Update react-lib generator in tools/workspace-plugin/src/generators/react-lib/react-lib.ts to use rollup bundler
- [x] T003 Delete existing file-upload package directory and clean references for fresh rollup-based generation
- [x] T004 Generate new file-upload package with rollup: `nx g @fluent-plus/workspace-plugin:react-lib --name file-upload`
- [x] T005 Generate react-components package: `nx g @nx/react:library react-components --directory=packages/react-components --importPath=@fluent-plus/react-components --publishable --bundler=rollup`
- [x] T006 Install react-dropzone dependency in file-upload package: `cd packages/file-upload/library && npm install react-dropzone@14.x`
- [x] T007 - Generate all components scaffolding using `nx g @fluent-plus/workspace-plugin:react-component --name {component-name} --project file-upload` for FileUpload, FileList, FileItem
- [x] T008 - removed

## Phase 3.2: Tests First (TDD) ⚠️ MUST COMPLETE BEFORE 3.3
**CRITICAL: These tests MUST be written and MUST FAIL before ANY implementation**
- [ ] T009 [P] FileUpload component contract test in packages/file-upload/library/src/file-upload/file-upload.test.tsx
- [ ] T010 [P] FileList component contract test in packages/file-upload/library/src/file-list/file-list.test.tsx
- [ ] T011 [P] FileItem component contract test in packages/file-upload/library/src/file-item/file-item.test.tsx
- [ ] T012 [P] Shared types contract test in packages/file-upload/library/src/shared/types.test.ts
- [ ] T013 [P] File validation utilities contract test in packages/file-upload/library/src/shared/utils.test.ts
- [ ] T014 Component composition integration test in packages/file-upload/library/src/integration.test.tsx
- [ ] T015 Accessibility compliance test in packages/file-upload/library/src/accessibility.test.tsx

## Phase 3.3: Core Implementation (ONLY after tests are failing)

### Shared Infrastructure
- [ ] T016 [P] FileEntity and FileStatus types in packages/file-upload/library/src/shared/types.ts
- [ ] T017 [P] File validation utilities in packages/file-upload/library/src/shared/utils.ts
- [ ] T018 [P] Shared constants and enums in packages/file-upload/library/src/shared/constants.ts

### FileUpload Component Implementation
- [ ] T019 [P] FileUpload props and slots interfaces in packages/file-upload/library/src/file-upload/file-upload.types.ts
- [ ] T020 [P] FileUpload state management hook in packages/file-upload/library/src/file-upload/use-file-upload.ts
- [ ] T021 [P] FileUpload styling hook with Fluent UI v9 tokens in packages/file-upload/library/src/file-upload/use-file-upload-styles.ts
- [ ] T022 FileUpload JSX rendering logic with react-dropzone integration in packages/file-upload/library/src/file-upload/render-file-upload.tsx
- [ ] T023 FileUpload main component in packages/file-upload/library/src/file-upload/file-upload.tsx
- [ ] T024 FileUpload component exports in packages/file-upload/library/src/file-upload/index.ts

### FileList Component Implementation
- [ ] T025 [P] FileList props and slots interfaces in packages/file-upload/library/src/file-list/file-list.types.ts
- [ ] T026 [P] FileList state management hook in packages/file-upload/library/src/file-list/use-file-list.ts
- [ ] T027 [P] FileList styling hook with semantic layout support in packages/file-upload/library/src/file-list/use-file-list-styles.ts
- [ ] T028 FileList JSX rendering logic with semantic HTML in packages/file-upload/library/src/file-list/render-file-list.tsx
- [ ] T029 FileList main component in packages/file-upload/library/src/file-list/file-list.tsx
- [ ] T030 FileList component exports in packages/file-upload/library/src/file-list/index.ts

### FileItem Component Implementation
- [ ] T031 [P] FileItem props and slots interfaces in packages/file-upload/library/src/file-item/file-item.types.ts
- [ ] T032 [P] FileItem state management hook in packages/file-upload/library/src/file-item/use-file-item.ts
- [ ] T033 [P] FileItem styling hook with status variations in packages/file-upload/library/src/file-item/use-file-item-styles.ts
- [ ] T034 FileItem JSX rendering logic with progress support in packages/file-upload/library/src/file-item/render-file-item.tsx
- [ ] T035 FileItem main component in packages/file-upload/library/src/file-item/file-item.tsx
- [ ] T036 FileItem component exports in packages/file-upload/library/src/file-item/index.ts

### Package Integration
- [ ] T037 Main package exports in packages/file-upload/library/src/index.ts
- [ ] T038 React-components re-exports in packages/react-components/library/src/index.ts

## Phase 3.4: Integration & Accessibility
- [ ] T039 Component composition validation test in packages/file-upload/library/src/integration.test.tsx (make pass)
- [ ] T040 WCAG 2.1 AA accessibility compliance test in packages/file-upload/library/src/accessibility.test.tsx (make pass)
- [ ] T041 Keyboard navigation integration (Tab, Enter, Space) across components
- [ ] T042 Screen reader support with ARIA labels and live regions
- [ ] T043 High contrast mode compatibility validation
- [ ] T044 Focus management integration between components

## Phase 3.5: Storybook Documentation

### FileUpload Stories
- [ ] T045 [P] FileUpload default usage story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-default.stories.tsx
- [ ] T046 [P] FileUpload slots customization story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-slots.stories.tsx
- [ ] T047 [P] FileUpload props variations story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-props.stories.tsx
- [ ] T048 [P] FileUpload constraints and validation story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-constraints.stories.tsx
- [ ] T049 [P] FileUpload drag-and-drop scenarios story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-drag-drop.stories.tsx
- [ ] T050 [P] FileUpload accessibility examples story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-accessibility.stories.tsx
- [ ] T051 [P] FileUpload error states and edge cases story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-edge-cases.stories.tsx

### FileList Stories
- [ ] T052 [P] FileList default usage story in packages/file-upload/stories/src/file-upload/file-list/file-list-default.stories.tsx
- [ ] T053 [P] FileList slots customization story in packages/file-upload/stories/src/file-upload/file-list/file-list-slots.stories.tsx
- [ ] T054 [P] FileList layout variations story in packages/file-upload/stories/src/file-upload/file-list/file-list-layouts.stories.tsx
- [ ] T055 [P] FileList selection management story in packages/file-upload/stories/src/file-upload/file-list/file-list-selection.stories.tsx
- [ ] T056 [P] FileList accessibility navigation story in packages/file-upload/stories/src/file-upload/file-list/file-list-accessibility.stories.tsx

### FileItem Stories
- [ ] T057 [P] FileItem default usage story in packages/file-upload/stories/src/file-upload/file-item/file-item-default.stories.tsx
- [ ] T058 [P] FileItem slots customization story in packages/file-upload/stories/src/file-upload/file-item/file-item-slots.stories.tsx
- [ ] T059 [P] FileItem status states story in packages/file-upload/stories/src/file-upload/file-item/file-item-status-states.stories.tsx
- [ ] T060 [P] FileItem progress indicator story in packages/file-upload/stories/src/file-upload/file-item/file-item-progress.stories.tsx
- [ ] T061 [P] FileItem file types display story in packages/file-upload/stories/src/file-upload/file-item/file-item-file-types.stories.tsx
- [ ] T062 [P] FileItem accessibility features story in packages/file-upload/stories/src/file-upload/file-item/file-item-accessibility.stories.tsx

### Composition and Pattern Stories
- [ ] T063 [P] Basic component composition story in packages/file-upload/stories/src/file-upload/composition/basic-composition.stories.tsx
- [ ] T064 [P] Advanced multi-component usage story in packages/file-upload/stories/src/file-upload/composition/advanced-composition.stories.tsx
- [ ] T065 [P] Controlled vs uncontrolled patterns story in packages/file-upload/stories/src/file-upload/composition/controlled-uncontrolled.stories.tsx
- [ ] T066 [P] Upload workflow patterns story in packages/file-upload/stories/src/file-upload/patterns/upload-workflows.stories.tsx
- [ ] T067 [P] Validation patterns story in packages/file-upload/stories/src/file-upload/patterns/validation-patterns.stories.tsx
- [ ] T068 [P] Integration patterns story in packages/file-upload/stories/src/file-upload/patterns/integration-patterns.stories.tsx

### Story Index Files
- [ ] T069 Story exports index in packages/file-upload/stories/src/file-upload/index.stories.ts
- [ ] T070 Default story collection in packages/file-upload/stories/src/file-upload/default.stories.tsx

## Phase 3.6: Polish & Validation
- [ ] T071 [P] TypeScript strict mode validation for all component files
- [ ] T072 [P] ESLint compliance validation for all source files
- [ ] T073 [P] Jest configuration validation for test coverage
- [ ] T074 Build file-upload package: `nx build file-upload`
- [ ] T075 Build react-components package: `nx build react-components`
- [ ] T076 [P] Verify tree-shaking exports work correctly
- [ ] T077 [P] Validate bundle size targets (<10KB gzipped per component)
- [ ] T078 Run complete test suite: `nx test file-upload`
- [ ] T079 Build Storybook documentation: `nx build-storybook file-upload`
- [ ] T080 Validate quickstart.md examples work with built packages
- [ ] T081 Performance validation (<50ms component render time)
- [ ] T082 Update .github/copilot-instructions.md with completion status

## Dependencies
```
Setup (T001-T008) 
  ↓
Tests (T009-T015) MUST FAIL before implementation
  ↓
Shared Infrastructure (T016-T018) blocks Component Implementation
  ↓
Component Implementation:
  - FileUpload (T019-T024)
  - FileList (T025-T030) 
  - FileItem (T031-T036)
  ↓
Package Integration (T037-T038)
  ↓
Integration & Accessibility (T039-T044)
  ↓
Storybook Documentation (T045-T070)
  ↓
Polish & Validation (T071-T082)
```

## Parallel Execution Examples

### Phase 3.2 - Contract Tests (All parallel)
```bash
# Launch T009-T013 together (different component files):
Task: "FileUpload component contract test in packages/file-upload/library/src/file-upload/file-upload.test.tsx"
Task: "FileList component contract test in packages/file-upload/library/src/file-list/file-list.test.tsx"  
Task: "FileItem component contract test in packages/file-upload/library/src/file-item/file-item.test.tsx"
Task: "Shared types contract test in packages/file-upload/library/src/shared/types.test.ts"
Task: "File validation utilities contract test in packages/file-upload/library/src/shared/utils.test.ts"
```

### Phase 3.3 - Component Files (Many parallel)
```bash
# Component types and interfaces (T019, T025, T031 parallel):
Task: "FileUpload props and slots interfaces in packages/file-upload/library/src/file-upload/file-upload.types.ts"
Task: "FileList props and slots interfaces in packages/file-upload/library/src/file-list/file-list.types.ts"
Task: "FileItem props and slots interfaces in packages/file-upload/library/src/file-item/file-item.types.ts"

# Component hooks (T020, T026, T032 parallel):
Task: "FileUpload state management hook in packages/file-upload/library/src/file-upload/use-file-upload.ts"
Task: "FileList state management hook in packages/file-upload/library/src/file-list/use-file-list.ts"
Task: "FileItem state management hook in packages/file-upload/library/src/file-item/use-file-item.ts"
```

### Phase 3.5 - Storybook Stories (Most parallel)
```bash
# All default stories (T045, T052, T057 parallel):
Task: "FileUpload default usage story in packages/file-upload/stories/src/file-upload/file-upload/file-upload-default.stories.tsx"
Task: "FileList default usage story in packages/file-upload/stories/src/file-upload/file-list/file-list-default.stories.tsx"
Task: "FileItem default usage story in packages/file-upload/stories/src/file-upload/file-item/file-item-default.stories.tsx"

# Component-specific story categories can run in parallel within each component
```

## Notes
- [P] tasks = different files, no dependencies, can run simultaneously
- **CRITICAL**: All contract tests (T009-T015) must fail before starting implementation
- Verify each failing test before implementing corresponding functionality
- Commit after each task completion for clean git history
- FileUpload component requires react-dropzone integration in render logic
- All components must follow Fluent UI v9 slot-based architecture patterns
- Storybook stories serve as both documentation and visual testing
- Accessibility tests validate WCAG 2.1 AA compliance requirements

## Task Generation Rules Applied

1. **From Plan Requirements**:
   - Each component → contract test task [P] + implementation tasks
   - Package migration → setup tasks (sequential for safety)
   - Storybook requirements → comprehensive story tasks [P]
   
2. **From Component Architecture**:
   - 3 components × 6 files each = 18 implementation tasks
   - Shared utilities → 3 infrastructure tasks [P]
   - Package structure → 2 integration tasks

3. **From TDD Requirements**:
   - Contract tests first → 7 test tasks that must fail
   - Implementation second → 24 implementation tasks
   - Integration validation → 6 accessibility/integration tasks

4. **Ordering Logic**:
   - Setup → Tests → Infrastructure → Implementation → Integration → Documentation → Polish
   - Dependencies prevent unsafe parallel execution
   - Different files enable safe parallel execution [P]

## Validation Checklist
**GATE: All must be checked before declaring tasks complete**

- [x] All components (FileUpload, FileList, FileItem) have contract tests
- [x] All component files (.tsx, .types.ts, hooks, styles) have implementation tasks  
- [x] All contract tests come before corresponding implementation
- [x] Parallel tasks [P] operate on truly independent files
- [x] Each task specifies exact absolute file path
- [x] No task modifies same file as another [P] task
- [x] Package setup tasks come before component tasks
- [x] Integration tasks come after all implementation
- [x] Storybook documentation covers all required scenarios
- [x] Polish tasks validate final quality requirements
- [x] Dependencies are clearly documented and enforced
- [x] Parallel execution examples demonstrate safe concurrency
````