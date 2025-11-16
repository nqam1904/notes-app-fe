import React from 'react';
import Image from 'next/image';

export const SplashScreen = () => {
    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-[#f9f5e7] z-[9998]">
            <div className="flex flex-col items-center justify-center gap-4">
                <Image
                    src="/images/loading.gif"
                    alt="Loading..."
                    width={100}
                    height={100}
                    priority
                    unoptimized
                />
                <p className="text-sm text-amber-700 animate-pulse">Loading...</p>
            </div>
        </div>
    );
};

