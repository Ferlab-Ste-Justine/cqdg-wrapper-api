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
import fileExtendedMapping from '#src/graphql/file/extendedMapping';
import geneExtendedMapping from '#src/graphql/gene/extendedMapping';
import participantExtendedMapping from '#src/graphql/participant/extendedMapping';
import studyExtendedMapping from '#src/graphql/study/extendedMapping';

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
