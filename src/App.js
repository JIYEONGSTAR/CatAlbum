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
    isRoot: false,
    nodes: [
      {
        id: "1",
        name: "노란고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "3",
        name: "까만고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "10",
        name: "고등어무늬 고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "13",
        name: "삼색이 고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "14",
        name: "회색고양이",
        type: "DIRECTORY",
        filePath: null,
        parent: null,
      },
      {
        id: "20",
        name: "하얀고양이",
        type: "DIRECTORY",
        filePath: "/images/20201218_002047.jpg",
        parent: null,
      },
    ],
    depth: [],
  });
  const onClick = async (e) => {
    console.log(e);
    if (e.type === "DIRECTORY") {
      console.log("디렉토리다");
      // const nextNodes = await request();
      const nextNodes = await request(e.id);
      setState({
        ...state,
        depth: [...state.depth, e],
        nodes: nextNodes,
      });
    } else if (e.type === "FILE") {
      console.log("파일이다");
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
  // setState((nextState) => {
  //   return { ...nextState };
  // });
  return (
    <div className="app">
      <Breadcrumb initialState={state} />
      <Nodes initialState={state} onClick={onClick} />
      {/* <ImageView initialState={state.selectedNodeImage} /> */}
    </div>
  );
}

export default App;
