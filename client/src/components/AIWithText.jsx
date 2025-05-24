import React, { useEffect, useState } from 'react';
import TelegramIcon from '@mui/icons-material/Telegram';
import Lottie from 'react-lottie';
import animationData from '../lotties/loading.json';
import { useLocation } from 'react-router-dom';

export default function AIWithText() {
    const location = useLocation();
    const [search, setSearch] = useState('Hello');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        aiRun();
    }, [location]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const sanitizeResponse = (text) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br/>');
    };

    const aiRun = async () => {
        setLoading(true);
        setAiResponse('');
        const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

        try {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                { text: search }
                            ]
                        }
                    ]
                })
            });

            const data = await response.json();
            const output = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
            setAiResponse(sanitizeResponse(output));
        } catch (error) {
            setAiResponse("Error fetching response: " + error.message);
        }

        setLoading(false);
    };

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleClick = (event) => {
        event.preventDefault();
        aiRun();
        document.inputAI.reset();
    };

    return (
        <div className='mx-auto h-2/3 my-4 w-[80%] md:h-[75vh] lg:w-[25vw] flex justify-center items-center flex-col'>
            <div className="rounded-lg border-l-2 border-y-2 border-r-4 border-[#1b1b25] border-solid response h-[100%] w-full text-xl bg-slate-100 p-3 m-3 overflow-auto">
                <div className="loading h-full">
                    {
                        loading && aiResponse === '' ?
                            <Lottie
                                options={defaultOptions}
                                height={200}
                                width={200}
                            /> : <p dangerouslySetInnerHTML={{ __html: aiResponse }} />
                    }
                </div>
            </div>

            <form name='inputAI' className="input m-2 flex flex-col gap-2 justify-center items-center w-full">
                <textarea
                    className='form-control w-full h-24 p-2 border border-gray-300 rounded-md resize-none'
                    placeholder='Ask Me Anything'
                    onChange={handleChangeSearch}
                />
                <button className="btn btn-primary flex items-center" onClick={handleClick}><TelegramIcon className="mr-1" />Send</button>
            </form>
        </div>
    );
}