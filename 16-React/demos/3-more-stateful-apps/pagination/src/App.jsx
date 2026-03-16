import { useState } from "react";
import postsData from "./assets/posts";
import PostItem from "./PostItem";
import "./App.css";

/*
  📏 PAGE SIZE
  ------------
  How many posts we want to show on ONE page.
  Changing this number automatically updates pagination behavior.
*/
const PAGE_SIZE = 9;

const App = () => {
/*
    🧠 STATE: posts
    ----------------
    We store posts in state instead of using the raw data directly.

    Why?
    - Likes can change
    - State updates trigger re-renders
    - React keeps the UI in sync automatically
  */
  const [posts, setPosts] = useState(postsData);

  /*
    📄 STATE: pageIdx
    -----------------
    This represents the CURRENT page the user is on.

    Page index starts at 0:
    - pageIdx = 0 → first page
    - pageIdx = 1 → second page
    - pageIdx = 2 → third page
  */
  const [pageIdx, setPageIdx] = useState(0);

 /*
    ❤️ HANDLE LIKE CLICK
    --------------------
    This function updates the likes for ONE post.

    Why does this live in App?
    - App OWNS the posts data
    - Child components should NOT mutate state directly
    - Data flows DOWN, events flow UP
  */
  const handleLike = (postIndex) => {
    setPosts((prevPosts) =>
      prevPosts.map((post, index) =>
        index === postIndex
          ? { ...post, likes: post.likes + 1 }
          : post
      )
    );
  };

  /*
    📄 PAGINATION LOGIC
    ------------------
    We calculate the slice of posts
    that should appear on the current page.
  */
  const start = PAGE_SIZE * pageIdx;
  const end = PAGE_SIZE * (pageIdx + 1);

 /*
    🧩 postItems (IMPORTANT CONCEPT)
    --------------------------------
    This is NOT a function.

    postItems is a VARIABLE that holds an ARRAY of JSX elements.

    Here's what happens step-by-step:

    1️⃣ posts.slice(start, end)
        → creates a new array containing ONLY the posts
          for the current page

    2️⃣ .map(...)
        → loops over that array

    3️⃣ For EACH post, we RETURN JSX (<PostItem />)

    4️⃣ map() collects all returned JSX into an array

    The final value of postItems looks like this:

      [
        <PostItem />,
        <PostItem />,
        <PostItem />,
        ...
      ]

    React is able to render arrays of JSX directly.

    IMPORTANT:
    - postItems is recalculated EVERY time App re-renders
    - It changes when state changes (posts or pageIdx)
    - It is NOT being "called" like a function
  */

  const postItems = posts.slice(start, end).map((post, idx) => {

     /*
      🧠 REAL INDEX EXPLANATION
      ------------------------
      idx is the index INSIDE the sliced array.
      realIndex maps it back to the original posts array
      so likes update correctly.
    */

    const realIndex = start + idx;

    return (
      <PostItem
        key={realIndex}
        post={post}
        onLike={() => handleLike(realIndex)}
      />
    );
  });

  /*
    📊 NUMBER OF PAGES
    -----------------
    We divide total posts by PAGE_SIZE
    and round UP to get the total page count.
  */
  const numberPages = Math.ceil(posts.length / PAGE_SIZE);

  return (
    <div className="app">
      <div className="posts-grid">{postItems}</div>

      <div className="pagination">
        {Array.from({ length: numberPages }).map((_, i) => (
          <button
            key={i}
            className={i === pageIdx ? "page-btn active" : "page-btn"}
            onClick={() => setPageIdx(i)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
