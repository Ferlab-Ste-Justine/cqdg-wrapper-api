import { aggsResolver, columnStateResolver, edgesResolver, hitsResolver } from '@ferlab/next/lib/common/resolvers';
import {
  aggregationsArgsType,
  AggsStateType,
  ColumnsStateType,
  hitsArgsType,
  MatchBoxStateType,
} from '@ferlab/next/lib/common/types';
import GraphQLJSON from '@ferlab/next/lib/common/types/jsonType';
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { esBiospecimenIndex } from '#src/config/env';
import { FilesType } from '#src/graphql/file/types/file';
import { ParticipantType } from '#src/graphql/participant/types/participant';
import { StudyType } from '#src/graphql/study/types/study';

import extendedMapping from '../extendedMapping';
import BiospecimenAgg from './biospecimenAgg';

export const BiospecimenType = new GraphQLObjectType({
  name: 'Biospecimen',
  fields: () => ({
    id: { type: GraphQLString },
    biospecimen_id: { type: GraphQLString },
    sample_id: { type: GraphQLString },
    sample_2_id: { type: GraphQLString },
    biospecimen_tissue_source: { type: GraphQLString },
    age_biospecimen_collection: { type: GraphQLString },
    sample_type: { type: GraphQLString },
    security: { type: GraphQLString },
    study_code: { type: GraphQLString },
    study_id: { type: GraphQLString },
    submitter_biospecimen_id: { type: GraphQLString },
    submitter_sample_id: { type: GraphQLString },
    files: { type: FilesType },
    participant: { type: ParticipantType },
    study: { type: StudyType },
  }),
  extensions: {
    nestedFields: [
      'files',
      'participant.diagnoses',
      'participant.family_relationships',
      'participant.icd_tagged',
      'participant.mondo',
      'participant.mondo_tagged',
      'participant.observed_phenotype_tagged',
      'participant.observed_phenotypes',
      'participant.phenotypes_tagged',
    ],
    esIndex: esBiospecimenIndex,
  },
});

const BiospecimenEdgesType = new GraphQLObjectType({
  name: 'BiospecimenEdgesType',
  fields: () => ({
    searchAfter: { type: GraphQLJSON },
    node: { type: BiospecimenType },
  }),
});

const BiospecimenHitsType = new GraphQLObjectType({
  name: 'BiospecimenHitsType',
  fields: () => ({
    total: { type: GraphQLInt },
    edges: {
      type: new GraphQLList(BiospecimenEdgesType),
      resolve: (parent) => edgesResolver(parent),
    },
  }),
});

export const BiospecimensType = new GraphQLObjectType({
  name: 'BiospecimensType',
  fields: () => ({
    hits: {
      type: BiospecimenHitsType,
      args: hitsArgsType,
      resolve: (parent, args, context) =>
        hitsResolver(parent, args, BiospecimenType, context.esClient, context.devMode),
    },
    mapping: { type: GraphQLJSON },
    extended: {
      type: GraphQLJSON,
      resolve: () => extendedMapping,
    },
    aggsState: { type: AggsStateType },
    columnsState: {
      type: ColumnsStateType,
      resolve: (_, args, context) => columnStateResolver(args, BiospecimenType, context.esClient),
    },
    matchBoxState: { type: MatchBoxStateType },
    aggregations: {
      type: BiospecimenAgg,
      args: aggregationsArgsType,
      resolve: (parent, args, context, info) => aggsResolver(args, info, BiospecimenType, context.esClient),
    },
  }),
});

export default BiospecimensType;
