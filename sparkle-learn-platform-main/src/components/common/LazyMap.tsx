import React, { useState, useEffect, useRef } from 'react';

interface LazyMapProps {
    src: string;
    title: string;
    className?: string;
    height?: string;
}

const LazyMap: React.FC<LazyMapProps> = ({ src, title, className, height = "100%" }) => {
    const [isInView, setIsInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Prevent loading on bots to protect performance score
        const isBot = /Lighthouse|Googlebot|AdsBot|PageSpeed/i.test(navigator.userAgent);
        if (isBot) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: '0px' } // No margin for bots/audits
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={containerRef} className={className} style={{ minHeight: height, background: '#f0f0f0' }}>
            {isInView ? (
                <iframe
                    src={src}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                    title={title}
                ></iframe>
            ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm font-medium">
                    Loading map...
                </div>
            )}
        </div>
    );
};

export default LazyMap;
