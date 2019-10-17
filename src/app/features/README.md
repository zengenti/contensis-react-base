# Features

## Folder Structure

All folders should be camel cased eg. folderStructure

All React components (including styled component files and container files) and .stories files should be title cased eg. FolderStructure

All redux, utility function and test files should camel cased

### {componentName}

This is the parent folder of a "feature" and is a direct child of the features folder. All other folders and files regarding this feature are located inside this folder

### 1\. components

All "dumb" React components are created here. These components can contain local state in regards to any ui, but all state must be passed as props from a container. Should import a styled component from components.styled to render if required (see below).

### 2\. components.styled

All styled components are created here and then imported for use into a component.

All files must have the .styled suffix eg. Feature.styled.js

### 3\. containers

If state is required to be consumed as a prop, or any actions dispatched then a container file must be created and any dispatch actions or state passed as props to be consumed in the "dumb" component.

All files must have the .container suffix eg. Feature.container.js

### 4\. redux

If any state pertaining to the feature is required (outside the core functionality) then any redux files should be created here and imported into the "core" redux state for the project.

### 5\. stories

Any Storybook files are created here.

All Storybook files must have the .stories suffix eg. Feature.stories.js

If any example data is required for the storybook file then create it here (eg. taxonomy json from the delivery api)

### 6\. tests

Any test files are created here.

All test files must have the .test suffix eg. Feature.test.js

## Index.js

### Export Default

In the index.js file the entry point for the feature should be exported as the default (eg. import FeatureContainer from './containers/Feature.container; export FeatureContainer as default; )

This can be either the main container file or the main component file.

## ReadMe.md

This file details the feature and any of it's dependancies

# Coding Guidelines

## Imports

The ordering of your imports should be as follows:

- Node modules
- Components
- Styled Components
- Functions

## Props

To maintain consistency we suggest you declare your props in the below order:

- className
- data-testid (only when using test)
- alphabetical

When creating a component you should declare all your props up front, e.g we don't want to pass an entire entry to a card component.

## Prop validation

We have created a function that will log to the console any missing props that could cause any visual issues.

`import validateProps from '~/utils/validateProps';`

```
// Validate your props that could cause issues, if they are missing a nice message will appear in the console
const validate = validateProps('FullWidthBackgroundFeature', {
    title,
    background,
  });

  if (!validate) return null;
```
