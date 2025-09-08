import fp from 'fastify-plugin';
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { fillTextContent } from "../utils/fillContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const DATA_PATH = path.join(ROOT_DIR, "data", "data.json");
const VIEWS_DIR = path.join(ROOT_DIR, "views");

async function templatePlugin(fastify, options) {
  // Decorate fastify instance with template utilities
  fastify.decorate('templateService', {
    async getData() {
      return JSON.parse(await readFile(DATA_PATH, "utf8"));
    },

    async render(templateName, variables = {}) {
      const templatePath = path.join(VIEWS_DIR, `${templateName}.html`);
      return fillTextContent(variables, templatePath);
    }
  });

  // Decorate reply with HTML response helper
  fastify.decorateReply('html', function(content) {
    return this.type("text/html; charset=utf-8").send(content);
  });
}

export default fp(templatePlugin);
