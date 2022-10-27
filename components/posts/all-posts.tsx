import classes from './all-posts.module.css';
import PostsGrid from './posts-grid';
import PostsOnAir from './posts-on-air';

function AllPosts(props) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
      <PostsOnAir feed={props.feed} />
    </section>
  );
}

export default AllPosts;
