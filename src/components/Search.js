import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet, View } from "react-native";

const Search = ({ setSearchItems }) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const onExecuteSearch = () => {
    setSearchItems(searchQuery);
    setSearchQuery("");
  };
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search"
        icon={"search-web"}
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={onExecuteSearch}
        onIconPress={onExecuteSearch}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
