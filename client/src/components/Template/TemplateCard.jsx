import React from 'react';

const TemplateCard = ({ base64Image, title, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      <img className="w-full" src={`data:image/png;base64,${base64Image}`} alt="Template" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default TemplateCard;
