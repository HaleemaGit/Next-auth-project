import Link from 'next/link';
import Image from 'next/image';

import classes from './post-item.module.css';


function PostItemAir(props) {
  const { id, title, author, image, content, excerpt, published, description, date, slug, file } = props.post;

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // const imagePath = {image}
  const linkPath = `/posts/${id}`;

  return (
    <li className={classes.post}>
      <Link href={linkPath}>
        <a>
          <div className={classes.image}>
            <Image
              src={image}
              alt={title}
              width={300}
              height={200}
              layout='responsive'
            />
          </div>
          <div className={classes.content}>
            <h3>{title}</h3>
            <time>{formattedDate}</time>
            <p>{excerpt}</p>
            <p>{content}</p>
            <p>{published}</p>
            <p>{description}</p>
            <p>{file}</p>
          </div>
        </a>
      </Link>
    </li>
  );
}

export default PostItemAir;
