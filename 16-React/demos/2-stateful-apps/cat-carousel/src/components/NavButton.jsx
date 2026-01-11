/*
  🔘 NAVIGATION BUTTON

  This component:
  - Shows or hides itself
  - Triggers a callback when clicked
  - Displays a Font Awesome icon
*/

const NavButton = (props) => {
  const { show, onClick, icon } = props;
  
  /*
    Conditional rendering:
    - If show === false, render NOTHING
    - This prevents broken or useless buttons
  */

  if (!show) return null;

  return (
    <button className="nav-button" onClick={onClick}>

      {/* 
        🎨 FONT AWESOME ICON

        This <i> tag is styled by Font Awesome.
        The icon itself is NOT part of React.
      */}
      
      <i className={`fa-solid ${icon}`}></i>
    </button>
  );
};
  
export default NavButton;