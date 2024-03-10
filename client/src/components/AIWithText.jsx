import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

import Lottie from 'react-lottie';
import animationData from '../lotties/loading.json'

export default function AIWithText() {
    const genAI = new GoogleGenerativeAI('AIzaSyDonERurPdQkvLzO8FIBc-wFI1PJ2Fnb7k');

    const [search, setSearch] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [loading, setLoading] = useState(false);

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
        <div className='flex h-[70vh] w-[80vw] justify-center items-center flex-col'>
            <div className="response h-[100%] w-full text-xl bg-slate-100 rounded-lg p-3 m-3 overflow-auto">
                <div className="loading h-full">
                    {
                        loading == true && (aiResponse == '') ?
                            <p><Lottie 
                            options={defaultOptions}
                            height={400}
                            width={400}
                          /></p> : <p>{aiResponse}</p>
                    }
                </div>
            </div>

            <form name='inputAI' className="input m-2 w-3/5 flex justify-center items-center" >
                <input className='form-control' placeholder='Ask Anything Here' onChange={handleChangeSearch}></input>
                <button className="ml-2 btn btn-primary" onClick={handleClick}>Generate</button>
            </form>

        </div>
    )
}
