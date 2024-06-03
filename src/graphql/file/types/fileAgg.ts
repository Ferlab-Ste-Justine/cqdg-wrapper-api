import AggregationsType, { NumericAggregationsType } from '@ferlab/next/lib/common/types/aggregationsType';
import { GraphQLObjectType } from 'graphql';

const FileAgg = new GraphQLObjectType({
  name: 'FileAgg',
  fields: {
    biospecimen_reference: { type: AggregationsType },
    biospecimens__age_biospecimen_collection: { type: AggregationsType },
    biospecimens__biospecimen_id: { type: AggregationsType },
    biospecimens__biospecimen_tissue_source: { type: AggregationsType },
    biospecimens__participant__age_at_recruitment: { type: AggregationsType },
    biospecimens__participant__age_of_death: { type: AggregationsType },
    biospecimens__participant__cause_of_death: { type: AggregationsType },
    biospecimens__participant__deceasedBoolean: { type: AggregationsType },
    biospecimens__participant__diagnoses__age_at_diagnosis: { type: AggregationsType },
    biospecimens__participant__diagnoses__diagnosis_ICD_code: { type: AggregationsType },
    biospecimens__participant__diagnoses__diagnosis_icd_display: { type: AggregationsType },
    biospecimens__participant__diagnoses__diagnosis_mondo_code: { type: AggregationsType },
    biospecimens__participant__diagnoses__diagnosis_mondo_display: { type: AggregationsType },
    biospecimens__participant__diagnoses__diagnosis_source_text: { type: AggregationsType },
    biospecimens__participant__diagnoses__fhir_id: { type: AggregationsType },
    biospecimens__participant__ethnicity: { type: AggregationsType },
    biospecimens__participant__family_id: { type: AggregationsType },
    biospecimens__participant__family_relationships__family_id: { type: AggregationsType },
    biospecimens__participant__family_relationships__family_type: { type: AggregationsType },
    biospecimens__participant__family_relationships__focus_participant_id: { type: AggregationsType },
    biospecimens__participant__family_relationships__is_affected: { type: AggregationsType },
    biospecimens__participant__family_relationships__participant_id: { type: AggregationsType },
    biospecimens__participant__family_relationships__relationship_to_proband: { type: AggregationsType },
    biospecimens__participant__family_relationships__submitter_family_id: { type: AggregationsType },
    biospecimens__participant__family_relationships__submitter_participant_id: { type: AggregationsType },
    biospecimens__participant__family_type: { type: AggregationsType },
    biospecimens__participant__icd_tagged__age_at_event: { type: AggregationsType },
    biospecimens__participant__icd_tagged__internal_phenotype_id: { type: AggregationsType },
    biospecimens__participant__icd_tagged__is_leaf: { type: AggregationsType },
    biospecimens__participant__icd_tagged__is_tagged: { type: AggregationsType },
    biospecimens__participant__icd_tagged__name: { type: AggregationsType },
    biospecimens__participant__icd_tagged__parents: { type: AggregationsType },
    biospecimens__participant__icd_tagged__source_text: { type: AggregationsType },
    biospecimens__participant__is_a_proband: { type: AggregationsType },
    biospecimens__participant__is_affected: { type: AggregationsType },
    biospecimens__participant__mondo__age_at_event: { type: AggregationsType },
    biospecimens__participant__mondo__is_leaf: { type: AggregationsType },
    biospecimens__participant__mondo__is_tagged: { type: AggregationsType },
    biospecimens__participant__mondo__name: { type: AggregationsType },
    biospecimens__participant__mondo__parents: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__age_at_event: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__internal_phenotype_id: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__is_leaf: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__is_tagged: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__name: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__parents: { type: AggregationsType },
    biospecimens__participant__mondo_tagged__source_text: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__age_at_event: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__internal_phenotype_id: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__is_leaf: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__is_tagged: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__name: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__parents: { type: AggregationsType },
    biospecimens__participant__observed_phenotype_tagged__source_text: { type: AggregationsType },
    biospecimens__participant__observed_phenotypes__age_at_event: { type: AggregationsType },
    biospecimens__participant__observed_phenotypes__is_leaf: { type: AggregationsType },
    biospecimens__participant__observed_phenotypes__is_tagged: { type: AggregationsType },
    biospecimens__participant__observed_phenotypes__name: { type: AggregationsType },
    biospecimens__participant__observed_phenotypes__parents: { type: AggregationsType },
    biospecimens__participant__participant_2_id: { type: AggregationsType },
    biospecimens__participant__participant_id: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__age_at_event: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__internal_phenotype_id: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__is_leaf: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__is_observed: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__is_tagged: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__name: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__parents: { type: AggregationsType },
    biospecimens__participant__phenotypes_tagged__source_text: { type: AggregationsType },
    biospecimens__participant__relationship_to_proband: { type: AggregationsType },
    biospecimens__participant__release_id: { type: AggregationsType },
    biospecimens__participant__sex: { type: AggregationsType },
    biospecimens__participant__study__study_code: { type: AggregationsType },
    biospecimens__participant__study_code: { type: AggregationsType },
    biospecimens__participant__study_id: { type: AggregationsType },
    biospecimens__participant__submitter_family_id: { type: AggregationsType },
    biospecimens__participant__submitter_participant_id: { type: AggregationsType },
    biospecimens__participant__vital_status: { type: AggregationsType },
    biospecimens__sample_2_id: { type: AggregationsType },
    biospecimens__sample_id: { type: AggregationsType },
    biospecimens__sample_type: { type: AggregationsType },
    biospecimens__submitter_biospecimen_id: { type: AggregationsType },
    biospecimens__submitter_sample_id: { type: AggregationsType },
    data_category: { type: AggregationsType },
    data_type: { type: AggregationsType },
    dataset: { type: AggregationsType },
    ferload_url: { type: AggregationsType },
    file_2_id: { type: AggregationsType },
    file_format: { type: AggregationsType },
    file_hash: { type: AggregationsType },
    file_id: { type: AggregationsType },
    file_name: { type: AggregationsType },
    file_size: { type: NumericAggregationsType },
    participants__age_at_recruitment: { type: AggregationsType },
    participants__age_of_death: { type: AggregationsType },
    participants__biospecimens__age_biospecimen_collection: { type: AggregationsType },
    participants__biospecimens__biospecimen_id: { type: AggregationsType },
    participants__biospecimens__biospecimen_tissue_source: { type: AggregationsType },
    participants__biospecimens__participant__age_at_recruitment: { type: AggregationsType },
    participants__biospecimens__participant__age_of_death: { type: AggregationsType },
    participants__biospecimens__participant__deceasedBoolean: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__age_at_diagnosis: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__diagnosis_ICD_code: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__diagnosis_icd_display: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__diagnosis_mondo_code: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__diagnosis_mondo_display: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__diagnosis_source_text: { type: AggregationsType },
    participants__biospecimens__participant__diagnoses__fhir_id: { type: AggregationsType },
    participants__biospecimens__participant__family_id: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__family_id: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__family_type: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__is_affected: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__participant_id: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__relationship_to_proband: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__submitter_family_id: { type: AggregationsType },
    participants__biospecimens__participant__family_relationships__submitter_participant_id: { type: AggregationsType },
    participants__biospecimens__participant__family_type: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__age_at_event: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__is_leaf: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__is_tagged: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__name: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__parents: { type: AggregationsType },
    participants__biospecimens__participant__icd_tagged__source_text: { type: AggregationsType },
    participants__biospecimens__participant__is_a_proband: { type: AggregationsType },
    participants__biospecimens__participant__is_affected: { type: AggregationsType },
    participants__biospecimens__participant__mondo__age_at_event: { type: AggregationsType },
    participants__biospecimens__participant__mondo__is_leaf: { type: AggregationsType },
    participants__biospecimens__participant__mondo__is_tagged: { type: AggregationsType },
    participants__biospecimens__participant__mondo__name: { type: AggregationsType },
    participants__biospecimens__participant__mondo__parents: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__age_at_event: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__is_leaf: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__is_tagged: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__name: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__parents: { type: AggregationsType },
    participants__biospecimens__participant__mondo_tagged__source_text: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotype_tagged__age_at_event: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotype_tagged__internal_phenotype_id: {
      type: AggregationsType,
    },
    participants__biospecimens__participant__observed_phenotype_tagged__is_leaf: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotype_tagged__is_tagged: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotype_tagged__name: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotype_tagged__parents: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotype_tagged__source_text: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotypes__age_at_event: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotypes__is_leaf: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotypes__is_tagged: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotypes__name: { type: AggregationsType },
    participants__biospecimens__participant__observed_phenotypes__parents: { type: AggregationsType },
    participants__biospecimens__participant__participant_2_id: { type: AggregationsType },
    participants__biospecimens__participant__participant_id: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__age_at_event: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__is_leaf: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__is_observed: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__is_tagged: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__name: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__parents: { type: AggregationsType },
    participants__biospecimens__participant__phenotypes_tagged__source_text: { type: AggregationsType },
    participants__biospecimens__participant__relationship_to_proband: { type: AggregationsType },
    participants__biospecimens__participant__release_id: { type: AggregationsType },
    participants__biospecimens__participant__sex: { type: AggregationsType },
    participants__biospecimens__participant__study__study_code: { type: AggregationsType },
    participants__biospecimens__participant__study_code: { type: AggregationsType },
    participants__biospecimens__participant__study_id: { type: AggregationsType },
    participants__biospecimens__participant__submitter_participant_id: { type: AggregationsType },
    participants__biospecimens__participant__vital_status: { type: AggregationsType },
    participants__biospecimens__sample_2_id: { type: AggregationsType },
    participants__biospecimens__sample_id: { type: AggregationsType },
    participants__biospecimens__sample_type: { type: AggregationsType },
    participants__biospecimens__submitter_biospecimen_id: { type: AggregationsType },
    participants__biospecimens__submitter_sample_id: { type: AggregationsType },
    participants__cause_of_death: { type: AggregationsType },
    participants__deceasedBoolean: { type: AggregationsType },
    participants__diagnoses__age_at_diagnosis: { type: AggregationsType },
    participants__diagnoses__diagnosis_ICD_code: { type: AggregationsType },
    participants__diagnoses__diagnosis_icd_display: { type: AggregationsType },
    participants__diagnoses__diagnosis_mondo_code: { type: AggregationsType },
    participants__diagnoses__diagnosis_mondo_display: { type: AggregationsType },
    participants__diagnoses__diagnosis_source_text: { type: AggregationsType },
    participants__diagnoses__fhir_id: { type: AggregationsType },
    participants__ethnicity: { type: AggregationsType },
    participants__familyRelationships__family_id: { type: AggregationsType },
    participants__familyRelationships__family_type: { type: AggregationsType },
    participants__familyRelationships__focus_participant_id: { type: AggregationsType },
    participants__familyRelationships__relationship_to_proband: { type: AggregationsType },
    participants__familyRelationships__submitter_family_id: { type: AggregationsType },
    participants__familyRelationships__submitter_participant_id: { type: AggregationsType },
    participants__family_id: { type: AggregationsType },
    participants__family_relationships__family_id: { type: AggregationsType },
    participants__family_relationships__family_type: { type: AggregationsType },
    participants__family_relationships__is_affected: { type: AggregationsType },
    participants__family_relationships__participant_id: { type: AggregationsType },
    participants__family_relationships__relationship_to_proband: { type: AggregationsType },
    participants__family_relationships__submitter_family_id: { type: AggregationsType },
    participants__family_relationships__submitter_participant_id: { type: AggregationsType },
    participants__family_type: { type: AggregationsType },
    participants__icd_tagged__age_at_event: { type: AggregationsType },
    participants__icd_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__icd_tagged__is_leaf: { type: AggregationsType },
    participants__icd_tagged__is_tagged: { type: AggregationsType },
    participants__icd_tagged__name: { type: AggregationsType },
    participants__icd_tagged__parents: { type: AggregationsType },
    participants__icd_tagged__source_text: { type: AggregationsType },
    participants__is_a_proband: { type: AggregationsType },
    participants__is_affected: { type: AggregationsType },
    participants__mondo__age_at_event: { type: AggregationsType },
    participants__mondo__is_leaf: { type: AggregationsType },
    participants__mondo__is_tagged: { type: AggregationsType },
    participants__mondo__name: { type: AggregationsType },
    participants__mondo__parents: { type: AggregationsType },
    participants__mondo_tagged__age_at_event: { type: AggregationsType },
    participants__mondo_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__mondo_tagged__is_leaf: { type: AggregationsType },
    participants__mondo_tagged__is_tagged: { type: AggregationsType },
    participants__mondo_tagged__name: { type: AggregationsType },
    participants__mondo_tagged__parents: { type: AggregationsType },
    participants__mondo_tagged__source_text: { type: AggregationsType },
    participants__observed_phenotype_tagged__age_at_event: { type: AggregationsType },
    participants__observed_phenotype_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__observed_phenotype_tagged__is_leaf: { type: AggregationsType },
    participants__observed_phenotype_tagged__is_tagged: { type: AggregationsType },
    participants__observed_phenotype_tagged__name: { type: AggregationsType },
    participants__observed_phenotype_tagged__parents: { type: AggregationsType },
    participants__observed_phenotype_tagged__source_text: { type: AggregationsType },
    participants__observed_phenotypes__age_at_event: { type: AggregationsType },
    participants__observed_phenotypes__is_leaf: { type: AggregationsType },
    participants__observed_phenotypes__is_tagged: { type: AggregationsType },
    participants__observed_phenotypes__name: { type: AggregationsType },
    participants__observed_phenotypes__parents: { type: AggregationsType },
    participants__participant_2_id: { type: AggregationsType },
    participants__participant_id: { type: AggregationsType },
    participants__phenotypes_tagged__age_at_event: { type: AggregationsType },
    participants__phenotypes_tagged__internal_phenotype_id: { type: AggregationsType },
    participants__phenotypes_tagged__is_leaf: { type: AggregationsType },
    participants__phenotypes_tagged__is_observed: { type: AggregationsType },
    participants__phenotypes_tagged__is_tagged: { type: AggregationsType },
    participants__phenotypes_tagged__name: { type: AggregationsType },
    participants__phenotypes_tagged__parents: { type: AggregationsType },
    participants__phenotypes_tagged__source_text: { type: AggregationsType },
    participants__relationship_to_proband: { type: AggregationsType },
    participants__release_id: { type: AggregationsType },
    participants__sex: { type: AggregationsType },
    participants__study__study_code: { type: AggregationsType },
    participants__study_code: { type: AggregationsType },
    participants__study_id: { type: AggregationsType },
    participants__submitter_family_id: { type: AggregationsType },
    participants__submitter_participant_id: { type: AggregationsType },
    participants__vital_status: { type: AggregationsType },
    relates_to: { type: AggregationsType },
    release_id: { type: AggregationsType },
    security: { type: AggregationsType },
    sequencing_experiment__alir: { type: AggregationsType },
    sequencing_experiment__analysis_id: { type: AggregationsType },
    sequencing_experiment__bio_informatic_analysis: { type: AggregationsType },
    sequencing_experiment__capture_kit: { type: AggregationsType },
    sequencing_experiment__experimental_strategy: { type: AggregationsType },
    sequencing_experiment__gcnv: { type: AggregationsType },
    sequencing_experiment__genome_build: { type: AggregationsType },
    sequencing_experiment__gsv: { type: AggregationsType },
    sequencing_experiment__labAliquotID: { type: AggregationsType },
    sequencing_experiment__ldm_sample_id: { type: AggregationsType },
    sequencing_experiment__owner: { type: AggregationsType },
    sequencing_experiment__platform: { type: AggregationsType },
    sequencing_experiment__read_length: { type: AggregationsType },
    sequencing_experiment__run_alias: { type: AggregationsType },
    sequencing_experiment__run_date: { type: NumericAggregationsType },
    sequencing_experiment__run_name: { type: AggregationsType },
    sequencing_experiment__sequencer_id: { type: AggregationsType },
    sequencing_experiment__snv: { type: AggregationsType },
    sequencing_experiment__ssup: { type: AggregationsType },
    sequencing_experiment__type_of_sequencing: { type: AggregationsType },
    sequencing_experiment__workflow_name: { type: AggregationsType },
    sequencing_experiment__workflow_version: { type: AggregationsType },
    study__contact__type: { type: AggregationsType },
    study__contact__value: { type: AggregationsType },
    study__data_access_codes__access_limitations: { type: AggregationsType },
    study__data_access_codes__access_requirements: { type: AggregationsType },
    study__domain: { type: AggregationsType },
    study__name: { type: AggregationsType },
    study__population: { type: AggregationsType },
    study__study_code: { type: AggregationsType },
    study_code: { type: AggregationsType },
    study_id: { type: AggregationsType },
  },
});

export default FileAgg;
