import styled from "styled-components";

const GameWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  gap: 10px;
  padding: 10px;
  border-radius: 10px;
`;

const CardComponent = styled.div`
  height: 128px;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
  position: relative;
  background-color: #fafafa;
  border-radius: 6px;

  img {
    height: 128px;
    width: 128px;
    display: block;
    border-radius: 6px;
  }

  .card-img {
    transform: rotateY(90deg);
    position: absolute;
  }

  .card-hover {
    transform: rotateY(0deg);
  }

  .flipped .card-img {
    transition-delay: 0.5s;
    transform: rotateY(0deg);
  }

  .card .card-hover {
    transition: all ease-in 0.2s;
    transition-delay: 0.5s;
  }

  .flipped .card-hover {
    transform: rotateY(90deg);
    transition-delay: 0s;
  }
`;

export { GameWrapper, CardComponent };
