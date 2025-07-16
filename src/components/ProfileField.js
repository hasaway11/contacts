function ProfileField({name, label, alt, previewUrl, onChange}) {
  return (
    <>
      {previewUrl && <img src={previewUrl} style={{ height: '200px', objectFit: 'cover' }} alt={alt} />}
      <div className="mb-3 mt-3">
        <label htmlFor={name} className="form-label">{label}:</label>
        <input type="file" className="form-control" name={name} onChange={onChange} />
      </div>
    </>
  )
}

export default ProfileField