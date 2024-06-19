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
