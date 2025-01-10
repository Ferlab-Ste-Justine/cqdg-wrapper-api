import { aggsResolver, columnStateResolver, edgesResolver } from '@ferlab/next/lib/common/resolvers';
import {
  aggregationsArgsType,
  AggsStateType,
  ColumnsStateType,
  hitsArgsType,
  MatchBoxStateType,
} from '@ferlab/next/lib/common/types';
import GraphQLJSON from '@ferlab/next/lib/common/types/jsonType';
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { esFileIndex } from '#src/config/env';
import { BiospecimensType } from '#src/graphql/biospecimen/types/biospecimen';
import { ParticipantsType } from '#src/graphql/participant/types/participant';
import { StudyType } from '#src/graphql/study/types/study';

import extendedMapping from '../extendedMapping';
import filesResolver, { hitsResolverNested } from '../resolver';
import FileAgg from './fileAgg';
import SequencingExperimentType from './sequencingExperiment';

export const FileType = new GraphQLObjectType({
  name: 'File',
  fields: () => ({
    id: { type: GraphQLString },
    file_id: { type: GraphQLString },
    file_2_id: { type: GraphQLString },
    biospecimen_reference: { type: new GraphQLList(GraphQLString) },
    data_category: { type: GraphQLString },
    data_type: { type: GraphQLString },
    dataset: { type: GraphQLString },
    ferload_url: { type: GraphQLString },
    file_format: { type: GraphQLString },
    file_hash: { type: GraphQLString },
    file_name: { type: GraphQLString },
    file_size: { type: GraphQLFloat },
    relates_to: { type: GraphQLString },
    security: { type: GraphQLString },
    study_code: { type: GraphQLString },
    study_id: { type: GraphQLString },
    study: { type: StudyType },
    data_access: { type: GraphQLString },
    user_authorized: { type: GraphQLBoolean },
    participants_by_index: {
      type: ParticipantsType,
      resolve: (parent, args, context) => hitsResolverNested(parent, args, context.esClient),
    },
    participants: { type: ParticipantsType },
    biospecimens: { type: BiospecimensType },
    sequencing_experiment: { type: SequencingExperimentType },
  }),
  extensions: {
    nestedFields: [
      'biospecimens',
      'biospecimens.participant.diagnoses',
      'biospecimens.participant.family_relationships',
      'biospecimens.participant.icd_tagged',
      'biospecimens.participant.mondo',
      'biospecimens.participant.mondo_tagged',
      'biospecimens.participant.observed_phenotype_tagged',
      'biospecimens.participant.observed_phenotypes',
      'participants',
      'participants.biospecimens',
      'participants.diagnoses',
      'participants.familyRelationships',
      'participants.icd_tagged',
      'participants.mondo',
      'participants.mondo_tagged',
      'participants.observed_phenotype_tagged',
      'participants.observed_phenotypes',
      'participants.phenotypes_tagged',
    ],
    esIndex: esFileIndex,
  },
});

const FileEdgesType = new GraphQLObjectType({
  name: 'FileEdgesType',
  fields: () => ({
    searchAfter: { type: GraphQLJSON },
    node: { type: FileType },
  }),
});

const FileHitsType = new GraphQLObjectType({
  name: 'FileHitsType',
  fields: () => ({
    total: { type: GraphQLInt },
    edges: {
      type: new GraphQLList(FileEdgesType),
      resolve: (parent) => edgesResolver(parent),
    },
  }),
});

export const FilesType = new GraphQLObjectType({
  name: 'FilesType',
  fields: () => ({
    hits: {
      type: FileHitsType,
      args: hitsArgsType,
      resolve: (parent, args, context) => filesResolver(parent, args, FileType, context),
    },
    mapping: { type: GraphQLJSON },
    extended: {
      type: GraphQLJSON,
      resolve: () => extendedMapping,
    },
    aggsState: { type: AggsStateType },
    columnsState: {
      type: ColumnsStateType,
      resolve: (_, args, context) => columnStateResolver(args, FileType, context.esClient),
    },
    matchBoxState: { type: MatchBoxStateType },
    aggregations: {
      type: FileAgg,
      args: aggregationsArgsType,
      resolve: (parent, args, context, info) => aggsResolver(args, info, FileType, context.esClient),
    },
  }),
});
