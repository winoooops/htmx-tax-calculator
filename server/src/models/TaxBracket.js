import { taxCalculator } from "../utils/taxCalculator.js";

export default class TaxBracket {
    static createBracket(info) {
        return new TaxBracket(info.id, info.startAt, info.endAt, info.rate, info.displayRate);
    } 

    constructor(id, startAt, endAt, rate, displayRate) {
        this.id = id;
        this.startAt = startAt;
        this.endAt = endAt;
        this.rate = rate;
        this.displayRate = displayRate;
        this.maxTax = 0; // Will be calculated later
    }

    getDisplayRate() {
        return this.displayRate || (this.rate * 100 + "%");
    }

    getDisplayRange() {
        if(this.startAt === 0) {
            return `$${this.startAt.toLocaleString()}`;
        }

        if (this.endAt === null) {
            return `$${this.startAt.toLocaleString()}+`;
        }
        return `$${this.startAt.toString()} – $${this.endAt.toString()}`;
    }

    calculateMaxTax(prevCumulative = 0) {
        if (this.endAt === null) {
            this.maxTax = prevCumulative; // Top bracket has no upper limit
            return this.maxTax;
        }
        this.maxTax = taxCalculator(this.startAt, this.endAt, this.rate, prevCumulative);
        return this.maxTax;
    }

    getDisplayMaxTax() {
        return `$${Math.round(this.maxTax).toLocaleString()}`;
    }
}