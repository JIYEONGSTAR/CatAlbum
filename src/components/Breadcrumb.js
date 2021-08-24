import React, { useState } from "react";

function Breadcrumb({ initialState }) {
  const [state, setState] = useState({ initialState });

  return (
    <div>
      <nav className="Breadcrumb">
        <div className="nav-item">root</div>
      </nav>
    </div>
  );
}

export default Breadcrumb;
