import variantExtendedMapping from '@ferlab/next/lib/graphql/variant/extendedMapping';

import {
  esBiospecimenIndex,
  esFileIndex,
  esGeneIndex,
  esParticipantIndex,
  esStudyIndex,
  esVariantIndex,
} from '#src/config/env';
import sampleExtendedMapping from '#src/graphql/biospecimen/extendedMapping';
import { BiospecimenType } from '#src/graphql/biospecimen/types/biospecimen';
import fileExtendedMapping from '#src/graphql/file/extendedMapping';
import { FileType } from '#src/graphql/file/types/file';
import geneExtendedMapping from '#src/graphql/gene/extendedMapping';
import { GeneType } from '#src/graphql/gene/types/gene';
import participantExtendedMapping from '#src/graphql/participant/extendedMapping';
import { ParticipantType } from '#src/graphql/participant/types/participant';
import studyExtendedMapping from '#src/graphql/study/extendedMapping';
import { StudyType } from '#src/graphql/study/types/study';
import { VariantType } from '#src/graphql/variant/types/variant';

export const getExtendedMappingByIndex = (graphqlIndex = '') => {
  switch (graphqlIndex) {
    case 'Participant':
    case 'participant':
      return participantExtendedMapping;
    case 'Biospecimen':
    case 'biospecimen':
      return sampleExtendedMapping;
    case 'File':
    case 'file':
      return fileExtendedMapping;
    case 'Variant':
    case 'variant':
      return variantExtendedMapping;
    case 'Gene':
    case 'gene':
      return geneExtendedMapping;
    case 'Study':
    case 'study':
      return studyExtendedMapping;
  }
};

export const getESIndexByIndex = (graphqlIndex = ''): string => {
  switch (graphqlIndex) {
    case 'Participant':
      return esParticipantIndex;
    case 'Biospecimen':
      return esBiospecimenIndex;
    case 'File':
      return esFileIndex;
    case 'Variant':
      return esVariantIndex;
    case 'Gene':
      return esGeneIndex;
    case 'Study':
      return esStudyIndex;
  }
};

export const getGraphqlTypeByIndex = (graphqlIndex = '') => {
  switch (graphqlIndex) {
    case 'Participant':
      return ParticipantType;
    case 'Biospecimen':
      return BiospecimenType;
    case 'File':
      return FileType;
    case 'Variant':
      return VariantType;
    case 'Gene':
      return GeneType;
    case 'Study':
      return StudyType;
  }
};
