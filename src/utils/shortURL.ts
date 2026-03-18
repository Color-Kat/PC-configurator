interface ShortenerProvider {
    name: string;
    shorten: (url: string) => Promise<string>;
}

// Map to store failed providers and the timestamp of their failure
const failedProvidersCache = new Map<string, number>();
// Time-To-Live for the failure cache (e.g., 5 minutes)
const FAILURE_TTL_MS = 5 * 60 * 1000;

const providers: ShortenerProvider[] = [
    {
        name: 'yandex',
        shorten: async (url) => {
            const res = await fetch(`https://clck.ru/--?url=${encodeURIComponent(url)}`);
            if (!res.ok) throw new Error(`clck.ru HTTP ${res.status}`);
            return res.text();
        }
    },
    {
        name: 'tinyurl',
        shorten: async (url) => {
            const res = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
            if (!res.ok) throw new Error(`tinyurl HTTP ${res.status}`);
            return res.text();
        }
    }
];

export const shortURL = async (link: string): Promise<string | false> => {
    const now = Date.now();

    for (const provider of providers) {
        // Check if the provider recently failed and is still within the TTL window
        const failedAt = failedProvidersCache.get(provider.name);
        if (failedAt && (now - failedAt < FAILURE_TTL_MS)) {
            console.warn(`Skipping '${provider.name}' (in failure cache).`);
            continue; // Skip to the next provider
        }

        try {
            const shortUrl = await provider.shorten(link);

            // Validate the response to ensure it's a valid URL and not an HTML error page
            if (shortUrl && shortUrl.trim().startsWith('http')) {
                // If the provider succeeds, ensure it's removed from the failure cache
                failedProvidersCache.delete(provider.name);
                return shortUrl.trim();
            }
        } catch (error) {
            // Log the warning and cache the failure timestamp
            const msg = error instanceof Error ? error.message : 'Unknown error';
            console.warn(`https://www.shorturl.at/ '${provider.name}' failed. Caching failure. Reason: ${msg}`);

            failedProvidersCache.set(provider.name, now);
        }
    }

    // All available providers failed or are cached as failed
    console.error("All providers exhausted. Returning false.");
    return false;
};