import React, { useState } from "react";
import { SafeAreaView, StatusBar, FlatList } from "react-native";
import Search from "../../../components/Search.js";
import RestaurantInfoCard from "../components/restaurant-info-card.component";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const RestaurantsList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 0,
  },
})`
  padding-top: ${(props) => props.theme.space[2]};
  background-color: ${(props) => props.theme.colors.bg.primary};
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
      <RestaurantsList
        data={[
          { name: 1 },
          { name: 2 },
          { name: 3 },
          { name: 4 },
          { name: 5 },
          { name: 6 },
        ]}
        renderItem={() => <RestaurantInfoCard />}
        keyExtractor={(item) => item.name}
      />
    </SafeArea>
  );
}
