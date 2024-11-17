import { Position, Range } from "./types";

export type DocumentUri = string;
type DocumentBody = string;

export interface TextDocumentIdentifier {
  uri: DocumentUri;
}

export interface VersionedTextDocumentIdentifier
  extends TextDocumentIdentifier {
  version: number;
}

export interface TextDocumentContentChangeEvent {
  text: string;
}

export const documents = new Map<DocumentUri, DocumentBody>();

type WordUnderCursor = {
  text: string;
  range: Range;
};

/**
 * Returns the word under the cursor in a given document.
 * 
 * @param uri - The URI of the document.
 * @param position - The position of the cursor.
 * @returns The word under the cursor and its range, or null if no word is found.
 */
export const wordUnderCursor = (
  uri: DocumentUri,
  position: Position,
): WordUnderCursor | null => {
  const document = documents.get(uri);

  if (!document) {
    return null; // Document not found
  }

  const lines = document.split("\n");

  if (position.line < 0 || position.line >= lines.length) {
    return null; // Line out of range
  }

  const line = lines[position.line];

  if (position.character < 0 || position.character > line.length) {
    return null; // Character out of range
  }

  // Use regular expressions to find word boundaries
  const wordRegex = /\b\w+\b/g; // Matches words (letters, digits, underscores)
  let match;

  while ((match = wordRegex.exec(line)) !== null) {
    const [word] = match;
    const start = match.index;
    const end = match.index + word.length;

    if (position.character >= start && position.character <= end) {
      return {
        text: word,
        range: {
          start: { line: position.line, character: start },
          end: { line: position.line, character: end },
        },
      };
    }
  }

  return null; // No word found under cursor
};