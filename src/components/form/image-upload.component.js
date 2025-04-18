import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import FormButton from "./form-button.component";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import {
  CLOUDINARY_URL,
  UPLOAD_PRESET,
} from "../../services/places/places-api-url";

const Preview = styled(Image)`
  width: 100%;
  height: 200px;
  border-radius: ${(props) => props.theme.space[2]};
  /* margin: ${(props) => props.theme.space[2]} 0; */
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const ImagePickerContainer = styled(View)`
  border-radius: ${(props) => props.theme.space[2]};
  margin: ${(props) => props.theme.space[2]} 0;
  margin-bottom: ${(props) => props.theme.space[2]};
`;

const ImageUpload = ({ onImageUploadSuccess }) => {
  const [imageUri, setImageUri] = useState(null);
  const [uploading, setUploading] = useState(false);

  // const handlePickImage = async () => {
  //   try {
  //     const { status } =
  //       await ImagePicker.requestMediaLibraryPermissionsAsync();
  //     if (status !== "granted") {
  //       Alert.alert(
  //         "Permission required",
  //         "Camera roll access is needed to upload an image."
  //       );
  //       return;
  //     }

  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: ["images"],
  //       allowsEditing: true,
  //       aspect: [4, 3],
  //       quality: 1,
  //     });

  //     if (result.canceled) {
  //       return;
  //     }

  //     const uri = result.assets?.[0]?.uri;
  //     if (!uri) {
  //       Alert.alert("Error", "Failed to get image URI.");
  //       return;
  //     }

  //     setImageUri(uri);
  //     if (onImageUpload) onImageUpload(uri);
  //   } catch (error) {
  //     console.error("Image picking failed:", error);
  //     Alert.alert("Error", "Something went wrong while picking the image.");
  //   }
  // };

  const handleImageUpload = async (uri) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access media is required!"
      );
      return null;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.secure_url) {
        onImageUploadSuccess(data.secure_url);
      } else {
        Alert.alert("Upload failed", JSON.stringify(data));
        setImageUri(null);
      }
    } catch (err) {
      Alert.alert("Upload error", err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <ImagePickerContainer>
      {imageUri && <Preview source={{ uri: imageUri }} />}
      <FormButton
        icon={imageUri ? "image-edit" : "image-plus"}
        onPress={handleImageUpload}
        loading={uploading}
      >
        {imageUri ? "Change Image" : "Upload Image"}
      </FormButton>
    </ImagePickerContainer>
  );
};

export default ImageUpload;
