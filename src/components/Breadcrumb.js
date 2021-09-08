import React from "react";

function Breadcrumb({ initialState }) {
  const state = initialState;
  return (
    <div>
      <nav className="Breadcrumb">
        <div className="nav-item">
          root
          {!state.isRoot && <>{state.depth.map((list) => `-${list.name}`)}</>}
        </div>
      </nav>
    </div>
  );
}

export default Breadcrumb;
