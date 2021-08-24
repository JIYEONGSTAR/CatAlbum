// api.js
const API_ENDPOINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev";

export const request = async (nodeId) => {
  try {
    const result = await fetch(`${API_ENDPOINT}/${nodeId ? nodeId : ""}`);
    if (result.status < 300) return result.json();
    else if (result.status < 400)
      throw new Error(`Code ${result.status} : Redirection Error`);
    else if (result.status < 500)
      throw new Error(`Code ${result.status} : Client Error`);
    else if (result.status < 600)
      throw new Error(`Code ${result.status} : Server Error`);
  } catch (err) {
    throw new Error(`${err.message}`);
  }
};

export const api = {
  // Root 내용 가져오는 api
  fetchRoot() {
    return request();
  },
  // 특정 Directory 내용 가져오는 api
  fetchDirectory(nodeId) {
    return request(nodeId);
  },
};
