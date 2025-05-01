import {
  CLOUDINARY_URL,
  UPLOAD_PRESET,
} from "../services/places/places-api-url";
import { Alert } from "react-native";

export function extractPublicId(secureUrl) {
  try {
    // Example format:
    // https://res.cloudinary.com/<cloud-name>/image/upload/v1234567890/<public_id>.jpg

    const urlParts = secureUrl.split("/upload/");
    if (urlParts.length < 2) return null;

    const pathAfterUpload = urlParts[1];
    const withoutExtension = pathAfterUpload.substring(
      0,
      pathAfterUpload.lastIndexOf(".")
    );

    // Remove versioning if needed (e.g., v1234567890/)
    const publicId = withoutExtension.replace(/^v\d+\//, "");

    return publicId;
  } catch (error) {
    return null;
  }
}

export const uploadImage = async (uri) => {
  const formData = new FormData();
  formData.append("file", {
    uri,
    name: "photo.jpg",
    type: "image/jpeg",
  });
  formData.append("upload_preset", UPLOAD_PRESET);

  //   try {
  const response = await fetch(CLOUDINARY_URL, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    throw new Error(`Image upload failed: ${JSON.stringify(data)}`);
    //   Alert.alert("Image Upload failed", JSON.stringify(data));
    //   return null;
  }
  //   } catch (err) {
  //     Alert.alert("Image Upload error", err.message);
  //     return null;
  //   }
};

export const updateImage = async (
  uri,
  existingSecureUrl = null,
  setUploading,
  setImageUri,
  onImageUploadSuccess
) => {
  setUploading(true);
  const formData = new FormData();

  formData.append("file", {
    uri,
    name: "photo.jpg",
    type: "image/jpeg",
  });

  formData.append("upload_preset", UPLOAD_PRESET);

  // If there's an existing public_id, set it to overwrite
  if (existingSecureUrl) {
    const publicId = extractPublicId(existingSecureUrl);
    formData.append("public_id", publicId);
    formData.append("overwrite", "true");
  }

  try {
    const response = await fetch(CLOUDINARY_URL, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      onImageUploadSuccess(data.secure_url);
      //   setExistingUrl(data.secure_url);
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
