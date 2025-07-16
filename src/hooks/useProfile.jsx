import { useState } from 'react';

function useProfile() {
  const [profile, setProfile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return { profile, previewUrl, handleFileChange, setPreviewUrl };
}

export default useProfile