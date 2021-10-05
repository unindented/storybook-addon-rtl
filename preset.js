// This file is required for the Storybook Addon Catalog.
function managerEntries (entry = []) {
  return [...entry, require.resolve('./dist/manager')]
}

module.exports = { managerEntries }
