import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

interface SEOProps {
    title?: string;
    description?: string;
    schema?: any;
}

export default function SEO({ title, description, schema }: SEOProps) {
    const location = useLocation();
    const canonicalUrl = `https://sparkleahs.com${location.pathname}`;

    return (
        <Helmet>
            {title && <title>{title}</title>}
            {description && <meta name="description" content={description} />}
            <link rel="canonical" href={canonicalUrl} />
            {schema && (
                <script type="application/ld+json">
                    {JSON.stringify(schema)}
                </script>
            )}
        </Helmet>
    );
}
