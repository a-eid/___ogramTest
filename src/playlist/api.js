import axios from 'axios';

const PAGE_SIZE = 5;
const TOKEN =
  'BQD1_ZM7pSAEAsGAGVLaheV7bmuXcB4R6vMKPB3ND7Z5DEVilvS2KmGCh-bFAGKWuFgvoTOECXK0MAri4t2VDcADQvJZTevmmtX2Qe_F5YB6ojxBYqAhOiPAO71Dwph55-z7IsUP-9O9ig';

axios.defaults.headers.authorization = `Bearer ${TOKEN}`;

export async function getPlaylists({page = 1} = {}) {
  let offset = page > 1 ? `&offset=${(page - 1) * PAGE_SIZE}` : '';
  const {data} = await axios.get(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=${PAGE_SIZE}${offset}`,
  );
  return data.playlists;
}

export function getTracks({id}) {
  return axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`);
}
