import React, { memo, useCallback } from 'react';
import { useZoomPanHelper } from 'react-flow-renderer';
import localforage from 'localforage';

localforage.config({
  name: 'react-flow',
  storeName: 'flows',
});

const flowKey = 'example-flow';

// const getNodeId = () => `randomnode_${+new Date()}`;

const Controls = ({ rfInstance, setElements }) => {
  const { transform } = useZoomPanHelper();

  const onSave = useCallback(() => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localforage.setItem(flowKey, flow);
    }
  }, [rfInstance]);

  const onRestore = useCallback(() => {
    const restoreFlow = async () => {
      const flow = await localforage.getItem(flowKey);

      if (flow) {
        const [x = 0, y = 0] = flow.position;
        setElements(flow.elements || []);
        transform({ x, y, zoom: flow.zoom || 0 });
      }
    };

    restoreFlow();
  }, [setElements, transform]);

  // const onAdd = useCallback(() => {
  //   const newNode = {
  //     id: `random_node-${getNodeId()}`,
  //     data: { label: 'Added node' },
  //     position: { x: Math.random() * window.innerWidth - 100, y: Math.random() * window.innerHeight },
  //   };
  //   setElements((els) => els.concat(newNode));
  // }, [setElements]);

  return (
    <div className="save__controls mt-3">
      <button className="mr-2 p-1 w-20 capitalize rounded-sm bg-green-600 text-white" onClick={onSave}>save</button>
      <button className="p-1 w-20 capitalize rounded-sm bg-red-600 text-white" onClick={onRestore}>restore</button>
      {/* <button onClick={onAdd}>add node</button> */}
    </div>
  );
};

export default memo(Controls);