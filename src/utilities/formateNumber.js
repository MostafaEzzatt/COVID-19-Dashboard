export const formateNumber = (num) => {
  let formated = num.toLocaleString(undefined, { minimumFractionDigits: 2 });
  formated = formated.split(".")[0];
  return formated;
};
