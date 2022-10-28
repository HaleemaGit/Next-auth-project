import React, { Fragment } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import { PrismaClient } from "@prisma/client";
import { Head } from "next/document";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

import { getPost } from "../../services/post";
import PostContent from "components/posts/post-detail/post-content";
import PostContentSelf from "components/posts/post-detail/post-contact-self";
import PostItem from "components/posts/post-item";
import PostItemSelf from "components/posts/post-item-self";
// import classes from './post-content.module.css';
import classes from '../../components/posts/post-detail/post-content.module.css';
import PostHeader from "components/posts/post-detail/post-header";

export async function getStaticProps({ params }) {
  const data = await getPost(params.id);
  return {
    props: { ...data },
  };
}

export function getStaticPaths({ params }) {
  // We'll pre-render only these paths at build time.
  return {
    paths: [
      { params: { id: "1" } }, // See the "paths" section below
    ],
    fallback: true,
  };
}

function Post(props: any) {
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div>
        <article className={classes.content}>

<div className={classes.header}>
<h1>{props.title} </h1>
</div>       
<h3>Author: {props.author} </h3>

      {/* <p>This is the post content: {props.content} </p> */}
      <ReactMarkdown children={props.content} />
      {/* <PostContentSelf post={props.post}/> */}
      </article>
    </div>
  );
}

export default Post;


































// import React, { Fragment } from "react";
// import { GetServerSideProps } from "next";
// import ReactMarkdown from "react-markdown";
// import { PostProps } from "../../../next-tailwind-blog/components/Post";
// import { PrismaClient } from "@prisma/client";
// import { Head } from "next/document";
// import PostContent from "../../../next-tailwind-blog/components/posts/post-detail/post-content";

// const prisma = new PrismaClient();

// export async function getStaticPaths() {
//   const post = await prisma.post.findMany({
//     select: {id:true},
//   })

//   return {
//     paths: post.map((post) => ({ params: { id: post.id} })),
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const post = await prisma.post.findUnique({
//     where: { id: params.id },
//   });

//   if (post) {
//     return {
//       props: JSON.parse(JSON.stringify(post)),
//     };
//   }

//   return {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   };
// }

// // export const getServerSideProps: GetServerSideProps = async ({ params }) => {
// //   const post = await prisma.post.findUnique({
// //     where: {
// //       id: String(params?.id),
// //     },
// //   });
// //   return {
// //     props: {
// //       post: JSON.parse(JSON.stringify(post)),
// //     },
// //   };
// // };

// function Post(props: any) {
//   let title = props.title;
//   if (!props.published) {
//     title = `${title} (Draft)`;
//   }

//   return (
//     <Fragment>
//       <Head>
//         <title>{props.title}</title>
//         {/* <meta name="content" content={props.content} /> */}
//       </Head>
//       <p>By {props?.author?.name || "Unknown author"}</p>
//       <ReactMarkdown children={props.content} />
//       {/* <PostContent post={props.post} /> */}

//        {/* <style jsx>{`
//         .page {
//           background: white;
//           padding: 2rem;
//         }

//         .actions {
//           margin-top: 2rem;
//         }

//         button {
//           background: #ececec;
//           border: 0;
//           border-radius: 0.125rem;
//           padding: 1rem 2rem;
//         }

//         button + button {
//           margin-left: 1rem;
//         }
//       `}</style> */}

// </Fragment>


//     // <Layout>
//     //   <div>
//     //     <h2>{title}</h2>
//     //     <p>By {props?.author?.name || "Unknown author"}</p>
//     //     <ReactMarkdown children={props.post.content} />
//     //   </div>
//     //   <style jsx>{`
//     //     .page {
//     //       background: white;
//     //       padding: 2rem;
//     //     }

//     //     .actions {
//     //       margin-top: 2rem;
//     //     }

//     //     button {
//     //       background: #ececec;
//     //       border: 0;
//     //       border-radius: 0.125rem;
//     //       padding: 1rem 2rem;
//     //     }

//     //     button + button {
//     //       margin-left: 1rem;
//     //     }
//     //   `}</style>
//     // </Layout>
//   );
// }

// export default Post;
