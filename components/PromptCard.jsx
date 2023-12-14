"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const [copied, setCopied] = useState("");
  const { data: session } = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-center gap-5">
        <div className="flex items-center justify-start flex-1 gap-3 cursor-pointer">
          <Image
            src={post.creator.image}
            alt={"user image"}
            width={40}
            height={40}
            className="object-contain rounded-full"
          ></Image>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 font-satoshi ">
              {post.creator.username}
            </h3>
            <p className="text-sm text-gray-900 font-inter">
              {post.creator.email}
            </p>
          </div>
        </div>

        <div
          className="copy_btn"
          onClick={() => {}}
        >
          <Image
            src={
              copied === post.prompt
                ? "./assets/icons/tick.svg"
                : "./assets/icons/copy.svg"
            }
            width={12}
            height={12}
            onClick={handleCopy}
            alt="Profile photo"
          ></Image>
        </div>
      </div>

      <p className="my-4 text-base text-gray-700 font-satoshi">{post.prompt}</p>
      <div className="flex flex-wrap gap-2">
        {post.tag
          .replace(/\#/g, "")
          .replace(/\,/g, "")
          .replace(/\s+/g, " ")
          .trim()
          .split(" ")
          .map((item, index) => (
            <p
              className="text-sm cursor-pointer font-inter blue_gradient"
              key={index}
              onClick={() => handleTagClick && handleTagClick(item)}
            >
              #{item}
            </p>
          ))}
      </div>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="gap-4 pt-3 mt-5 border-t border-gray-100 flex-center">
          <p
            className="text-sm cursor-pointer font-inter green_gradient"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="text-sm cursor-pointer font-inter orange_gradient"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
