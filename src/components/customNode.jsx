import React, { memo } from 'react';

import { Handle } from 'react-flow-renderer';

export default memo(({ data, isConnectable }) => {
  return (
    <>
      <Handle
        type="target"
        position="top"
        style={{ background: 'blue' }}
        onConnect={(params) => console.log('handle onConnect', params)}
        isConnectable={isConnectable}
      />
      <div className="p-2 border-2 shadow-sm bg-gray-300">
        Condition
      </div>
      <Handle
        type="source"
        position="bottom"
        id="a"
        style={{ left: 15, background: 'green' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position="bottom"
        id="b"
        style={{ left: 80, background: 'red' }}
        isConnectable={isConnectable}
      />
    </>
  );
});