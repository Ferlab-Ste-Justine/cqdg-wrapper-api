import ParticipantModel from '../participant/model';

export const participantsCountResolver = async (parent, args, context) => {
  try {
    const { study_codes } = parent;
    const { esClient } = context;

    const res = await Promise.all(
      study_codes?.map((study_code) => {
        return ParticipantModel.getCount({
          field: 'study_code',
          value: study_code,
          path: '',
          args,
          esClient,
        });
      })
    );

    const participants_count = res.reduce((acc, curr) => acc + curr, 0);
    return participants_count;
  } catch (error) {
    console.error('participantsCountResolver error', error);
    return null;
  }
};
