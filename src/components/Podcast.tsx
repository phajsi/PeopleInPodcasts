import styled from "styled-components";
import { SpotifyEpisodeObj } from "../types/SpotifyTypes";
import Iframe from "./Iframe";
import DownIcon from "../icons/DownIcon";
import { useState } from "react";

const PodcastStyled = styled.div`
  //border: solid 0.5px silver;
  padding: 2rem;
`;

const TopDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  margin-left: 3rem;
`;

const Podcast = (props: SpotifyEpisodeObj) => {
  const [openBox, setOpenBox] = useState(false);

  return (
    <PodcastStyled>
      <TopDiv>
        <strong>{props.name}</strong>
        <Button onClick={() => setOpenBox(!openBox)}>
          <DownIcon />
        </Button>
      </TopDiv>
      <br />

      {openBox && (
        <div>
          <div>{props.description}</div>
          <Iframe src={props.uri.split(":").at(-1)} />
        </div>
      )}
    </PodcastStyled>
  );
};

export default Podcast;
