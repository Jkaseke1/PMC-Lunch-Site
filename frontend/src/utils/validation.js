export const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@(tpg\.co\.zw|pulse-pharmaceuticals\.co\.zw)$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password) => {
  return password.length >= 8;
};
