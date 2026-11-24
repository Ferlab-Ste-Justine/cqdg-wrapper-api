import { graphql, GraphQLList, GraphQLObjectType, GraphQLSchema } from 'graphql';

import { resolveDataset } from '../datasetResolver';
import { FileType } from './file';

// Minimal schema exposing FileType: the root resolver returns the raw ES `_source` documents, the same way the
// files resolver does, so the query goes through the real File.dataset field definition.
const buildSchema = (sources: Record<string, unknown>[]) =>
  new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        files: { type: new GraphQLList(FileType), resolve: () => sources },
      },
    }),
  });

describe('File.dataset', () => {
  it('returns every dataset of documents indexed with an array, a string, null or no dataset', async () => {
    const schema = buildSchema([
      { file_id: 'FI1', dataset: ['Neurological Disease Group', 'Individuals'] },
      { file_id: 'FI2', dataset: 'Families' },
      { file_id: 'FI3', dataset: null },
      { file_id: 'FI4' },
      { file_id: 'FI5', dataset: [] },
    ]);

    const result = await graphql({ schema, source: '{ files { file_id dataset } }' });

    expect(result.errors).toBeUndefined();
    expect(result.data).toEqual({
      files: [
        { file_id: 'FI1', dataset: ['Neurological Disease Group', 'Individuals'] },
        { file_id: 'FI2', dataset: ['Families'] },
        { file_id: 'FI3', dataset: [] },
        { file_id: 'FI4', dataset: [] },
        { file_id: 'FI5', dataset: [] },
      ],
    });
  });
});

describe('resolveDataset', () => {
  it('wraps a single string in a one-element array', () => {
    expect(resolveDataset({ dataset: 'Families' })).toEqual(['Families']);
  });

  it('returns an array as is', () => {
    expect(resolveDataset({ dataset: ['A', 'B'] })).toEqual(['A', 'B']);
  });

  it('returns an empty array when dataset is null or missing', () => {
    expect(resolveDataset({ dataset: null })).toEqual([]);
    expect(resolveDataset({})).toEqual([]);
  });
});
