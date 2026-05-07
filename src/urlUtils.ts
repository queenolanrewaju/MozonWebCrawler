export const normalizeUrl = (href: string, baseUrl: string): string | null => {
    try {
        if (!href) return null;

        // Ignores all non-navigational links
        if (
            href.startsWith('#') ||
            href.startsWith('mailto:') ||
            href.startsWith('javascript:') ||
            href.startsWith('tel:')
        ) {
            return null;
        }

        // make absolute links
        const url = new URL(href, baseUrl);

        // Strip fragment (#section)
        url.hash = '';

        return url.toString();
    } catch {
        return null;
    }
};

export const isSameDomain = (url: string, baseHostname: string): boolean => {
    try {
        const parsed = new URL(url);
        return parsed.hostname === baseHostname;
    } catch {
        return false;
    }
};