import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import GridCell from './GridCell';

const GridSection = ({ section }) => {
    // Determine container width based on layout settings if available, otherwise default to Container
    // For now using standard Container

    // Sort rows by rowOrder
    const sortedRows = [...(section.Rows || section.rows || [])].sort((a, b) => a.rowOrder - b.rowOrder);

    if (!sortedRows.length) return null;

    return (
        <section className="py-4 section-wrapper">
            <Container>
                {section.name && !section.name.startsWith('Section') && (
                    <div className="section-header mb-3">
                        <h2 className="section-title border-bottom pb-2">{section.name}</h2>
                    </div>
                )}

                {sortedRows.map((row, rowIndex) => {
                    // Sort columns by colOrder
                    const sortedCols = [...(row.Columns || row.columns || [])].sort((a, b) => a.colOrder - b.colOrder);

                    if (!sortedCols.length) return null;

                    return (
                        <Row key={row.id || rowIndex} className="mb-3">
                            {sortedCols.map((col, colIndex) => {
                                // Skip if merged and not master
                                if (col.merged && !col.masterCell) return null;

                                return (
                                    <Col
                                        key={col.id || colIndex}
                                        md={col.width || 12} // Use bootstrap grid width (1-12)
                                        // Handle rowspan/colspan custom styling if needed, 
                                        // or basic bootstrap columns do not support rowspan easily.
                                        // For advanced grid with rowspan/colspan, CSS Grid might be better 
                                        // but we are sticking to bootstrap structure from Admin.
                                        // If rowSpan > 1, this gets tricky in pure Bootstrap Rows/Cols without CSS Grid.
                                        // For now, mapping width to md={width}. 
                                        // Note: Bootstrap doesn't support rowSpan natively in grid system. 
                                        // If the user uses rowSpan, we might need a different approach or custom CSS.
                                        // Admin uses simple table for preview, frontend should ideally use CSS Grid or similar.
                                        // Let's assume standard columns for now.
                                        className={col.merged ? 'position-relative' : ''}
                                        style={col.merged ? {
                                            // Simple hack for merged cells visibility, 
                                            // real rowspans need CSS Grid implementation
                                        } : {}}
                                    >
                                        <GridCell cell={col} />
                                    </Col>
                                );
                            })}
                        </Row>
                    );
                })}
            </Container>
        </section>
    );
};

export default GridSection;
