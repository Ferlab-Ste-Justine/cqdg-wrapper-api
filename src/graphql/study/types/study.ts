import { aggsResolver, columnStateResolver, edgesResolver, hitsResolver } from '@ferlab/next/lib/common/resolvers';
import {
  aggregationsArgsType,
  AggsStateType,
  ColumnsStateType,
  hitsArgsType,
  MatchBoxStateType,
} from '@ferlab/next/lib/common/types';
import GraphQLJSON from '@ferlab/next/lib/common/types/jsonType';
import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { esStudyIndex } from '#src/config/env';
import DataSetsType from '#src/graphql/file/types/dataSets';
import { ExperimentalStrategyType } from '#src/graphql/file/types/sequencingExperiment';
import { ProgramsType } from '#src/graphql/program/types/program';

import extendedMapping from '../extendedMapping';
import DataCategoriesType from './dataCategories';
import DataTypesType from './dataTypes';
import ExperimentalStrategiesType from './experimentalStrategies';
import StudyAggType from './studyAgg';

export const StudyContactType = new GraphQLObjectType({
  name: 'StudyContactType',
  fields: () => ({
    type: { type: GraphQLString },
    value: { type: GraphQLString },
  }),
});

export const DataAccessCodesType = new GraphQLObjectType({
  name: 'DataAccessCodesType',
  fields: () => ({
    access_limitations: { type: new GraphQLList(GraphQLString) },
    access_requirements: { type: new GraphQLList(GraphQLString) },
  }),
});

export const StudyType = new GraphQLObjectType({
  name: 'Study',
  fields: () => ({
    id: { type: GraphQLString },
    study_code: { type: GraphQLString },
    study_id: { type: GraphQLString },
    data_category: { type: GraphQLString },
    description: { type: GraphQLString },
    domain: { type: new GraphQLList(GraphQLString) },
    family_count: { type: GraphQLFloat },
    family_data: { type: GraphQLBoolean },
    file_count: { type: GraphQLFloat },
    hpo_terms: { type: new GraphQLList(GraphQLString) },
    icd_terms: { type: new GraphQLList(GraphQLString) },
    internal_study_id: { type: GraphQLString },
    keyword: { type: new GraphQLList(GraphQLString) },
    mondo_terms: { type: new GraphQLList(GraphQLString) },
    name: { type: GraphQLString },
    participant_count: { type: GraphQLFloat },
    population: { type: GraphQLString },
    sample_count: { type: GraphQLFloat },
    security: { type: GraphQLString },
    status: { type: GraphQLString },
    study_version: { type: GraphQLString },
    access_authority: { type: StudyContactType },
    data_access_codes: { type: DataAccessCodesType },
    data_categories: { type: DataCategoriesType },
    data_types: { type: DataTypesType },
    datasets: { type: DataSetsType },
    experimental_strategies: { type: ExperimentalStrategiesType },
    experimental_strategies_1: { type: new GraphQLList(ExperimentalStrategyType) },
    restricted: { type: GraphQLBoolean },
    study_designs: { type: new GraphQLList(GraphQLString) },
    data_collection_methods: { type: new GraphQLList(GraphQLString) },
    expected_number_participants: { type: GraphQLFloat },
    expected_number_biospecimens: { type: GraphQLFloat },
    expected_number_files: { type: GraphQLFloat },
    restricted_number_participants: { type: GraphQLFloat },
    restricted_number_biospecimens: { type: GraphQLFloat },
    restricted_number_files: { type: GraphQLFloat },
    principal_investigators: { type: new GraphQLList(GraphQLString) },
    contact_names: { type: new GraphQLList(GraphQLString) },
    contact_extensions: { type: new GraphQLList(GraphQLString) },
    contact_institutions: { type: new GraphQLList(GraphQLString) },
    contact_emails: { type: new GraphQLList(GraphQLString) },
    telecom: { type: GraphQLString },
    websites: {
      type: new GraphQLList(GraphQLString),
      resolve: (parent) => {
        //TODO: Keep only website field when all studies are migrated
        if (Array.isArray(parent.website)) return parent.website;
        return [parent.website];
      },
    },
    funding_sources: { type: new GraphQLList(GraphQLString) },
    citation_statement: { type: GraphQLString },
    selection_criteria: { type: GraphQLString },
    expected_items: { type: new GraphQLList(GraphQLString) },
    logo_url: { type: GraphQLString },
    programs: {
      type: ProgramsType,
    },
  }),
  extensions: {
    nestedFields: ['data_categories', 'data_types', 'datasets', 'experimental_strategies'],
    esIndex: esStudyIndex,
  },
});

const StudyEdgesType = new GraphQLObjectType({
  name: 'StudyEdgesType',
  fields: () => ({
    searchAfter: { type: GraphQLJSON },
    node: { type: StudyType },
  }),
});

const StudiesHitsType = new GraphQLObjectType({
  name: 'StudiesHitsType',
  fields: () => ({
    total: { type: GraphQLInt },
    edges: {
      type: new GraphQLList(StudyEdgesType),
      resolve: (parent) => edgesResolver(parent),
    },
  }),
});

const StudiesType = new GraphQLObjectType({
  name: 'StudiesType',
  fields: () => ({
    hits: {
      type: StudiesHitsType,
      args: hitsArgsType,
      resolve: (parent, args, context) => hitsResolver(parent, args, StudyType, context.esClient, context.devMode),
    },
    mapping: { type: GraphQLJSON },
    extended: {
      type: GraphQLJSON,
      resolve: () => extendedMapping,
    },
    aggsState: { type: AggsStateType },
    columnsState: {
      type: ColumnsStateType,
      resolve: (_, args, context) => columnStateResolver(args, StudyType, context.esClient),
    },
    matchBoxState: { type: MatchBoxStateType },
    aggregations: {
      type: StudyAggType,
      args: aggregationsArgsType,
      resolve: (parent, args, context, info) => aggsResolver(args, info, StudyType, context.esClient),
    },
  }),
});

export default StudiesType;
