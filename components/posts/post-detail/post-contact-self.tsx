import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import PostHeader from './post-header';
import classes from './post-content.module.css';

function PostContentSelf(props) {
  const { post, description } = props;

//   const imagePath = `/images/posts/nextjs-file-based-routing;

//   const customRenderers = {
    // img(image) {
    //   return (
    //     <Image
    //       src={`/images/posts/${post.slug}/${image.src}`}
    //       alt={image.alt}
    //       width={600}
    //       height={300}
    //     />
    //   );
    // },


//     code(code) {
//       const { className, children } = code;
//       const language = className.split('-')[1]; // className is something like language-js => We need the "js" part here
//       return (
//         <SyntaxHighlighter
//           style={atomDark}
//           language={language}
//           children={children}
//         />
//       );
//     },
//   };

  return (
    <article className={classes.content}>
      <PostHeader />
      <ReactMarkdown>{post}</ReactMarkdown>
      {/* <ReactMarkdown>{description}</ReactMarkdown> */}
    </article>
  );
}

export default PostContentSelf;
