import React, { useState } from "react";
import {
  SafeAreaView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Search from "../../../components/Search";
import RestaurantInfoCard from "../components/restaurant-info-card.component";
import styled from "styled-components/native";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const ListContainer = styled.View`
  flex: 1;
`;

const TextBox = styled.Text`
  padding: 10px 20px 0px 20px;
  color: grey;
  font-size: 18px;
`;

export default function RestaurantsScreen() {
  const [searchItems, setSearchItems] = useState("");
  return (
    <SafeArea>
      <View>
        <Search setSearchItems={setSearchItems} />
        {searchItems && <TextBox>{searchItems}</TextBox>}
      </View>
      <ListContainer>
        <RestaurantInfoCard />
      </ListContainer>
    </SafeArea>
  );
}
