## 📚 [**View Full Documentation →**](https://mathis-m.github.io/fluent-plus/)

# File Upload Component

The **File Upload** component is part of the FluentPlus library, designed to provide a robust, enterprise-ready solution for uploading files in React applications. Built on top of [Fluent UI v9](https://react.fluentui.dev), it aligns with Microsoft's design system and extends its capabilities for business needs.

## Features

- 📁 **Flexible file selection** – Support for single and multiple file uploads
- 🔒 **Validation & restrictions** – File type, size, and custom validation logic
- 🖼️ **Preview & feedback** – Optional file previews and upload progress indicators
- ⚡ **Enterprise-ready** – Customizable for complex workflows and integrations
- 🎨 **Fluent UI v9 compatible** – Seamless theming and design system alignment

## Usage

Install FluentPlus in your project:

```bash
npm install @fluent-plus/react-components @fluentui/react-components
```

Import and use the File Upload component:

```tsx
import { FileUpload } from "@fluent-plus/ract-components";
import { Caption1, Text } from "@fluentui/react-components";
import { AttachRegular } from "@fluentui/react-icons";

<FileUpload
	icon={<AttachRegular />}
	header={
		<Text as="h5" style={{ margin: 0 }} weight="semibold">
			Upload your files
		</Text>
	}
	description={<Caption1>Drag and drop files here, or click to select files</Caption1>}
/>
```

For advanced usage, validation, and customization options, see the [full documentation](https://mathis-m.github.io/fluent-plus/).
