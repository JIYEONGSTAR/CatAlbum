import React from "react";
function Nodes({ initialState, onClick, onBackClick }) {
  const { nodes, isRoot } = initialState;
  const handleClick = (e) => {
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
            <img src={iconPath} alt={list.id} onClick={handleClick} />
            {list.name}
          </div>
        );
      })}
    </div>
  );
}

export default Nodes;
