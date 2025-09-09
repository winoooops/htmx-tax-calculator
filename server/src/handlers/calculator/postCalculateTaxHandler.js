import { TemplateService } from "../../services/templateService.js";
import Store from "../../data/store.js";
import { taxCalculator } from "../../utils/taxCalculator.js";

const postCalculateTaxHandler = async (req, reply) => {
  try {
    // Handle both JSON and form data
    let income;
    if (req.body && typeof req.body === 'object') {
      income = req.body.income || req.body['income-input'] || req.body['tax-input'];
    } else {
      // Parse form data if it's a string
      const formData = new URLSearchParams(req.body);
      income = formData.get('income-input') || formData.get('tax-input');
    }

    income = parseFloat(income);

    if (!income || isNaN(income) || income < 0) {
      return reply.code(400).send({ error: "Invalid income amount" });
    }

    const store = await Store.getInstance();
    const brackets = store.getBrackets();

    // Calculate tax using the existing tax calculation logic
    let totalTax = 0;
    let remainingIncome = income;
    let marginalRate = 0;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const bracketStart = bracket.startAt;
      const bracketEnd = bracket.endAt || Infinity;
      const rate = bracket.rate;

      // Calculate taxable amount in this bracket
      const taxableInBracket = Math.min(
        remainingIncome,
        Math.max(0, Math.min(bracketEnd, income) - bracketStart)
      );

      if (taxableInBracket > 0) {
        totalTax += taxableInBracket * rate;
        remainingIncome -= taxableInBracket;
        marginalRate = rate; // This will be the rate for the last bracket with income
      }
    }

    const netIncome = income - totalTax;
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;

    // Get the marginal rate for the next dollar
    let nextDollarRate = 0;
    for (const bracket of brackets) {
      if (income >= bracket.startAt && (bracket.endAt === null || income < bracket.endAt)) {
        nextDollarRate = bracket.rate;
        break;
      }
    }

    // Create updated calculator fields data
    const updatedFields = [
      {
        name: "Total Tax",
        value: `$${Math.round(totalTax).toLocaleString()}`,
        icon_svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>`,
        icon_bg: "red"
      },
      {
        name: "Net Income",
        value: `$${Math.round(netIncome).toLocaleString()}`,
        icon_svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><polyline points="22,17 13.5,8.5 8.5,13.5 2,7" /><polyline points="16,17 22,17 22,11" /></svg>`,
        icon_bg: "green"
      },
      {
        name: "Effective Rate",
        value: `${effectiveRate.toFixed(1)}%`,
        icon_svg: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide"><line x1="19" y1="5" x2="5" y2="19" /><circle cx="6.5" cy="6.5" r="2.5" /><circle cx="17.5" cy="17.5" r="2.5" /></svg>`,
        icon_bg: "blue"
      }
    ];

    // Render all fields
    let html = `<div class="space-y-4">`;

    for (const field of updatedFields) {
      const fieldHtml = await TemplateService.renderTemplate("tax-calculator-field", {
        field_name: field.name,
        field_value: field.value,
        icon_svg: field.icon_svg,
        icon_bg: field.icon_bg,
      });
      html += fieldHtml;
    }
    html += `</div>`;

    // Add marginal rate section
    const marginalRateHtml = await TemplateService.renderTemplate("tax-calculator-marginal", {
      marginal_rate: (nextDollarRate * 100).toFixed(1) + "%",
    });
    html += marginalRateHtml;

    return reply.type('text/html').send(html);

  } catch (error) {
    console.error('Tax calculation error:', error);
    return reply.code(500).send({ error: "Internal server error" });
  }
};

export default postCalculateTaxHandler;
