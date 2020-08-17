// =============Spotify Login call===========
// https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#

export const authEndpoint = "https://accounts.spotify.com/authorize";

const clientId = "075a8a7b92bc4f8d8c17e3755071d1e1";

const redirectUri = "https://spotifydiscoverweekly.netlify.app/";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
];

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);

      return initial;
    }, {});
};

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;

//https://accounts.spotify.com/en/authorize
//?client_id=cff76213089a4e228206c8bf120d67cb
//&redirect_uri=http:%2F%2Flocalhost:3000%2F
//&scope=user-read-currently-playing
//%20user-read-recently-played%20user-read-playback-state
//%20user-top-read%20user-modify-playback-state
//&response_type=token&show_dialog=true