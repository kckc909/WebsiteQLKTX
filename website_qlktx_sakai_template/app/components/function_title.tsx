'use client';
import React from "react";

interface FunctionTitleProps {
    title: string;
    subTitle?: string; 
}

const FunctionTitle: React.FC<FunctionTitleProps> = ({ title, subTitle }) => {
    return (
        <div className="mb-3">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {subTitle && <p className="text-xl text-gray-600 mt  -m-1-2">{subTitle}</p>}
        </div>
    );
};

export default FunctionTitle;