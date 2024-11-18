export const workflowReferenceStructure: any = {
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
  },
  model: {
    modelName: 'NameOfTheDBModel',
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    multirecord: true,
    name: 'ModelNodeName',
    description:
      'This node will help in doing crud operations on the mention model',
    inputVarMap: {},
    outputVarMap: {},
    nodeType: 'MODEL',
    operation: '<intValueofOperationToBePerformed>'
  },
  decision: {
    connectors: [
      {
        exitPortType: 'TrueStep',
        nodeId: 'nextNodeId_True'
      },
      {
        exitPortType: 'FalseStep',
        nodeId: 'nextNodeId_False'
      }
    ],
    name: 'DecisionNodeName',
    description:
      'Based on the output of the result of this node , next node connection will be decided',
    processRule: '{process rule script goes here}',
    id: 'DecisionNodeUniqueIdentifier',
    nodeType: 'DECISION'
  },
  query: {
    filter: '{filter to fetch the data}',
    models: ['modelName'],
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    columns: {
      column1: 'modelName.column1',
      column2: 'modelName.column2',
      column3: 'modelName.column3',
      column4: 'modelName.column4'
    },
    name: 'QueryNodeName',
    description:
      'this node will help to fetch the data from a specific model for the mentioned filter',
    inputVarMap: {},
    outputVarMap: {},
    nodeType: 'QUERY'
  },
  zqlquery: {
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    zql: '{true/false}',
    name: 'zqlQueryNodeName',
    description:
      'this node will fetch the data based on the query written in the {uniqueQueryId}',
    inputVarMap: {},
    outputVarMap: {},
    nodeType: 'QUERY',
    queryId: 'uniqueQueryId'
  },

  workflow: {
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    processId: 'uniqueProcessId',
    ignoreSubContext: true,
    name: 'workflowNodeName',
    description:
      'this node will help to call and execure the workflow that is mention in the {uniqueProcessId}',
    inputVarMap: {},
    outputVarMap: {},
    nodeType: 'WORKFLOW'
  },

  foreachloop: {
    connectors: [
      {
        exitPortType: 'TrueStep',
        nodeId: 'nextNodeId_IfTrueStep'
      },
      {
        exitPortType: 'FalseStep',
        nodeId: 'nextNodeId_IfFalseStep'
      }
    ],
    data: '{dataToBeExecuted}',
    name: 'foreachloopNodeName',
    description:
      'this node will help to execute a specific steps in a for loop',
    inputVarMap: {},
    outputVarMap: {},
    nodeType: 'FOREACHLOOP'
  },

  notify: {
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    name: 'notifyNodeName',
    description:
      'this node will help in sending the notification to target based on the input and output var map',
    inputVarMap: {},
    targetType: 'targetMentioned',
    outputVarMap: {},
    notificationType: 'notificationTypeMentioned',
    templateId: 'uniqueTemplateId',
    nodeType: 'NOTIFY'
  },
  multiDecision: {
    connectors: [
      {
        condition: 'condition1',
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId_basedOn_condition1'
      },
      {
        condition: 'condition2',
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId_basedOn_condition2'
      },
      {
        condition: 'condition3',
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId_basedOn_condition3'
      },
      {
        condition: 'condition4',
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId_basedOn_condition4'
      }
    ],
    name: 'multiDecisionNodeName',
    description:
      'this node is to land on various other nodes based on multiple decission',
    nodeType: 'MULTIDECISION'
  },
  logger: {
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    name: 'loggerNodeName',
    description:
      'this node is to print the logs and identify what is happening',
    inputVarMap: {},
    nodeType: 'LOGGER'
  },
  publish: {
    eventId: 'event to publish in this node',
    connectors: [
      {
        exitPortType: 'NextStep',
        nodeId: 'nextNodeId'
      }
    ],
    name: 'publishNodeName',
    description: 'Provide some description for your publish node',
    inputVarMap: {},
    outputVarMap: {},
    position: {},
    nodeType: 'PUBLISH'
  },
  workflowContext: {},
  workflowNodes:[]
};
