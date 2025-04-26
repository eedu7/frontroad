import React from "react";

export const SignInView = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="h-screen w-full overflow-y-auto bg-[#F4F4F0] lg:col-span-3">Form Column</div>
            <div className="hidden h-screen w-full overflow-y-auto lg:col-span-2 lg:block">Background Column</div>
        </div>
    );
};
