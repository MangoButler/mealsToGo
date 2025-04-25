import React from "react";
import styled, { useTheme } from "styled-components/native";
import { Text } from "../typography/text.component";
import { Image } from "react-native";
import errorImage from "../../../assets/int-server-error.jpg";

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
  color: ${(props) => props.theme.colors.text.error};
  font-family: ${(props) => props.theme.fonts.body};
  font-weight: ${(props) => props.theme.fontWeights.medium};
  text-align: center;
`;

const ServerErrorImage = styled(Image)`
  width: 150px;
  height: 150px;
  opacity: 0.8;
`;

const ErrorScreen = ({
  title = "An Error Occured",

  imageSource = errorImage,
  error,
}) => {
  const theme = useTheme();
  return (
    <Container>
      <Text theme={theme} variant={"errorTitle"}>
        {title}
      </Text>
      {imageSource && (
        <ServerErrorImage source={imageSource} resizeMode="contain" />
      )}
      <Message>
        {error instanceof Error
          ? error.message
          : "That kind of sucks...try reloding the app."}
      </Message>
    </Container>
  );
};

export default ErrorScreen;
