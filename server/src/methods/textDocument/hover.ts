import { DocumentUri, documents, wordUnderCursor } from '../../documents';
import { RequestMessage } from '../../server';
import { Position, Range } from '../../types';
import { workflowHoverDefinition } from '../constants/workflowHoverDefinition';
import { formatHoverContent, removeQuotes } from '../utils/helper';

type HoverParams = {
  textDocument: { uri: DocumentUri };
  position: Position;
};

type Hover = {
  contents: {
    kind: 'markdown';
    value: string;
  };
  range: Range;
};

export const hover = (message: RequestMessage): Hover | null => {
  const params = message.params as HoverParams;

  // Extract the current word under the cursor
  const currentWord = wordUnderCursor(params.textDocument.uri, params.position);

  if (!currentWord) {
    // Return null if no word is found
    return null;
  }

  // Remove any quotes from the extracted word
  // const cleanedWord = removeQuotes(currentWord.text);

  // Retrieve the description from the workflowHoverDefinition
  const definition = workflowHoverDefinition[currentWord.text]?.description;
  const snippet = workflowHoverDefinition[currentWord.text]?.snippet;

  if (!definition) {
    // Return null if no definition is found
    return null;
  }

  // Format the hover value with the word and its description
  const value = formatHoverContent(currentWord.text, definition, snippet);

  return {
    contents: {
      kind: 'markdown',
      value
    },
    range: currentWord.range
  };
};
