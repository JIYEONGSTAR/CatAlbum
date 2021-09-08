// api.js
const API_END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
  // nodeId 유무에 따라 root directory를 조회할지 특정 directory를 조회할지 처리
  try {
    const res = await fetch(`${API_END_POINT}/${nodeId ?? ""}`); //??연산자 앞의 값이 있으면 그대로 나오고 없으면 뒤에 값을 반환
    if (!res.ok) {
      throw new Error("서버의 상태가 이상합니다!");
    }
    return await res.json();
  } catch (e) {
    throw new Error(`무언가 잘못 되었습니다! ${e.message}`);
  }
};
