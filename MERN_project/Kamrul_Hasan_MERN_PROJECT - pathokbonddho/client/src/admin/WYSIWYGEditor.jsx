// WYSIWYGEditor.jsx
import React, { useRef, useEffect, useState } from 'react';

const WYSIWYGEditor = ({
    value,
    onChange,
    placeholder = "Start typing...",
    height = 300,
    onImageClick
}) => {
    const editorRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);

    // Initialize editor content
    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = value || '';
        }
    }, []);

    // Update editor when value changes from parent
    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) {
            editorRef.current.innerHTML = value || '';
        }
    }, [value]);

    const handleInput = () => {
        const newContent = editorRef.current.innerHTML;
        onChange(newContent);
    };

    // Improved execCommand with better focus handling
    const execCommand = (command, value = null) => {
        // Store current selection before focusing
        const selection = window.getSelection();
        const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

        // Focus the editor
        editorRef.current.focus();

        // Restore selection if it exists
        if (range) {
            selection.removeAllRanges();
            selection.addRange(range);
        }

        // Execute command
        document.execCommand(command, false, value);
        handleInput();
    };

    const insertHTML = (html) => {
        editorRef.current.focus();
        document.execCommand('insertHTML', false, html);
        handleInput();
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
        handleInput();
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    // Toolbar button handlers with event prevention
    const handleBold = (e) => {
        e.preventDefault();
        execCommand('bold');
    };

    const handleItalic = (e) => {
        e.preventDefault();
        execCommand('italic');
    };

    const handleUnderline = (e) => {
        e.preventDefault();
        execCommand('underline');
    };

    const handleStrikethrough = (e) => {
        e.preventDefault();
        execCommand('strikeThrough');
    };

    const handleJustifyLeft = (e) => {
        e.preventDefault();
        execCommand('justifyLeft');
    };

    const handleJustifyCenter = (e) => {
        e.preventDefault();
        execCommand('justifyCenter');
    };

    const handleJustifyRight = (e) => {
        e.preventDefault();
        execCommand('justifyRight');
    };

    const handleBulletList = (e) => {
        e.preventDefault();
        execCommand('insertUnorderedList');
    };

    const handleNumberedList = (e) => {
        e.preventDefault();
        execCommand('insertOrderedList');
    };

    const handleRemoveFormat = (e) => {
        e.preventDefault();
        execCommand('removeFormat');
    };

    const handleUndo = (e) => {
        e.preventDefault();
        execCommand('undo');
    };

    const handleRedo = (e) => {
        e.preventDefault();
        execCommand('redo');
    };

    // FIXED: Blockquote handler
    const handleBlockquote = (e) => {
        e.preventDefault();
        editorRef.current.focus();

        // Check if we're already in a blockquote
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            let node = range.commonAncestorContainer;

            // Traverse up to find if we're inside a blockquote
            while (node && node.nodeType !== 1) {
                node = node.parentNode;
            }

            if (node && node.nodeName === 'BLOCKQUOTE') {
                // If already in blockquote, remove it
                const content = node.innerHTML;
                const p = document.createElement('p');
                p.innerHTML = content;
                node.parentNode.replaceChild(p, node);
            } else {
                // If not in blockquote, create one
                document.execCommand('formatBlock', false, 'blockquote');
            }
            handleInput();
        }
    };

    // FIXED: Heading handler
    const handleHeadingChange = (e) => {
        const value = e.target.value;
        editorRef.current.focus();

        if (value === 'p') {
            document.execCommand('formatBlock', false, '<p>');
        } else {
            document.execCommand('formatBlock', false, `<${value}>`);
        }
        handleInput();
    };

    // FIXED: Font Size handler
    const handleFontSizeChange = (e) => {
        const size = e.target.value;
        editorRef.current.focus();

        // Use font size command
        document.execCommand('fontSize', false, size);
        handleInput();
    };

    const handleColorChange = (e) => {
        execCommand('foreColor', e.target.value);
    };

    const handleLinkInsert = (e) => {
        e.preventDefault();
        const url = prompt('Enter URL:');
        if (url) {
            const selection = window.getSelection();
            if (selection.toString().trim() === '') {
                insertHTML(`<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
            } else {
                execCommand('createLink', url);
            }
        }
    };

    const handleImageInsert = (e) => {
        e.preventDefault();
        if (onImageClick) {
            onImageClick();
        } else {
            const imageUrl = prompt('Enter image URL:');
            if (imageUrl) {
                const altText = prompt('Enter alt text:') || 'Image';
                insertHTML(`<img src="${imageUrl}" alt="${altText}" style="max-width: 100%; height: auto; border-radius: 0.375rem; margin: 1em 0; display: block;" />`);
            }
        }
    };

    const handleCodeBlockInsert = (e) => {
        e.preventDefault();
        insertHTML('<pre style="background: #f4f4f4; padding: 10px; border-radius: 4px; overflow: auto;"><code>Code here</code></pre>');
    };

    // Add some CSS styles for better visual feedback
    const editorStyles = {
        height: '100%',
        minHeight: '100px',
        padding: '1rem',
        outline: 'none',
        overflow: 'auto',
        lineHeight: '1.6',
        border: isFocused ? '2px solid #3b82f6' : 'none',
        backgroundColor: 'white'
    };

    const Toolbar = () => (
        <div
            className="d-flex flex-wrap gap-1 p-2 bg-light border-bottom"
        >
            {/* Text Formatting */}
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleBold}
                    title="Bold"
                >
                    <strong>B</strong>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleItalic}
                    title="Italic"
                >
                    <em>I</em>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleUnderline}
                    title="Underline"
                >
                    <u>U</u>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleStrikethrough}
                    title="Strikethrough"
                >
                    <s>S</s>
                </button>
            </div>

            {/* Headings - FIXED: Removed event prevention for dropdowns */}
            <div className="btn-group">
                <select
                    className="form-select form-select-sm"
                    style={{ width: 'auto' }}
                    onChange={handleHeadingChange}
                    title="Heading"
                    defaultValue="p"
                >
                    <option value="p">Paragraph</option>
                    <option value="h1">Heading 1</option>
                    <option value="h2">Heading 2</option>
                    <option value="h3">Heading 3</option>
                    <option value="h4">Heading 4</option>
                </select>
            </div>

            {/* Font Size - FIXED: Removed event prevention for dropdowns */}
            <div className="btn-group">
                <select
                    className="form-select form-select-sm"
                    style={{ width: 'auto' }}
                    onChange={handleFontSizeChange}
                    title="Font Size"
                    defaultValue="3"
                >
                    <option value="1">Small</option>
                    <option value="2">Medium</option>
                    <option value="3">Normal</option>
                    <option value="4">Large</option>
                    <option value="5">X-Large</option>
                    <option value="6">XX-Large</option>
                    <option value="7">XXX-Large</option>
                </select>
            </div>

            {/* Text Color - FIXED: Only prevent default on color input */}
            <div className="btn-group">
                <input
                    type="color"
                    className="form-control form-control-sm"
                    style={{ width: '40px', padding: '2px' }}
                    onChange={handleColorChange}
                    onMouseDown={(e) => {
                        // Only prevent default for the color picker popup
                        if (e.target.type === 'color') {
                            e.preventDefault();
                        }
                    }}
                    title="Text Color"
                />
            </div>

            {/* Lists */}
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleBulletList}
                    title="Bullet List"
                >
                    <i className="fa-solid fa-list-ul"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleNumberedList}
                    title="Numbered List"
                >
                    <i className="fa-solid fa-list-ol"></i>
                </button>
            </div>

            {/* Alignment */}
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleJustifyLeft}
                    title="Align Left"
                >
                    <i className="fa-solid fa-align-left"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleJustifyCenter}
                    title="Align Center"
                >
                    <i className="fa-solid fa-align-center"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleJustifyRight}
                    title="Align Right"
                >
                    <i className="fa-solid fa-align-right"></i>
                </button>
            </div>

            {/* Links & Images */}
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleLinkInsert}
                    title="Insert Link"
                >
                    <i className="fa-solid fa-link"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleImageInsert}
                    title="Insert Image"
                >
                    <i className="fa-regular fa-image"></i>
                </button>
            </div>

            {/* Block Elements */}
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleBlockquote}
                    title="Blockquote"
                >
                    <i className="fa-solid fa-quote-left"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleCodeBlockInsert}
                    title="Code Block"
                >
                    <i className="fa-solid fa-code"></i>
                </button>
            </div>

            {/* Undo/Redo */}
            <div className="btn-group">
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleUndo}
                    title="Undo"
                >
                    <i className="fa-solid fa-rotate-left"></i>
                </button>
                <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={handleRedo}
                    title="Redo"
                >
                    <i className="fa-solid fa-rotate-right"></i>
                </button>
            </div>

            {/* Clear Formatting */}
            <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleRemoveFormat}
                title="Clear Formatting"
            >
                <i className="fa-solid fa-eraser"></i>
            </button>
        </div>
    );

    return (
        <div className="border rounded" style={{ height: `${height}px`, display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            <div style={{ flex: 1, overflow: 'auto' }}>
                <div
                    ref={editorRef}
                    contentEditable
                    onInput={handleInput}
                    onPaste={handlePaste}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    style={editorStyles}
                    className="editor-content"
                    data-placeholder={placeholder}
                />
            </div>
        </div>
    );
};

export default WYSIWYGEditor;