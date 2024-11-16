export const suggestClosestKeys = (
  incorrectKey: string,
  validKeys: string[]
): string[] => {
  const levenshtein = (a: string, b: string): number => {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
      Array(b.length + 1).fill(0)
    );
    for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        matrix[i][j] =
          a[i - 1] === b[j - 1]
            ? matrix[i - 1][j - 1]
            : Math.min(
                matrix[i - 1][j] + 1, // Deletion
                matrix[i][j - 1] + 1, // Insertion
                matrix[i - 1][j - 1] + 1 // Substitution
              );
      }
    }
    return matrix[a.length][b.length];
  };

  const threshold = 3;
  return validKeys
    .map((key) => ({
      key,
      distance: levenshtein(incorrectKey, key)
    }))
    .filter(({ distance }) => distance <= threshold)
    .sort((a, b) => a.distance - b.distance)
    .map(({ key }) => key);
};
