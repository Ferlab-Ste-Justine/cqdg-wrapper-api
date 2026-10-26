// Node >= 19 removed --experimental-specifier-resolution=node, so ESM imports
// without extension (or pointing to a directory) no longer resolve. Both our
// compiled code and @ferlab/next rely on it: retry with ".js" then "/index.js".
import { registerHooks } from 'node:module';

const RETRY_CODES = ['ERR_MODULE_NOT_FOUND', 'ERR_UNSUPPORTED_DIR_IMPORT'];
const SUFFIXES = ['.js', '/index.js'];

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (!RETRY_CODES.includes(err?.code)) throw err;
      for (const suffix of SUFFIXES) {
        try {
          return nextResolve(specifier + suffix, context);
        } catch {
          // try next suffix
        }
      }
      throw err;
    }
  },
});
