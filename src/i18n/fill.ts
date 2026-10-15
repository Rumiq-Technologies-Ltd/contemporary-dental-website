/**
 * Replaces {name}-style placeholders in a translated string. Keys stay in every language,
 * so a missing value is left visible rather than silently dropped.
 */
export function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => values[key] ?? match);
}
