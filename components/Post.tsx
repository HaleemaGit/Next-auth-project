import React, { useState } from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/router";
import Edit from "../services/editPost";
import PostContent from "./posts/post-detail/post-content";
import { useSession, signIn } from "next-auth/react";

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  authorId: string;
  content: string;
  published: boolean;
  description: string;
  image: string;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  // const description = ({post})=>(post.content.slice(7, 300));
  const { status, data: session } = useSession({
    required: false,
  });

  const [editing, setEditing] = useState(false);

  const router = useRouter();

  const onDelete = async (data: any) => {
    let toastId;
    toastId = toast.loading("Deleting post....");
    try {
      await axios.delete("/api/post", { data: { data } });
      toast.success("Successfully deleted ", { id: toastId });
    } catch (error) {
      toast.error("Unable to delete your new post", { id: toastId });
    }
    router.push("");
  };

  console.log(post);
  const authorName = post.authorId ? post.author : "Unknown author";
  return (
    <div>
      <Link href={`/posts/${post.id}`}>
        <div>
          <h2>{authorName}</h2>
          <PostContent post={post} />
          {/* <ReactMarkdown children={post.author} /> */}
        </div>
      </Link>
      {session && session.user.id == post.authorId && (
        <>
          {editing && <Edit post={post} setEditing={setEditing} />}

          <div className="flex items-center justify-center h-screen">
            {!editing && (
              <button
                type="button"
                onClick={() => {
                  setEditing(true);
                }}
                className="w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 bg-gray-300 outline outline-offset-2 outline-2 focus:shadow-outline hover:bg-gray-400 text-gray-800 font-bold mr-4 py-3 px-4 rounded shadow"
              >
                Edit
              </button>
            )}
            <button
              onClick={() => {
                onDelete(post);
              }}
              className=" w-full h-12 px-6 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800 relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 bg-gray-300 focus:shadow-outline hover:bg-gray-400 text-gray-800 font-bold ml-4 py-3 px-4 rounded shadow"
            >
              Delete
            </button>
          </div>
        </>
       )} 

      {/* <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style> */}
    </div>
  );
};

export default Post;