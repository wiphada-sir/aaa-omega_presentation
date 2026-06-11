import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import bannerImage from "../../assets/images/banner-forgot-password.webp";

export default function AuthForgotPassword() {

  const navigate = useNavigate();
  
  const forgotPasswordInitial = {
    email: "",
  };
  const [forgotPasswordForm, setForgotPasswordForm] = useState(forgotPasswordInitial);
  const handleForgotPasswordChange = (event) => setForgotPasswordForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  const handleForgotPasswordSubmit = (event) => {
    event.preventDefault();
    const payload = {...forgotPasswordForm};
    console.log(payload);
    navigate("/auth/login");
  };

  return (
    <>
      <section className="max-sm:hidden flex-1">
        <img className="w-full sm:h-full sm:min-h-115 object-cover" src={bannerImage} />
      </section>
      <section id="login" className="flex flex-1 flex-col flex-wrap justify-center gap-5">
        <div className="heading">
          <h1>ลืมรหัสผ่าน</h1>
          <p>กรอกอีเมลเพื่อรับลิงก์สำหรับรีเซ็ตรหัสผ่าน</p>
        </div>
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="input-group">
            <label htmlFor="email">อีเมล</label>
            <input type="email" id="email" name="email" value={forgotPasswordForm.email} onChange={handleForgotPasswordChange} placeholder="account@email.com" maxLength="120" />
          </div>
          <div className="button-row">
            <button type="submit" className="button w-full">ส่งลิงก์รีเซ็ต</button>
          </div>
        </form>
        <hr />
        <div className="flex flex-wrap flex-col-reverse 2xs:flex-row 2xs:justify-between items-center gap-5">
          <Link className="button button-soft button-content max-2xs:w-full 2xs:min-h-fit 2xs:leading-6 2xs:p-0 2xs:bg-transparent" to="/auth/login"><span className="icon-material">keyboard_arrow_left</span> กลับสู่ระบบ</Link>
          <Link className="button button-outline button-primary max-2xs:w-full 2xs:min-h-fit 2xs:leading-6 2xs:p-0 2xs:border-0" to="/auth/register">ยังไม่มีบัญชี?</Link>
        </div>
      </section>
    </>
  );

};