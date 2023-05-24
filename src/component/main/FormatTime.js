export default function FormatTime(seconds) {
  let Minute = Math.floor(seconds / 60);
  let Seconds = Math.floor(seconds - Minute * 60);
  let tt = "0";
  if (Seconds < 10) {
    Seconds = "0" + Seconds;
  }
  if (Minute > 10) {
    tt = "";
  }
  return tt + Minute + ":" + Seconds;
}
