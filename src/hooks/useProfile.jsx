import { useState } from 'react';

function useProfile() {
  const [profile, setProfile] = useState(null);
  const [preview, setPreview] = useState(null);

  const onChange = (e) => {
    const file = e.target.files[0];
    setProfile(file);
    setPreview(URL.createObjectURL(file));
  };

  const reset=()=>{
    setProfile(null);
    setPreview(null);
  }

  return { profile, preview, onChange, reset};
}

export default useProfile