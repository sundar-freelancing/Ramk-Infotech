export const scrollToTop = (smooth: boolean = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? "smooth" : "instant",
  });
};

export const distributeEvenly = <T>(array: T[], numColumns: number): T[][] => {
  const columns: T[][] = Array.from({ length: numColumns }, () => []);
  const baseSize = Math.floor(array.length / numColumns);
  const remainder = array.length % numColumns;

  let currentIndex = 0;
  for (let col = 0; col < numColumns; col++) {
    const columnSize = baseSize + (col < remainder ? 1 : 0);
    columns[col] = array.slice(currentIndex, currentIndex + columnSize);
    currentIndex += columnSize;
  }

  return columns;
};

export function getInitials(name: string): string {
  if (!name) return "";

  const parts = name.trim().split(/\s+/);

  if (parts.length === 1) {
    return parts[0][0].toUpperCase();
  }

  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return (first + last).toUpperCase();
}
