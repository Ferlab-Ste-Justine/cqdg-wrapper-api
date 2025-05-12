import StudyModel from '#src/graphql/study/model';
import { StudyType } from '#src/graphql/study/types/study';

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

export const studiesResolver = async (parent, args, context) => {
  try {
    const { study_codes } = parent;

    const results = await StudyModel.getBy({
      field: 'study_code',
      value: study_codes,
      path: '',
      args,
      context,
    });

    return results;
  } catch (error) {
    console.error('participantsCountResolver error', error);
    return null;
  }
};
