import React from 'react'
import { Link } from 'react-router-dom'

export default function OpenInEditor({ b_64_image_var = '' }) {
    return (
        <div>
            <div className="flex filepicker-container justify-center items-center">
                {b_64_image_var != '' ? <Link to='/editor' state={{ currBase64Data: `data:image/png;base64,${b_64_image_var}` }}>
                    <button className='btn btn-success'>Open In Editor</button>
                </Link> : <div className="error">
                    Please Choose Or Ask AI to Generate An Image First So To Edit It In Editor
                </div>
                }

            </div>
        </div>
    )
}
