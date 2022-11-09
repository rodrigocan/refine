import pluralize from "pluralize";
import { IResourceItem } from "@pankod/refine-core";

import { GuessField } from "@/types";

import { removeRelationSuffix } from "../remove-relation-suffix";

/**
 * Checks if the given property can be relation by checking the existing resources.
 */
export const resourceFromGuess = (
    field: GuessField | false | null,
    resources: IResourceItem[],
): IResourceItem | undefined => {
    if (!field) {
        return undefined;
    }

    const resource = resources.find((el) => {
        const stripped = removeRelationSuffix(field.key);

        return (
            el.name === stripped ||
            el.name ===
                (pluralize.isPlural(stripped)
                    ? stripped
                    : pluralize.plural(stripped)) ||
            el.name ===
                (pluralize.isSingular(stripped)
                    ? stripped
                    : pluralize.singular(stripped))
        );
    });

    return resource;
};
