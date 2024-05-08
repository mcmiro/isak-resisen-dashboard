const useDate = () => {
  const handleGermanDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  };

  const handleDbDate = (date: Date | string): string => {
    if (date instanceof Date) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${year}-${month}-${day}`;
    } else if (typeof date === "string") {
      const [day, month, year] = date
        .split(".")
        .map((part) => part.padStart(2, "0"));
      return `${year}-${month}-${day}`;
    } else {
      throw new Error("Invalid date format");
    }
  };

  return {
    handleGermanDate,
    handleDbDate,
  };
};

export default useDate;
