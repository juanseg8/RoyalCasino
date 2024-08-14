import React from "react";
import styled from "styled-components";

const MediaWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Media = styled.img`
  width: 100%;
  height: auto;
  border-radius: 20px;
`;

const MediaDisplay = ({ type, src }) => {
  return (
    <MediaWrapper>
      <Media src={src} />
    </MediaWrapper>
  );
};

export default MediaDisplay;
