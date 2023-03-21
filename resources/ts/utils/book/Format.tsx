import { IndustryIdentifier } from "../../features/search/types";

export const trimText = (text, maxLength) => {
    if (!text) {
        return "";
    }
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    } else {
        return text;
    }
};

export const presentText = (text: string) => {
    return text ? text : "";
};

export const presentAuthor = (
    authors: string[] | undefined | null
): string | null => {
    if (!authors || authors.length === 0) {
        return null;
    }
    if (authors.length === 1) {
        return authors[0];
    }
    return authors[0] + " 他";
};

export const getId = (item) => {
    const targetId = item.id ?? "";
    return targetId;
};


export const getPrefixedIdentifier = (
    identifiers: IndustryIdentifier[]
): string => {
    let identifier: string | undefined;

    if (!identifiers || identifiers.length === 0) {
        identifier = "";
        // throw new Error(
        //     "Invalid argument: identifiers must be a non-empty array."
        // );
        return '';
    }
    console.log(identifiers)
    // ISBN-13
    const isbn13 = identifiers.find((id) => id.type === "ISBN_13");
    if (isbn13) {
        identifier = "isbn_13_" + isbn13.identifier;
    }
    // ISBN-10
    const isbn10 = identifiers.find((id) => id.type === "ISBN_10");
    if (!identifier && isbn10) {
        identifier = "isbn_10_" + isbn10.identifier;
    }
    // Others
    const others = identifiers.find((id) => id.type === "OTHER");
    if (!identifier && others) {
        identifier = "others_" + others.identifier;
    }
    // if (!identifier) {
    //     throw new Error(
    //         "Invalid argument: identifiers must contain an ISBN_13, ISBN_10, or OTHER type identifier."
    //     );
    // }

    return identifier;
};
