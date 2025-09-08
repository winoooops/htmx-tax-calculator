import Store from "../../data/store.js";
import { TemplateService } from "../../services/templateService.js";

const taxRateCardsHandler = async (req, reply) => {
  const store = await Store.getInstance(); 
  const brackets = store.getBrackets();

  let html = `<div class="space-y-4">`;

  // Use Promise.all to handle async operations properly
  const cardPromises = brackets.map(async (bracket) => {
    console.log(bracket);
    return TemplateService.renderTemplate("tax-rate-card", {
      taxable_income: bracket.getDisplayRange(),
      tax_rate: bracket.getDisplayRate(),
      max_tax_amount: `${bracket.getDisplayMaxTax()}`
    });
  });
  
  const cards = await Promise.all(cardPromises);
  html += cards.join('\n');
  html += `</div>`;

  return TemplateService.htmlResponse(reply, html);
};

export default taxRateCardsHandler;