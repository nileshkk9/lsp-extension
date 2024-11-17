import { workflowReferenceStructure } from './workflowReferenceStructure';

export const workflowHoverDefinition: any = {
  name: { description: 'The name of the node.' },
  description: { description: "A brief explanation of the node's purpose." },
  connectors: {
    description:
      'Defines the connections between nodes, determining the flow of execution.'
  },
  inputVarMap: { description: 'Variables passed as inputs to the node.' },
  outputVarMap: { description: 'Variables received as outputs from the node.' },
  nodeType: {
    description:
      'Specifies the type of the node (e.g., PROCESS, QUERY, WORKFLOW, DECISION, MULTIDECISION).'
  },
  processRule: {
    description:
      'JavaScript logic executed within PROCESS, DECISION, or MULTIDECISION nodes.'
  },
  contextChangePermitted: {
    description: 'Indicates whether workflowContext modifications are allowed.'
  },
  condition: {
    description:
      'JavaScript code used in MULTIDECISION nodes to determine the next node.'
  },
  exitPortType: {
    description: 'Specifies the type of the next node in connectors.'
  },
  nodeId: { description: 'The ID of the next node to execute.' },
  queryId: {
    description: 'Refers to a predefined query in the database for QUERY nodes.'
  },
  processId: {
    description:
      'Refers to the ID of a sub-workflow to execute for WORKFLOW nodes.'
  },
  DefaultStep: {
    description:
      'Specifies the fallback node in MULTIDECISION nodes when no conditions match.'
  },
  workflowContext: {
    description:
      'A global object initializing variables accessible throughout the workflow.'
  },
  START: {
    description: 'This is the node from where the execution starts',
    snippet: workflowReferenceStructure['start']
  },
  END: {
    description: 'This is the node where the execution ends.',
    snippet: workflowReferenceStructure['end']
  },
  PROCESS: {
    description: 'Executes JavaScript logic to process data.',
    specificKeys: {
      processRule: 'JavaScript string containing the logic to execute.',
      contextChangePermitted:
        'Indicates whether workflow context modifications are allowed.'
    },
    snippet: workflowReferenceStructure['process']
  },
  DECISION: {
    description: 'Evaluates a boolean condition to determine the next step.',
    specificKeys: {
      processRule: 'JavaScript code returning a boolean result.',
      connectors: {
        true: 'Executes if processRule evaluates to true.',
        false: 'Executes if processRule evaluates to false.'
      }
    },
    snippet: workflowReferenceStructure['decision']
  },
  MULTIDECISION: {
    description:
      'Directs execution to one of several nodes based on conditions.',
    specificKeys: {
      condition: 'JavaScript code that evaluates to true for execution.',
      exitPortType: 'Specifies the type of the next node.',
      nodeId: 'Identifies the next node.',
      DefaultStep: 'Fallback node if no conditions match.'
    },
    snippet: workflowReferenceStructure['multidecision']
  },
  QUERY: {
    description: 'Fetches or executes predefined queries stored in a database.',
    specificKeys: {
      queryId: 'The unique identifier of the query.'
    },
    snippet: workflowReferenceStructure['query']
  },
  WORKFLOW: {
    description:
      'Calls and executes another workflow within the current workflow.',
    specificKeys: {
      processId: 'The ID of the sub-workflow to execute.'
    },
    snippet: workflowReferenceStructure['workflow']
  }
};
