import styled from "styled-components/native";

const defaultTextStyles = (theme) => `
    font-family: ${theme.fonts.body};
    font-weigth: ${theme.fontWeights.regular};
    color: ${theme.colors.text.primary};
    flex-wrap: wrap;
    margin-top: ${theme.space[0]};
    margin-bottom: ${theme.space[0]};
`;

const body = (theme) => `
    font-size: ${theme.fontSizes.body};
`;
const label = (theme) => `
    font-size: ${theme.fontSizes.title};
    font-family: ${theme.fonts.heading};
    
`;
const caption = (theme) => `
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.text.highlight};
`;
const captionCentered = (theme) => `
    font-size: ${theme.fontSizes.caption};
    color: ${theme.colors.text.highlight};
    text-align: center;
`;
const error = (theme) => `
    color: ${theme.colors.text.error};
`;
const errorTitle = (theme) => `
    color: ${theme.colors.text.error};
    font-size: ${theme.fontSizes.title};
    font-family: ${theme.fonts.heading};
`;
const hint = (theme) => `
  font-family: ${theme.fonts.info};
  font-size: ${theme.fontSizes.caption};
  color: ${theme.colors.text.secondary};
`;

const variants = {
  body,
  label,
  caption,
  error,
  errorTitle,
  hint,
  captionCentered,
};

export const Text = styled.Text`
  ${({ theme }) => defaultTextStyles(theme)}
  ${({ variant = "body", theme }) => variants[variant](theme)}
`;
