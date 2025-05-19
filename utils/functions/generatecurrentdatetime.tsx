// Pads single digits with 0
const pad = (n:any) => (n < 10 ? '0' + n : n);

// Returns the current datetime rounded to the next 5-minute interval
export const getCurrentDateTime = () => {
  const now = new Date();

  // Round minutes up to the next 5-minute increment
  const minutes = now.getMinutes();
  const roundedMinutes = Math.ceil(minutes / 5) * 5;

  if (roundedMinutes === 60) {
    now.setHours(now.getHours() + 1);
    now.setMinutes(0);
  } else {
    now.setMinutes(roundedMinutes);
  }

  now.setSeconds(0);
  now.setMilliseconds(0);

  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
};

// Returns datetime 5 days from now at 23:59
export const getMaxDateTime = () => {
  const future = new Date();
  future.setDate(future.getDate() + 5);
  future.setHours(23, 59, 0, 0);

  return `${future.getFullYear()}-${pad(future.getMonth() + 1)}-${pad(future.getDate())}T${pad(future.getHours())}:${pad(future.getMinutes())}`;
};
