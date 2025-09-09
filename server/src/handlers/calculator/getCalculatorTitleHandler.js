import { TemplateService } from "../../services/templateService.js";

const getCalculatorTitleHandler = async (req, reply) => {
  const html = await TemplateService.renderTemplate("tax-calculator-title");
  return TemplateService.htmlResponse(reply, html);
};

export default getCalculatorTitleHandler;
