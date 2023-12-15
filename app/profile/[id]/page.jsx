// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, useEffect } from "react";

// import Profile from "@components/Profile";

// const OtherUserprofile = ({ params }) => {
//   const [userPosts, setUserPosts] = useState([]);

//   const searchParams = useSearchParams();
//   const username = searchParams.get("name");

//   useEffect(() => {
//     const fetchPost = async () => {
//       const response = await fetch(`/api/users/${params?.id}/posts`);
//       const data = await response.json();
//       setUserPosts(data);
//       //   console.log(data);
//     };

//     if (params?.id) fetchPost();
//   }, [params.id]);

//   return (
//     <Profile
//       name={username}
//       desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imgination`}
//       data={userPosts}
//       handleDelete={() => {}}
//       handleEdit={() => {}}
//     />
//   );
// };

// export default OtherUserprofile;

"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPosts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
};

export default UserProfile;
