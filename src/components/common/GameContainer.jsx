import styled from "styled-components";

export const GameContainer = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-image: url(${(props) => (props.bg ? props.bg : "")});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
