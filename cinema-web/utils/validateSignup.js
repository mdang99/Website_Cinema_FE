export function validateSignup({ name, email, password }) {
  if (!name || name.trim().length < 2) {
    return "Tên phải có ít nhất 2 ký tự";
  }

  if (name.length > 50) {
    return "Tên không được vượt quá 50 ký tự";
  }

  if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
    return "Tên không được chứa số hoặc ký tự đặc biệt";
  }

  if (!email) {
    return "Email không được để trống";
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/;

  if (!emailRegex.test(email)) {
    return "Email không đúng định dạng hợp lệ";
  }

  if (!password) {
    return "Mật khẩu không được để trống";
  }

  if (password.length < 8 || password.length > 32) {
    return "Mật khẩu phải từ 8–32 ký tự";
  }

  if (!/[A-Z]/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 chữ hoa";
  }

  if (!/[a-z]/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 chữ thường";
  }

  if (!/[0-9]/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 số";
  }

  if (!/[\W]/.test(password)) {
    return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
  }

  return null; // ✅ Hợp lệ
}
