import { isDefined } from "@rono/utils";
import { NodeType } from "./parser";
import { Association, AssociationStrength } from "./types";

const alphaOrSpaceRe = /^\*?[a-zA-Zúîéèâêçñ/\- ]+$/;
export const isSimpleAssociation = (associationText: string): boolean => {
  return alphaOrSpaceRe.test(associationText);
};

const especiallyRe = /^\*?[a-zA-Z/ç\- ]+, esp./;
export const isEspeciallyAssociation = (associationText: string): boolean => {
  return especiallyRe.test(associationText);
};

const exampleRe = /^\*?[a-zA-Z ]+:/;
const exampleRe2 = /^\*?[a-zA-Z ]+,/;
export const isExampleAssociation = (associationText: string): boolean => {
  return exampleRe.test(associationText) || exampleRe2.test(associationText);
};

const egRe = /^\*?[a-zA-Z ]+ \(e.g., [^)]*\)$/;
export const isEgAssociation = (associationText: string): boolean => {
  return egRe.test(associationText);
};

const peakRe = /^\*?[a-zA-Z ]+ \(peak:/;
export const isPeak = (associationText: string): boolean => {
  return peakRe.test(associationText);
};

const parenRe = /^\*?([a-zA-Zçé\- ]+) \(([^)]*)\)$/;
export const isParen = (associationText: string): boolean => {
  return parenRe.test(associationText);
};

export const isAffinity = (associationText: string): boolean => {
  return associationText.includes("+");
};

export const isUppercase = (input: string): boolean => {
  return input.toLocaleUpperCase() === input;
};

export const getAssociation = (
  associationText: string,
  strong: string[],
): Association | Association[] | NodeType | undefined => {
  if (isSimpleAssociation(associationText)) {
    return getSimpleAssociation(associationText, strong);
  }
  if (isEspeciallyAssociation(associationText)) {
    return getEspeciallyAssociation(associationText, strong);
  }
  if (isExampleAssociation(associationText)) {
    return getExampleAssociation(associationText, strong);
  }
  if (isEgAssociation(associationText)) {
    return getEgAssociation(associationText, strong);
  }
  if (isPeak(associationText)) {
    return getPeakAssociation(associationText);
  }
  if (isParen(associationText)) {
    return getParen(associationText, strong);
  }
  if (isAffinity(associationText)) {
    return "affinity";
  }
  if (associationText.includes(") and ")) {
    const i = associationText.indexOf(") and ");
    const assocs = [
      associationText.slice(0, i + 1),
      associationText.slice(i + 6),
    ];
    return assocs.map((assoc) => getAssociation(assoc, strong)).filter(isAssoc);
  }
  if (associationText.includes(") AND ")) {
    const i = associationText.indexOf(") AND ");
    const assocs = [
      associationText.slice(0, i + 1),
      associationText.slice(i + 6),
    ];
    return assocs.map((assoc) => getAssociation(assoc, strong)).filter(isAssoc);
  }
  if (associationText.includes("African (North)")) {
    return getSimpleAssociation(associationText, []);
  }
  if (associationText.includes("(esp. red)")) {
    return undefined;
  }
  if (associationText.includes(") ")) {
    const i = associationText.indexOf(") ");
    const assocs = [
      associationText.slice(0, i + 1),
      associationText.slice(i + 2),
    ];
    return assocs.map((assoc) => getAssociation(assoc, strong)).filter(isAssoc);
  }
  if (associationText.includes("AND ")) {
    const i = associationText.indexOf(" AND ");
    const assocs = [
      associationText.slice(0, i + 1),
      associationText.slice(i + 5),
    ];
    return assocs.map((assoc) => getAssociation(assoc, strong)).filter(isAssoc);
  }
  if (associationText.includes("wheat")) {
    return {
      name: "wheat",
      level: 1,
      example: [
        {
          name: "noodles",
          level: 1,
        },
      ],
      especially: [
        {
          name: "in northern China",
          level: 1,
        },
      ],
    };
  }
  if (associationText.includes("EGG DISHES")) {
    return [
      {
        name: "egg dishes",
        level: 3,
        example: [
          {
            name: "omelets",
            level: 1,
          },
        ],
      },
      {
        name: "egg salad",
        level: 1,
      },
    ];
  }
  console.log(associationText, strong);
  return undefined;
};

export const isAssoc = (
  maybeAssoc: NodeType | undefined | Association | Association[],
): maybeAssoc is Association => {
  return (
    isDefined(maybeAssoc) &&
    !(typeof maybeAssoc === "string") &&
    !Array.isArray(maybeAssoc)
  );
};

