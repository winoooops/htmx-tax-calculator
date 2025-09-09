import Fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";

import getHeartbeatsHandler from "./handlers/health/getHeartbeatsHandler.js";
import getHeaderHandler from "./handlers/meta/getHeaderHandler.js";
import getTaxRateTitleHandler from "./handlers/taxRate/getTaxRateTitleHandler.js";
import getCalculatorTitleHandler from "./handlers/calculator/getCalculatorTitleHandler.js";
import getCalculatorInputHandler from "./handlers/calculator/getCalculatorInputHandler.js";
import getCalculatorFieldHandler from "./handlers/calculator/getCalculatorFieldHandler.js";
import getCalculatorFieldsHandler from "./handlers/calculator/getCalculatorFieldsHandler.js";
import getFooterTitleHandler from "./handlers/footer/getFooterTitleHandler.js";
import getFooterSectionHandler from "./handlers/footer/getFooterSectionHandler.js";
import getTaxRateCardsHandler from "./handlers/taxRate/getTaxRateCardsHandler.js";
import postCalculateTaxHandler from "./handlers/calculator/postCalculateTaxHandler.js";
import Store from "./data/store.js";

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, { origin: true });
await fastify.register(formbody);

// Health check
fastify.get("/", getHeartbeatsHandler);

fastify.get("/api/taxPlan", async (req, reply) => {
  const store = await Store.getInstance();
  reply.send(store.getTaxPlan());
})

// Meta routes
fastify.get("/api/header.html", getHeaderHandler);

// Tax Rate routes
fastify.get("/api/tax-rate-title.html", getTaxRateTitleHandler);
fastify.get("/api/tax-rate-item-cards.html", getTaxRateCardsHandler);

// Tax Calculator routes
fastify.get("/api/tax-calculator-title.html", getCalculatorTitleHandler);
fastify.get("/api/tax-calculator-input.html", getCalculatorInputHandler);
fastify.get("/api/tax-calculator-field.html", getCalculatorFieldHandler);
fastify.get("/api/tax-calculator-fields.html", getCalculatorFieldsHandler);
fastify.post("/api/calculate-tax", postCalculateTaxHandler);

// Footer routes
fastify.get("/api/footer-title.html", getFooterTitleHandler);
fastify.get("/api/footer-section.html", getFooterSectionHandler);


fastify.listen({ port: 3000 }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});