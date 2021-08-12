import React, { useState } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  removeElements,
  MiniMap,
  Background,
  Controls
} from 'react-flow-renderer';

import Sidebar from './sidebar';
import CustomControls from './controls';
import CustomNode from './customNode';
import CustomEdge from './customEdge';


import './dnd.css';

const nodeTypes = {
  conditionNode: CustomNode,
};
const edgeTypes = {
  custom: CustomEdge,
};

const initialElements = [{ id: '1', type: 'input', data: { label: 'input node' }, position: { x: 250, y: 5 } }];

const onDragOver = (event) => {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
};

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const [reactFlowInstance, setReactFlowInstance] = useState();
  const [elements, setElements] = useState(initialElements);

  const onConnect = (params) => setElements((els) => {
    const config = {label: '',animated: true, arrowHeadType: 'arrow', ...params};
    return addEdge(config, els);
  });
  const onElementsRemove = (elementsToRemove) => setElements((els) => removeElements(elementsToRemove, els));
  const onLoad = (_reactFlowInstance) => setReactFlowInstance(_reactFlowInstance);

  const onDrop = (event) => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type = event.dataTransfer.getData('application/reactflow');
      const position = reactFlowInstance.project({ x: event.clientX, y: event.clientY - 40 });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setElements((es) => es.concat(newNode));
    }
  };

  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper">
          <ReactFlow
            elements={elements}
            nodeTypes={nodeTypes}
            onConnect={onConnect}
            onElementsRemove={onElementsRemove}
            onLoad={onLoad}
            edgeTypes={edgeTypes}
            onDrop={onDrop}
            onDragOver={onDragOver}
          >
            <MiniMap />
            <Controls />
            <CustomControls rfInstance={reactFlowInstance} setElements={setElements} />  
            <Background />
          </ReactFlow>
        </div>
        <Sidebar />
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;