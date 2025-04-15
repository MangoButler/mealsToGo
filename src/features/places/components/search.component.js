import { useContext, useState, useEffect } from "react";
import * as React from "react";
import { Searchbar } from "react-native-paper";
import styled from "styled-components/native";
import { LocationContext } from "../../../services/location/location.context";

const StyledSearchbar = styled(Searchbar)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  color: ${(props) => props.theme.colors.text.secondary};
  border-color: ${(props) => props.theme.colors.ui.primary};
  border-width: 1px;
`;

const SearchContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.primary};
  padding: ${(props) => props.theme.space[3]};
`;

const Search = () => {
  const locationContext = useContext(LocationContext);
  const { keyword, search } = locationContext;
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  const onExecuteSearch = () => {
    search(searchKeyword);
  };

  return (
    <SearchContainer>
      <StyledSearchbar
        placeholder="Search for a location"
        icon={"search-web"}
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        onSubmitEditing={onExecuteSearch}
        onIconPress={onExecuteSearch}
      />
    </SearchContainer>
  );
};

export default Search;
