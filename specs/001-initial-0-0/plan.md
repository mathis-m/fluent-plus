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
Creating initial 0.0.1 npm release of FluentPlus package featuring core file upload components built on Fluent UI v9. The release provides three core composable components (FileUpload, FileList, FileItem) in the existing file-upload package, plus a new react-components re-export package following Fluent UI patterns. Components follow Fluent UI's slot-based architecture with full TypeScript support, accessibility compliance, and seamless design system integration. This establishes a solid foundation for the FluentPlus component library that fills gaps in Fluent UI v9's component catalog.

## Technical Context
**Language/Version**: TypeScript 4.9+, React 18+  
**Primary Dependencies**: Fluent UI v9 (@fluentui/react-components), react-dropzone for drag-and-drop functionality  
**Storage**: N/A (client-side component library)  
**Testing**: Jest with React Testing Library, Storybook for component documentation  
**Target Platform**: Web browsers (modern ES2020+ support)  
**Project Type**: web (React component library with Storybook documentation)  
**Performance Goals**: <100ms component render time, minimal bundle size impact  
**Constraints**: Full Fluent UI v9 design system compatibility, WCAG 2.1 AA accessibility compliance, tree-shakeable ESM/CommonJS builds  
**Scale/Scope**: 3 core components, ~15 total files, comprehensive Storybook documentation, Nx monorepo structure

**Additional Context**: This repository uses Nx setup. Components must follow Fluent UI v9 implementation best practices and code structure patterns. Research must include inputs from the related study found in packages\file-upload\stories\src\file-upload\study.mdx.

## Constitution Check
*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Simplicity**:
- Projects: 1 (component library package with Storybook documentation)
- Using framework directly? Yes (directly using Fluent UI v9 APIs and React patterns)
- Single data model? Yes (file entities with upload state)
- Avoiding patterns? Yes (no unnecessary abstractions, direct slot-based component composition)

**Architecture**:
- EVERY feature as library? Yes (existing file-upload library, new react-components re-export library)
- Libraries listed: 
  - @fluent-plus/file-upload: Core file upload components (FileUpload, FileList, FileItem) - existing package
  - @fluent-plus/react-components: Re-export package for convenient imports - to be generated
- CLI per library: N/A (component library, not CLI tools)
- Library docs: Storybook documentation following Fluent UI v9 patterns

**Testing (NON-NEGOTIABLE)**:
- RED-GREEN-Refactor cycle enforced? Yes (component tests written first)
- Git commits show tests before implementation? Yes (following TDD)
- Order: Contract→Integration→E2E→Unit strictly followed? Yes (component contracts, integration tests, unit tests)
- Real dependencies used? Yes (actual React DOM rendering, real Fluent UI components)
- Integration tests for: component composition, accessibility, Fluent UI integration
- FORBIDDEN: Implementation before test, skipping RED phase

**Observability**:
- Structured logging included? N/A (client-side component library)
- Frontend logs → backend? N/A (client-side only)
- Error context sufficient? Yes (component error boundaries and validation)

**Versioning**:
- Version number assigned? Yes (0.0.1 initial release)
- BUILD increments on every change? Yes (following semantic versioning)
- Breaking changes handled? N/A (initial release, future versions will follow semver)

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
│   │   │   │   ├── use-file-upload.ts                 # ✅ Generated - extend with state logic
│   │   │   │   ├── render-file-upload.tsx             # ✅ Generated - extend with JSX/slots
│   │   │   │   ├── use-file-upload-styles.ts          # ✅ Generated - extend with styling
│   │   │   │   └── index.ts                           # ✅ Generated - exports component
│   │   │   ├── file-list/       # FileList component (generated + extended)
│   │   │   │   ├── file-list.tsx                      # ✅ Generated - extend with implementation
│   │   │   │   ├── file-list.types.ts                 # ✅ Generated - extend with props/slots
│   │   │   │   ├── use-file-list.ts                   # ✅ Generated - extend with state logic
│   │   │   │   ├── render-file-list.tsx               # ✅ Generated - extend with JSX/slots
│   │   │   │   ├── use-file-list-styles.ts            # ✅ Generated - extend with styling
│   │   │   │   └── index.ts                           # ✅ Generated - exports component
│   │   │   ├── file-item/       # FileItem component (generated + extended)
│   │   │   │   ├── file-item.tsx                      # ✅ Generated - extend with implementation
│   │   │   │   ├── file-item.types.ts                 # ✅ Generated - extend with props/slots
│   │   │   │   ├── use-file-item.ts                   # ✅ Generated - extend with state logic
│   │   │   │   ├── render-file-item.tsx               # ✅ Generated - extend with JSX/slots
│   │   │   │   ├── use-file-item-styles.ts            # ✅ Generated - extend with styling
│   │   │   │   └── index.ts                           # ✅ Generated - exports component
│   │   │   ├── shared/          # 🆕 Additional - create as needed
│   │   │   │   ├── types.ts                           # FileEntity, FileStatus, etc.
│   │   │   │   └── utils.ts                           # File validation utilities
│   │   │   └── index.ts         # ✅ Generated - extend with exports
│   │   ├── package.json         # @fluent-plus/file-upload (migrate to rollup)
│   │   └── tests/               # Component tests (to be implemented)
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
- **New**: react-components package to be generated using `nx g @nx/react:library react-components --directory=packages --importPath=@fluent-plus/react-components --publishable --bundler=rollup`

