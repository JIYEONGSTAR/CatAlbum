import React, { useState } from "react";
function Nodes({ initialState, onClick, onBackClick }) {
  const { nodes, isRoot } = initialState;
  const onNodeClick = (e) => {
    const selectedNode = nodes.find((node) => node.id === e.target.alt);
    onClick(selectedNode);
  };
  return (
    <div className="Nodes">
      {!isRoot && (
        <div class="Node" onClick={onBackClick}>
          <img src="/assets/prev.png" alt="" />
        </div>
      )}
      {nodes.map((list) => {
        const iconPath =
          list.type === "FILE" ? "assets/file.png" : "assets/directory.png";
        return (
          <div className="Node">
            <img src={iconPath} alt={list.id} onClick={onNodeClick} />
            {list.name}
          </div>
        );
      })}
    </div>
  );
}

export default Nodes;
