import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withOptions } from '@storybook/addon-options';
import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';
import StoryRouter from 'storybook-react-router';

addDecorator(StoryRouter());
addDecorator(
  withTests({
    results,
  })
);
addDecorator(
  withOptions({
    name: 'Storybook Project Name',
    addonPanelInRight: false,
    hierarchyRootSeparator: /\|/,
    sortStoriesByKind: true,
  })
);

addDecorator(withKnobs, {
  knobs: {
    timestamps: true,
    escapeHTML: true,
  },
});

const req = require.context('../src/app/', true, /.stories.js$/);

function loadStories() {
  req.keys().forEach(req);
}

configure(loadStories, module);
