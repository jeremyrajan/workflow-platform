import React from 'react';

const Sidebar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="text-white bg-gray-600 shadow-sm w-10">
      <div className="description">You can drag these nodes to the pane on the left.</div>
      <div className="dndnode input bg-green-400 text-black py-2 shadow-sm" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Trigger
      </div>
      <div className="dndnode bg-gray-300 py-2 text-gray-500 shadow-sm" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Condition
      </div>
      <div className="dndnode output bg-purple-600 py-2 shadow-sm" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output
      </div>
    </aside>
  );
};

export default Sidebar;