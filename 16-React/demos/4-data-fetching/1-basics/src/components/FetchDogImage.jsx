import { useState } from "react";

/*
  FetchDogImage
  -------------
  This example shows:
  - Fetching data ONLY when a user clicks a button
  - Why useEffect is NOT needed here
  - Handling loading and errors
  - Rendering API data (an image)
*/

export default function FetchDogImage() {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /*
    🧠 WHEN NOT TO USE useEffect
    ---------------------------
    We do NOT want this API call to run:
    - On page load
    - On every render

    We ONLY want it to run when the user clicks a button.

    That means:
    ✅ Regular function
    ❌ NOT useEffect
  */
  const fetchDog = () => {
    setLoading(true);
    setError("");

    fetch("https://dog.ceo/api/breeds/image/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dog image");
        }
        return response.json();
      })
      .then((data) => {
        setDogImage(data.message);
      })
      .catch((err) => {
        setError("Something went wrong. Try again.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section>
      <h2>Fetch a Random Dog 🐶</h2>

      <button onClick={fetchDog}>
        Get Dog Image
      </button>

      <br/>
      
      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Success state */}
      {dogImage && (
        <img
          src={dogImage}
          alt="Random dog"
          style={{ width: "300px", marginTop: "1rem" }}
        />
      )}
    </section>
  );
}
