import { RequestMessage } from '../../server';
import { Range } from '../../types';
import log from '../../log';
import { TextDocumentIdentifier, documents } from '../../documents';
import { workflowReferenceStructure } from '../constants/workflowReferenceStructure';
import { keySuggestions } from '../suggestions/keySuggestions';

interface DocumentDiagnosticParams {
  textDocument: TextDocumentIdentifier;
}

namespace DiagnosticSeverity {
  export const Error: 1 = 1;
  export const Warning: 2 = 2;
  export const Information: 3 = 3;
  export const Hint: 4 = 4;
}

type DiagnosticSeverity = 1 | 2 | 3 | 4;

// interface SpellingSuggestionData {
//   wordSuggestions: string[];
//   type: 'spelling-suggestion';
// }

interface KeyValidationData {
  keySuggestion: string[];
  type: 'key-validation';
}

export interface Diagnostic {
  range: Range;
  severity: DiagnosticSeverity;
  source: 'LSP From Scratch';
  message: string;
  data: KeyValidationData;
}

interface FullDocumentDiagnosticReport {
  kind: 'full';
  items: Diagnostic[];
}

export const diagnostic = (
  message: RequestMessage
): FullDocumentDiagnosticReport | null => {
  const params = message.params as DocumentDiagnosticParams;
  const content = documents.get(params.textDocument.uri);

  if (!content) {
    return null;
  }

  const items: Diagnostic[] = [];
  const contentLines = content.split('\n');

  let parsedContent;
  try {
    parsedContent = JSON.parse(content);
  } catch (e) {
    return {
      kind: 'full',
      items: [
        {
          source: 'LSP From Scratch',
          severity: DiagnosticSeverity.Error,
          range: {
            start: { line: 0, character: 0 },
            end: { line: 0, character: 0 }
          },
          message: 'Invalid JSON format.',
          data: { keySuggestion: [], type: 'key-validation' }
        }
      ]
    };
  }

  if (parsedContent && typeof parsedContent === 'object') {
    const workflowKeys: any = [];
    for (const key in parsedContent) {
      if (parsedContent[key]['nodeType']) {
        workflowKeys.push(key);
      }
    }

    Object.entries(parsedContent).forEach(([nodeKey, node]: any, index) => {
      if (node && typeof node === 'object' && node.nodeType) {
        const nodeTypeKey = node.nodeType?.toLowerCase();
        const template = workflowReferenceStructure[nodeTypeKey];

        const nodeTypeLine = contentLines.findIndex((line) =>
          line.includes(`"${nodeKey}"`)
        );
        const nodeTypeChar = contentLines[nodeTypeLine].indexOf(`"${nodeKey}"`);

        if (!template) {
          items.push({
            source: 'LSP From Scratch',
            severity: DiagnosticSeverity.Error,
            range: {
              start: { line: nodeTypeLine, character: nodeTypeChar },
              end: {
                line: nodeTypeLine,
                character: nodeTypeChar + nodeKey.length + 1
              }
            },
            message: `Unknown or incorrect nodeType: ${node.nodeType}`,
            data: { keySuggestion: [], type: 'key-validation' }
          });
          return;
        }

        // Check for missing keys
        Object.keys(template).forEach((key) => {
          if (!(key in node)) {
            items.push({
              source: 'LSP From Scratch',
              severity: DiagnosticSeverity.Error,
              range: {
                start: { line: nodeTypeLine, character: nodeTypeChar },
                end: {
                  line: nodeTypeLine,
                  character: nodeTypeChar + nodeKey.length + 1
                }
              },
              message: `Missing key: ${key} in nodeType ${node.nodeType}`,
              data: { keySuggestion: [], type: 'key-validation' }
            });
          }
        });

        // Check for incorrect keys
        Object.keys(node).forEach((key) => {
          if (!(key in template)) {
            const incorrectLine = contentLines.findIndex((line) =>
              line.includes(`"${key}"`)
            );
            const incorrectChar = contentLines[incorrectLine].indexOf(
              `"${key}"`
            );
            const suggestions = keySuggestions(key, Object.keys(template));

            items.push({
              source: 'LSP From Scratch',
              severity: DiagnosticSeverity.Warning,
              range: {
                start: { line: incorrectLine, character: incorrectChar + 1 },
                end: {
                  line: incorrectLine,
                  character: incorrectChar + key.length + 1
                }
              },
              message: `Incorrect key: ${key} in nodeType ${node.nodeType}`,
              data: { keySuggestion: suggestions, type: 'key-validation' }
            });
          }
        });
      } else {
        // Generic object validation logic
        const incorrectLine = contentLines.findIndex((line) =>
          line.includes(`"${nodeKey}"`)
        );
        const incorrectChar = contentLines[incorrectLine].indexOf(
          `"${nodeKey}"`
        );
        const suggestions = keySuggestions(
          nodeKey,
          Object.keys(workflowReferenceStructure)
        );

        if (typeof node === 'object') {
          if (!(nodeKey in workflowReferenceStructure)) {
            items.push({
              source: 'LSP From Scratch',
              severity: DiagnosticSeverity.Warning,
              range: {
                start: { line: incorrectLine, character: incorrectChar + 1 },
                end: {
                  line: incorrectLine,
                  character: incorrectChar + nodeKey.length + 1
                }
              },
              message: `Incorrect key: ${nodeKey}`,
              data: { keySuggestion: suggestions, type: 'key-validation' }
            });
          } else if (Array.isArray(node) && !workflowKeys.includes(nodeKey)) {
            // Diagnose if the key is not part of the workflowNodes array
            const workflowNodes = parsedContent.workflowNodes || [];

            Object.keys(parsedContent).forEach((key) => {
              if (
                parsedContent[key]?.nodeType &&
                !workflowNodes.includes(key)
              ) {
                const incorrectLine = contentLines.findIndex((line) =>
                  line.includes(`"${key}"`)
                );
                const incorrectChar = contentLines[incorrectLine].indexOf(
                  `"${key}"`
                );

                items.push({
                  source: 'LSP From Scratch',
                  severity: DiagnosticSeverity.Error,
                  range: {
                    start: {
                      line: incorrectLine,
                      character: incorrectChar + 1
                    },
                    end: {
                      line: incorrectLine,
                      character: incorrectChar + key.length + 1
                    }
                  },
                  message: `Key "${key}" with nodeType "${parsedContent[key].nodeType}" is not listed in "workflowNodes".`,
                  data: { keySuggestion: [], type: 'key-validation' }
                });
              }
            });
          }
        }
      }
    });
  }

  return {
    kind: 'full',
    items
  };
};
