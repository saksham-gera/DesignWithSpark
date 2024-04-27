import React from 'react'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

export default function OpenInEditor({ b_64_image_var = '' }) {
    const dangerNotify = () => toast.error('Please Choose Or Ask AI to Generate An Image First So To Edit It In Editor');
    return (
        <div>
            <Toaster />
            <div className="filepicker-container justify-center items-center">
                {b_64_image_var != '' ? <Link to='/editor' state={{ currBase64Data: `data:image/png;base64,${b_64_image_var}` }}>
                    <button className='btn btn-success'>Open In Editor</button>
                </Link> : <button onClick={dangerNotify} className='btn btn-success' >Open In Editor</button>
                }

            </div>
        </div>
    )
}
