export const pagination = (src, page = 1) => {
  let start = (page - 1) * 10;
  let end = start + 10;
  return src.slice(start, end);
};
