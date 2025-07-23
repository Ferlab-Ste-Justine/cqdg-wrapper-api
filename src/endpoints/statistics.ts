import {
  fetchBiospecimenStats,
  fetchFileFormatStats,
  fetchFileSizeStats,
  fetchFileStats,
  fetchParticipantsPerStudies,
  fetchParticipantStats,
  fetchStudyStats,
  fetchVariantStats,
} from '../services/elasticsearch';

export type Statistics = {
  files: number;
  fileSize: string;
  studies: number;
  participants: number;
  samples: number;
  variants: number;
  genomes: number;
  exomes: number;
  participantsPerStudies: { study_code: string; participant_count: number }[];
};

export const getStatistics = async (): Promise<Statistics> => {
  const [files, studies, participants, fileSize, samples, variants, genomes, exomes, participantsPerStudies] =
    await Promise.all([
      fetchFileStats(),
      fetchStudyStats(),
      fetchParticipantStats(),
      fetchFileSizeStats(),
      fetchBiospecimenStats(),
      fetchVariantStats(),
      fetchFileFormatStats('WGS'),
      fetchFileFormatStats('WXS'),
      fetchParticipantsPerStudies(),
    ]);

  return {
    files,
    studies,
    participants,
    fileSize,
    samples,
    variants,
    genomes,
    exomes,
    participantsPerStudies,
  } as Statistics;
};
