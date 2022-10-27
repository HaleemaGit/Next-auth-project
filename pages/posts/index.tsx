import Head from 'next/head';
import { Fragment } from 'react';
import { GetServerSideProps } from "next";
import { PrismaClient } from "@prisma/client";
import AllPosts from '../../components/posts/all-posts';
import { getAllPosts } from '../../lib/posts-util';
import Post from './[id]';

const prisma = new PrismaClient();

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
// const prisma = new PrismaClient();
//  const feed = async () => {
//   let result = {error:false, data:[]}
  
//    const feed = await prisma.post.findMany()
   
//    console.log("----------------------------")
//    console.log(feed)
//    return feed
//  }
// };

export async function getStaticPaths() {
  const feed = await prisma.post.findMany({
    select: {id:true},
  })

  return {
    paths: feed.map((post) => ({ params: { id: post.id} })),
    fallback: false,
  };
}

// export async function getStaticProps({ params }) {
//   const feed = await prisma.post.findUnique({
//     where: { id: params.id },
//   });

//   if (feed) {
//     return {
//       props: JSON.parse(JSON.stringify(feed)),
//     };
//   }

//   return {
//     redirect: {
//       destination: '/',
//       permanent: false,
//     },
//   };
// }
//  const getPosts = await prisma.post.findMany({
//   where: {
//     title: {
//       contains: 'cookies',
//     },
//   },
// |  include: {
// |    author: true, // Return all fields
// |  },
// })

// const prisma = new PrismaClient();
// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const post = await prisma.post.findUnique({
//     where: {
//       id: String(params?.id),
//     },
//   });
//   return {
//     props: {
//       post: JSON.parse(JSON.stringify(post)),
//     },
//   };
// };
function AllPostsPage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name='description'
          content='A list of all programming-related tutorials and posts!'
        />
      </Head>
      <AllPosts posts={props.posts} feed={props.feed} />
    </Fragment>
  );
}

export function getStaticProps({ params }) {
  const allPosts = getAllPosts();
  const feed = prisma.post.findUnique({
    where: { id: params.id },
  });

  if (feed) {
    return {
      props: JSON.parse(JSON.stringify(feed)),
    };
  }

  return {
    props: {
      posts: allPosts, feed,   
    },
  };
}


export default AllPostsPage;
