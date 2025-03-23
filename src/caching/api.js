const setCacheWithTimeout = (key, value, timeout) => {
  const cache = cachedAPICall.cache;
  cache.set(key, value);
  setTimeout(() => cache.delete(key), timeout);
};

// Example usage with timeout
cachedAPICall.withTimeout = async (url, params, timeout) => {
  const cacheKey = `${url}_${JSON.stringify(params)}`;
  const cache = cachedAPICall.cache || (cachedAPICall.cache = new Map());
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const response = await fetch(url, params);
  const data = await response.json();
  setCacheWithTimeout(cacheKey, data, timeout);
  return data;
};
