import Fastify from "fastify";
import cors from "@fastify/cors";

import heartbeatsHandler from "./handlers/health/heartbeatsHandler.js";
import headerHandler from "./handlers/meta/headerHandler.js";
import taxRateTitleHandler from "./handlers/taxRate/taxRateTitleHandler.js";
import calculatorTitleHandler from "./handlers/calculator/calculatorTitleHandler.js";
import calculatorInputHandler from "./handlers/calculator/calculatorInputHandler.js";
import calculatorFieldHandler from "./handlers/calculator/calculatorFieldHandler.js";
import footerTitleHandler from "./handlers/footer/footerTitleHandler.js";
import footerSectionHandler from "./handlers/footer/footerSectionHandler.js";
import taxRateCardsHandler from "./handlers/taxRate/taxRateCardsHandler.js";
import Store from "./data/store.js";

const fastify = Fastify({
  logger: true
});

await fastify.register(cors, { origin: true });

// Health check
fastify.get("/", heartbeatsHandler);

fastify.get("/api/taxPlan", async (req, reply) => {
  const store = await Store.getInstance();
  reply.send(store.getTaxPlan());
})

// Meta routes
fastify.get("/api/header.html", headerHandler);

// Tax Rate routes
fastify.get("/api/tax-rate-title.html", taxRateTitleHandler);
fastify.get("/api/tax-rate-item-cards.html", taxRateCardsHandler);

// Tax Calculator routes
fastify.get("/api/tax-calculator-title.html", calculatorTitleHandler);
fastify.get("/api/tax-calculator-input.html", calculatorInputHandler);
fastify.get("/api/tax-calculator-field.html", calculatorFieldHandler);

// Footer routes
fastify.get("/api/footer-title.html", footerTitleHandler);
fastify.get("/api/footer-section.html", footerSectionHandler);


fastify.listen({ port: 3000 }, (err, address) => {
  if(err) {
    fastify.log.error(err);
    process.exit(1);
  }
});