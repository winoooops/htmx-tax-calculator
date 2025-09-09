import { TemplateService } from "../../services/templateService.js";
import Store from "../../data/store.js";

const getCalculatorFieldsHandler = async (req, reply) => {
  try {
    const store = await Store.getInstance();

    // Get all calculator fields from the store
    const fields = store.getCalculatorFields();

    if (!fields || fields.length === 0) {
      return reply.code(404).send("No calculator fields found");
    }

    let html = `<div class="space-y-4">`;

    // Render each field
    for (const field of fields) {
      const fieldHtml = await TemplateService.renderTemplate("tax-calculator-field", {
        field_name: field.name,
        field_value: field.value,
        icon_svg: field.icon_svg,
        icon_bg: field.icon_bg,
      });
      html += fieldHtml;
    }

    html += `</div>`;

    return TemplateService.htmlResponse(reply, html);

  } catch (error) {
    console.error('Error loading calculator fields:', error);
    return reply.code(500).send("Internal server error");
  }
};

export default getCalculatorFieldsHandler;
