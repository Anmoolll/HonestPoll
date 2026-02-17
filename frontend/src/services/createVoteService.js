import axiosInstance from "../helper/axiosInstance";

async function createVoteService(data) {
  // Use the public voting endpoint so that anyone with the link can vote,
  // while the backend still enforces anti-abuse mechanisms.
  const response = await axiosInstance.post("/poll/public/vote", data);
  return response.data;
}

export default createVoteService
