// index.js
const { runHookApp } = require("@forrestjs/hooks");

// Application's Services
const serviceFetchq = require("@forrestjs/service-fetchq");
const featureScedule = require("./feature-scedule");

runHookApp({
  trace: "compact",
  settings: {
    fetchq: {
      logLevel: "info",
      pool: {
        max: 1
      }
    }
  },
  services: [serviceFetchq],
  features: [featureScedule]
}).then(console.log("Application started"));
