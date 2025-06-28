import React from 'react';

const HtmlRenderer = ({ encodedHtml }) => {
    const decodeHtml = (html) => {
        // Step 1: Decode Unicode escape sequences
        let decodedUnicode;
        try {
            decodedUnicode = JSON.parse(`"${html}"`);
        } catch (e) {
            decodedUnicode = html;
        }

        // Step 2: Decode HTML entities like &nbsp;
        const textarea = document.createElement('textarea');
        textarea.innerHTML = decodedUnicode;
        return textarea.value;
    };

    const safeHtml = decodeHtml(encodedHtml);

    return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
};

export default HtmlRenderer;
