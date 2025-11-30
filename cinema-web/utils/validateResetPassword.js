export function validateResetPassword(newPassword) {
  if (!newPassword) {
    return "Vui lòng nhập mật khẩu mới";
  }

  if (newPassword.length < 8) {
    return "Mật khẩu phải có ít nhất 8 ký tự";
  }

  if (!/[A-Z]/.test(newPassword)) {
    return "Mật khẩu phải có ít nhất 1 chữ hoa";
  }

  if (!/[a-z]/.test(newPassword)) {
    return "Mật khẩu phải có ít nhất 1 chữ thường";
  }

  if (!/[0-9]/.test(newPassword)) {
    return "Mật khẩu phải có ít nhất 1 số";
  }

  if (!/[\W]/.test(newPassword)) {
    return "Mật khẩu phải có ít nhất 1 ký tự đặc biệt";
  }

  return null; // ✅ Hợp lệ
}
