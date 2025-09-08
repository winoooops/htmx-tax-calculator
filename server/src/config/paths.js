import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, "..");

export const PATHS = {
  ROOT: ROOT_DIR,
  DATA: path.join(ROOT_DIR, "data"),
  VIEWS: path.join(ROOT_DIR, "views"),
  UTILS: path.join(ROOT_DIR, "utils"),
  
  // Specific files
  DATA_JSON: path.join(ROOT_DIR, "data", "data.json"),
  
  // Helper functions
  view(name) {
    return path.join(this.VIEWS, `${name}.html`);
  },
  
  data(name) {
    return path.join(this.DATA, name);
  }
};
