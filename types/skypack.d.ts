// First, let TypeScript allow all module names starting with "https://". This will suppress TS errors.
declare module 'https://*';

// Second, list out all your dependencies. For every URL, you must map it to its local module.
declare module 'fastify' {
  export * from 'https://cdn.skypack.dev/fastify@^3.18.1';
}

// declare module 'https://cdn.skypack.dev/preact-router' {
//   export * from 'preact-router';
// }