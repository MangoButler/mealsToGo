import * as React from "react";
import { Searchbar } from "react-native-paper";

const Search = ({ setSearchItems }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onExecuteSearch = () => {
    setSearchItems(searchQuery);
    setSearchQuery("");
  };
  return (
    <Searchbar
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
