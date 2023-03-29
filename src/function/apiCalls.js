import axios from "axios";

const PORT = process.env.PORT ? process.env.PORT : 5556

const apiCalls = async (
    method,
    url,
    information = null,
    param = null,
    header = null
) => {
    const baseUrl = process.env.SERVER || `http://localhost:${PORT}`
    const fullUrl = `${baseUrl}/api/${url}`;
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
