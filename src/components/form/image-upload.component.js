import React, { useState } from "react";
import { View, Image, Alert, TouchableOpacity } from "react-native";
import FormButton from "./form-button.component";
import * as ImagePicker from "expo-image-picker";
import styled from "styled-components/native";
import { UserImage } from "../../features/profile/screens/profile.screen";
import { Text } from "react-native";

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

const ImageWrapper = styled(View)`
  position: relative;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: ${(props) => props.theme.space[2]};
`;

const DeleteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: rgba(0, 0, 0, 0.6);
  width: 24px;
  height: 24px;
  border-radius: 12px; /* half of width/height for perfect circle */
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const DeleteIcon = styled(Text)`
  color: white;
  font-size: 14px;
  font-weight: bold;
  line-height: 16px;
`;

const ImageUpload = ({
  onImageUploadSuccess,
  imageUri,
  imageType = "place",
}) => {
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

  return (
    <ImagePickerContainer>
      {imageUri && (
        <ImageWrapper>
          <DeleteButton onPress={() => onImageUploadSuccess(null)}>
            <DeleteIcon>✕</DeleteIcon>
          </DeleteButton>
          {imageType === "user" ? (
            <UserImage source={{ uri: imageUri }} />
          ) : (
            <Preview source={{ uri: imageUri }} />
          )}
        </ImageWrapper>
      )}
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
