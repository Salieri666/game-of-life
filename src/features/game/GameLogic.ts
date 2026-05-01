export function getNextFieldState(field: boolean[][]): boolean[][] {
  const rows = field.length;

  if (rows === 0) {
    return field;
  }

  const cols = field[0].length;
  const getWrappedIndex = (index: number, size: number) => (index + size) % size;

  const countAliveNeighbors = (row: number, col: number) => {
    let aliveNeighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        }

        const nextRow = getWrappedIndex(row + rowOffset, rows);
        const nextCol = getWrappedIndex(col + colOffset, cols);

        if (field[nextRow][nextCol]) {
          aliveNeighbors += 1;
        }
      }
    }

    return aliveNeighbors;
  };

  return field.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      const aliveNeighbors = countAliveNeighbors(rowIndex, colIndex);

      if (cell) {
        return aliveNeighbors === 2 || aliveNeighbors === 3;
      }

      return aliveNeighbors === 3;
    }),
  );
}
