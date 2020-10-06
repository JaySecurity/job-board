export const dateToMDY = (date) => {
  let d = date.getDate();
  let m = date.getMonth() + 1; //Month from 0 to 11
  let y = date.getFullYear().toString().substr(-2);
  let H = date.getHours();
  let M = date.getMinutes();
  return (
    (m <= 9 ? '0' + m : m) +
    '-' +
    (d <= 9 ? '0' + d : d) +
    '-' +
    y +
    ' ' +
    H +
    ':' +
    (M <= 9 ? '0' + M : M)
  );
};
