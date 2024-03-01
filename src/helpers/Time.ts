export const ConvertTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};
