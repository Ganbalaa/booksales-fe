import API from "../_api";

export const getGenres = async () => {
  const response = await API.get("/genres");
  return response.data.data || response.data;
};

export const createGenre = async (data) => {
  const response = await API.post("/genres", data);
  return response.data;
};