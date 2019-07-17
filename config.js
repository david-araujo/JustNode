// Container for all environments
const environments = {
    staging: {
        port: 3000,
        envName: 'staging'
    },
    production: {
        port: 5000,
        envName: 'production'
    }
}

// Determine which environment was passed as argument on command-line
const currentEnvironment = typeof(process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV.toLowerCase() : ''

// Check if the current environment is one of defined environments
const envToExport = typeof(environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging

module.exports = envToExport