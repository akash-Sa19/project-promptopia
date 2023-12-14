"use client";

import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  //search states
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSerchResults] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setAllPosts(data);
    };

    console.log(allPosts);
    fetchPosts();
  }, []);

  const findSearchedPrompt = (searchTerm) => {
    const regEx = new RegExp(searchTerm, "i"); // "i" flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regEx.test(item.creator.username) ||
        regEx.test(item.tag) ||
        regEx.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debouncing function
    setSearchTimeout(
      setTimeout(() => {
        const serchResult = findSearchedPrompt(e.target.value);
        setSerchResults(serchResult);
      }, 500)
    );
  };

  return (
    <section className="feed">
      <form className="w-full realtive flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList
          data={searchResults}
          handleTagClick={() => {}}
        />
      ) : (
        <PromptCardList
          data={allPosts}
          handleTagClick={() => {}}
        />
      )}
    </section>
  );
};

export default Feed;
