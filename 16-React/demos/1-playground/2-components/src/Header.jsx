
/*
  Header.jsx

  Each component lives in its own file.
  The filename should match the component name exactly —
  Header.jsx for the Header component, Footer.jsx for Footer.
  This makes them easy to find as your project grows.

  export default means: "this is the thing this file provides."
  A file can only have ONE default export.
  Without export, App.jsx cannot see or use this component.
*/

function Header() {
  return (
    <header>
      <h1>My React App</h1>
      <p>Welcome to my first component-based page</p>
    </header>
  );
}

export default Header;