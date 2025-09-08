import TaxBracket from './TaxBracket.js';

export default class TaxPlan {
  constructor(meta = {}, brackets = [], calculatorFields = [], footerSections = []){
    this.meta = meta;
    this.brackets = brackets;
    this.calculatorFields = calculatorFields;
    this.footerSections = footerSections;
    this.calculateMaxTaxes();
  }

  static fromJSON(data) {
    const meta = data.meta || {};
    const brackets = (data.taxBrackets || []).map(b => 
      TaxBracket.createBracket(b)
    );
    const calculatorFields = data.calculatorFields || [];
    const footerSections = data.footerSections || [];
    return new TaxPlan(meta, brackets, calculatorFields, footerSections);
  }

  calculateMaxTaxes() {
    let cumulativeTax = 0;
    this.brackets.forEach(bracket => {
      cumulativeTax = bracket.calculateMaxTax(cumulativeTax);
    });
  }

  getTaxBrackets() {
    return this.brackets;
  }

  getBracketById(id) {
    return this.brackets.find(b => b.id === id);
  }

  getFinancialYear() {
    return this.meta.financialYear || '2024-2025';
  }

  getDescription() {
    return this.meta.description || '';
  }

  getCalculatorFields() {
    return this.calculatorFields;
  }

  getCalculatorFieldById(id) {
    return this.calculatorFields.find(f => f.id === id);
  }

  getFooterSections() {
    return this.footerSections;
  }

  getFooterSectionByIndex(index) {
    return this.footerSections[index];
  }
}