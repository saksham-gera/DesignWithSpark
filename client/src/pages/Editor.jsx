import React, { useState } from 'react'
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@syncfusion/ej2-buttons'

export default function Editor() {
    const [base64,setBase64] = useState({logo: "", full: ""});
    var imgObj;

    let canvas;
    const saveClick = () => {
        let imageData = imgObj.getImageData();
        canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        const context = canvas.getContext('2d');
        context.putImageData(imageData, 0, 0);
    };

    const applyOnTshirt = () => {
        saveClick();
        setBase64({...base64 ,full: canvas.toDataURL()});
    }

    const applyOnLogo = () => {
        saveClick();
        setBase64({...base64 ,logo: canvas.toDataURL()});
    }


    return (
        <div className='h-[100vh]'>
            <ImageEditorComponent ref={(img) => { imgObj = img; }}/>
            <button className='btn btn-primary' onClick={applyOnTshirt}>Apply On T-Shirt</button>
            <button className='btn btn-primary' onClick={applyOnLogo}>Apply On Logo</button>
            <Link to={'/createnew'} state= {base64}><button className='btn btn-primary'>Show On Model</button></Link>
        </div>
    )
}
