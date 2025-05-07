import { aggsResolver, columnStateResolver, edgesResolver } from '@ferlab/next/lib/common/resolvers';
import {
  aggregationsArgsType,
  AggsStateType,
  ColumnsStateType,
  hitsArgsType,
  MatchBoxStateType,
} from '@ferlab/next/lib/common/types';
import GraphQLJSON from '@ferlab/next/lib/common/types/jsonType';
import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';

import { esProgramIndex } from '#src/config/env';
import { participantsCountResolver } from '#src/graphql/program/resolver';

import programsData from '../data';
import extendedMapping from '../extendedMapping';
import ProgramAggType from './programAgg';

export const ProgramType = new GraphQLObjectType({
  name: 'Program',
  fields: () => ({
    program_id: { type: GraphQLString },
    program_name_en: { type: GraphQLString },
    program_name_fr: { type: GraphQLString },
    description_en: { type: GraphQLString },
    description_fr: { type: GraphQLString },
    website: { type: GraphQLString },
    citation_statement: { type: GraphQLString },
    contact_name: { type: GraphQLString },
    contact_email: { type: GraphQLString },
    contact_institution: { type: GraphQLString },
    manager_name: { type: GraphQLString },
    manager_picture: { type: GraphQLString },
    manager_role: { type: GraphQLString },
    manager_institution: { type: GraphQLString },
    funding_sources: { type: new GraphQLList(GraphQLString) },
    study_codes: { type: new GraphQLList(GraphQLString) },

    //TODO: to add logoUrl
    logoUrl: { type: GraphQLString },

    participants_count: {
      type: GraphQLInt,
      resolve: participantsCountResolver,
    },
  }),
  extensions: {
    nestedFields: [],
    esIndex: esProgramIndex,
  },
});

const ProgramEdgesType = new GraphQLObjectType({
  name: 'ProgramEdgesType',
  fields: () => ({
    searchAfter: { type: GraphQLJSON },
    node: { type: ProgramType },
  }),
});

const ProgramsHitsType = new GraphQLObjectType({
  name: 'ProgramsHitsType',
  fields: () => ({
    total: { type: GraphQLInt },
    edges: {
      type: new GraphQLList(ProgramEdgesType),
      resolve: (parent) => edgesResolver(parent),
    },
  }),
});

const ProgramsType = new GraphQLObjectType({
  name: 'ProgramsType',
  fields: () => ({
    hits: {
      type: ProgramsHitsType,
      args: hitsArgsType,
      // resolve: (parent, args, context) => hitsResolver(parent, args, ProgramType, context.esClient, context.devMode),
      //TODO: To replace by row behind once data is available on els
      resolve: () => programsData,
    },
    mapping: { type: GraphQLJSON },
    extended: {
      type: GraphQLJSON,
      resolve: () => extendedMapping,
    },
    aggsState: { type: AggsStateType },
    columnsState: {
      type: ColumnsStateType,
      resolve: (_, args, context) => columnStateResolver(args, ProgramType, context.esClient),
    },
    matchBoxState: { type: MatchBoxStateType },
    aggregations: {
      type: ProgramAggType,
      args: aggregationsArgsType,
      resolve: (_, args, context, info) => aggsResolver(args, info, ProgramType, context.esClient),
    },
  }),
});

export default ProgramsType;
