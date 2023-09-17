export const secondsToTimeObject = (rawTime: number) => {
  const hh = Math.floor(rawTime / 3600);
  const hhReminder = Math.floor(rawTime - hh * 3600);
  const mm = Math.floor(hhReminder / 60);
  const ss = Math.floor(hhReminder - mm * 60);

  return {
    hours: hh,
    minutes: mm,
    seconds: ss,
  };
};
