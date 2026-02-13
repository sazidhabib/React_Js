import React from 'react';
import { Container } from 'react-bootstrap';
import GridCell from './GridCell';

const GridSection = ({ section }) => {
    const sortedRows = [...(section.Rows || section.rows || [])].sort((a, b) => a.rowOrder - b.rowOrder);

    if (!sortedRows.length) return null;

    // Determine the number of grid columns from the first row
    const firstRow = sortedRows[0];
    const totalCols = (firstRow.Columns || firstRow.columns || []).length;

    // Build a flat list of cells with grid placement info
    // We need to process merged cells to place them correctly in CSS Grid
    const gridCells = [];
    const occupiedCells = new Set(); // Track cells occupied by merged spans

    sortedRows.forEach((row, rowIndex) => {
        const sortedCols = [...(row.Columns || row.columns || [])].sort((a, b) => a.colOrder - b.colOrder);

        sortedCols.forEach((col, colIndex) => {
            const cellKey = `${rowIndex}-${colIndex}`;

            // Skip cells that are occupied by a merge span from another cell
            if (occupiedCells.has(cellKey)) return;

            // Skip non-master merged cells
            if (col.merged && !col.masterCell) return;

            const rowSpan = col.rowSpan || 1;
            const colSpan = col.colSpan || 1;

            // Mark occupied cells for merged spans
            if (rowSpan > 1 || colSpan > 1) {
                for (let r = 0; r < rowSpan; r++) {
                    for (let c = 0; c < colSpan; c++) {
                        if (r === 0 && c === 0) continue;
                        occupiedCells.add(`${rowIndex + r}-${colIndex + c}`);
                    }
                }
            }

            // CSS Grid uses 1-based positioning
            gridCells.push({
                col,
                gridRow: `${rowIndex + 1} / span ${rowSpan}`,
                gridColumn: `${colIndex + 1} / span ${colSpan}`,
                key: col.id || cellKey
            });
        });
    });

    // Calculate column template: use the width values from first row if available
    const firstRowCols = (firstRow.Columns || firstRow.columns || []).sort((a, b) => a.colOrder - b.colOrder);
    const gridTemplateColumns = firstRowCols.map(col => `${col.width || 1}fr`).join(' ');

    return (
        <section className="py-3 section-wrapper">
            <Container>
                {section.name && !section.name.startsWith('Section') && (
                    <div className="section-header mb-3">
                        <h2 className="section-title border-bottom pb-2">{section.name}</h2>
                    </div>
                )}

                <div
                    className="grid-section"
                    style={{
                        display: 'grid',
                        gridTemplateColumns: gridTemplateColumns,
                        gridTemplateRows: `repeat(${sortedRows.length}, auto)`,
                        gap: '12px',
                    }}
                >
                    {gridCells.map(({ col, gridRow, gridColumn, key }) => (
                        <div
                            key={key}
                            style={{
                                gridRow,
                                gridColumn,
                                minHeight: '0',
                            }}
                        >
                            <GridCell cell={col} />
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
};

export default GridSection;