## Phase 0: Outline & Research
*CRITICAL: Bundler Migration Prerequisites*

**Phase 0.1: Package Structure Transition (Prerequisites)**
The existing file-upload package was created with `bundler: "vite"` but libraries should use `bundler: "rollup"` for optimal publishing. This transition must be completed before implementation begins:

1. **Backup Research Assets**: 
   - Save `packages/file-upload/stories/src/file-upload/study.mdx` (contains valuable research)
   - Document any other custom content that needs preservation

2. **Update react-lib Generator**:
   - Modify `tools/workspace-plugin/src/generators/react-lib/react-lib.ts`
   - Change `bundler: "vite"` to `bundler: "rollup"` in the library generator call
   - This ensures future packages use rollup for proper library publishing

3. **Clean Package Recreation**:
   - Delete existing `packages/file-upload/` directory
   - Clean up `tsconfig.json` references to removed package paths (prevent generation failures)
   - Clean up any workspace references in `nx.json` or other configuration files
   - Run `npm install` to clean up package-lock.json and remove stale dependency links
   - Regenerate using updated react-lib generator: `nx g @fluent-plus/workspace-plugin:react-lib --name file-upload`
   - Restore the backed up `study.mdx` file to new structure

4. **Validation**:
   - Verify rollup configuration in generated `project.json`
   - Confirm package.json exports are properly configured for library publishing
   - Test build process: `nx build file-upload`

**Phase 0.2: Research Tasks**
1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:
   ```
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved, bundler migration completed

## Component Implementation Specifications

### FileUpload Component Architecture

**file-upload.types.ts** (Interface definitions):
```typescript
import type { ComponentProps, ComponentState, Slot } from '@fluentui/react-components';
import type { FileEntity, ValidationError } from '../shared/types';

export interface FileUploadSlots {
  root: Slot<'div'>;
  label?: Slot<'span'>;
  description?: Slot<'span'>;
  dropzone: Slot<'div'>;
  trigger?: Slot<'button'>;
  input: Slot<'input'>;
}

export interface FileUploadProps extends ComponentProps<Partial<FileUploadSlots>> {
  // Core functionality
  files?: File[];
  defaultFiles?: File[];
  onFilesChange?: (files: File[]) => void;
  
  // File constraints
  accept?: string;
  maxSize?: number;
  maxFiles?: number;
  multiple?: boolean;
  disabled?: boolean;
  
  // Validation
  validator?: (file: File) => ValidationError | null;
  
  // Callbacks
  onFileAdd?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (files: File[]) => void;
  
  // Accessibility
  'aria-label'?: string;
  'aria-describedby'?: string;
}

