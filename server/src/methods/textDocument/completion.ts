import { RequestMessage } from '../../server';
import { documents, TextDocumentIdentifier } from '../../documents';
import log from '../../log';
import * as fs from 'fs';
import { Position } from '../../types';
import path from 'path';
import { InsertTextFormat } from 'vscode-languageserver';

const MAX_LENGTH = 1000;

// Load JSON data from an asset file
const jsonFilePath = path.join(__dirname, '../../../assets/completions.json');
const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

type CompletionItem = {
  label: string;
};

interface CompletionList {
  isIncomplete: boolean;
  items: CompletionItem[];
}

interface TextDocumentPositionParams {
  textDocument: TextDocumentIdentifier;
  position: Position;
}

export interface CompletionParams extends TextDocumentPositionParams {}

export const completion = (message: RequestMessage): CompletionList | null => {
  const params = message.params as CompletionParams;
  const content = documents.get(params.textDocument.uri);

  if (!content) {
    return null;
  }

  const currentLine = content.split('\n')[params.position.line];
  const lineUntilCursor = currentLine.slice(0, params.position.character);
  const currentPrefix = lineUntilCursor.replace(/.*[\W ](.*?)/, '$1');

  // Generate completion items from JSON data
  const items: CompletionItem[] = Object.entries(jsonData)
    .map(([key, nodeObject]: any) => {
      const nodeType = nodeObject.nodeType || key;

      // Beautify the JSON output for insertText with indentation
      const beautifiedJson = JSON.stringify(
        nodeObject,
        null,
        2
      ).replace(/\n/g, '\n');

      return {
        label: nodeType,
        detail: nodeObject.description || '',
        documentation: JSON.stringify(nodeObject, null, 2),
        insertText: beautifiedJson, // Insert properly indented JSON
        insertTextFormat: InsertTextFormat.Snippet // Use snippet format for multiline
      };
    })
    .filter((item) => item.label.toLowerCase().startsWith(currentPrefix.toLowerCase()))
    .slice(0, MAX_LENGTH);

  return {
    isIncomplete: items.length === MAX_LENGTH,
    items
  };
};
