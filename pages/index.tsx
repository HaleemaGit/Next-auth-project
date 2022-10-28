import AppLayout from "@lib/components/Layouts/AppLayout";
import Image from 'next/image';
import { Fragment } from 'react';
import Head from 'next/head';
import FeaturedPosts from '../components/home-page/featured-posts';
import Hero from '../components/home-page/hero';
import { getFeaturedPosts } from '../lib/posts-util';
import Post, { PostProps } from "../components/Post";
import { getPosts } from "../services/post";
import BlogForm from "../services/blog-form";

import prisma from '../lib/prisma';


import { GetStaticProps } from 'next';

type Props = {
  data: PostProps[];
};
const Page = (props) => {
  return (
    <>
      <AppLayout>
      <Fragment>
      <Head>
        <title>Elite blog</title>
        <meta
          name='description'
          content='We blog about programming and web development.'
        />
      </Head>
      {/* <Hero /> */}
      {/* <BlogForm /> */}
      <div>{props.data.map((post: any) => (
            <div key={post.id} className="post">
              <Post post={post} />
            </div>
          ))}</div>
      {/* <FeaturedPosts posts={props.posts} /> */}
      <FeaturedPosts posts={props.data} />
    </Fragment>
      </AppLayout>
    </>
  );
};


export const getStaticProps: GetStaticProps = async () => {
  const featuredPosts = getFeaturedPosts();
  const data = await getPosts();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
      posts: featuredPosts,
    },
  };
}
export default Page;