export interface FileUploadState extends ComponentState<FileUploadSlots> {
  files: FileEntity[];
  isDragActive: boolean;
  isDisabled: boolean;
  errors: ValidationError[];
  hasFiles: boolean;
  canAddFiles: boolean;
}
```

**use-file-upload.ts** (State management with react-dropzone integration):
- useControllableState for files management
- useDropzone integration for drag-and-drop functionality
- File validation logic with custom validator support
- FileEntity conversion from File objects
- Computed state properties (hasFiles, canAddFiles)

**use-file-upload-styles.ts** (Fluent UI styling patterns):
- makeStyles with Fluent UI design tokens
- Slot-based className merging with mergeClasses
- Responsive dropzone styling with hover/active states
- Accessibility-compliant visual indicators

**render-file-upload.tsx** (Slot-based JSX rendering):
- Slot resolution and prop distribution
- Conditional slot rendering based on state
- Button integration for trigger slot
- Input element for file selection

### FileList Component Architecture

**file-list.types.ts** (Interface definitions):
```typescript
export interface FileListSlots {
  root: Slot<'div'>;
  header?: Slot<'div'>;
  container: Slot<'div'>;
  item: Slot<'div'>;
  empty?: Slot<'div'>;
}

export interface FileListProps extends ComponentProps<Partial<FileListSlots>> {
  files: FileEntity[];
  selectable?: boolean;
  sortable?: boolean;
  layout?: 'list' | 'grid';
  onSelectionChange?: (selectedIds: string[]) => void;
  onSort?: (files: FileEntity[]) => void;
}
```

**use-file-list.ts** (State management):
- Selection state management with keyboard support
- Sorting functionality (name, size, date, type)
- Layout switching between list and grid views
- Virtualization support for large file lists

### FileItem Component Architecture

**file-item.types.ts** (Interface definitions):
```typescript
export interface FileItemSlots {
  root: Slot<'div'>;
  icon?: Slot<'span'>;
  content: Slot<'div'>;
  name: Slot<'span'>;
  metadata?: Slot<'div'>;
  size?: Slot<'span'>;
  progress?: Slot<'div'>;
  actions?: Slot<'div'>;
  removeButton?: Slot<'button'>;
}

export interface FileItemProps extends ComponentProps<Partial<FileItemSlots>> {
  file: FileEntity;
  variant?: 'default' | 'compact' | 'detailed';
  removable?: boolean;
  selectable?: boolean;
  showProgress?: boolean;
  onRemove?: (fileId: string) => void;
  onSelect?: (fileId: string, selected: boolean) => void;
}
```

**use-file-item.ts** (State management):
- File status state management (pending, uploading, completed, error)
- Progress tracking for upload operations
- Action handling (remove, retry, cancel)
- Accessibility state for screen readers

### Shared Types Architecture

**shared/types.ts** (Core data models):
```typescript
export interface FileEntity {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: Date;
  status: FileStatus;
  file: File;
  progress?: number;
  error?: ValidationError;
}

export type FileStatus = 'pending' | 'uploading' | 'completed' | 'error';

export interface ValidationError {
  fileId: string;
  code: string;
  message: string;
  severity: 'error' | 'warning';
}
```

### Package Configuration Specifications

**@fluent-plus/react-components package.json**:
```json
{
  "name": "@fluent-plus/react-components",
  "version": "0.0.1",
  "description": "FluentPlus React components - comprehensive component library built on Fluent UI v9",
  "main": "lib-commonjs/index.js",
  "module": "lib/index.js",
  "types": "lib/index.d.ts",
  "sideEffects": false,
  "exports": {
    ".": {
      "types": "./lib/index.d.ts",
      "import": "./lib/index.js",
      "require": "./lib-commonjs/index.js"
    }
  },
  "dependencies": {
    "@fluent-plus/file-upload": "^0.0.1"
  },
  "peerDependencies": {
    "@fluentui/react-components": "^9.0.0",
    "react": ">=16.8.0 <19.0.0",
    "react-dom": ">=16.8.0 <19.0.0"
  }
}
```

**react-components/library/src/index.ts** (Re-export configuration):
```typescript
// Re-export all file upload components
export {
  FileUpload,
  FileList, 
  FileItem,
  type FileUploadProps,
  type FileListProps,
  type FileItemProps,
  type FileEntity,
  type FileStatus,
  type ValidationError
} from '@fluent-plus/file-upload';
```

### Storybook Documentation Architecture

**CRITICAL: Story File Self-Containment Requirements**
- Story files MUST only import from packages (e.g., `@fluent-plus/file-upload`, `@fluentui/react-components`)
- Story files MUST NEVER import from relative paths or absolute file paths  
- All demonstration data, utilities, and helpers must be defined within each story file
- Each story file must be completely independent and executable on its own

**index.stories.ts** (Public documentation site navigation order):
```typescript
// Organized by learning progression: basics → features → composition → advanced

