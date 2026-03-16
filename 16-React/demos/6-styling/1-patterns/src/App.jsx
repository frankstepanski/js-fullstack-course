import React from "react";
import StyledList from "./StyledList";
import styled from 'styled-components';
import styles from "./App.module.css"
import "./index.css";

/*

   Stying in React:

     - global .css for all compoments
       - hard to maintain with many compoments
       - naming conflicts 
       - had to edit on a team
     - .css file per component (css-in-css)
       - easy to edit on a team
       - name conflicts because still globally scoped
     - inline styling: use style attribute with an object
       - cannot have nested styles
       - difficult to re-use (can create external style objects)
       - make sure use camelCase style properties
       - React appends 'px' to any numeric values
       - easy for dynamic style values since it is an object
       - no pseudo-classes, media queries, keyframe animations, etc
       - leads to hard readbility 
       - performance issue: styles are re-computed on rendering
     - css modules: css file per component (Component.module.css)
       - no name conflicts (unique name created per class)
       - can create "global" styles: :global
     - css-in-js (styled components): css pattern using a library
       - create components from html in .js
       - used to be directly re-used in other components (buttons, etc.)
       - geared towards creating design libraries
       - libraries: styled-components, emotion, etc.
       - unique class names
       - easier to find css
       - dynamic styling via props

*/

export default function App() {

  /* 
     inline styles:
     create an object for readability and re-use if needed
     note: could also make external .js with style objects
  */
     const styles1 = {
      backgroundColor: 'grey',
      width: '75%',
      padding: '2rem',
      textAlign: 'center',
      margin: 'auto'
  }

 /*
     styled component:
     https://styled-components.com/docs/basics
     is actually a react component with built-in styles
 */
  const List = styled.ul`
     list-style: none;
     text-align: left;
     margin: 0;
     padding: 0;
  `;

  return (
    <div style={styles1}>
       Hello World!

       <h3>This is a my list</h3>

       <ul className={styles.todoList}>
         <li>sleep</li>
         <li>eat</li>
         <li>work</li>
       </ul>
       
       <br/>

       <List>
         <li>sleep</li>
         <li>eat</li>
         <li>work</li>
       </List> 

       <br/>
       
       <StyledList />

    </div>
  );
}

