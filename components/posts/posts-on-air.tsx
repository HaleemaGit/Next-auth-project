import PostItemAir from './post-item-air';
import classes from './posts-grid.module.css';

function PostsOnAir(props) {
  const { feed } = props;

  return (
    <ul className={classes.grid}>
      {feed?.map((post) => (
        <PostItemAir key={post.index} post={post} />
      ))}
    </ul>
  );
}

export default PostsOnAir;
