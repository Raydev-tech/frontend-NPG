import React from "react";

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[70vh] bg-black">
            
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-gray-700 border-t-green-400"></div>

            <p className="mt-5 text-white text-sm tracking-[4px] font-semibold">
                NPG
            </p>

            <p className="mt-2 text-gray-500 text-xs">
                Loading...
            </p>

        </div>
    );
};

export default Loading;