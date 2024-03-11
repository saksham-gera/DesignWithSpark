import React, { useEffect, useState } from 'react'
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
// import { Button } from '@syncfusion/ej2-buttons'

export default function Editor() {
    const [base64, setBase64] = useState({ logo: "", full: "" });
    var imgObj;
    const location = useLocation();
    let data;

    useEffect(() => {
        if (location.state) {
            data = location.state;
            console.log(data);
            console.log("reached here in editor");
            imgObj.open(data.currBase64Data);
        }
    }, [location]);

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
        setBase64({ ...base64, full: canvas.toDataURL() });
    }

    const applyOnLogo = () => {
        saveClick();
        setBase64({ ...base64, logo: canvas.toDataURL() });
    }


    return (
        <div className='h-[90vh]'>
            <ImageEditorComponent height='90%' ref={(img) => { imgObj = img; }} />
            <div className="m-3 flex justify-center items-center model-buttons">
                <button className='mr-2 btn btn-outline-primary' onClick={applyOnTshirt}>Apply On T-Shirt</button>
                <button className='mr-2 btn btn-outline-primary' onClick={applyOnLogo}>Apply On Logo</button>
                {base64.logo || base64.full ? <Link to={'/createnew'} state={base64}><button className='btn btn-outline-success'>Show On Model</button></Link> : <button className='btn btn-outline-secondary' disabled={!base64.logo || !base64.full}>Show On Model</button>}
            </div>

        </div>
    )
}
