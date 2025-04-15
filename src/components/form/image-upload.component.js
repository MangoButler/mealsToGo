import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import FormButton from "./form-button.component";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

const Preview = styled(Image)`
  width: 100%;
  height: 200px;
  border-radius: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]} 0;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const ImagePickerContainer = styled(View)`
  border-radius: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]} 0;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const ImageUpload = ({ onImageUpload }) => {
  const [imageUri, setImageUri] = useState(null);

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Camera roll access is needed.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      if (onImageUpload) onImageUpload(uri);
    }
  };

  return (
    <ImagePickerContainer>
      {imageUri && <Preview source={{ uri: imageUri }} />}
      <FormButton
        icon={imageUri ? "image-edit" : "image-plus"}
        onPress={handlePickImage}
      >
        {imageUri ? "Change Image" : "Upload Image"}
      </FormButton>
    </ImagePickerContainer>
  );
};

export default ImageUpload;
