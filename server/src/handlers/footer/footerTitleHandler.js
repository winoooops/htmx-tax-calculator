import { TemplateService } from "../../services/templateService.js";

const footerTitleHandler = async (req, reply) => {
  const html = await TemplateService.renderTemplate("footer-title");
  return TemplateService.htmlResponse(reply, html);
};

export default footerTitleHandler;
