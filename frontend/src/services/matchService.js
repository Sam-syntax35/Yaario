import { request } from './api';

export async function getMatches(profileId) {
  return await request(`/matches/${profileId}`);
}

export async function getUnlockedMatches(profileId) {
  return await request(`/matches/${profileId}/unlocked`);
}