export const getLevel = (text: string, strong: string): AssociationStrength => {
  if (!strong.includes(text)) {
    return 1;
  }
  if (!isUppercase(text)) {
    return 2;
  }
  if (!text.includes("*")) {
    return 3;
  }
  return 4;
};

const cleanText = (input: string): string => {
  let cleaned = input;
  if (isUppercase(cleaned)) {
    cleaned = cleaned.toLocaleLowerCase();
  }
  if (cleaned.startsWith("*")) {
    cleaned = cleaned.slice(1);
  }
  return cleaned;
};

export const getSimpleAssociation = (
  associationText: string,
  strong: string[],
): Association => {
  return {
    name: cleanText(associationText),
    level: getLevel(associationText, strong[0] ?? ""),
  };
};

const lexEspecially = (especially: string): string[] => {
  if (especially === "") {
    return [];
  }
  const especiallyAsArray = Array.from(especially);
  let thisEnd =
    especially[0] === "("
      ? especiallyAsArray.findIndex((char) => char === ")") + 1
      : especiallyAsArray.findIndex((char) => char === "," || char === "(");
  if (thisEnd === undefined || thisEnd === -1) {
    return [especially];
  }
  if (thisEnd === 0) {
    thisEnd = especiallyAsArray.length;
  }
  const nextStart = especially[thisEnd] === "," ? thisEnd + 1 : thisEnd;
  const token = especially.slice(0, thisEnd).trim();
  const rest = especially.slice(nextStart);
  return [token, ...lexEspecially(rest.trim())];
};

const processTokens = (tokens: string[], strong: string): Association[] => {
  let currentAssociation: Association | undefined;
  const associations: Association[] = [];

  for (const token of tokens) {
    if (token.startsWith("(e.g.,") || token.startsWith("(i.e.,")) {
      const examples = token.slice(7, token.length - 1).split(", ");
      if (currentAssociation === undefined) {
        continue;
      }
      if (currentAssociation.example === undefined) {
        currentAssociation.example = [];
      }
      currentAssociation.example.push(
        ...examples.map((example) => ({
          name: cleanText(example),
          level: getLevel(example, strong),
        })),
      );
    } else {
      if (currentAssociation !== undefined) {
        associations.push(currentAssociation);
      }
      currentAssociation = {
        name: cleanText(token),
        level: getLevel(token, strong),
      };
    }
  }
  if (currentAssociation !== undefined) {
    associations.push(currentAssociation);
  }
  return associations;
};

export const getEspeciallyAssociation = (
  associationText: string,
  strong: string[],
): Association | undefined => {
  const [entry, especially] = associationText.split(", esp. ");
  if (entry === undefined || especially === undefined) {
    return;
  }
  const especiallies = lexEspecially(especially);
  const strongStr = strong.join("");
  return {
    name: cleanText(entry),
    level: getLevel(entry, strongStr),
    especially: processTokens(especiallies, strongStr),
  };
};

export const getExampleAssociation = (
  associationText: string,
  strong: string[],
): Association | undefined => {
  const entryEnd = Array.from(associationText).findIndex(
    (char) => char === "," || char === ":",
  );
  if (entryEnd === -1) {
    return;
  }
  const entry = associationText.slice(0, entryEnd);
  const tokens = lexEspecially(associationText.slice(entryEnd + 1));
  const strongStr = strong.join("");
  return {
    name: cleanText(entry),
    level: getLevel(entry, strongStr),
    example: processTokens(tokens, strongStr),
  };
};

const getEgAssociation = (
  associationText: string,
  strong: string[],
): Association | undefined => {
  const tokens = lexEspecially(associationText);
  return processTokens(tokens, strong.join(""))[0];
};

const getPeakAssociation = (
  associationText: string,
): Association | undefined => {
  const [entry, peak] = lexEspecially(associationText);
  if (entry === undefined || peak === undefined) {
    return undefined;
  }
  const peakStr = peak.match(/\(peak: (.*)\)$/)?.[1];
  return {
    name: cleanText(entry),
    level: 1,
    peak: peakStr,
  };
};

const getParen = (
  associationText: string,
  strong: string[],
): Association | undefined => {
  // console.log(associationText, strong);
  const [_, entry, note] = associationText.match(parenRe) ?? [];
  if (entry === undefined || note === undefined) {
    return undefined;
  }
  return {
    name: cleanText(entry),
    level: getLevel(entry, strong.join("")),
    parenthesis: note,
  };
};
