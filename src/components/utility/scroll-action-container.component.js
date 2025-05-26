import styled from "styled-components/native";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { Platform } from "react-native";

const ScrollActionContainer = ({ children }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ScrollActionContainer;
