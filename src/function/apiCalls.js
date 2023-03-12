import axios from "axios";

const apiCalls = async (
  method,
  port,
  url,
  information = null,
  param = null,
  header = null
) => {
  const fullUrl = `http://localhost:${port}/api/${url}`;

  try {
    const data = await axios({
      method: method,
      url: fullUrl,
      data: information,
      params: { q: param },
      Headers: { header },
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default apiCalls;
