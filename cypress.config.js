const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "31psik",
  viewportHeight: 880,
  viewportWidth: 1280,
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
