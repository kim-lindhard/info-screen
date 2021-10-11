// index.js
const { runHookApp } = require("@forrestjs/hooks");

// Application's Services
const serviceFetchq = require("@forrestjs/service-fetchq");
const featureRotatingImages = require("./features/rotating-images/feature-scedule");
const featureLoadImagesFromOnedrive = require("./features/rotating-images/feature-load-images-from-onedrive");

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
  features: [featureLoadImagesFromOnedrive, featureRotatingImages]
}).then(console.log("Application started"));
