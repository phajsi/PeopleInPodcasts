import { useEffect, useState } from "react";
import styled from "styled-components";
import Podcast from "./components/Podcast";
import {
  SpotifyEpisodeObj,
  SpotifyResponse,
  SpotifyResponseObj,
} from "./types/SpotifyTypes";

const Header = styled.header`
  & > h1 {
    transform: translateY(50%);
    text-transform: uppercase;
    margin: 2rem;
  }
`;

const AppContent = styled.div`
  height: 100vh;
  text-align: center;
  padding: 5vh;
`;

const spotObj: SpotifyEpisodeObj = {
  name: "test",
  uri: "4653634",
  language: "no",
  description: "this is a temporary description",
};

const initialObj: SpotifyResponseObj = {
  href: "",
  items: [spotObj],
  limit: 20,
  next: "",
  offset: 20,
  previous: "",
  total: 30,
};

const respObj = {
  episodes: initialObj,
};

function App() {
  const [data, setData] = useState<SpotifyResponse>(respObj);
  const [searchValue, setSearchValue] = useState("");
  const [author, setAuthor] = useState("anne%20holt");
  const [token, setToken] = useState("");

  //console.log(token);
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  async function getSpotifyAPIToken() {
    await fetch(`https://accounts.spotify.com/api/token`, {
      method: "POST",
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        console.log("reeees", res);
        return res.json();
      })
      .then((res) => {
        setToken(res.access_token);
      })
      .catch((err) => console.error(err));
  }
  //https://api.spotify.com/v1/search?q=anne%20holt&type=episode
  async function fetchSpotify(author: string) {
    await fetch(
      `https://api.spotify.com/v1/search?q=${author}&type=episode&market=NO`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((res: SpotifyResponse) => {
        console.log("tot resposnse", res);
        console.log("items", res.episodes.items);
        setData(res);
      })
      .catch((err) => console.error(err));
  }
  // finne ut av load on scroll spotify

  useEffect(() => {
    getSpotifyAPIToken();
  }, []);

  useEffect(() => {
    fetchSpotify(author);
  }, [token]);

  useEffect(() => {
    fetchSpotify(author);
    console.log("renders");
  }, [author]);

  const filterBySearchName = data?.episodes?.items?.filter((episode) =>
    episode.name.includes(author)
  );

  const handleSubmit = (e: any) => {
    if (e.key === "Enter") {
      setAuthor(encodeURIComponent(searchValue));
      setSearchValue("");
    }
  };

  const filterByLanguage = data!.episodes!.items!.filter((episode) =>
    episode.language.includes("no")
  );

  console.log("data", data);

  return (
    <AppContent>
      <>
        <Header>
          <h1>Spotify</h1>
        </Header>

        <input
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="search author"
          onKeyDown={handleSubmit}
        />
        {data?.episodes?.items?.map((item: SpotifyEpisodeObj) => (
          <>
            {console.log("wiiiiiiiiii")}
            <Podcast
              name={item.name}
              uri={item.uri}
              language={item.language}
              description={item.description}
            />
          </>
        ))}
      </>
    </AppContent>
  );
}

export default App;
