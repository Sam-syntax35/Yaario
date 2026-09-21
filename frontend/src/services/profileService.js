import { request } from './api';

export async function createProfile(profileData) {
  return await request('/profiles', {
    method: 'POST',
    body: JSON.stringify(profileData)
  });
}
