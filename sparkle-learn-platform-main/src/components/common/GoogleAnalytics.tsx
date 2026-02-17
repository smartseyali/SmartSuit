
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const GoogleAnalytics = () => {
    const location = useLocation();

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return;

        // Initialize GA if not already initialized
        if (!window.dataLayer) {
            window.dataLayer = window.dataLayer || [];
            function gtag(...args: any[]) {
                window.dataLayer.push(args);
            }
            gtag('js', new Date());
            gtag('config', GA_MEASUREMENT_ID);

            // Load the script
            const script = document.createElement('script');
            script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    useEffect(() => {
        if (!GA_MEASUREMENT_ID || !window.gtag) return;

        // Send page view on route change
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: location.pathname + location.search,
        });
    }, [location]);

    return null;
};

// Add types for window.dataLayer and window.gtag
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}
