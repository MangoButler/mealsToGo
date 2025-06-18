import React from "react";
import styled from "styled-components/native";
import ActiveUserCard from "./active-user-card.component";

const GridContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[1]};
`;

const ActiveUsersGrid = ({ users }) => {
  return (
    <GridContainer>
      {users.map((user) => (
        <ActiveUserCard key={user.id} user={user} />
      ))}
    </GridContainer>
  );
};

export default ActiveUsersGrid;
