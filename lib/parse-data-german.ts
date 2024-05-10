export const handleGermanDate = (date: string): string => {
  const [year, month, day] = date
    .split("-")
    .map((part) => part.padStart(2, "0"));
  return `${day}.${month}.${year}`;
};

// Create our number formatter.
export const handleGermanSummary = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});
