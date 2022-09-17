import moment from "moment";
export const changeDateFormat = (unixtimestamp: any) => {
  return moment.unix(unixtimestamp / 1000).format("YYYY-MM-DD");
};
