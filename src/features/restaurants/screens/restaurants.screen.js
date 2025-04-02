import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Search from "../../../components/Search.js";
import RestaurantInfoCard from "../components/restaurant-info-card.component";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const ListContainer = styled.View`
  flex: 1;
`;

const TextBox = styled.Text`
  padding: ${(props) => props.theme.space[3]};
  color: ${(props) => props.theme.colors.brand.muted};
  font-size: ${(props) => props.theme.fontSizes.title};
`;

export default function RestaurantsScreen() {
  const [searchItems, setSearchItems] = useState("");
  return (
    <SafeArea>
      <SearchContainer>
        <Search setSearchItems={setSearchItems} />
        {searchItems && <TextBox>{searchItems}</TextBox>}
      </SearchContainer>
      <ListContainer>
        <RestaurantInfoCard />
      </ListContainer>
    </SafeArea>
  );
}
