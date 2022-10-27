// function for creating, deleting and updating (using id of post) here
import { PostProps } from "components/Post";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// interface result {
//   error:boolean;
//   data:string
// }

// interface feed {
//   name:string
//   post: string
//   author: string
// }

// type Post={
//   id:string
// }

type Props = {
  feed: PostProps[];
};

// const result : string[] = [];

export const getPosts = async () => {
//  let result = {error:false, data:[]}
 
  const feed = await prisma.post.findMany()
  
  console.log("----------------------------")
  console.log(feed)
  return feed

   async function getStaticPaths() {
    const feed = await prisma.post.findMany({
      select: {id:true},
    })
  
    return {
      paths: feed.map((post) => ({ params: { id: post.id} })),
      fallback: false,
    };
  }


}

// export const getPost = async (id:string) => {
  
//    const feed = await prisma.post.findUnique({
//     where: {
//       id: id,
//     },
//    })
//    console.log("----------------------------")
//    console.log(feed)
//    return feed
//  }



//  export async function getStaticPaths() {
//   const feed = await prisma.post.findMany({
//     select: {id:true},
//   })

//   return {
//     paths: feed.map((post) => ({ params: { id: post.id} })),
//     fallback: false,
//   };
// }

 export async function getStaticProps({ params }) {
  const feed = await prisma.post.findUnique({
    where: { id: params.id },
  });

  if (feed) {
    return {
      props: JSON.parse(JSON.stringify(feed)),
    };
  }
 }
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