/**
 * Találkozó kezdéséig hátralévő idő szövege.
 */
export function getMeetingReason(
  startAt: Date,
  now: Date
): string {
  const diffMilliseconds =
    startAt.getTime() - now.getTime();

  const diffMinutes = Math.ceil(
    diffMilliseconds / (60 * 1000)
  );

  if (diffMinutes <= 0) {
    return "Most kezdődik.";
  }

  if (diffMinutes === 1) {
    return "1 perc múlva kezdődik.";
  }

  return `${diffMinutes} perc múlva kezdődik.`;
}