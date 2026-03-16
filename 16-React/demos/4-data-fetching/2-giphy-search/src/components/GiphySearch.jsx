import { useState, useEffect } from "react";

/*
  🐱 GiphySearch.jsx
  -----------------
  This component demonstrates TWO VERY COMMON fetch patterns:

  1️⃣ Fetching data on INITIAL RENDER (useEffect)
  2️⃣ Fetching data based on USER ACTION (form submit)

  It also shows:
  - How uncontrolled forms work
  - How useEffect runs only when dependencies change
  - How state updates trigger re-renders
*/

/*
  📌 Required Setup
  ----------------
  You need a GIPHY API key:
  https://developers.giphy.com/

  API documentation:
  https://developers.giphy.com/docs/api/endpoint/#random
*/

export default function GiphySearch({ initialQuery }) {
  /*
    🧠 STATE
    --------
    imgSrc → URL of the GIF image
    alt    → Accessible alt text for the image
  */
  const [imgSrc, setImgSrc] = useState("");
  const [alt, setAlt] = useState("");

  /*
    🌐 fetchImage
    -------------
    Fetches a random GIF from GIPHY using a search term.

    - Can be called by:
      • useEffect (initial load)
      • form submission (user action)

    - Default parameter ensures initialQuery is used
      if no argument is passed.
  */
  const fetchImage = (query = initialQuery) => {
    const encodedQuery = encodeURIComponent(query);

    const url = `https://api.giphy.com/v1/gifs/random?api_key=StGEROY7n963OaOR3Cn3JMMHPbNnEXwo&tag=${encodedQuery}`;

    fetch(url)
      .then((response) => {
        
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
      })
      .then(({ data }) => {
        /*
          Update state → triggers re-render
        */
        setImgSrc(data.images.fixed_width.url);
        setAlt(data.title || "Giphy result");
      })
      .catch((error) => {
        console.error("Giphy fetch failed:", error);
      });
  };

  /*
    🧠 useEffect (Initial Load)
    --------------------------
    Runs ONCE when the component mounts.

    WHY?
    - initialQuery never changes
    - Dependency array prevents re-running
    - Perfect for "load content on page load"
  */
  useEffect(() => {
    fetchImage();
  }, [initialQuery]);

  /*
    📝 handleSubmit
    --------------
    Handles user searches.

    IMPORTANT:
    - This is NOT a controlled input
    - We read the value directly from the form
    - No useEffect involved here
  */
  const handleSubmit = (event) => {
    event.preventDefault();

    const userInput = event.target.query.value.trim();

     /*
      🧠 FALLBACK LOGIC
      ----------------
      If the input is empty, use "cat"
      Otherwise, use what the user typed
    */
    const searchTerm = userInput || initialQuery;

    fetchImage(searchTerm);
  };

  return (
    <>
      {/* SEARCH FORM */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter a word or phrase:
          {/* 
            Uncontrolled input:
            - No state
            - Read value on submit
          */}
          <input
            type="text"
            name="query"
            placeholder="cat"
          />
        </label>

        <button type="submit">Search</button>
      </form>

      {/* RESULT */}
      <section>
        {imgSrc ? (
          <img src={imgSrc} alt={alt} />
        ) : (
          <p>Loading GIF...</p>
        )}
      </section>
    </>
  );
}