// Component Basics
export { default as FileUploadDefault } from './file-upload/file-upload-default.stories';
export { default as FileListDefault } from './file-list/file-list-default.stories';
export { default as FileItemDefault } from './file-item/file-item-default.stories';

// Component Anatomy  
export { default as FileUploadProps } from './file-upload/file-upload-props.stories';
export { default as FileUploadSlots } from './file-upload/file-upload-slots.stories';

// Specific Features
export { default as FileUploadDragDrop } from './file-upload/file-upload-drag-drop.stories';
export { default as FileUploadConstraints } from './file-upload/file-upload-constraints.stories';
export { default as FileListLayouts } from './file-list/file-list-layouts.stories';
export { default as FileItemVariants } from './file-item/file-item-variants.stories';

// Composition Patterns
export { default as BasicComposition } from './composition/basic-composition.stories';
export { default as AdvancedComposition } from './composition/advanced-composition.stories';

// Integration Examples
export { default as FormIntegration } from './composition/form-integration.stories';
export { default as UploadWorkflows } from './patterns/upload-workflows.stories';
```

**Story File Example Pattern** (file-upload-default.stories.tsx):
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from '@fluent-plus/file-upload';

// All utilities defined within file - NO relative imports
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const meta: Meta<typeof FileUpload> = {
  title: 'Components/File Upload/FileUpload/Default',
  component: FileUpload,
  argTypes: {
    accept: { control: 'text' },
    maxSize: { control: 'number' },
    maxFiles: { control: 'number' }
  }
};

export default meta;
type Story = StoryObj<typeof FileUpload>;

export const Default: Story = {
  args: {
    'aria-label': 'Upload files',
    label: 'Upload Documents',
    description: 'Drag files here or click to browse'
  }
};
```

### Test Implementation Pattern

**Component Test Example** (file-upload.test.tsx):
```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileUpload } from './file-upload';

describe('FileUpload', () => {
  it('should render with default props', () => {
    render(<FileUpload />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle file selection', async () => {
    const user = userEvent.setup();
    const onFilesChange = jest.fn();
    
    render(<FileUpload onFilesChange={onFilesChange} />);
    
    const file = new File(['content'], 'test.txt', { type: 'text/plain' });
    const input = screen.getByRole('button');
    
    await user.upload(input, file);
    
    expect(onFilesChange).toHaveBeenCalledWith([file]);
  });

  it('should validate file constraints', async () => {
    const user = userEvent.setup();
    const onValidationError = jest.fn();
    
    render(
      <FileUpload 
        maxSize={1024} 
        onValidationError={onValidationError}
      />
    );
    
    const largeFile = new File(['x'.repeat(2048)], 'large.txt');
    const input = screen.getByRole('button');
    
    await user.upload(input, largeFile);
    
    expect(onValidationError).toHaveBeenCalled();
  });
});
```

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
- Load `/templates/tasks-template.md` as base structure
- Generate tasks from Phase 1 design docs (contracts, data model, quickstart)
- Use standard Nx generators for react-components package creation
- Use Nx workspace plugin generators for component scaffolding following CONTRIBUTION.md
- Extend generated component files with specific file upload implementation
- Create additional Storybook stories following generated patterns with self-containment requirements
- Package configuration and build tasks for npm distribution with rollup bundler

**Component-Specific Task Categories**:
1. **Package and Component Generation**: 
   - Complete bundler migration from vite to rollup for existing file-upload package
   - Generate react-components package using `nx g @nx/react:library react-components --directory=packages --importPath=@fluent-plus/react-components --publishable --bundler=rollup`
   - Generate component scaffolds using `nx g @fluent-plus/workspace-plugin:react-component`
   - Leverage generated file structure per CONTRIBUTION.md requirements

2. **Core Component Implementation** (extend generated files):
   - FileUpload component: Extend generated files with react-dropzone integration and upload logic
   - FileList component: Extend generated files with list management and display logic
   - FileItem component: Extend generated files with item states and actions

3. **Integration Tasks**:
   - Component composition integration tests
   - react-dropzone integration testing (FileUpload component only)
   - Fluent UI v9 design system integration verification
   - Accessibility testing with screen readers and keyboard navigation

