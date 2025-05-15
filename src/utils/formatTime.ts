export const formatTime = (time: Date | string | null | undefined): string => {
  if (!time) return '—';

  const date = typeof time === 'string' ? new Date(time) : time;

  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
