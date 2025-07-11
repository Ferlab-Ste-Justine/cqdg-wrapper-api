import AggregationsType, { NumericAggregationsType } from '@ferlab/next/lib/common/types/aggregationsType';
import { GraphQLObjectType } from 'graphql';

const StudyAggType = new GraphQLObjectType({
  name: 'StudyAggType',
  fields: {
    contact__type: { type: AggregationsType },
    contact__value: { type: AggregationsType },
    data_access_codes__access_limitations: { type: AggregationsType },
    data_access_codes__access_requirements: { type: AggregationsType },
    data_categories__data_category: { type: AggregationsType },
    data_categories__participant_count: { type: NumericAggregationsType },
    data_category: { type: AggregationsType },
    data_types__data_type: { type: AggregationsType },
    datasets__data_types: { type: AggregationsType },
    datasets__description: { type: AggregationsType },
    datasets__experimental_strategies: { type: AggregationsType },
    datasets__file_count: { type: NumericAggregationsType },
    datasets__name: { type: AggregationsType },
    datasets__participant_count: { type: NumericAggregationsType },
    description: { type: AggregationsType },
    domain: { type: AggregationsType },
    experimental_strategies__experimental_strategy: { type: AggregationsType },
    experimental_strategies__file_count: { type: NumericAggregationsType },
    family_count: { type: NumericAggregationsType },
    family_data: { type: AggregationsType },
    file_count: { type: NumericAggregationsType },
    hpo_terms: { type: AggregationsType },
    icd_terms: { type: AggregationsType },
    internal_study_id: { type: AggregationsType },
    keyword: { type: AggregationsType },
    mondo_terms: { type: AggregationsType },
    name: { type: AggregationsType },
    participant_count: { type: NumericAggregationsType },
    population: { type: AggregationsType },
    release_id: { type: AggregationsType },
    sample_count: { type: NumericAggregationsType },
    security: { type: AggregationsType },
    status: { type: AggregationsType },
    study_code: { type: AggregationsType },
    study_id: { type: AggregationsType },
    study_version: { type: AggregationsType },
    restricted: { type: AggregationsType },
    study_designs: { type: AggregationsType },
    data_collection_methods: { type: AggregationsType },
    expected_number_participants: { type: NumericAggregationsType },
    expected_number_biospecimens: { type: NumericAggregationsType },
    expected_number_files: { type: NumericAggregationsType },
    restricted_number_participants: { type: NumericAggregationsType },
    restricted_number_biospecimens: { type: NumericAggregationsType },
    restricted_number_files: { type: NumericAggregationsType },
    principal_investigators: { type: AggregationsType },
    contact_names: { type: AggregationsType },
    contact_extensions: { type: AggregationsType },
    contact_institutions: { type: AggregationsType },
    contact_emails: { type: AggregationsType },
    telecom: { type: AggregationsType },
    website: { type: AggregationsType },
    funding_sources: { type: AggregationsType },
    citation_statement: { type: AggregationsType },
    selection_criteria: { type: AggregationsType },
    expected_items: { type: AggregationsType },
    programs__program_id: { type: AggregationsType },
    programs__name_fr: { type: AggregationsType },
    programs__name_en: { type: AggregationsType },
  },
});

export default StudyAggType;
