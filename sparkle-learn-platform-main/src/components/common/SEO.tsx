
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
    canonicalUrl?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | 'product';
    noindex?: boolean;
}

const SEO = ({
    title,
    description,
    keywords,
    author = "Sparkle Educational Institute",
    canonicalUrl,
    ogImage = '/logo.jpg',
    ogType = 'website',
    noindex = false,
}: SEOProps) => {
    const location = useLocation();
    const siteUrl = "https://www.sparkleahs.com";
    const currentUrl = canonicalUrl || `${siteUrl}${location.pathname}`;
    const defaultTitle = "Sparkle Educational Institute - Transform Your Career";
    const defaultDescription = "India's most trusted career acceleration platform. Learn from industry experts and get placed at top companies.";
    const defaultKeywords = "online learning, career programs, professional certification, data science, digital marketing, web development";

    const metaTitle = title ? `${title} | Sparkle` : defaultTitle;
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords || defaultKeywords;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{metaTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta name="author" content={author} />
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Canonical URL */}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph Tags */}
            <meta property="og:title" content={metaTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

            {/* Twitter Card Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`} />

            {/* JSON-LD Structured Data for Organization */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "EducationalOrganization",
                    "name": "Sparkle Educational Institute",
                    "url": "https://www.sparkleahs.com",
                    "logo": "https://www.sparkleahs.com/logo.jpg",
                    "sameAs": [
                        "https://www.facebook.com/sparkleedu",
                        "https://www.linkedin.com/company/sparkleedu",
                        "https://www.instagram.com/sparkleedu"
                    ],
                    "contactPoint": {
                        "@type": "ContactPoint",
                        "telephone": "+91-1234567890", // Replace with actual number
                        "contactType": "customer service"
                    }
                })}
            </script>
        </Helmet>
    );
};

export default SEO;
