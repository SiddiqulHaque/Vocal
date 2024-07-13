"use client";

import { useUser } from "@clerk/nextjs";
import Loader from "@components/Loader";
import PostCard from "@components/cards/PostCard";
import { useEffect, useState } from "react";
import { Search } from "@mui/icons-material";

const Home = () => {
  const { user, isLoaded } = useUser();

  const [loading, setLoading] = useState(true);

  const [feedPost, setFeedPost] = useState([]);
  const [search, setSearch] = useState("");
  const getSearchedPosts = async () => {
    const response = await fetch(`/api/post/search/${search}`);
    const data = await response.json();
    setFeedPost(data);
    setLoading(false);
  };

  const getFeedPost = async () => {
    const response = await fetch("/api/post");
    const data = await response.json();
    setFeedPost(data);
    setLoading(false);
  };

  useEffect(() => {
    getFeedPost();
  }, []);
  useEffect(() => {
    // getFeedPost();
    if (search.length == 0) {
      getFeedPost();
    }
    getSearchedPosts();
  }, [search]);

  return loading || !isLoaded ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-10 relative">
      <div
        className="hidden lg:flex flex-col    "
      >
        <input
          type="text"
          className="search-bar"
          placeholder="Search Post"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Search className="search-icon" onClick={() => getSearchedPosts()} />
      </div>
      {feedPost?.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          creator={post.creator}
          loggedInUser={user}
          update={getFeedPost}
        />
      ))}
    </div>
  );
};

export default Home;
