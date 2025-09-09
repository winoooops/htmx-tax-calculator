import { TemplateService } from "../../services/templateService.js";

const getCalculatorInputHandler = async (req, reply) => {
  const html = await TemplateService.renderTemplate("tax-calculator-input");
  return TemplateService.htmlResponse(reply, html);
};

export default getCalculatorInputHandler;
