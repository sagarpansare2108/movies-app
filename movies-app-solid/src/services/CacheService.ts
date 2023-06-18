class CacheService {
    private static instances: Record<string, any> = {};

    private static open(key: string): Promise<Cache> {
        if (!CacheService.instances[key]) {
            CacheService.instances[key] = caches.open(key);
        }
        return CacheService.instances[key]
    }

    static async get(key: string, request: string): Promise<Response | undefined> {
        const cache = await CacheService.open(key);
        return await cache.match(request);
    }

    static async set(key: string, request: string, response: any): Promise<void> {
        const cache = await CacheService.open(key);
        cache.put(request, new Response(response));
    }

    static async delete(key: string, request: string): Promise<void> {
        const cache = await CacheService.open(key);
        cache.delete(request);
    }
}

export default CacheService;