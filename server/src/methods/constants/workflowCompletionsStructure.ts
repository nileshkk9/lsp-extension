export const workflowCompletionsStructure: any = {
  start: {
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    name: 'start',
    description: 'start',
    nodeType: 'START'
  },
  process: {
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    contextChangePermitted: true,
    name: 'processNodeName',
    description: 'It helps  write js code ',
    processRule: '{}',
    nodeType: 'PROCESS'
  },
  end: {
    name: 'end',
    description: 'End',
    inputVarMap: {},
    outputVarMap: {},
    nodeType: 'END'
  }
};
