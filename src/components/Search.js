import * as React from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";

const StyledSearchbar = styled(Searchbar)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  color: ${(props) => props.theme.colors.text.secondary};
  border-color: ${(props) => props.theme.colors.ui.primary};
  border-width: 1px;
`;

const Search = ({ setSearchItems }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onExecuteSearch = () => {
    setSearchItems(searchQuery);
    setSearchQuery("");
  };
  return (
    <StyledSearchbar
      placeholder="Search"
      icon={"search-web"}
      onChangeText={setSearchQuery}
      value={searchQuery}
      onSubmitEditing={onExecuteSearch}
      onIconPress={onExecuteSearch}
    />
  );
};

export default Search;
