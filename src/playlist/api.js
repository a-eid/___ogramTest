import axios from 'axios';

export const PAGE_SIZE = 5;
const TOKEN =
  'BQAixICE_YLRU73gSv4bY5J9YsUIpvr830t8xDh50IUwjCggcwBUDlbcFLhgeY18d0y5O9hCSv-AY-3NpXb3pAWLIdQN6caafw7w3DpgTVgRamJJdrc4KZ5ne4YHzuD5aQURFEVy4wIzBQ';

axios.defaults.headers.authorization = `Bearer ${TOKEN}`;

export async function getPlaylists({page = 1} = {}) {
  let offset = page > 1 ? `&offset=${(page - 1) * PAGE_SIZE}` : '';
  const {data} = await axios.get(
    `https://api.spotify.com/v1/browse/featured-playlists?limit=${PAGE_SIZE}${offset}`,
  );
  return data.playlists;
}

export async function getTracks({id}) {
  const {data} = await axios.get(
    `https://api.spotify.com/v1/playlists/${id}/tracks`,
  );

  return data;
}
