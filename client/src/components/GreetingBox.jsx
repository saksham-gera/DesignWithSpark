import React from 'react'

export default function GreetingBox({name}) {
  return (
    <div>
        <div className="name">
            <span className="text-slate-500 font-bold hello">Hello, </span> <b className='text-black font-bold'>{name}</b> 👋
        </div>
        <div className="text-slate-400 text-sm greeting">
            Good morning, another wonderful day to design
        </div>
    </div>
  )
}
