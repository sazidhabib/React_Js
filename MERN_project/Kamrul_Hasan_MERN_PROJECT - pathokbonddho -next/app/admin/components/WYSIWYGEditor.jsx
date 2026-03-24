'use client';

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';

const WYSIWYGEditor = forwardRef(({ value, onChange, placeholder = "Start typing...", height = 300, onImageClick, onEditImage }, ref) => {
    const editorRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [savedRange, setSavedRange] = useState(null);
    const [selectedElement, setSelectedElement] = useState(null);
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (editorRef.current) editorRef.current.innerHTML = value || '';
    }, []);

    useEffect(() => {
        if (editorRef.current && value !== editorRef.current.innerHTML) editorRef.current.innerHTML = value || '';
    }, [value]);

    const saveSelection = () => { const s = window.getSelection(); if (s.rangeCount > 0) setSavedRange(s.getRangeAt(0)); };
    const restoreSelection = () => { if (savedRange && editorRef.current) { editorRef.current.focus(); const s = window.getSelection(); s.removeAllRanges(); s.addRange(savedRange); } };
    const handleInput = () => { const c = editorRef.current.innerHTML; onChange(c); };

    useImperativeHandle(ref, () => ({
        insertHTML: (html) => { restoreSelection(); document.execCommand('insertHTML', false, html); handleInput(); },
        saveSelection: () => saveSelection(),
        focus: () => { if (editorRef.current) editorRef.current.focus(); }
    }));

    const execCommand = (command, val = null) => {
        const s = window.getSelection(); const r = s.rangeCount > 0 ? s.getRangeAt(0) : null;
        editorRef.current.focus(); if (r) { s.removeAllRanges(); s.addRange(r); }
        document.execCommand(command, false, val); handleInput();
    };

    const insertHTML = (html) => { editorRef.current.focus(); document.execCommand('insertHTML', false, html); handleInput(); };
    const handlePaste = (e) => { e.preventDefault(); document.execCommand('insertText', false, e.clipboardData.getData('text/plain')); handleInput(); };

    const handleEditorClick = (e) => {
        const img = e.target.closest('img'); const figure = e.target.closest('figure'); const el = figure || img;
        if (el && editorRef.current.contains(el)) {
            setSelectedElement(el);
            const rect = el.getBoundingClientRect(); const er = editorRef.current.parentElement.getBoundingClientRect();
            setToolbarPosition({ top: rect.top - er.top - 40, left: rect.left - er.left + (rect.width / 2) });
        } else setSelectedElement(null);
    };

    const handleDeleteElement = (e) => { e.preventDefault(); e.stopPropagation(); if (selectedElement) { selectedElement.remove(); setSelectedElement(null); handleInput(); } };

    const handleEditElement = (e) => {
        e.preventDefault(); e.stopPropagation();
        if (selectedElement && onEditImage) {
            let img = selectedElement, caption = '', format = 'full-width';
            if (selectedElement.tagName === 'FIGURE') { img = selectedElement.querySelector('img'); const fc = selectedElement.querySelector('figcaption'); caption = fc ? fc.innerText : ''; format = 'full-width-captioned'; }
            else { const style = selectedElement.getAttribute('style') || ''; if (style.includes('float: left')) format = 'left-aligned'; else if (style.includes('float: right')) format = 'right-aligned'; }
            onEditImage({ imageUrl: img.getAttribute('src'), alt: img.getAttribute('alt') || '', caption, format, element: selectedElement });
            setSelectedElement(null);
        }
    };

    return (
        <div className="border rounded" style={{ height: `${height}px`, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <div className="d-flex flex-wrap gap-1 p-2 bg-light border-bottom">
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('bold'); }} title="Bold"><strong>B</strong></button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('italic'); }} title="Italic"><em>I</em></button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('underline'); }} title="Underline"><u>U</u></button>
                </div>
                <div className="btn-group">
                    <select className="form-select form-select-sm" style={{ width: 'auto' }} onChange={(e) => { editorRef.current.focus(); document.execCommand('formatBlock', false, e.target.value === 'p' ? '<p>' : `<${e.target.value}>`); handleInput(); }} defaultValue="p">
                        <option value="p">Paragraph</option><option value="h1">Heading 1</option><option value="h2">Heading 2</option><option value="h3">Heading 3</option><option value="h4">Heading 4</option>
                    </select>
                </div>
                <div className="btn-group">
                    <select className="form-select form-select-sm" style={{ width: 'auto' }} onChange={(e) => { editorRef.current.focus(); document.execCommand('fontSize', false, e.target.value); handleInput(); }} defaultValue="3">
                        <option value="1">Small</option><option value="2">Medium</option><option value="3">Normal</option><option value="4">Large</option><option value="5">X-Large</option><option value="6">XX-Large</option>
                    </select>
                </div>
                <div className="btn-group">
                    <input type="color" className="form-control form-control-sm" style={{ width: '40px', padding: '2px' }} onChange={(e) => execCommand('foreColor', e.target.value)} title="Color" />
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('insertUnorderedList'); }}>•</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('insertOrderedList'); }}>1.</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('justifyLeft'); }}>⫷</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('justifyCenter'); }}>≡</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('justifyRight'); }}>⫸</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); const url = prompt('Enter URL:'); if (url) { const s = window.getSelection(); if (s.toString().trim() === '') insertHTML(`<a href="${url}" target="_blank">${url}</a>`); else execCommand('createLink', url); } }} title="Link">🔗</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); saveSelection(); if (onImageClick) onImageClick(); else { const url = prompt('Image URL:'); if (url) insertHTML(`<img src="${url}" alt="Image" style="max-width:100%;height:auto;margin:1em 0;display:block;" />`); } }} title="Image">🖼️</button>
                </div>
                <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('undo'); }}>↩</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('redo'); }}>↪</button>
                    <button type="button" className="btn btn-sm btn-outline-secondary" onMouseDown={e => e.preventDefault()} onClick={e => { e.preventDefault(); execCommand('removeFormat'); }}>🧹</button>
                </div>
            </div>
            <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
                <div ref={editorRef} contentEditable onInput={handleInput} onPaste={handlePaste} onFocus={() => setIsFocused(true)} onBlur={() => { setIsFocused(false); saveSelection(); }} onClick={handleEditorClick}
                    style={{ height: '100%', minHeight: '100px', padding: '1rem', outline: 'none', overflow: 'auto', lineHeight: '1.6', border: isFocused ? '2px solid #3b82f6' : 'none', backgroundColor: 'white' }} className="editor-content" data-placeholder={placeholder} />
                {selectedElement && (
                    <div className="position-absolute bg-dark text-white rounded shadow d-flex gap-2 p-1" style={{ top: `${toolbarPosition.top}px`, left: `${toolbarPosition.left}px`, transform: 'translateX(-50%)', zIndex: 1000 }} onMouseDown={e => e.preventDefault()}>
                        <button type="button" className="btn btn-sm btn-dark p-1" onClick={handleEditElement} title="Edit">✏️</button>
                        <button type="button" className="btn btn-sm btn-dark p-1 text-danger" onClick={handleDeleteElement} title="Delete">🗑️</button>
                    </div>
                )}
            </div>
            <style>{`.editor-content img,.editor-content figure{transition:outline .2s;cursor:pointer}.editor-content img:hover,.editor-content figure:hover{outline:2px solid #3b82f6}.editor-content img[data-selected="true"],.editor-content figure[data-selected="true"]{outline:2px solid #2563eb!important}`}</style>
        </div>
    );
});

WYSIWYGEditor.displayName = 'WYSIWYGEditor';
export default WYSIWYGEditor;
