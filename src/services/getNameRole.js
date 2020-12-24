export const getNameRole = id_role => {
  if (id_role === 1) {
    return "Người thuê trọ";
  } else if (id_role === 2) {
    return "Admin";
  } else if (id_role === 3) {
    return "Chủ nhà trọ";
  }
};
