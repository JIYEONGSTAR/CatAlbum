import React from "react";

function Nodes({ isRoot, nodes, onClick }) {
  return (
    <ul>
      {nodes.map((list) => {
        return <li>{list.name}</li>;
      })}
    </ul>
  );
}

export default Nodes;
