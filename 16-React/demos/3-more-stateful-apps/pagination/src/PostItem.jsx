
/*
  📸 PostItem Component
  --------------------
  This component is responsible for displaying ONE post:
  - the image
  - the number of likes
  - the heart icon users can click

  IMPORTANT:
  This component does NOT manage state itself.
  It RECEIVES data and behavior from its parent (App).
*/

const PostItem = ({ post, onLike }) => {

  /*
      ❤️ LIKE BUTTON
       --------------
       This button is clickable.

       When clicked:
       1️⃣ The onClick handler runs
       2️⃣ `onLike` is called
       3️⃣ `onLike` lives in App.jsx
       4️⃣ App updates STATE (likes count)
       5️⃣ React re-renders this component
       6️⃣ The new number of likes appears

       KEY IDEA:
       - This component does NOT change the number itself
       - It asks the PARENT to update state instead
  */

  return (
    <div className="post-card">
      <img src={post.image} alt="Post" className="post-image" />

      {/* ❤️ LIKE BUTTON */}
      <button className="like-badge" onClick={onLike}>
        <i className="fa-regular fa-heart"></i>
        <span>
          {post.likes} ❤️
        </span>
      </button>
    </div>
  );
};

export default PostItem;