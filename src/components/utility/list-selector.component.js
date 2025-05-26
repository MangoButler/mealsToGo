import React from "react";
import styled, { useTheme } from "styled-components/native";
import { List, Divider } from "react-native-paper";
import { FlatList, View } from "react-native";
import FilterModal from "./filter-modal.component";
import { FormActionButton } from "../form/form-button.component";
import { Spacer } from "../spacer/spacer.component";
import { Footer, SelectorActionButton } from "./checkbox-selector.component";

const SelectorContainer = styled.View`
  height: 300px;
  width: 100%;
`;

const SelectorItem = styled(List.Item)`
  background-color: ${(props) => props.theme.colors.bg.secondary};
  margin: 0px;
  /* padding: 4px; Optional, to control spacing */
`;

const ListSelector = ({
  visible,
  onDismiss,
  selectedItem,
  onSelect,
  availableItems,
}) => {
  const theme = useTheme();

  const renderItem = ({ item, index }) => {
    const normalizedItem =
      typeof item === "string" ? { label: item, value: item } : item;

    const isSelected = selectedItem === normalizedItem.value;

    return (
      <View>
        <SelectorItem
          title={normalizedItem.label}
          onPress={() => {
            onSelect(normalizedItem.value);
            onDismiss();
          }}
          titleStyle={{ fontWeight: isSelected ? "bold" : "normal" }}
          left={(props) =>
            normalizedItem.icon ? (
              <List.Icon {...props} icon={normalizedItem.icon} />
            ) : null
          }
          right={(props) =>
            isSelected ? <List.Icon {...props} icon="check" /> : null
          }
        />
        {index < availableItems.length - 1 && <Divider bold />}
      </View>
    );
  };

  return (
    <FilterModal visible={visible} onDismiss={onDismiss}>
      <SelectorContainer>
        <FlatList
          data={availableItems}
          keyExtractor={(item) =>
            typeof item === "string" ? item : item.value
          }
          contentContainerStyle={{ flexGrow: 1 }}
          renderItem={renderItem}
        />

        <Footer>
          <SelectorActionButton
            mode="outlined"
            onPress={() => {
              onSelect(null);
            }}
            textColor={theme.colors.ui.primary}
          >
            Reset
          </SelectorActionButton>
          <SelectorActionButton
            mode="outlined"
            onPress={onDismiss}
            textColor={
              selectedItem ? theme.colors.text.inverse : theme.colors.ui.primary
            }
            buttonColor={selectedItem ? theme.colors.ui.primary : "transparent"}
          >
            {selectedItem ? "Done" : "Cancel"}
          </SelectorActionButton>
        </Footer>
      </SelectorContainer>
    </FilterModal>
  );
};

export default ListSelector;

// ({ item, index }) => (
//     <View>
//       <SelectorItem
//         title={item}
//         onPress={() => {
//           onSelect(item);
//           onDismiss();
//         }}
//         titleStyle={{
//           fontWeight: item === selectedItem ? "bold" : "normal",
//         }}
//         right={(props) =>
//           item === selectedItem ? (
//             <List.Icon {...props} icon="check" />
//           ) : null
//         }
//       />

//       {index < availableItems.length - 1 && <Divider bold />}
//     </View>
//   )
