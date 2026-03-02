import { useEffect } from 'react';

interface MetaProps {
    title?: string;
    description?: string;
}

const Meta = ({ title, description }: MetaProps) => {
    useEffect(() => {
        if (title) {
            // Fallback to base title if only partial title is provided
            const fullTitle = title.includes('Sparkle') ? title : `${title} | Sparkle Allied Health Science`;
            document.title = fullTitle;

            // Update Open Graph Title
            const ogTitle = document.querySelector('meta[property="og:title"]');
            if (ogTitle) ogTitle.setAttribute('content', fullTitle);

            const twitterTitle = document.querySelector('meta[name="twitter:title"]');
            if (twitterTitle) twitterTitle.setAttribute('content', fullTitle);
        }

        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            }

            const ogDescription = document.querySelector('meta[property="og:description"]');
            if (ogDescription) {
                ogDescription.setAttribute('content', description);
            }

            const twitterDescription = document.querySelector('meta[name="twitter:description"]');
            if (twitterDescription) {
                twitterDescription.setAttribute('content', description);
            }
        }
    }, [title, description]);

    return null;
};

export default Meta;
