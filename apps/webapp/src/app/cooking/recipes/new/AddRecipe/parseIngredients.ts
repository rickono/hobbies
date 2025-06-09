import { ParsedIngredient } from "./types";

const UNITS = [
  "teaspoon",
  "teaspoons",
  "tsp",
  "tablespoon",
  "tablespoons",
  "tbsp",
  "cup",
  "cups",
  "ounce",
  "ounces",
  "oz",
  "gram",
  "grams",
  "g",
  "kilogram",
  "kilograms",
  "kg",
  "pound",
  "pounds",
  "lb",
  "lbs",
  "clove",
  "cloves",
  "slice",
  "slices",
  "sprig",
  "sprigs",
  "pinch",
  "pinches",
  "dash",
  "dashes",
  "can",
  "cans",
  "fillet",
  "fillets",
  "leaf",
  "leaves",
  "square",
  "squares",
];

// Parse a string like "1", "1/2", "1 1/2", "1.5"
function parseSingleQuantity(input: string): number {
  const parts = input.trim().split(" ");
  let total = 0;

  for (const part of parts) {
    if (part.includes("/")) {
      const [num, denom] = part.split("/").map(Number);
      if (
        num === undefined ||
        denom === undefined ||
        isNaN(num) ||
        isNaN(denom)
      ) {
        throw new Error(`Invalid fraction: ${part}`);
      }
      total += num / denom;
    } else {
      total += parseFloat(part);
    }
  }

  return total;
}

// Parses quantities like "1 1/2", "1.5", "1-2", "1 1/2-2.5"
function parseQuantity(input: string): number | [number, number] | undefined {
  const rangeParts = input.split("-").map((s) => s.trim());

  if (!rangeParts[0]) {
    return undefined;
  }

  if (rangeParts.length === 1 || !rangeParts[1]) {
    return parseSingleQuantity(rangeParts[0]);
  }

  return [
    parseSingleQuantity(rangeParts[0]),
    parseSingleQuantity(rangeParts[1]),
  ];
}

function parseIngredientLine(line: string): ParsedIngredient {
  const rawText = line.trim();
  const result: ParsedIngredient = { rawText };

  // Match quantities like: "1 1/2", "1.5", "1 1/2-2", "1.5-2.5"
  const quantityMatch = rawText.match(
    /^(\d+(?:[ .]\d+\/\d+|\.\d+)?(?:\s*-\s*\d+(?:[ .]\d+\/\d+|\.\d+)?)?)/,
  );
  if (quantityMatch && quantityMatch[1]) {
    const quantity = parseQuantity(quantityMatch[1]);
    if (Array.isArray(quantity)) {
      result.quantity = quantity[0];
    } else {
      result.quantity = quantity;
    }
  }

  const remainder = rawText.replace(quantityMatch?.[0] || "", "").trim();
  const [mainPart, prepPart] = remainder.split(",");

  if (prepPart) {
    result.preparation = prepPart.trim().toLowerCase();
  }

  if (!mainPart) {
    return result;
  }

  const tokens = mainPart.trim().split(/\s+/);
  const lowerTokens = tokens.map((t) => t.toLowerCase());

  const unitIndex = lowerTokens.findIndex((t) => UNITS.includes(t));
  if (unitIndex !== -1) {
    result.unit = tokens[unitIndex];
    if (unitIndex > 0) {
      result.quantifier = tokens.slice(0, unitIndex).join(" ");
    }
    result.ingredient = tokens.slice(unitIndex + 1).join(" ");
  } else {
    // fallback
    result.ingredient = tokens.slice(-2).join(" ");
    if (tokens.length > 2) {
      result.quantifier = tokens.slice(0, -2).join(" ");
    }
  }

  return result;
}

export const parseIngredients = (input: string): ParsedIngredient[] => {
  const lines = input
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map(parseIngredientLine);
};
