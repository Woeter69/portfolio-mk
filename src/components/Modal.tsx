import { useEffect } from 'react';
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose} />

            {/* Modal Content - Below Header & Margin */}
            <div
                className="relative z-10 w-full h-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900/95 shadow-2xl backdrop-blur-xl animate-in slide-in-from-bottom-10 fade-in duration-500 ease-out"
                style={{
                    marginTop: '100px',
                    marginBottom: '20px',
                    marginLeft: '20px',
                    marginRight: '20px',
                    maxHeight: 'calc(100vh - 120px)', /* Account for top margin + bottom margin */
                    maxWidth: 'calc(100vw - 40px)'
                }}
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
                        <h2 className="font-display text-2xl font-bold text-white tracking-wide">{title}</h2>
                        <button
                            onClick={onClose}
                            className="rounded-full bg-white/5 p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* Scrollable Body */}
                    <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
                        <div className="prose prose-invert max-w-none prose-headings:font-display prose-a:text-teal-400 prose-li:text-slate-300">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
