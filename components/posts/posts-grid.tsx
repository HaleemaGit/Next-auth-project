import PostItem from './post-item';
import PostItemSelf from './post-item-self';
import classes from './posts-grid.module.css';

function PostsGrid(props) {
  const { posts } = props;

  return (
    
    <ul className={classes.grid}>
      <article className={classes.content}>
      {posts.map((post) => (
        <PostItemSelf key={post.id} post={post} />
        // <PostItem key={post.slug} post={post} />
      ))}
      </article>
    </ul>
  );
}

export default PostsGrid;
