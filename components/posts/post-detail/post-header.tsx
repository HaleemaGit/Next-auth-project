import Image from 'next/image';

import classes from './post-header.module.css';

function PostHeader(props) {
  const { author, title, image } = props;

  return (
    <header className={classes.header}>
      <h3>{author}</h3>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
}

export default PostHeader;