4. **Documentation Tasks** (extend generated Storybook structure with self-containment requirements):
   - Extend generated default stories with comprehensive examples
   - Create additional story files for variants, states, and accessibility (each story file must be self-contained)
   - Create example stories for complete usage patterns
   - Update index.stories.ts with proper export order for public doc site
   - Update existing study.mdx with implementation findings
   - Ensure all story files only import from packages, never from relative paths

5. **Package Tasks**:
   - Update generated package.json configurations with proper dependencies
   - Configure @fluent-plus/react-components re-export in generated index.ts
   - Build system validation for ESM/CommonJS dual builds with rollup
   - TypeScript declaration file generation and validation

**Ordering Strategy**:
- **Prerequisites First**: Complete bundler migration from vite to rollup before implementation
- **Generator-First**: Use standard Nx generators for react-components package, workspace plugin generators for components
- **Extend Generated**: Build upon generated scaffolding rather than creating from scratch
- **TDD Within Extensions**: Tests for extended functionality, leveraging generated structure
- **Dependency Order**: Bundler migration → Package generation → Component generation → Implementation → Integration
- **Parallel Execution Markers [P]**: Independent component implementations can be developed simultaneously
- **Storybook Pattern**: Follow generated story structure, extend with additional self-contained stories in proper order

**Testing Layer Strategy**:
1. **Generated Tests**: Extend generated test files with component-specific logic
2. **Integration Tests**: Component composition, hook interaction, Fluent UI integration
3. **Unit Tests**: Individual component logic, state management, utility functions
4. **Accessibility Tests**: Screen reader announcements, keyboard navigation, ARIA compliance

**Nx Generator Integration**:
- Use `nx g @nx/react:library react-components --directory=packages --importPath=@fluent-plus/react-components --publishable --bundler=rollup` for package setup
- Use `nx g @fluent-plus/workspace-plugin:react-component --name <component> --project file-upload` for components
- Complete bundler migration for existing file-upload package from vite to rollup
- Follow generated project structure patterns in packages/
- Extend generated Storybook setup with additional stories per pattern
- Maintain compatibility with generated build and test infrastructure

**Storybook Documentation Strategy**:
- Extend generated default stories with comprehensive scenarios
- Create additional story files following generated naming patterns
- Maintain proper export order in index.stories.ts for public doc site navigation
- Each story in its own file as outlined by generator
- Follow generated story structure and extend with implementation-specific examples
- **CRITICAL**: All story files must be completely self-contained (package imports only, no relative paths)
- Embed all demonstration data, utilities, and helpers within each story file
- Ensure each story file is executable independently

**Quality Gates**:
- Each task includes constitutional compliance verification
- Bundler migration validation before implementation begins
- Accessibility requirements validated at component and integration levels
- Performance benchmarks for component render times and bundle size
- Documentation completeness verification through Storybook
- Story file self-containment validation (no relative path imports)

**Estimated Output**: 
- 35-40 numbered, sequentially ordered tasks
- Clear [P] markers for parallel execution opportunities (Phase 2 component implementations)
- Explicit TDD red-green-refactor cycle enforcement for each component
- Bundler migration completion checkpoints (Phase 0)
- Component-by-component completion milestones (Phase 2)
- Package generation and integration validation checkpoints (Phase 1, 4)
- Story file self-containment compliance verification (Phase 5)
- Comprehensive testing validation across integration, accessibility, and performance (Phase 6)
- Focus on solid component foundations with detailed specifications for 0.0.1 release

**IMPORTANT**: This phase is executed by the /tasks command, NOT by /plan. The above represents the planning approach that will guide task generation.

## Detailed Task Dependencies and Sequence

### Phase 0: Package Structure Transition (Prerequisites - Sequential)
1. **Backup Research Assets**: Save `packages/file-upload/stories/src/file-upload/study.mdx` and document custom content
2. **Update react-lib Generator**: Modify `tools/workspace-plugin/src/generators/react-lib/react-lib.ts` to use rollup bundler
3. **Clean Package Recreation**: Delete existing file-upload directory, clean references, regenerate with rollup
4. **Validation**: Verify rollup configuration and test build process

### Phase 1: Package Setup (Sequential)
1. Generate react-components package: `nx g @nx/react:library react-components --directory=packages --importPath=@fluent-plus/react-components --publishable --bundler=rollup`
2. Generate FileUpload component: `nx g @fluent-plus/workspace-plugin:react-component --name file-upload --project file-upload`
3. Generate FileList component: `nx g @fluent-plus/workspace-plugin:react-component --name file-list --project file-upload`
4. Generate FileItem component: `nx g @fluent-plus/workspace-plugin:react-component --name file-item --project file-upload`

