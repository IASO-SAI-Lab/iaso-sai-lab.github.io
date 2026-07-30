export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(date);

export const formatDateTime = (date: Date) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(date);

export const titleCase = (value: string) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

export const sortByOrder = <T extends { data: { order: number } }>(entries: T[]) =>
  [...entries].sort((a, b) => a.data.order - b.data.order);

export const sortByDate = <T extends { data: { date: Date } }>(entries: T[]) =>
  [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
