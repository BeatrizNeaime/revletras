import styled from "styled-components";
import { Link } from "react-router-dom";

export const LinkWrapper = styled.li`
  position: relative;
  height: 100%;
  margin-right: 1rem;
  &::after {
    content: "";
    display: block;
    width: 100%;
    height: 2px;
    background: rgba(255, 255, 255, 0.8);
    transition: width 0.4s;
    position: absolute;
    top: 100%;
  }
`;

export const LinkComponent = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0;
  &:hover {
    color: white;
    text-decoration: none;
  }
`;
