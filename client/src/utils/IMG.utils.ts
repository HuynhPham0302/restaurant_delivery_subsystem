export const getImgSrc = (img: string) => {
  return `${import.meta.env.VITE_BACKEND_URL}/v1/api/img/${img}`;
};
