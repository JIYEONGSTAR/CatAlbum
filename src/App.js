import React, { useState, useEffect } from "react";
import Breadcrumb from "components/Breadcrumb";
import ImageView from "components/ImageView";
import Nodes from "components/Nodes";
import "css/Styles.css";
import Loading from "components/Loading";
import { request } from "api/api";

const cache = {};

function App() {
  const [state, setState] = useState({
    isRoot: true,
    nodes: [],
    depth: [],
    selectedFilePath: null,
    isLoading: false,
  });

  const handleClick = async (node) => {
    try {
      setState({ ...state, isLoading: true }); //로딩중
      if (node.type === "DIRECTORY") {
        if (cache[node.id]) {
          //캐시에 있으면 캐시에서 불러온다.
          setState({
            ...state,
            isRoot: false,
            depth: [...state.depth, node],
            nodes: cache[node.id],
            isLoading: false,
          });
        } else {
          //캐시에 없으면 await를 사용해 불러온다
          const nextNodes = await request(node.id);
          setState({
            ...state,
            isRoot: false,
            depth: [...state.depth, node],
            nodes: nextNodes,
            isLoading: false,
          });
          //cache update
          cache[node.id] = nextNodes;
        }
      } else if (node.type === "FILE") {
        setState({
          ...state,
          selectedFilePath: node.filePath,
          isLoading: false,
        });
      }
    } catch (e) {
      //에러처리
      throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
    }
  };
  const handleBackClick = async () => {
    setState({ ...state, isLoading: true }); //로딩중
    try {
      const nextState = { ...state };
      nextState.depth.pop(); //맨 위에 제거후 반환
      const prevNodeId =
        nextState.depth.length === 0
          ? null
          : nextState.depth[nextState.depth.length - 1].id;
      //현재 구현된 코드에서는 불러오는 모든 데이터를 cache에 넣고 있으므로 이전으로 돌아가는 경우 이전 데이터가 cache에 있어야 정상임
      //처음으로 클릭할 경우는 loading이 실행되지만 아닌 경우는 바로 cache에서 불러와서 loading이 필요하지 않다.

      if (prevNodeId === null) {
        setState({ ...nextState, isRoot: true, nodes: cache.root });
      } else {
        setState({
          ...nextState,
          isRoot: false,
          nodes: cache[prevNodeId],
          isLoading: false,
        });
      }
    } catch (e) {
      throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
    }
  };

  const handleImageClick = () => {
    setState({ ...state, selectedFilePath: null }); //이미지 한번 더 클릭하면 사라지기
  };

  const handleBreadcrumClick = (index) => {
    //root인 경우
    if (index === -1) {
      setState({
        ...state,
        depth: [],
        isRoot: true,
        nodes: cache.root,
      });
      return;
    }
    //현재 위치 누르는 경우는 무시함
    if (index === state.depth.length - 1) {
      return;
    } else {
      const nextState = { ...state };
      const nextDepth = state.depth.slice(0, index + 1);
      setState({
        ...nextState,
        depth: nextDepth,
        nodes: cache[nextDepth[nextDepth.length - 1].id],
      });
    }
  };
  const init = async () => {
    //기본으로 불러옴
    setState({ ...state, isLoading: true });
    try {
      const rootNodes = await request();
      setState({
        ...state,
        isRoot: true,
        nodes: rootNodes,
        isLoading: false,
      });
      //루트캐시 추가
      cache.root = rootNodes;
    } catch (err) {
      throw new Error(err);
    }
  };
  useEffect(() => {
    init();
  }, []);
  //이렇게 빈 브라켓으로 두 번째 파라미터를 주게 되면 이 의미는 어떠한 state가 변화되더라도 컴포넌트를 re-render하지 않겠다 라는 의미입니다.
  //useEffect 두번째 인자는 "의존성 배열"로 첫번째 인자로 등장하는 함수가, 두번째 인자로 등장하는 배열의 원소가 무엇인지에 따라 의존적으로 이벤트를 실행한다는 의미
  return (
    <div className="app">
      <Breadcrumb initialState={state} onClick={handleBreadcrumClick} />
      <Nodes
        initialState={state}
        onClick={handleClick}
        onBackClick={handleBackClick}
      />
      {state.selectedFilePath && (
        <ImageView
          initialState={state.selectedFilePath}
          onClick={handleImageClick}
        />
      )}
      {state.isLoading && <Loading />}
    </div>
  );
  //&&연산자 true이면 뒤에꺼 실행 false이면 뒤에꺼 실행 안함
}

export default App;
