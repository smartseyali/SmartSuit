import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || '';

export const trackGAPageView = (path: string) => {
    if (GA_ID && window.gtag) {
        window.gtag('config', GA_ID, {
            page_path: path,
        });
    }
};

export const AnalyticsObserver = () => {
    const location = useLocation();

    useEffect(() => {
        // Track GA4 PageView
        trackGAPageView(location.pathname + location.search);
    }, [location]);

    return null;
};

// Global type for gtag
declare global {
    interface Window {
        gtag: (...args: any[]) => void;
    }
}
