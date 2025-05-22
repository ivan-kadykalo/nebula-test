import { logError } from "@/utils/logger";

/** Keys are questions slugs, values (answers slugs) **/
interface Answers {
  [key: string]: string;
}

/**
 * Splits the content of a template block into individual clauses,
 * respecting quoted strings in the result part of a clause.
 * @param content The string content within {{...}}.
 * @returns An array of clause strings.
 */
function splitContentIntoClauses(content: string): string[] {
  const clauses: string[] = [];
  let currentClause = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (char === "'" || char === '"') {
      const lastColonIndex = currentClause.lastIndexOf(":");

      if (lastColonIndex !== -1) {
        inQuotes = !inQuotes;
      }
    }

    if (char === "," && !inQuotes) {
      clauses.push(currentClause.trim());
      currentClause = "";
    } else {
      currentClause += char;
    }
  }
  clauses.push(currentClause.trim());

  return clauses.filter((c) => c);
}

/**
 * Parses a template string with dynamic conditional blocks.
 *
 * Syntax Example: {{select-gender === female: 'woman', male: 'man'}}
 *
 * - The variable name (question slug) is defined in the first condition (e.g., "select-gender").
 * - Subsequent conditions (answer slug) in the same block refer to that same variable and
 * MUST use the short form (e.g., "male: 'man'").
 *
 * @param inputString The template string to parse.
 * @param answers An object containing key-value pairs for response data.
 * @returns The parsed string with conditional blocks resolved.
 */
export function parseDynamicTemplate(
  inputString: string,
  answers: Answers,
): string {
  // Check if the template string contains any dynamic blocks before parsing (for optimization)
  if (!inputString.includes("{{") || !inputString.includes("}}")) {
    return inputString;
  }

  const blockRegex = /\{\{([^}]+?)\}\}/g;

  return inputString.replace(blockRegex, (match, content: string) => {
    const clauses = splitContentIntoClauses(content);

    if (clauses.length === 0) {
      return "";
    }

    let questionSlug: string | null = null;

    // Process first condition (long one, with ===)
    // {{ condition === expectedValue: 'result' }}
    const mainClauseRegex =
      /^\s*([\w-]+)\s*===\s*([\w-]+)\s*:\s*(['"])(.*?)\3\s*$/;

    const firstClause = clauses[0];
    const isMainClauseMatch = firstClause.match(mainClauseRegex);

    if (isMainClauseMatch) {
      const [, questionSlugVal, answerSlug, , result] = isMainClauseMatch;
      questionSlug = questionSlugVal;

      if (
        answers[questionSlug] !== undefined &&
        String(answers[questionSlug]) === answerSlug
      ) {
        return result;
      }
    } else {
      logError(`Invalid subsequent clause: "${firstClause}"`);
      return "";
    }

    // Process other conditions (short)
    // {{ condition: 'result' }} - subsequent clauses after the main
    const subsequentClauseRegex = /^\s*([\w-]+)\s*:\s*(['"])(.*?)\2\s*$/;

    for (let i = 1; i < clauses.length; i++) {
      const clause = clauses[i];
      if (!clause || questionSlug === null) continue;

      const shortMatch = clause.match(subsequentClauseRegex);

      if (shortMatch) {
        const [, answerSlug, , result] = shortMatch;
        if (
          answers[questionSlug] !== undefined &&
          String(answers[questionSlug]) === answerSlug
        ) {
          return result;
        }
      } else {
        logError(`Invalid subsequent clause: "${clause}"`);
      }
    }

    return "";
  });
}
