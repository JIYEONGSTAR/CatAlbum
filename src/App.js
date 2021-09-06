import React, { useState } from "react";
import Breadcrumb from "components/Breadcrumb";
import ImageView from "components/ImageView";
import Nodes from "components/Nodes";
import "css/Styles.css";
import { api } from "api/api";
import { request } from "api/api";
import axios from "axios";
import { useAsync } from "react-async";

function App() {
  const [state, setState] = useState({
    isRoot: true,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  });

  const onClick = async (e) => {
    console.log(e);
    if (e.type === "DIRECTORY") {
      const nextNodes = await request(e.id);
      setState({
        ...state,
        isRoot: false,
        depth: [...state.depth, e],
        nodes: nextNodes,
      });
    } else if (e.type === "FILE") {
      const selectedFilePath = e.filepath !== null ? e.filePath : null;
      setState({ ...state, selectedFilePath });
    }
  };
  const init = async () => {
    try {
      const rootNodes = await request();
      setState({
        ...state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  if (state.nodes.length === 0) init();
  return (
    <div className="app">
      <Breadcrumb initialState={state} />
      <Nodes initialState={state} onClick={onClick} />
      {state.selectedFilePath !== null ? (
        <ImageView initialState={state.selectedFilePath} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
