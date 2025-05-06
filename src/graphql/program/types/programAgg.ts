import AggregationsType from '@ferlab/next/lib/common/types/aggregationsType';
import { GraphQLObjectType } from 'graphql';

const ProgramAggType = new GraphQLObjectType({
  name: 'ProgramAggType',
  fields: {
    program_id: { type: AggregationsType },
  },
});

export default ProgramAggType;
