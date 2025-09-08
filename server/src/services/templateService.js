import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { fillTextContent } from "../utils/fillContent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");
const DATA_PATH = path.join(ROOT_DIR, "data", "data.json");
const VIEWS_DIR = path.join(ROOT_DIR, "views");

// Cache data to avoid reading file on every request
let cachedData = null;
let lastModified = null;

export class TemplateService {
  static async getData() {
    // In production, you might want to implement proper cache invalidation
    if (!cachedData) {
      cachedData = JSON.parse(await readFile(DATA_PATH, "utf8"));
    }
    return cachedData;
  }

  static async renderTemplate(templateName, variables = {}) {
    const templatePath = path.join(VIEWS_DIR, `${templateName}.html`);
    const html = fillTextContent(variables, templatePath);
    return html;
  }

  static async renderWithData(templateName, dataSelector, extraVariables = {}) {
    const data = await this.getData();
    const templateData = typeof dataSelector === 'function' 
      ? dataSelector(data) 
      : data;
    
    const variables = { ...templateData, ...extraVariables };
    return await this.renderTemplate(templateName, variables);
  }

  static htmlResponse(reply, html) {
    return reply.type("text/html; charset=utf-8").send(html);
  }
}
