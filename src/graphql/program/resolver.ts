import ParticipantModel from '../participant/model';

export const participantsCountResolver = async (study_codes, args, esClient) => {
  try {
    const results = await ParticipantModel.getCount({
      field: 'study_code',
      value: study_codes,
      path: '',
      args,
      esClient,
    });

    return results;
  } catch (error) {
    console.error('participantsCountResolver error', error);
    return null;
  }
};
