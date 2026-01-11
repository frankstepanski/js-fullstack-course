import React from 'react'

import styled from 'styled-components'

const List = styled.ul`
   list-style: none;
   text-align: left;
   margin: 0;
   padding: 0;
`;

const StyledList = () => {
    return (
        <List>
            <li>sleep</li>
            <li>eat</li>
            <li>work</li>
        </List>
    )
}

export default StyledList;