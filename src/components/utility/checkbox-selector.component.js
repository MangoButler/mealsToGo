import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Checkbox, Text, Button, Divider, List } from "react-native-paper";
import LightModal from "./light-modal.component";
import { FlatList } from "react-native";
import { FormActionButton } from "../form/form-button.component";
import Row from "../spacer/row.component";

const Container = styled.View`
  width: 100%;
`;

const IconWrapper = styled.View`
  width: 40px;
  align-items: center;
`;

const ItemRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${(props) => props.theme.space[2]} ${(props) => props.theme.space[3]};
  width: 100%;
`;

export const Footer = styled.View`
  padding-top: ${(props) => props.theme.space[3]};
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  gap: ${(props) => props.theme.space[2]};
`;

export const SelectorActionButton = styled(FormActionButton).attrs((props) => ({
  mode: props.mode ?? "outlined",

  textSize: parseInt(props.theme.fontSizes.small.split("p")[0]),
}))`
  flex: 0.3;
  padding: ${(props) => props.theme.space[0]};
`;

const CheckboxSelector = ({
  visible,
  onDismiss,
  selectedItems,
  onToggleItem,
  availableItems,
  onReset = null,
}) => {
  const theme = useTheme();
  const normalizedItems = availableItems.map((item) =>
    typeof item === "string" ? { label: item, value: item } : item
  );

  return (
    <LightModal visible={visible} onDismiss={onDismiss}>
      <Container>
        <FlatList
          data={normalizedItems}
          keyExtractor={(item) => item.value}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({ item }) => (
            <ItemRow onPress={() => onToggleItem(item.value)}>
              <IconWrapper>
                {item.icon && <List.Icon icon={item.icon} />}
              </IconWrapper>

              {/* Middle Column: Label */}
              <Text>{item.label}</Text>

              {/* Right Column: Checkbox */}
              <Checkbox
                uncheckedColor={theme.colors.ui.primary}
                color={theme.colors.ui.primary}
                status={
                  selectedItems.includes(item.value) ? "checked" : "unchecked"
                }
              />
            </ItemRow>
          )}
        />
        <Footer>
          {onReset && (
            <SelectorActionButton
              mode="outlined"
              onPress={onReset}
              textColor={theme.colors.ui.primary}
            >
              Reset
            </SelectorActionButton>
          )}
          <SelectorActionButton
            mode="outlined"
            onPress={onDismiss}
            textColor={
              selectedItems.length
                ? theme.colors.text.inverse
                : theme.colors.ui.primary
            }
            buttonColor={
              selectedItems.length ? theme.colors.ui.primary : "transparent"
            }
          >
            {selectedItems.length ? "Done" : "Cancel"}
          </SelectorActionButton>
        </Footer>
      </Container>
    </LightModal>
  );
};

export default CheckboxSelector;
