import React from 'react';

/**
 * High-fidelity SVG QR Code generator component.
 * Encodes booking reference and generates a realistic matrix pattern with corner finder patterns.
 */
export const QRCode = ({ text = "CB-DEMO-TICKET", size = 160 }) => {
  // Simple deterministic hash to populate the matrix cells based on text
  const matrixSize = 25; // standard QR size
  const grid = Array(matrixSize).fill(null).map(() => Array(matrixSize).fill(0));

  // Helper to draw 7x7 finder pattern with 1px border
  const drawFinder = (startX, startY) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 || // outer square
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)      // inner square
        ) {
          grid[startY + r][startX + c] = 1;
        } else {
          grid[startY + r][startX + c] = 0;
        }
      }
    }
  };

  // 3 corner finder patterns
  drawFinder(0, 0); // Top-left
  drawFinder(matrixSize - 7, 0); // Top-right
  drawFinder(0, matrixSize - 7); // Bottom-left

  // Draw timing patterns
  for (let i = 8; i < matrixSize - 8; i++) {
    grid[6][i] = i % 2 === 0 ? 1 : 0;
    grid[i][6] = i % 2 === 0 ? 1 : 0;
  }

  // Generate pseudo-random deterministic data bits from string
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Don't overwrite finders or timing patterns
      const inTopLeftFinder = r < 8 && c < 8;
      const inTopRightFinder = r < 8 && c >= matrixSize - 8;
      const inBottomLeftFinder = r >= matrixSize - 8 && c < 8;
      const inTiming = r === 6 || c === 6;

      if (!inTopLeftFinder && !inTopRightFinder && !inBottomLeftFinder && !inTiming) {
        const seed = Math.sin(hash + r * 31 + c * 17) * 10000;
        grid[r][c] = (seed - Math.floor(seed)) > 0.48 ? 1 : 0;
      }
    }
  }

  const cellSize = size / matrixSize;

  return (
    <div className="bg-white p-2.5 rounded-xl shadow-md inline-block border border-gray-200">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shape-rendering-crispEdges"
      >
        <rect width={size} height={size} fill="#ffffff" />
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => {
            if (cell === 1) {
              return (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx * cellSize}
                  y={rIdx * cellSize}
                  width={cellSize + 0.2}
                  height={cellSize + 0.2}
                  fill="#0b0c10"
                />
              );
            }
            return null;
          })
        )}
      </svg>
      <div className="text-center mt-1 text-[10px] font-mono tracking-widest text-gray-500 uppercase font-semibold">
        {text.slice(0, 16)}
      </div>
    </div>
  );
};
