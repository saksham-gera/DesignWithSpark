import React from "react";
import TemplateCard from "./TemplateCard";

export default function Templates() {

  
  const title = "Card Title";
  const description = "This is a description for the template card.";

  return (
      <div className="flex justify-center items-center h-screen">
        <TemplateCard
          base64Image={base64Image}
          title={title}
          description={description}
        />
      </div>
  );
}
