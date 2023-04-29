export const msToHumanReadable = ms => {
  if (!Number.isFinite(ms) || ms < 0) {
    return "0.00";
  }

  const milliseconds = Math.floor(ms % 1000 / 10);
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;

  const pad = (num) => (num < 10 ? "0" : "") + num;

  const hoursString = hours === 0 ? "" : pad(hours) + ":";
  const minutesString = minutes === 0 ? "" : pad(minutes) + ":";
  const secondsString = (ms >= 1000 * 60) ? pad(seconds) : seconds;
  const millisecondsString = pad(milliseconds);

  return hoursString + minutesString + secondsString + "." + millisecondsString;
}
