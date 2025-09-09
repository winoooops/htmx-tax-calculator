import { TemplateService } from "../../services/templateService.js";

const getFooterTitleHandler = async (req, reply) => {
  const html = await TemplateService.renderTemplate("footer-title");
  return TemplateService.htmlResponse(reply, html);
};

export default getFooterTitleHandler;
