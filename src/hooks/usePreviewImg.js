import { useState } from "react";
import useShowToast from "./useShowToast.js";

const usePreviewImg = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const showToast = useShowToast();

  const maxFileSizeInBytes = 2 * 1024 * 1024;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > maxFileSizeInBytes) {
        showToast("ERROR", "File's size must be less than 2MB!", "error");
        setSelectedFile(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      showToast("ERROR", "Please select an image file", "error");
      setSelectedFile(null);
      return;
    }
  };

  return { selectedFile, setSelectedFile, handleImageChange };
};

export default usePreviewImg;
