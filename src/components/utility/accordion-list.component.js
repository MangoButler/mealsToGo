import * as React from "react";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components";

const Accordion = styled(List.Accordion)`
  font-family: ${(props) => props.theme.fonts.info};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
  margin-bottom: ${(props) => props.theme.space[1]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const AccordionList = ({
  title = "Amenities",
  icon = "details",
  items = [{ title: "Drinks", icon: "food" }],
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  const handlePress = () => setExpanded(!expanded);

  return (
    <Accordion
      title={title}
      titleStyle={{
        color: expanded ? theme.colors.ui.primary : theme.colors.text.secondary,
        fontFamily: theme.fonts.info,
        fontSize: parseInt(theme.fontSizes.caption),
      }}
      left={(props) => (
        <List.Icon
          {...props}
          icon={icon}
          color={
            expanded ? theme.colors.ui.primary : theme.colors.text.secondary
          }
        />
      )}
      onPress={handlePress}
      rippleColor={theme.colors.bg.secondary}
    >
      {items.map((item, i) => (
        <List.Item
          title={item.title}
          titleStyle={{
            color: theme.colors.text.secondary,
            fontFamily: theme.fonts.info,
            fontSize: parseInt(theme.fontSizes.caption),
          }}
          key={`accordion-${item.title}`}
          left={(props) => (
            <List.Icon
              {...props}
              icon={item.icon}
              color={theme.colors.text.secondary}
            />
          )}
        />
      ))}
    </Accordion>
  );
};

export default AccordionList;
