import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPostList().then((posts) => {
      if (posts) setPosts(posts.documents);
    });
  }, []);
}

export default Home;
