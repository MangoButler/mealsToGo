// import backgroundImage from "../../../../assets/accountBackground.png";
import styled from "styled-components/native";
import { backgroundImages } from "../../../utils/backgroundImages";
import { useMemo } from "react";

export const AccountBackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.ui.primary};
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.theme.colors.bg.coldCover}; /*  rgba(246, 234, 209, 0.1); */
`;

export const AccountContainer = styled.View`
  background-color: ${(props) => props.theme.colors.bg.coldBg};
  padding: ${(props) => props.theme.space[4]};
  margin-top: ${(props) => props.theme.space[2]};
  border-radius: ${(props) => props.theme.space[2]};
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;

export const AccountBackground = ({ children }) => {
  const randomBackground = useMemo(() => {
    const index = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[index];
  }, []);
  return (
    <AccountBackgroundImage source={randomBackground} resizeMethod="cover">
      <AccountCover />
      {children}
    </AccountBackgroundImage>
  );
};
