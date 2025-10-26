import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";

export default function PostCard({ post }) {
  const imageUrl = post?.featuredimage
    ? appwriteService.getFilePreview(post.featuredimage)
    : "/placeholder.png";

  return (
    <div className="post-card border rounded-lg overflow-hidden shadow-md">
      <img
        src={imageUrl}
        alt={post?.title || "Post Image"}
        className="w-full h-48 object-cover"
      />
      <div className="p-2">
        <h2 className="font-bold text-lg">{post?.title || "Untitled"}</h2>
        {post?.$id && (
          <Link to={`/post/${post.$id}`} className="text-blue-500 hover:underline">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
}
