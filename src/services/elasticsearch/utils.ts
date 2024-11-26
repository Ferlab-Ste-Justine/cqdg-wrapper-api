export const getBody = ({ field, value, path, nested = false }) => {
  let must: any = [{ match: { [field]: value } }];

  if (Array.isArray(value)) {
    must = [
      {
        terms: {
          [field]: value,
        },
      },
    ];
  }

  if (nested) {
    return {
      query: {
        bool: {
          must: [
            {
              nested: {
                path,
                query: { bool: { must } },
              },
            },
          ],
        },
      },
    };
  }

  return {
    query: { bool: { must } },
  };
};

/**
 * Calls the `search` on the given elasticsearch.Client to get a single page of results.
 * @param {Object} esClient - an elasticsearch.Client object.
 * @param {String} index - the name of the index (or alias) on which to search.
 * @param {Object} query - an object containing the query,
 */
export const executeSearch = async (esClient, index, query) => {
  const searchParams = {
    index,
    body: {
      ...query,
      size: typeof query.size === 'number' ? query.size : 0,
    },
  };

  try {
    return esClient.search(searchParams);
  } catch (err) {
    console.error(`Error searching ES with params ${JSON.stringify(searchParams)}`, err);
    throw err;
  }
};
