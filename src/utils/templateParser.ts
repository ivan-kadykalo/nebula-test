/** Keys are questions slugs, values (answers slugs) **/
interface ResponsesObject {
  [key: string]: string;
}

/**
 * Splits the content of a template block into individual clauses,
 * respecting quoted strings in the result part of a clause.
 * @param blockContent The string content within {{...}}.
 * @returns An array of clause strings.
 */
function splitBlockContentIntoClauses(blockContent: string): string[] {
  const clauses: string[] = [];
  let currentClause = "";
  let inQuotes = false;

  for (let i = 0; i < blockContent.length; i++) {
    const char = blockContent[i];

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
 * @param templateString The template string to parse.
 * @param responsesObject An object containing key-value pairs for response data.
 * @returns The parsed string with conditional blocks resolved.
 */
export function parseDynamicTemplate(
  templateString: string,
  responsesObject: ResponsesObject,
): string {
  // Check if the template string contains any dynamic blocks before parsing (for optimization)
  if (!templateString.includes("{{") || !templateString.includes("}}")) {
    return templateString;
  }

  const blockRegex = /\{\{([^}]+?)\}\}/g;

  return templateString.replace(blockRegex, (match, blockContent: string) => {
    const clauses = splitBlockContentIntoClauses(blockContent);

    if (clauses.length === 0) {
      return "";
    }

    let blockScopedVarName: string | null = null;

    // Group 1: variableName, Group 2: expectedLiteralValue, Group 3: quote, Group 4: result
    const firstClauseFullFormRegex =
      /^\s*([\w-]+)\s*===\s*([\w-]+)\s*:\s*(['"])(.*?)\3\s*$/;

    // Group 1: expectedLiteralValue, Group 2: quote, Group 3: result
    const subsequentClauseShortFormRegex =
      /^\s*([\w-]+)\s*:\s*(['"])(.*?)\2\s*$/;

    // Process the first clause
    const firstClause = clauses[0];
    const firstClauseMatch = firstClause.match(firstClauseFullFormRegex);

    if (firstClauseMatch) {
      const [, varName, expectedVal, , result] = firstClauseMatch;
      blockScopedVarName = varName;

      if (
        responsesObject[blockScopedVarName] !== undefined &&
        String(responsesObject[blockScopedVarName]) === expectedVal
      ) {
        return result;
      }
    } else {
      console.warn(
        `Block "${match}" must start with a "variableName === value: 'result'" clause. Found: "${firstClause}"`,
      );
      return "";
    }

    for (let i = 1; i < clauses.length; i++) {
      const clause = clauses[i];
      if (!clause || blockScopedVarName === null) continue;

      const shortMatch = clause.match(subsequentClauseShortFormRegex);
      if (shortMatch) {
        const [, expectedVal, , result] = shortMatch;
        if (
          responsesObject[blockScopedVarName] !== undefined &&
          String(responsesObject[blockScopedVarName]) === expectedVal
        ) {
          return result; // Condition met
        }
      } else {
        console.warn(
          `Malformed subsequent clause: "${clause}" in block "${match}". Expected "value: 'result'" format.`,
        );
      }
    }

    return "";
  });
}
