# Contribution Guidelines

We welcome contributions from the community! To ensure a smooth collaboration, please follow these guidelines:

1. **Understand the Project**: Before making changes, take the time to read the `README.md` and other relevant documentation to understand the project's goals and architecture.

2. **Follow the Code Style**: Adhere to the existing code style and conventions used in the project. This includes formatting, naming conventions, and directory structure.

3. **Creating new libraries**: When adding new libraries the `nx g @fluent-plus/workspace-plugin:react-lib --name <lib-name>` command should be used. This ensures that the library is set up correctly within the monorepo structure.

4. **Creating new react components**: When adding new react components the `nx g @fluent-plus/workspace-plugin:react-component --name <component-name> --project <lib-name>` command should be used. This ensures that the component is set up correctly within the specified library. The generated code may include todo comments that should be addressed before finalizing the component.


## Components

Components are strictly structured to ensure consistency and maintainability across the codebase. Each component should be placed in its own directory within the appropriate library, following this structure:

```
packages/
  └── <lib-name>/
      └── library/
          └── <component-name>/
                ├── <component-name>.tsx // Main component file to compose state, styles, and the render function. (this might as well include hooks such use `useContextValues(state)`  to get context values specific to the component)
                ├── <component-name>.types.ts // Type definitions for the component's props, state, and slots.
                ├── use-<component-name>.ts // Custom hook for the component's logic / state management.
                ├── render-<component-name>.tsx // Render function for the component, responsible for the JSX structure by utilizing the fluent-ui slot concept.
                ├── use-<component-name>-styles.ts // Hook for the component's styles, utilizing the fluent-ui styling system by applying resulting styles to the slots exposed by the state.
                └──  index.ts // Barrel file to export the component and its types.
```