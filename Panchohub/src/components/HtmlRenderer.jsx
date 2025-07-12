import React from 'react';

const HtmlRenderer = ({ encodedHtml }) => {
    const decodeHtml = (html) => {
        let decodedUnicode;
        try {
            decodedUnicode = JSON.parse(`"${html}"`);
        } catch (e) {
            decodedUnicode = html;
        }
        const textarea = document.createElement('textarea');
        textarea.innerHTML = decodedUnicode;
        return textarea.value;
    };

    const safeHtml = decodeHtml(encodedHtml);
    const doc = new DOMParser().parseFromString(safeHtml, 'text/html');

    // Remove oembed tag from the rendered HTML
    const oembed = doc.querySelector('oembed');
    if (oembed) {
        oembed.parentNode.removeChild(oembed);
    }

    // Get clean HTML without oembed
    const cleanHtml = doc.body.innerHTML;

    // Extract Google Maps place ID if available
    const getGoogleMapsEmbedUrl = () => {
        if (!oembed) return null;
        const url = oembed.getAttribute('url');
        const placeMatch = url.match(/place\/([^\/]+)/);
        if (placeMatch) {
            return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=place_id:${placeMatch[1]}`;
        }
        return null;
    };

    const embedUrl = getGoogleMapsEmbedUrl();

    return (
        <div className="html-renderer">
            <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />
            {embedUrl && (
                <div className="mt-4">
                    <iframe
                        src={embedUrl}
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        title="Google Maps Embed"
                    />
                </div>
            )}
        </div>
    );
};

export default HtmlRenderer;