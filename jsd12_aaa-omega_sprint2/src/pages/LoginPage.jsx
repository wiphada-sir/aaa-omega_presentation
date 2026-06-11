import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../contexts/authContext/AuthContext";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "teerapat.j@gmail.aaa",
    password: "password123",
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login, logout, error, clearError, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) clearError();
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(async () => {
      const success = await login(formData.email, formData.password);
      setIsLoading(false);

      if (success) {
        navigate("/profile");
      }
    }, 500);
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-5 font-['Kanit']">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">คุณเข้าสู่ระบบอยู่แล้ว</h1>
          <p className="mt-2 text-gray-600">หากต้องการใช้บัญชีอื่น ให้กดออกจากระบบก่อน</p>
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition duration-200"
            >
              ไปหน้าโปรไฟล์
            </button>
            <button
              type="button"
              onClick={() => {
                logout();
                navigate("/login", { replace: true });
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 rounded-lg transition duration-200"
            >
              ออกจากระบบเพื่อเปลี่ยนบัญชี
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-5 font-['Kanit']">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          เข้าสู่ระบบ
        </h1>
        <p className="text-center text-gray-500 mb-8">AAA Omega Account</p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              อีเมล
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="your@email.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              รหัสผ่าน
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-2">📝 บัญชีทดสอบ:</p>
          <p className="text-xs text-gray-700">
            <strong>Email:</strong> teerapat.j@gmail.aaa
          </p>
          <p className="text-xs text-gray-700 mb-2">
            <strong>Password:</strong> password123
          </p>
          <p className="text-xs text-gray-600">หรือ Email: demo@example.com / Password: demo123</p>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            ยังไม่มีบัญชี?{" "}
            <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              ลงทะเบียนที่นี่
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700 text-sm font-medium">
            ← กลับไปหน้าหลัก
          </Link>
        </div>
      </div>
    </main>
  );
}

