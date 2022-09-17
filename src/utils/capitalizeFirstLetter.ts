export const capitalizeFirstLetter = (string: string) => {
  if (!!string === false) return "";
  return (
    string?.charAt(0)?.toUpperCase() + string?.slice(1).toLowerCase()
  ).trim();
};
