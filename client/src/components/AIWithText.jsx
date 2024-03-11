import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import TelegramIcon from '@mui/icons-material/Telegram';
import Lottie from 'react-lottie';
import animationData from '../lotties/loading.json'
import { useLocation } from 'react-router-dom';

export default function AIWithText() {
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const location = useLocation();
    const [search, setSearch] = useState('Hello');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        aiRun()
    },[location]);

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    const aiRun = async () => {
        setLoading(true);
        setAiResponse('');
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `${search}`;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setAiResponse(text);
        setLoading(false);
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const handleClick = (event) => {
        aiRun();
        event.preventDefault();
        document.inputAI.reset();
    }

    return (
        <div className='ml-[3rem] my-4 w-[20vw] flex h-[70vh] justify-center items-center flex-col'>
            <div className="rounded-lg border-l-2 border-y-2 border-r-4 border-[#1b1b25] border-solid response h-[100%] w-full text-xl bg-slate-100 rounded-lg p-3 m-3 overflow-auto">
                <div className="loading h-full">
                    {
                        loading == true && (aiResponse == '') ?
                            <p><Lottie 
                            options={defaultOptions}
                            height={200}
                            width={200}
                          /></p> : <p>{aiResponse}</p>
                    }
                </div>
            </div>

            <form name='inputAI' className="input m-2  flex justify-center items-center" >
                <input className='form-control' placeholder='Ask Me Anything' onChange={handleChangeSearch}></input>
                <button className="ml-2 btn btn-primary" onClick={handleClick}><TelegramIcon/></button>
            </form>

        </div>
    )
}
