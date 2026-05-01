export function getNextFieldState(field: boolean[][]): boolean[][] {
  const rows = field.length;

  if (rows === 0) {
    return field;
  }

  const cols = field[0].length;

  const countAliveNeighbors = (row: number, col: number) => {
    let aliveNeighbors = 0;

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
        if (rowOffset === 0 && colOffset === 0) {
          continue;
        }

        const nextRow = row + rowOffset;
        const nextCol = col + colOffset;

        if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) {
          continue;
        }

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
