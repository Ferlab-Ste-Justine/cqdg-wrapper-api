import { parse } from 'graphql';

// Root fields to be public
const PUBLIC_FIELDS = ['Study', 'Program'];

// Middleware to apply keycloak.protect() but allow PUBLIC_FIELDS queries
const kcProtectGraphQLMiddleware = (keycloak) => {
  return async (req, res, next) => {
    if (req.method !== 'POST' || !req.body) {
      return keycloak.protect()(req, res, next);
    }

    const operations = Array.isArray(req.body) ? req.body : [req.body];

    try {
      const allFieldsArePublic = operations.every((operation) => {
        if (!operation.query) return false;

        const ast = parse(operation.query);

        return ast.definitions.every((def) => {
          if (def.kind !== 'OperationDefinition') return false;
          if (def.operation !== 'query') return false; // block mutations and subscriptions

          return def.selectionSet.selections.every((selection) => {
            return selection.kind === 'Field' && PUBLIC_FIELDS.includes(selection.name.value);
          });
        });
      });

      if (allFieldsArePublic) {
        return next(); // No keycloak protection for public fields
      }
    } catch (err) {
      console.warn('[kcProtectMiddleware] Failed to parse query:', err);
    }

    return keycloak.protect()(req, res, next);
  };
};

export default kcProtectGraphQLMiddleware;
