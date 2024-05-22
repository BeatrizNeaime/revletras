import styled from "styled-components";

const StyledScore = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 0.5rem;
  background-image: ${(props) => (props.bg ? `url(${props.bg})` : "none")};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export { StyledScore };
