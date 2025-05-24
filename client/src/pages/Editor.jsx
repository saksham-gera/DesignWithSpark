import React, { useEffect, useRef, useState } from 'react';
import ImageEditor from '@toast-ui/react-image-editor';
import 'tui-image-editor/dist/tui-image-editor.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const myTheme = {
    'common.backgroundColor': '#1b1b25',
    'header.backgroundColor': '#1b1b25',
    'submenu.backgroundColor': '#1b1b25',

    'downloadButton.backgroundColor': '#1b1b25',
    'downloadButton.border': '1px solid #fff',
    'downloadButton.color': '#fff',
    'downloadButton.fontFamily': 'sans-serif',
    'downloadButton.fontSize': '12px',

    'loadButton.display': 'none',
}
const Editor = () => {
    const editorRef = useRef();
    const location = useLocation();
    const [base64, setBase64] = useState({ logo: "", full: "" });
    const navigate = useNavigate()

    useEffect(() => {
        const loadImage = async () => {
            if (location.state?.currBase64Data) {
                const editorInstance = editorRef.current?.getInstance();
                if (editorInstance) {
                    await editorInstance.loadImageFromURL(location.state.currBase64Data, 'EditedImage');
                    editorInstance.clearUndoStack();
                    editorInstance.ui.activeMenuEvent();
                }
            } else {
                toast.error('Please Apply Image on Model First');
                navigate("/createnew");
            }
        };
        loadImage();
    }, [location]);

    const getEditedImageData = () => {
        const editorInstance = editorRef.current?.getInstance();
        return editorInstance ? editorInstance.toDataURL() : '';
    };

    const applyOnTshirt = () => {
        const full = getEditedImageData();
        setBase64(prev => ({ ...prev, full }));
    };

    const applyOnLogo = () => {
        const logo = getEditedImageData();
        setBase64(prev => ({ ...prev, logo }));
    };

    return (
        <div className='h-[90vh]'>
            <style>{`
                .tui-image-editor-header-logo,
                .tui-image-editor-load-btn {
                    display: none ;
                },
            `}</style>
            <ImageEditor
                ref={editorRef}
                includeUI={{
                    theme: myTheme,
                    menu: ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
                    initMenu: 'filter',
                    uiSize: {
                        width: '100%',
                        height: '90%'
                    },
                    menuBarPosition: 'bottom'
                }}
                cssMaxHeight={500}
                cssMaxWidth={700}
                selectionStyle={{
                    cornerSize: 20,
                    rotatingPointOffset: 70
                }}
                usageStatistics={false}
            />
            <div className="m-3 flex justify-center items-center model-buttons">
                <button className='mr-2 btn btn-outline-primary' onClick={applyOnTshirt}>Apply On T-Shirt</button>
                <button className='mr-2 btn btn-outline-primary' onClick={applyOnLogo}>Apply On Logo</button>
                {base64.logo || base64.full ? (
                    <Link to="/createnew" state={base64}>
                        <button className='btn btn-outline-success'>Show On Model</button>
                    </Link>
                ) : (
                    <button className='btn btn-outline-secondary' disabled>Show On Model</button>
                )}
            </div>
        </div>
    );
};

export default Editor;