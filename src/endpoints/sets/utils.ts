import { SetSqon } from '@ferlab/next/lib/sets/types';
import { getSetIdsFromSqon, injectIdsIntoSqon, SetInfo } from '@ferlab/next/lib/sqon/resolveSetInSqon';
import { getUserContents, Output } from '@ferlab/next/lib/usersApi';
import { Dictionary } from 'lodash';

import { usersApiURL } from '#src/config/env';
import { Sqon } from '#src/endpoints/venn/types';

export const sqonContainsSet = (s: Sqon) => JSON.stringify(s).includes('"set_id:');

export const resolveSetsInSqonWithMapper = async (
  sqon: SetSqon,
  userId: string,
  accessToken: string
): Promise<{
  resolvedSqon: SetSqon;
  m?: Dictionary<string[]>;
}> => {
  const setIds: string[] = getSetIdsFromSqon(sqon || ({} as SetSqon));
  if (setIds.length) {
    const userSets = await retrieveSetsFromUsers(accessToken);
    const setIdsToSetInfoMap: Dictionary<SetInfo> = {};
    const setIdsToValueMap: Dictionary<string[]> = {};
    for (const setId of setIds) {
      const content = userSets.find((r) => r.id === setId)?.content;
      setIdsToSetInfoMap[`set_id:${setId}`] = { ids: content?.ids || [], idField: content?.idField };
      setIdsToValueMap[`set_id:${setId}`] = content?.ids || [];
    }

    return {
      resolvedSqon: injectIdsIntoSqon(sqon, setIdsToSetInfoMap),
      m: setIdsToValueMap,
    };
  }
  return {
    resolvedSqon: sqon,
    m: null,
  };
};

export const resolveSetsInAllSqonsWithMapper = async (
  sqons: Sqon[],
  userId: string,
  accessToken: string
): Promise<{
  resolvedSqons: Sqon[];
  m?: Map<string, string[]>;
}> => {
  const resolvedSqons = [];
  let mSetItToIds = new Map();
  for (const s of sqons) {
    if (sqonContainsSet(s)) {
      const r = await resolveSetsInSqonWithMapper(s, null, accessToken);
      resolvedSqons.push(r.resolvedSqon);
      if (r.m) {
        mSetItToIds = new Map([...mSetItToIds, ...new Map(Object.entries(r.m))]);
      }
    } else {
      resolvedSqons.push(s);
    }
  }
  return {
    resolvedSqons: resolvedSqons,
    m: mSetItToIds,
  };
};

export const retrieveSetsFromUsers = async (accessToken: string): Promise<Output[]> => {
  // Get all user sets
  const userSets = await getUserContents(accessToken, usersApiURL);
  return userSets;
};

const hasSameElements = (a, b) => a.length === b.length && [...new Set(a)].every((ax) => b.includes(ax));

export const replaceIdsWithSetId = (sqon: Sqon, setIdsToValueMap: Map<string, string[]>): Sqon => ({
  ...sqon,
  content: sqon.content.map((x) => {
    if (Array.isArray(x.content)) {
      return {
        ...x,
        content: replaceIdsWithSetId(x, setIdsToValueMap).content,
      };
    }

    const setId = Array.isArray(x.content.value)
      ? [...setIdsToValueMap].find(([, v]) => hasSameElements(v, x.content.value))?.[0]
      : null;
    return {
      ...x,
      content: {
        ...x.content,
        value: setId ? [setId] : x.content.value,
      },
    };
  }),
});
