import preset from '@fluentui/react-storybook-addon-export-to-sandbox/lib/preset/preset';
const preset = require('./lib/preset/preset');

function previewAnnotations(entry = []) {
  return [...entry, require.resolve('./lib/preset/preview')];
}

module.exports = { previewAnnotations, ...preset };