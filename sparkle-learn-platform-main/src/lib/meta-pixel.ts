import React, { useEffect } from 'react';
import ReactPixel from 'react-facebook-pixel';
import { useLocation } from 'react-router-dom';

// Configuration
const PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID || ''; // Access from env variables preferred context
// const PIXEL_ID = 'YOUR-PIXEL-ID-HERE'; // Fallback for demo

const options = {
    autoConfig: true,
    debug: true, // Enable debug mode for development
};

// Initialize Pixel
export const initPixel = () => {
    if (PIXEL_ID) {
        ReactPixel.init(PIXEL_ID, undefined, options);
    }
};

// Track Page View
export const trackPageView = () => {
    if (PIXEL_ID) {
        ReactPixel.pageView();
    }
};

// Track Standard Events
export const trackEvent = (event: string, data?: any) => {
    if (PIXEL_ID) {
        ReactPixel.track(event, data);
    }
};

// Track Custom Events
export const trackCustomEvent = (event: string, data?: any) => {
    if (PIXEL_ID) {
        ReactPixel.trackCustom(event, data);
    }
};

// Component to handle route changes
export const MetaPixelObserver = () => {
    const location = useLocation();

    useEffect(() => {
        // Only fire if initialized (handled safely by library usually, but good to be sure)
        trackPageView();
    }, [location]);

    return null;
};
