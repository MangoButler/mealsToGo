import * as React from "react";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components";

const Accordion = styled(List.Accordion)`
  font-family: ${(props) => props.theme.fonts.info};
  font-size: ${(props) => props.theme.fontSizes.caption};
  color: ${(props) => props.theme.colors.text.secondary};
  /* margin-bottom: ${(props) => props.theme.space[1]}; */
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const ItemGrid = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: -10%;
`;

const GridItem = styled(List.Item)`
  width: ${({ columns }) => `${100 / columns - 1}%`};
  margin-bottom: 12px;
`;

const AccordionList = ({
  title = "Amenities",
  icon = "details",
  items = ["food"],
  cols = 2,
  children,
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
      {children ? (
        children
      ) : (
        <ItemGrid>
          {items.map((item, i) => (
            <GridItem
              columns={cols}
              title={item.label}
              titleStyle={{
                color: theme.colors.text.secondary,
                fontFamily: theme.fonts.info,
                fontSize: parseInt(theme.fontSizes.caption),
              }}
              key={`accordion-${item.label}-${i}`}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={item.icon}
                  color={theme.colors.text.secondary}
                />
              )}
            />
          ))}
        </ItemGrid>
      )}
    </Accordion>
  );
};

export default AccordionList;
