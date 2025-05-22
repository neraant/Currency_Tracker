export const formatTimestamp = (timestamp?: number | null): string => {
  return timestamp ? new Date(timestamp).toLocaleString() : '';
};
