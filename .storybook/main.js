module.exports = {
  stories: [
    './stories.js'
  ],
  addons: [
    '@storybook/addon-actions',
    '../register'
  ],
  features: {
    storyStoreV7: true
  },
  framework: '@storybook/react-webpack5',
  core: {
    builder: "@storybook/builder-webpack5"
  }
}
