export const getRole = role => {
  return localStorage.getItem("role") === role;
};
