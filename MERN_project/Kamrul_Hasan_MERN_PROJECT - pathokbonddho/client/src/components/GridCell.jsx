import React, { Suspense, lazy } from 'react';
// Lazy load widgets to improve performance
const NewsWidget = lazy(() => import('./widgets/NewsWidget'));
const ImageWidget = lazy(() => import('./widgets/ImageWidget'));

const GridCell = ({ cell }) => {
    const { contentType, contentId } = cell;

    // Optional: Add debug helper
    // console.log('Rendering cell:', cell);

    if (!contentType || contentType === 'text') {
        return null; // Don't render empty text cells for now
    }

    const renderContent = () => {
        switch (contentType) {
            case 'news':
                // Pass all cell data so widget can use design/tag info
                return <NewsWidget cell={cell} />;
            case 'image':
                return <ImageWidget cell={cell} />;
            case 'video':
                // Placeholder for VideoWidget
                return <div className="p-3 bg-dark text-white text-center">Video Widget (TODO)</div>;
            case 'ad':
                // Placeholder for AdWidget
                return <div className="p-3 bg-light text-center border">Ad Widget (TODO)</div>;
            default:
                return null;
        }
    };

    return (
        <div className="grid-cell h-100">
            <Suspense fallback={<div className="placeholder-glow"><span className="placeholder w-100 h-100"></span></div>}>
                {renderContent()}
            </Suspense>
        </div>
    );
};

export default GridCell;
