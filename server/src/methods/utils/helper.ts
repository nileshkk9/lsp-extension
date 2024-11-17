export const removeQuotes = (str: string): string => {
  if (
    (str.startsWith('"') && str.endsWith('"')) ||
    (str.startsWith("'") && str.endsWith("'"))
  ) {
    return str.slice(1, -1);
  }

  return str;
};

export const formatHoverContent = (
  word: string,
  definition: string,
  codeSnippet: object // Accepting a JavaScript object
): string => {
  const cleanedWord = word.trim();
  const separator = `\`${'-'.repeat(cleanedWord.length)}\``; // Code style for separator

  // Convert the codeSnippet object to a formatted JSON string
  const formattedCodeSnippet = codeSnippet
    ? `\`\`\`json\n${JSON.stringify(
        codeSnippet,
        null,
        2 // Indentation for pretty printing
      )}\n\`\`\``
    : '';

  return `**${cleanedWord}**\n\n${separator}\n\n${definition.trim()}\n\n${formattedCodeSnippet}`;
};
