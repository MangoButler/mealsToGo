import * as React from "react";
import { Dimensions } from "react-native";
import { List } from "react-native-paper";
import styled, { useTheme } from "styled-components";

const screenWidth = Dimensions.get("window").width;
const bigScreen = screenWidth < 500 ? false : true;

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
  margin-left: ${!bigScreen ? -10 : 0}%;
`;

const GridItem = styled(List.Item)`
  width: ${({ columns }) => `${100 / columns - 1}%`};
  margin-bottom: 12px;
  /* flex: 0.49; */
`;

// const GridItem = styled.View`
//   width: ${({ columns }) => `${100 / columns - 1}%`};
//   margin-bottom: 12px;
//   flex-direction: column;
//   align-items: flex-start;
// `;

// const IconWrapper = styled.View`
//   margin-right: 8px;
//   margin-top: 2px; /* Adjust as needed for vertical alignment */
// `;

// const TextWrapper = styled.Text`
//   /* flex: 1; */
//   color: ${(props) => props.theme.colors.text.secondary};
//   font-family: ${(props) => props.theme.fonts.info};
//   font-size: ${(props) => props.theme.fontSizes.caption};
//   flex-wrap: wrap;
// `;

const AccordionList = ({
  title = "Amenities",
  icon = "details",
  items = ["food"],
  cols = 2,
  children,
  onToggle,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  const theme = useTheme();

  // const handlePress = () => setExpanded(!expanded);
  const handleToggle = () => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    onToggle?.(newExpanded); // Call the prop function!
  };

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
      onPress={handleToggle}
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
              titleNumberOfLines={2} // or more, or `undefined` to allow unlimited
              multiline
              titleStyle={{
                color: theme.colors.text.secondary,
                fontFamily: theme.fonts.info,
                fontSize: parseInt(theme.fontSizes.small),
              }}
              key={`accordion-${item.label}-${i}`}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={item.icon}
                  color={theme.colors.text.secondary}
                  // style={{ marginBottom: 4 }}
                />
              )}
            />
            // <GridItem key={`accordion-${item.label}-${i}`}>
            //   <IconWrapper>
            //     <List.Icon
            //       icon={item.icon}
            //       color={theme.colors.text.secondary}
            //     />
            //   </IconWrapper>
            //   <TextWrapper numberOfLines={2}>{item.label}</TextWrapper>
            // </GridItem>
          ))}
        </ItemGrid>
      )}
    </Accordion>
  );
};

export default AccordionList;
