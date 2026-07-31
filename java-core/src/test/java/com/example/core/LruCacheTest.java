package com.example.core;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

public class LruCacheTest {

    @Test
    public void lruEvictionWorks() {
        LruCache<Integer, String> cache = new LruCache<>(3);
        cache.put(1, "one");
        cache.put(2, "two");
        cache.put(3, "three");
        assertEquals(3, cache.size());
        // Access 1 to make it recently used
        assertEquals("one", cache.get(1));
        // Add another -> evict least recently used (which should be 2)
        cache.put(4, "four");
        assertNull(cache.get(2));
        assertEquals("one", cache.get(1));
        assertEquals("three", cache.get(3));
        assertEquals("four", cache.get(4));
    }
}
