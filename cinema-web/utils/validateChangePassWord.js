// utils/validateChangePassWord.js
export function validateChangePassword({ oldPassword, newPassword }) {
  // ✅ 1. Check mật khẩu cũ đã nhập chưa (FE chỉ làm được mức này)
  if (!oldPassword) {
    return "Vui lòng nhập mật khẩu cũ";
  }

  // ✅ 2. Check mật khẩu mới
  if (!newPassword || newPassword.length < 8) {
    return "Mật khẩu mới phải có ít nhất 8 ký tự";
  }

  if (!/[A-Z]/.test(newPassword)) {
    return "Mật khẩu mới phải có ít nhất 1 chữ hoa";
  }

  if (!/[a-z]/.test(newPassword)) {
    return "Mật khẩu mới phải có ít nhất 1 chữ thường";
  }

  if (!/[0-9]/.test(newPassword)) {
    return "Mật khẩu mới phải có ít nhất 1 số";
  }

  if (!/[^a-zA-Z0-9]/.test(newPassword)) {
    return "Mật khẩu mới phải có ít nhất 1 ký tự đặc biệt";
  }

  return null;
}
