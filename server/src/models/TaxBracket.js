import { taxCalculator } from "../utils/taxCalculator.js";

export default class TaxBracket {
    static createBracket(info) {
        return new TaxBracket(info.id, info.startAt, info.endAt, info.rate, info.color);
    }

    constructor(id, startAt, endAt, rate, color) {
        this.id = id;
        this.startAt = startAt;
        this.endAt = endAt;
        this.rate = rate;
        this.color = color;
        this.maxTax = 0; // Will be calculated later
    }

    getDisplayRate() {
        return this.rate * 100 + "%";
    }

    getDisplayRange() {

        if (this.startAt === 0) {
            return `$${this.startAt.toLocaleString()}`;
        }
        if (this.endAt === null) {
            return `$${this.startAt.toLocaleString()}+`;
        }
        return `$${this.startAt.toLocaleString()} – $${this.endAt.toLocaleString()}`;
    }

    calculateMaxTax(prevCumulative = 0) {
        if (this.endAt === null) {
            // For the top bracket, calculate tax from startAt to a reasonable upper limit
            // or just return the previous cumulative tax as the "max tax" for display
            this.maxTax = prevCumulative;
            return this.maxTax;
        }
        this.maxTax = taxCalculator(this.startAt, this.endAt, this.rate, prevCumulative);
        return this.maxTax;
    }

    getDisplayMaxTax() {
        if (this.rate === 0) {
            return "No tax payable";
        }
        if (this.endAt === null) {
            return `Plus ${Math.round(this.rate * 100)}% on excess`;
        }
        return `$${Math.round(this.maxTax).toLocaleString()}`;
    }
}