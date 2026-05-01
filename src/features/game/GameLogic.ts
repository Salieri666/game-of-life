export function getNextFieldState(field: boolean[][]): boolean[][] {
  return field.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (rowIndex === 0 && colIndex === 0) {
        return !cell;
      }

      return cell;
    }),
  );
}
