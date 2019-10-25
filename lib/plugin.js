const { performance } = require('perf_hooks');

export default function({ $axios, req }) {
  req.perf = [];

  $axios.onRequest(config => {
    config.perfStart = performance.now();

    return config;
  });

  $axios.onResponse(response => {
    const start = response.config.perfStart;

    if (!start) return response;

    const diff = performance.now() - start;

    req.perf.push({ url: response.config.url, 'time (ms)': diff });

    return response;
  });
}