### Phase 2: Core Implementation (Parallel within each component)

**FileUpload Component** [P]:
1. Extend `file-upload.types.ts` with FileUploadSlots, FileUploadProps, FileUploadState interfaces
2. Extend `use-file-upload.ts` with useControllableState, useDropzone integration, validation logic
3. Extend `use-file-upload-styles.ts` with makeStyles, Fluent UI design tokens, slot styling
4. Extend `render-file-upload.tsx` with slot resolution, conditional rendering, Button integration
5. Extend `file-upload.tsx` with ForwardRefComponent composition pattern
6. Add comprehensive component tests with file selection, validation, accessibility

**FileList Component** [P]:
1. Extend `file-list.types.ts` with FileListSlots, FileListProps, FileListState interfaces
2. Extend `use-file-list.ts` with state logic for sorting, filtering, selection management
3. Extend `use-file-list-styles.ts` with layout styling variants (list, grid), virtualization support
4. Extend `render-file-list.tsx` with container structure, item rendering delegation
5. Extend `file-list.tsx` with component composition and child management
6. Add component tests for list operations, keyboard navigation, performance

**FileItem Component** [P]:
1. Extend `file-item.types.ts` with FileItemSlots, FileItemProps, FileItemState interfaces
2. Extend `use-file-item.ts` with item state logic, progress tracking, action handling
3. Extend `use-file-item-styles.ts` with item styling variants, status indicators, file type icons
4. Extend `render-file-item.tsx` with comprehensive slot structure (icon, name, size, actions, progress)
5. Extend `file-item.tsx` with component composition and event delegation
6. Add component tests for all states, actions, accessibility compliance

### Phase 3: Shared Resources (Sequential)
1. Create `shared/types.ts` with FileEntity, FileStatus, ValidationError interfaces
2. Create `shared/utils.ts` with file validation utilities, size formatting, type detection
3. Update main `index.ts` with all component exports and type exports

### Phase 4: Package Integration (Sequential)
1. Update `@fluent-plus/file-upload` package.json with proper exports configuration and dependencies
2. Add react-dropzone dependency to file-upload package
3. Configure `@fluent-plus/react-components` re-exports in generated index.ts
4. Validate dual build (ESM/CommonJS) output and tree-shaking compatibility

### Phase 5: Storybook Documentation (Following self-containment pattern)
1. **Extend Generated Stories**: Update default stories with comprehensive examples
2. **Component-Specific Stories** [P]:
   - FileUpload: slots, props, constraints, states, events, drag-drop, accessibility, edge-cases
   - FileList: slots, props, layouts, selection, sorting, filtering, virtualization, accessibility  
   - FileItem: slots, props, status-states, progress, actions, variants, file-types, errors, accessibility
3. **Composition Stories**: basic-composition, advanced-composition, controlled-uncontrolled, form-integration
4. **Pattern Stories**: upload-workflows, validation-patterns, customization-patterns, integration-patterns
5. **Research Stories**: design-system-alignment, performance-scenarios, browser-compatibility
6. **Update Export Order**: Configure index.stories.ts with proper learning progression order
7. **Restore Research**: Update study.mdx with implementation findings and architecture decisions

### Phase 6: Testing and Validation (Sequential)
1. **Integration Testing**: Component composition, hook interaction, Fluent UI design system integration
2. **Accessibility Testing**: Screen reader announcements, keyboard navigation, ARIA compliance, focus management
3. **Performance Testing**: Bundle size validation, tree-shaking verification, component render time benchmarks
4. **Build Validation**: ESM/CommonJS dual builds, TypeScript declaration generation, package exports
5. **Documentation Review**: Storybook story completeness, self-containment compliance, public site navigation

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
- [ ] Phase 3: Tasks generated (/tasks command)
- [ ] Phase 4: Implementation complete
- [ ] Phase 5: Validation passed

**Gate Status**:
- [x] Initial Constitution Check: PASS
- [x] Post-Design Constitution Check: PASS
- [x] All NEEDS CLARIFICATION resolved
- [x] Complexity deviations documented (None required)

---
*Based on Constitution v2.1.1 - See `/memory/constitution.md`*