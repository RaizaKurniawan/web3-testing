const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        specPattern: 'cypress/integration/**/*.cy.{js,jsx,ts,tsx}', // Sesuaikan path ke folder integration
        supportFile: 'cypress/support/command.js',
        setupNodeEvents(on, config){

        },
        baseUrl: 'http://127.0.0.1:8545',
        supportFile: false,
    },
})