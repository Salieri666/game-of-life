import { useEffect, useRef, useState, type MouseEvent } from 'react';
import styles from './GameField.module.scss'

type GameFieldProps = {
  field: boolean[][]
  onCellClick: (row: number, col: number) => void
}

export function GameField({ field, onCellClick }: GameFieldProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);
  const rootStyles = typeof window !== 'undefined' ? getComputedStyle(document.documentElement) : null;
  const whiteCellColor = rootStyles?.getPropertyValue('--color-white').trim() || '#ffffff';
  const aliveCellColor = rootStyles?.getPropertyValue('--color-slate-900').trim() || '#0f172a';
  const gridColor = rootStyles?.getPropertyValue('--color-slate-300').trim() || '#cbd5e1';
  const hoverDeadCellColor = rootStyles?.getPropertyValue('--color-amber-100').trim() || '#fef3c7';
  const hoverAliveCellColor = rootStyles?.getPropertyValue('--color-slate-800').trim() || '#1e293b';

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (!wrapper || field.length === 0 || field[0].length === 0) {
      return;
    }

    const rows = field.length;
    const cols = field[0].length;

    const updateCanvasSize = (width: number, height: number) => {
      const availableWidth = Math.floor(width);
      const availableHeight = Math.floor(height);

      if (availableWidth <= 0 || availableHeight <= 0) {
        return;
      }

      const maxCellWidth = Math.floor(availableWidth / cols);
      const maxCellHeight = Math.floor(availableHeight / rows);
      const cellSize = Math.max(Math.min(maxCellWidth, maxCellHeight), 1);

      setCanvasSize((currentSize) => {
        const nextSize = {
          width: cellSize * cols,
          height: cellSize * rows,
        };

        if (
          currentSize.width === nextSize.width &&
          currentSize.height === nextSize.height
        ) {
          return currentSize;
        }

        return nextSize;
      });
    };

    const resizeObserver = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }

      updateCanvasSize(entry.contentRect.width, entry.contentRect.height);
    });

    resizeObserver.observe(wrapper);

    return () => {
      resizeObserver.disconnect();
    };
  }, [field]);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || field.length === 0 || field[0].length === 0) {
      return;
    }

    const rows = field.length;
    const cols = field[0].length;
    const { width, height } = canvasSize;

    if (width === 0 || height === 0) {
      return;
    }

    const cellSize = width / cols;
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, width, height);

    context.fillStyle = whiteCellColor;
    context.fillRect(0, 0, width, height);

    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const isHovered = hoveredCell?.row === row && hoveredCell?.col === col;

        if (isHovered) {
          context.fillStyle = field[row][col] ? hoverAliveCellColor : hoverDeadCellColor;
        } else {
          context.fillStyle = field[row][col] ? aliveCellColor : whiteCellColor;
        }

        context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }

    context.fillStyle = gridColor;

    for (let col = 0; col <= cols; col += 1) {
      const x = Math.min(col * cellSize, width - 1);
      context.fillRect(x, 0, 1, height);
    }

    for (let row = 0; row <= rows; row += 1) {
      const y = Math.min(row * cellSize, height - 1);
      context.fillRect(0, y, width, 1);
    }
  }, [
    aliveCellColor,
    canvasSize,
    field,
    gridColor,
    hoveredCell,
    hoverAliveCellColor,
    hoverDeadCellColor,
    whiteCellColor,
  ]);

  const handleMouseMove = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas || field.length === 0 || field[0].length === 0 || canvasSize.width === 0) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const cols = field[0].length;
    const rows = field.length;
    const cellSize = canvasSize.width / cols;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.min(Math.max(Math.floor(x / cellSize), 0), cols - 1);
    const row = Math.min(Math.max(Math.floor(y / cellSize), 0), rows - 1);

    setHoveredCell((currentCell) => {
      if (currentCell?.row === row && currentCell?.col === col) {
        return currentCell;
      }

      return { row, col };
    });
  };

  const handleMouseLeave = () => {
    setHoveredCell(null);
  };

  const handleCanvasClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;

    if (!canvas || field.length === 0 || field[0].length === 0 || canvasSize.width === 0) {
      return;
    }

    const rect = canvas.getBoundingClientRect();
    const cols = field[0].length;
    const rows = field.length;
    const cellSize = canvasSize.width / cols;
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const col = Math.min(Math.max(Math.floor(x / cellSize), 0), cols - 1);
    const row = Math.min(Math.max(Math.floor(y / cellSize), 0), rows - 1);

    onCellClick(row, col);
  };

  return (
    <div ref={wrapperRef} className={styles.gameField}>
      <canvas
        ref={canvasRef}
        className={styles.canvas}
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
}
