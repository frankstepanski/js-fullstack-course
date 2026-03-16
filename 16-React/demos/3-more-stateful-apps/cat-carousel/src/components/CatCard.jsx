/*
  🐱 CatCard COMPONENT

  This component is responsible for:
  - Displaying ONE cat
  - Showing the cat image
  - Showing basic info using smaller child components

  It receives data via PROPS.
*/

import CatCardRow from "./CatCardRow";

const CatCard = (props) => {
  const { cat } = props;

  /*
    cat is an object passed from App:
    {
      name,
      age,
      breed,
      location,
      imageUrl
    }
  */

  return (
    <div className="cat-card">
      <img className="cat-image" src={cat.imageUrl} alt={cat.name} />

      <div className="cat-details">
        <CatCardRow label="Name" value={cat.name} />
        <CatCardRow label="Age" value={cat.age} />
        <CatCardRow label="Breed" value={cat.breed} />
        <CatCardRow label="Location" value={cat.location} />
      </div>
    </div>
  );
};

export default CatCard;