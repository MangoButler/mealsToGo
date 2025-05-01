import React, { useState } from "react";
import { View, Image, Alert } from "react-native";
import FormButton from "./form-button.component";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";

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

const ImageUpload = ({ onImageUploadSuccess, imageUri }) => {
  // const [imageUri, setImageUri] = useState(oldImage);
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (uri) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Permission to access media is required!"
      );
      return null;
    }
    setUploading(true);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsEditing: true,
    });

    if (!result.canceled) {
      // setImageUri(result.assets[0].uri);
      onImageUploadSuccess(result.assets[0].uri);
      // await uploadImage(result.assets[0].uri, existingUrl);
    }
    setUploading(false);
  };

  // const uploadImage = async (uri) => {
  //   setUploading(true);
  //   const formData = new FormData();
  //   formData.append("file", {
  //     uri,
  //     name: "photo.jpg",
  //     type: "image/jpeg",
  //   });
  //   formData.append("upload_preset", UPLOAD_PRESET);

  //   try {
  //     const response = await fetch(CLOUDINARY_URL, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (data.secure_url) {
  //       onImageUploadSuccess(data.secure_url);
  //     } else {
  //       Alert.alert("Upload failed", JSON.stringify(data));
  //       setImageUri(null);
  //     }
  //   } catch (err) {
  //     Alert.alert("Upload error", err.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // const uploadImage = async (uri, existingSecureUrl = null) => {
  //   setUploading(true);
  //   const formData = new FormData();

  //   formData.append("file", {
  //     uri,
  //     name: "photo.jpg",
  //     type: "image/jpeg",
  //   });

  //   formData.append("upload_preset", UPLOAD_PRESET);

  //   // If there's an existing public_id, set it to overwrite
  //   if (existingSecureUrl) {
  //     const publicId = extractPublicId(existingSecureUrl);
  //     formData.append("public_id", publicId);
  //     formData.append("overwrite", "true");
  //   }

  //   try {
  //     const response = await fetch(CLOUDINARY_URL, {
  //       method: "POST",
  //       body: formData,
  //     });

  //     const data = await response.json();

  //     if (data.secure_url) {
  //       onImageUploadSuccess(data.secure_url);
  //       setExistingUrl(data.secure_url);
  //     } else {
  //       Alert.alert("Upload failed", JSON.stringify(data));
  //       setImageUri(null);
  //     }
  //   } catch (err) {
  //     Alert.alert("Upload error", err.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

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
