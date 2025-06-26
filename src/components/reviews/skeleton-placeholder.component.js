import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";
import styled, { useTheme } from "styled-components/native";

const Container = styled.View`
  margin-top: ${(props) => props.theme.space[2]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SkeletonBox = styled.View`
  width: 100%;
  border-radius: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]} 0;
  background-color: ${(props) => props.theme.colors.ui.disabled};
`;

const AnimatedSkeleton = Animated.createAnimatedComponent(SkeletonBox);

export const SkeletonPlaceholder = ({ count = 3, height = 60 }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;
  const theme = useTheme();
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Container>
      {[...Array(count)].map((_, index) => (
        <AnimatedSkeleton
          key={`${index}-skeleton`}
          style={{ opacity, height, marginBottom: theme.space[3] }}
        />
      ))}
    </Container>
  );
};
