import React, { useEffect } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
function AddPost() {
  const [posts, setPosts] = [];
  useEffect(() => {});
  appwriteService
    .getPostList([])
    .then((posts) => {
      if (posts) setPosts(posts.documents);
    })
    .catch((err) => {});

  return (
    <div className="p-y-8">
      <Container>
        <div className="flex flex-wrap ">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard post={post} />
            </div>
          ))}
        </div>
        <PostForm />
      </Container>
    </div>
  );
}

export default AddPost;
