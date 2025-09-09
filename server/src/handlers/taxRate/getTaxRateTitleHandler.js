import { TemplateService } from "../../services/templateService.js";

const getTaxRateTitleHandler = async (req, reply) => {
  const html = await TemplateService.renderTemplate("tax-rate-title");
  return TemplateService.htmlResponse(reply, html);
};

export default getTaxRateTitleHandler;
