import { TemplateService } from "../../services/templateService.js";
import Store from "../../data/store.js";

const getFooterSectionHandler = async (req, reply) => {
  const id = Number(req.query.id ?? 0);
  const store = await Store.getInstance();
  const section = store.getFooterSectionByIndex(id);

  if (!section) {
    return reply.code(404).send("Footer section not found");
  }

  const html = await TemplateService.renderTemplate("footer-section", {
    section_title: section.title,
    section_content: section.content
  });

  return TemplateService.htmlResponse(reply, html);
};

export default getFooterSectionHandler;
