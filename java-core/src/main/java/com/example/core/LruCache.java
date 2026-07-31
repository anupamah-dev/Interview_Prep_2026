package com.example.core;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Simple LRU cache backed by LinkedHashMap.
 * Capacity is max entries; least-recently-used entry is evicted when exceeded.
 */
public class LruCache<K, V> {
    private final int capacity;
    private final Map<K, V> map;

    public LruCache(int capacity) {
        if (capacity <= 0) throw new IllegalArgumentException("capacity > 0 required");
        this.capacity = capacity;
        this.map = new LinkedHashMap<>(capacity, 0.75f, true) {
            @Override protected boolean removeEldestEntry(Map.Entry<K,V> eldest) {
                return size() > LruCache.this.capacity;
            }
        };
    }

    public synchronized void put(K key, V value) {
        map.put(key, value);
    }

    public synchronized V get(K key) {
        return map.get(key);
    }

    public synchronized int size() {
        return map.size();
    }
}
