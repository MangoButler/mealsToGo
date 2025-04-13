import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../typography/text.component";
import { Image } from "react-native";
import ErrorImage from "../../../assets/not-found.jpg";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.space[3]};
  background-color: ${(props) => props.theme.colors.bg.primary};
`;

const Message = styled(Text)`
  margin-top: ${(props) => props.theme.space[3]};
  font-size: ${(props) => props.theme.fontSizes.body};
  color: ${(props) => props.theme.colors.text.secondary};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  text-align: center;
`;

const NotFoundImage = styled(Image)`
  width: 150px;
  height: 150px;
  opacity: 0.8;
`;

const NotFound = ({
  title = "Nothing found here!",
  message = "Check your spelling or try searching something else",
  imageSource = ErrorImage,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Text theme={theme} variant={"label"}>
        {title}
      </Text>
      {imageSource && (
        <NotFoundImage source={imageSource} resizeMode="contain" />
      )}
      <Message>{message}</Message>
    </Container>
  );
};

export default NotFound;
