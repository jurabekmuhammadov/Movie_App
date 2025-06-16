export function formatRuntime(minutes) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  }

export function formatDate(dateString) {
    const date = new Date(dateString);
  
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

export function formatNumberWithScale(number) {
  const absNum = Math.abs(number);

  if (absNum >= 1_000_000_000_000) {
    return `$${(number / 1_000_000_000_000).toFixed(1)} trillion`;
  } else if (absNum >= 1_000_000_000) {
    return `$${(number / 1_000_000_000).toFixed(1)} billion`;
  } else if (absNum >= 1_000_000) {
    return `$${(number / 1_000_000).toFixed(1)} million`;
  } else if (absNum >= 1_000) {
    return `$${(number / 1_000).toFixed(1)} thousand`;
  } else {
    return `$${number}`;
  }
}