import React, { useState } from "react";

function Nodes({ initialState, onClick }) {
  const { nodes } = initialState;
  // const [state, setState] = useState();
  // setState();
  const onNodeClick = (e) => {
    // console.log(e.target.alt);
    const selectedNode = nodes.find((node) => node.id === e.target.alt);
    onClick(selectedNode);
  };
  return (
    <div className="Nodes">
      {nodes.map((list) => {
        const iconPath =
          list.type === "FILE" ? "assets/file.png" : "assets/directory.png";
        return (
          <div className="Node">
            <img
              src={iconPath}
              alt={list.id}
              onClick={onNodeClick}
              // value={list.id}
            />
            {list.name}
          </div>
        );
      })}
    </div>
  );
}

export default Nodes;
