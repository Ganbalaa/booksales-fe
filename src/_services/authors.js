import API from "../_api";

export const getAuthors = async () => {
  const response = await API.get("/authors");
  return response.data.data || response.data;
};

export const createAuthor = async (data) => {
  const response = await API.post("/authors", data);
  return response.data;
};