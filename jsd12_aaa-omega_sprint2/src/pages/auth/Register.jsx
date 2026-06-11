import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import { registerUser } from "../../api/admin/user";
import { MessageContext } from "../../contexts/messageContext/MessageContext";
import Toast from "../../components/admin/common/Toast";
import bannerImage from "../../assets/images/banner-register.webp";

export default function AuthRegister() {

  const { toast, showToast } = useContext(MessageContext);

  const navigate = useNavigate();

  const registerInitial = {
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    password2: ""
  };
  const [registerForm, setRegisterForm] = useState(registerInitial);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleRegisterChange = (event) => {
    setError("");
    setRegisterForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    if (!registerForm?.firstName?.trim()) {
      setError("กรุณากรอกชื่อ");
      return;
    };
    if (!registerForm?.lastName?.trim()) {
      setError("กรุณากรอกนามสกุล");
      return;
    };
    if (!registerForm?.phone?.trim()) {
      setError("กรุณากรอกเบอร์ติดต่อ");
      return;
    };
    if (!registerForm?.email?.trim()) {
      setError("กรุณากรอกอีเมล");
      return;
    };
    if (!registerForm?.password?.trim()) {
      setError("กรุณากรอกรหัสผ่าน");
      return;
    };
    if (registerForm?.password !== registerForm?.password2) {
      setError("รหัสผ่านไม่ตรงกัน");
      return;
    };
    if (!/^\d{9,20}$/.test(registerForm.phone.trim())) {
      setError("รูปแบบเบอร์โทรไม่ถูกต้อง");
      return;
    };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordMin = 8;
    const passwordMax = 72;
    if (!emailRegex.test(registerForm?.email?.trim())) {
      setError("รูปแบบอีเมลไม่ถูกต้อง");
      return;
    };
    if (registerForm.password.length < passwordMin) {
      setError(`รหัสผ่านต้องมีอย่างน้อย ${passwordMin} ตัวอักษร`);
      return;
    };
    if (registerForm.password.length > passwordMax) {
      setError(`รหัสผ่านต้องมีไม่เกิน ${passwordMax} ตัวอักษร`);
      return;
    };
    const payload = {
      firstName: registerForm.firstName.trim(),
      lastName: registerForm.lastName.trim(),
      phone: registerForm.phone.trim(),
      email: registerForm.email.trim(),
      password: registerForm.password,
    };
    try {
      setSubmitting(true);
      setError("");
      const result = await registerUser(payload);
      if (!result) {
        setError("ไม่สามารถสมัครสมาชิกได้");
        return;
      };
      setRegisterForm(registerInitial);
      showToast("สมัครสมาชิกเรียบร้อย");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1500);
    } catch (error) {
      console.error(error);
      setError("เกิดข้อผิดพลาด");
    } finally {
      setSubmitting(false);
    };
  };

  return (
    <>
      <section className="max-sm:hidden flex-1">
        <img className="w-full sm:h-full sm:min-h-115 object-cover" src={bannerImage} />
      </section>
      <section id="register" className="flex flex-1 flex-col flex-wrap justify-center gap-5">
        <div className="heading">
          <h1>สมัครบัญชี</h1>
        </div>
        <form onSubmit={handleRegisterSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="firstName">ชื่อจริง</label>
              <input type="text" id="firstName" name="firstName" value={registerForm?.firstName} onChange={handleRegisterChange} placeholder="สมชาย" maxLength="120" />
            </div>
            <div className="input-group">
              <label htmlFor="lastName">นามสกุล</label>
              <input type="text" id="lastName" name="lastName" value={registerForm?.lastName} onChange={handleRegisterChange} placeholder="ใจดี" maxLength="120" />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="phone">เบอร์ติดต่อ</label>
            <input type="tel" id="phone" name="phone" value={registerForm?.phone} onChange={handleRegisterChange} placeholder="081-000-0000" minLength="10" maxLength="20" />
          </div>
          <div className="input-group">
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" name="email" value={registerForm?.email} onChange={handleRegisterChange} placeholder="account@email.com" maxLength="120" />
          </div>
          <div className="input-row">
            <div className="input-group">
              <label htmlFor="password">รหัสผ่าน</label>
              <input type="password" id="password" name="password" value={registerForm?.password} onChange={handleRegisterChange} placeholder="••••••••" />
            </div>
            <div className="input-group">
              <label htmlFor="password2">ยืนยันรหัสผ่าน</label>
              <input type="password" id="password2" name="password2" value={registerForm?.password2} onChange={handleRegisterChange} placeholder="••••••••" />
            </div>
          </div>
          <div className="button-row">
            <button type="submit" className="button w-full" disabled={submitting}>{submitting ? "กำลังสมัครสมาชิก..." : "สมัครสมาชิก"}</button>
          </div>
          {error &&
            <div className="input-group">
              <p className="text-warning-soft text-sm text-center">{error}</p>
            </div>
          }
        </form>
        <Toast {...toast} />
        <hr />
        <div className="flex flex-wrap flex-col-reverse 2xs:flex-row justify-center items-center gap-5">
          <Link className="button button-outline button-primary max-2xs:w-full 2xs:min-h-fit 2xs:leading-6 2xs:p-0 2xs:border-0" to="/auth/login">มีบัญชีอยู่แล้ว?</Link>
        </div>
      </section>
    </>
  );

};