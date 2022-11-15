import Handlebars from "handlebars";
import { readFileSync } from "fs-extra";

export const compile = (filePath: string, params: any): string => {
    const content = readFileSync(filePath);

    Handlebars.registerHelper("ifIn", function (elem, list, options) {
        if (elem.includes(list)) {
            return options.fn(Handlebars);
        }
        return options.inverse(Handlebars);
    });

    Handlebars.registerHelper("capitalize", function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    });

    const template = Handlebars.compile(content.toString());
    return template(params);
};
