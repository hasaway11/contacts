// 패턴 체크 추가
import { useForm } from "react-hook-form";
import { useState } from "react";

const titles = { name: '이름은', address: '주소는', tel: '연락처는' };

const patterns = { name: /^[가-힣]{3,10}$/, address: /^[가-힣]{3,10}$/, tel: /^[0-9-]{11,13}$/ };

const messages = { name: '이름은 한글 3~10글자입니다', tel: '연락처는 정확히 입력하세요', address: '주소는 한글 3~10글자입니다' };

function InputField({ name, label, register, error, rules }) {
  console.log(name);
  return (
    <div className="mt-3 mb-3">
      <label className="form-label">{label}:</label>
      <input type="text" className="form-control" {...register(name, rules)} />
      {error && <span style={{ color: 'red', fontSize: '0.8em' }}>{error.message}</span>}
    </div>
  );
}

function ContactWrite() {
  const [preview, setPreview] = useState(null);

  const { register, handleSubmit, setError, formState: { errors }, } = useForm({ mode: 'onBlur' }); 

  const onSubmit = (data) => {
    alert("서버로 submit합니다");
    console.log("제출된 데이터:", data);
  };

  const handlePhotoChange = (e) => {
    const src = URL.createObjectURL(e.target.files[0]);
    setPreview(src);
  };

  return (
    <>
      {preview && <img src={preview} style={{ height: '200px', objectFit: 'cover' }} alt="프로필" />}
      
      <InputField name="name" label="이름" register={register} error={errors.name} rules={{ required: `${titles.name} 필수입력입니다`, pattern: { value: patterns.name, message: messages.name }, }} />

      <InputField name="tel" label="연락처" register={register} error={errors.tel} rules={{ required: `${titles.tel} 필수입력입니다`, pattern: { value: patterns.tel, message: messages.tel }, }} />

      <InputField name="address" label="주소" register={register} error={errors.address} rules={{ required: `${titles.address} 필수입력입니다`, pattern: { value: patterns.address, message: messages.address }, }} />

      <div className="mt-3 mb-3">
        <label className="form-label">주소:</label>
        <input type="text" className="form-control" {...register("address", { required: `${titles.address} 필수입력입니다`, pattern: { value: patterns.address, message: messages.address, }, })} />
        {errors.address && <span style={{ color: 'red', fontSize: '0.8em' }}>{errors.address.message}</span>}
      </div>

      <div className="d-grid gap-3">
        <button type="button" className="btn btn-outline-primary btn-block" onClick={handleSubmit(onSubmit)}>
          추가
        </button>
      </div>
    </>
  );
}

export default ContactWrite