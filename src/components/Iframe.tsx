import styled from "styled-components";

type Props = {
  src?: string;
};

const IframeStyled = styled.iframe`
  border: 0;
  margin: 2rem;
`;

const Iframe = (props: Props) => {
  return (
    <>
      <IframeStyled
        src={`https://open.spotify.com/embed/episode/${props.src}?utm_source=generator`}
        width="80%"
        height="232"
        allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        sandbox="allow-same-origin allow-scripts allow-popups "
      ></IframeStyled>
    </>
  );
};

export default Iframe;
