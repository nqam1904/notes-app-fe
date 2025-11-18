'use client';

import React from 'react';
import { useTranslate } from '@/locales/use-locales';

export const SplashScreen = () => {
    const { t } = useTranslate();

    return (
        <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-white via-blue-50 to-indigo-50 z-[9998]">
            <div className="flex flex-col items-center justify-center gap-8 animate-[fadeIn_0.5s_ease-out]">
                {/* App Logo/Name */}
                <div className="flex flex-col items-center gap-3">
                    <div className="relative">
                        {/* Icon background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>

                        {/* Icon */}
                        <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {t('app.name')}
                    </h1>
                </div>

                {/* Modern spinner */}
                <div className="relative w-12 h-12">
                    {/* Outer ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
                    {/* Animated ring */}
                    <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-indigo-500 animate-spin"></div>
                    {/* Inner dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse"></div>
                    </div>
                </div>

                {/* Loading text */}
                <p className="text-sm text-gray-500 animate-pulse">
                    {t('message.loading')}
                </p>
            </div>
        </div>
    );
};

