import fs from "node:fs";

export const fillTextContent = (values, templatePath) => {
    const template = fs.readFileSync(templatePath, "utf8");
    return template.replace(/{{\s*([^}]+)\s*}}/g, (match, key) => {
      return values[key] ?? match;
    });
  };
