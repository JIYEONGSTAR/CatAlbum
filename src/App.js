import React, { useState } from "react";
import Breadcrumb from "components/Breadcrumb";
import ImageView from "components/ImageView";
import Nodes from "components/Nodes";
import "css/Styles.css";
import Loading from "components/Loading";
import { api } from "api/api";
import { request } from "api/api";
import axios from "axios";
import { useAsync } from "react-async";

function App() {
  const [state, setState] = useState({
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: true,
  });

  const onClick = async (e) => {
    try {
      setState({ ...state, isLoading: true }); //로딩중
      if (e.type === "DIRECTORY") {
        const nextNodes = await request(e.id);
        setState({
          ...state,
          isRoot: false,
          depth: [...state.depth, e],
          nodes: nextNodes,
          isLoading: false,
        });
      } else if (e.type === "FILE") {
        console.log(e.filePath);
        const selectedFilePath = e.filepath ?? e.filePath;

        setState({
          ...state,
          selectedFilePath,
          isLoading: false,
        });
      }
    } catch (e) {
      //에러처리
      throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
    }
    //  finally {
    //   setState({ ...state, isLoading: false });
    // }
  };

  const onBackClick = async () => {
    setState({ ...state, isLoading: true }); //로딩중
    try {
      const nextState = { ...state };
      nextState.depth.pop(); //맨 위에 제거후 반환
      const prevNodeId =
        nextState.depth.length === 0
          ? null
          : nextState.depth[nextState.depth.length - 1].id;
      // console.log(prevNodeId);
      if (prevNodeId === null) {
        init();
      } else {
        const prevNodes = await request(prevNodeId);
        setState({
          ...nextState,
          isRoot: false,
          nodes: prevNodes,
          isLoading: false,
        });
      }
    } catch (e) {
      throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
    }
  };

  const onImageClick = () => {
    setState({ ...state, selectedFilePath: null });
  };

  const init = async () => {
    try {
      // setState({ ...state, isLoading: true });
      const rootNodes = await request();
      setState({
        ...state,
        isRoot: true,
        nodes: rootNodes,
        isLoading: false,
      });
    } catch (err) {
      throw new Error(err);
    }
    // finally {
    //   setState({
    //     ...state,
    //     isLoading: false,
    //   });
    // }
  };
  console.log(state);
  if (state.nodes.length === 0) init();
  return (
    <div className="app">
      <Breadcrumb initialState={state} />
      <Nodes initialState={state} onClick={onClick} onBackClick={onBackClick} />
      {state.selectedFilePath ? (
        <ImageView
          initialState={state.selectedFilePath}
          onClick={onImageClick}
        />
      ) : (
        ""
      )}
      {state.isLoading === true ? (
        <Loading initialState={state.isLoading} />
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
