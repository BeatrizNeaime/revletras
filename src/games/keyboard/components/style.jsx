import styled from "styled-components";

const KeyboardContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

const HandImage = styled.img`
  width: 200px;
  margin-top: 20px;
`;

const TargetWord = styled.h1`
  font-size: 1.5;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5rem;
  margin-bottom: 1rem;
  text-align: center;
`;

export { KeyboardContainer, HandImage, TargetWord };
