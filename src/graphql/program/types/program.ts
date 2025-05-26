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
import { participantsCountResolver, studiesResolver } from '#src/graphql/program/resolver';
import { StudyType } from '#src/graphql/study/types/study';

import programsData from '../data';
import extendedMapping from '../extendedMapping';
import ProgramAggType from './programAgg';

export const ContactType = new GraphQLObjectType({
  name: 'ContactType',
  fields: () => ({
    name: { type: GraphQLString }, //TODO: To remove `name` field after merge front feat/cqdg-1046
    website: { type: GraphQLString },
    email: { type: GraphQLString },
    institution: { type: GraphQLString },
  }),
});

export const ManagerType = new GraphQLObjectType({
  name: 'ManagerType',
  fields: () => ({
    name: { type: GraphQLString },
    picture_url: { type: GraphQLString },
    role_fr: { type: GraphQLString },
    role_en: { type: GraphQLString },
    institution: { type: GraphQLString },
  }),
});

export const PartnerType = new GraphQLObjectType({
  name: 'PartnerType',
  fields: () => ({
    name: { type: GraphQLString },
    logo_url: { type: GraphQLString },
    rank: { type: GraphQLString },
  }),
});

export const ProgramType = new GraphQLObjectType({
  name: 'Program',
  fields: () => ({
    program_id: { type: GraphQLString },
    name_en: { type: GraphQLString },
    name_fr: { type: GraphQLString },
    description_en: { type: GraphQLString },
    description_fr: { type: GraphQLString },
    website: { type: GraphQLString },
    citation_statement: { type: GraphQLString },
    contacts: { type: new GraphQLList(ContactType) },
    managers: { type: new GraphQLList(ManagerType) },
    partners: { type: new GraphQLList(PartnerType) },
    logo_url: { type: GraphQLString },
    study_codes: { type: new GraphQLList(GraphQLString) },
    studies: { type: new GraphQLList(StudyType), resolve: studiesResolver },
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

export const ProgramsType = new GraphQLObjectType({
  name: 'ProgramsType',
  fields: () => ({
    hits: {
      type: ProgramsHitsType,
      args: hitsArgsType,
      // resolve: (parent, args, context) => hitsResolver(parent, args, ProgramType, context.esClient, context.devMode),
      //TODO: To replace by row behind once data is available on els
      resolve: (_, args) => {
        const program_id = args?.filters?.content?.[0]?.content?.value;
        if (!program_id) return programsData;
        return { total: 1, edges: programsData.edges.filter((p) => p.program_id === program_id) };
      },
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
