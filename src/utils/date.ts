export const formatDate = (date: Date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('/');
};

export const TODAY = new Date();
export const TWO_DAY_FROM_NOW = new Date(TODAY.getTime() + 60 * 60 * 48 * 1000);
