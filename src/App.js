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
  const [isRoot, setIsRoot] = useState(false);
  const [depth, setDepth] = useState([]);
  const nodes = [
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
  ];
  const onClick = (node) => {
    if (node.type === "DIRECTORY") {
    } else if (node.type === "FILE") {
    }
  };
  // const init = (async = () => {
  //   try {
  //     const rootNodes = await request();
  //     setIsRoot(true);
  //     setNodes(rootNodes);
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // });
  return (
    <div className="app">
      <Breadcrumb initialState={depth} />
      <Nodes isRoot={isRoot} nodes={nodes} onClick={onclick} />
    </div>
  );
}

export default App;
