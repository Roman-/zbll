// ms - total milliseconds
export const msToHumanReadable = (ms, numDigitsMs = 2, displayMs = true) => {
  if (!Number.isFinite(ms) || ms < 0) {
    ms = 0
  }

  const msDivider = Math.pow(10, 3 - numDigitsMs);
  const milliseconds = Math.floor(ms % 1000 / msDivider);
  const seconds = Math.floor(ms / 1000) % 60;
  const minutes = Math.floor(ms / (1000 * 60)) % 60;
  const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;

  const pad = num => (num < 10 ? "0" : "") + num;
  const padMs = num => `${num}`.padStart(numDigitsMs, "0")

  const hoursString = hours === 0 ? "" : hours + ":";
  const minutesString = minutes === 0 ? "" : (hours === 0 ? minutes : pad(minutes)) + ":";
  const secondsString = (ms >= 1000 * 60) ? pad(seconds) : seconds;
  const millisecondsString = displayMs ? `.${padMs(milliseconds)}` : "";

  return `${hoursString}${minutesString}${secondsString}${millisecondsString}`;
}
