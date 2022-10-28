import Link from 'next/link';
import Image from 'next/image';

import classes from './post-item.module.css';



// export type PostProps = {
//     id: string;
//     title: string;
//     author: {
//       name: string;
//       email: string;
//     } | null;
//     content: string;
//     published: boolean;
//     description: string;
//     image:string;
//   };


function PostItemSelf(props) {
  const { title, image, content, description, published, date, id } = props.post;

    const excerpt= ({post})=>(post.content.slice(7, 300));

//   const formattedDate = new Date(date).toLocaleDateString('en-US', {
//     day: 'numeric',
//     month: 'long',
//     year: 'numeric',
//   });

//   const imagePath = `/images/posts/${id}/${image}`;
  const linkPath = `/posts/${id}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
        <article className={classes.content}>
          {/* <div className={classes.image}>
            {/* <Image
              src={imagePath}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            /> */}
          {/* </div> */}
          {/* <div className={classes.content}> */}
            <h3>{title}</h3>
            {/* <time>{formattedDate}</time> */}
            {/* <p>{content}</p> */}
            <p>{excerpt}</p>
          {/* </div> */}
          </article>
        </a>
      </Link>
    </li>
  );
}

export default PostItemSelf;
