import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import TaxPlan from "../models/TaxPlan.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, "data.json");

export class Store {
    static instance = null;

    constructor() {
        this.taxPlan = null;
    }

    static async getInstance() {
        if (!Store.instance) {
            Store.instance = new Store();
            await Store.instance.load();
        }
        return Store.instance;
    }

    async load() {
        const data = JSON.parse(await readFile(DATA_PATH, "utf-8"));
        this.taxPlan = TaxPlan.fromJSON(data);
        return this;
    }

    getTaxPlan() {
        return this.taxPlan;
    }

    getBrackets() {
        return this.taxPlan?.getTaxBrackets() || [];
    }

    getBracketById(id) {
        return this.taxPlan?.getBracketById(id);
    }

    getCalculatorFieldById(id) {
        return this.taxPlan?.getCalculatorFieldById(id);
    }

    getCalculatorFields() {
        return this.taxPlan?.getCalculatorFields() || [];
    }

    getFooterSectionByIndex(index) {
        return this.taxPlan?.getFooterSectionByIndex(index);
    }
}

// Export both named and default
export default Store;