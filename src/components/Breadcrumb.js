import React from "react";

function Breadcrumb({ initialState, onClick }) {
  const state = initialState;
  const handleClick = (e) => {
    const index = state.depth.findIndex((d) => d.id === e.target.className); //depth의 인덱스를 반환
    onClick(index);
  };
  return (
    <div onClick={handleClick}>
      <nav className="Breadcrumb">
        <div className="root">root</div>
        {!state.isRoot && (
          <>
            {state.depth.map((list) => {
              return <div className={list.id}>{list.name}</div>;
            })}
          </>
        )}
      </nav>
    </div>
  );
}

export default Breadcrumb;
