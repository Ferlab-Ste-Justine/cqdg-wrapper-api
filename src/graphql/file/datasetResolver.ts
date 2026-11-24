/**
 * Resolves File.dataset as a list.
 *
 * A file can belong to several datasets. Documents indexed by the new ETL store `dataset` as an array, while
 * documents indexed before it store a single string (or nothing). Accept every shape so the API can be deployed
 * before the ETL and keep working on both old and new documents.
 */
export const resolveDataset = (parent: { dataset?: string | string[] | null }): string[] => {
  const dataset = parent?.dataset;
  if (dataset === undefined || dataset === null) {
    return [];
  }
  return Array.isArray(dataset) ? dataset : [dataset];
};
