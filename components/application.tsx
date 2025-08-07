import React, { useRef, useState, useEffect } from 'react';
import '../index.css';
import { headers, users } from '../data/data';

const ResizableTable: React.FC = () => {
  const [columnWidths, setColumnWidths] = useState<number[]>([250, 250, 250]);
  const tableRef = useRef<HTMLTableElement | null>(null);
  const startX = useRef<number>(0);
  const startWidth = useRef<number>(0);
  const activeCol = useRef<number | null>(null);

  // store initial mouse positionn and column width
  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    activeCol.current = index;
    startX.current = e.clientX;
    startWidth.current = columnWidths[index];
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  const handleMouseMove = (e: MouseEvent) => {
    if (activeCol.current === null) return;
    // the distance moved
    const movedX = e.clientX - startX.current;
    setColumnWidths((prevWidths) => {
      const widths = [...prevWidths];
      const newWidth = startWidth.current + movedX;
      widths[activeCol.current!] = newWidth;
      return widths;
    });
  };
  const handleMouseUp = () => {
    activeCol.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <table ref={tableRef}>
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th
              key={index}
              style={{ width: columnWidths[index], position: 'relative' }}
              className="resizable-header"
            >
              {header}
              <div
                className="resizer"
                onMouseDown={(e) => handleMouseDown(e, index)}
              />
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            {Object.values(user).map((value, colIndex) => (
              <td key={colIndex} style={{ width: columnWidths[colIndex] }}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ResizableTable;
