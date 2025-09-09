import { TemplateService } from "../../services/templateService.js";
import Store from "../../data/store.js";

const getHeaderHandler = async (req, reply) => {
  const store = await Store.getInstance();
  const taxPlan = store.getTaxPlan();

  const html = await TemplateService.renderTemplate("header", {
    financial_year: taxPlan.getFinancialYear()
  });

  return TemplateService.htmlResponse(reply, html);
};

export default getHeaderHandler;
