import { TemplateService } from "../../services/templateService.js";
import Store from "../../data/store.js";

const calculatorFieldHandler = async (req, reply) => {
  const id = String(req.query.id ?? "estimatedTax");
  const store = await Store.getInstance();
  const field = store.getCalculatorFieldById(id);

  if (!field) {
    return reply.code(404).send("Calculator field not found");
  }

  const html = await TemplateService.renderTemplate("tax-calculator-field", {
    field_name: field.name,
    field_value: field.value,
    icon_svg: field.icon_svg,
    icon_bg: field.icon_bg,
  });

  return TemplateService.htmlResponse(reply, html);
};

export default calculatorFieldHandler;
