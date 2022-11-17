import handlePost from "./handle-post-req";

export const onRequestPost = async (request) => {
  return await handlePost(request);
};
export default onRequestPost;
