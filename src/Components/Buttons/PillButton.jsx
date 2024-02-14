import styled from "styled-components";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

//Button shape
const PillButtonStyle = styled.div`
  position: relative;
  width: 55px;
  height: 30px;
  background-color: #fff;
  border: 2px solid rgb(0, 0, 55);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 1;
`;

// Button content
const PillDotStyle = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: rgb(13, 29, 50);
  border: 2px solid rgb(181, 193, 175);
  border-radius: 50%;
  transition: transform 0.3s ease;
  z-index: 2;
  transform: ${(props) =>
    props.$isRight ? "translateX(12.5px)" : "translateX(-12.5px)"};
`;

export default function PillButton({ onClick }) {
  const [isRight, setIsRight] = useState(false);
  const togglePosition = () => {
    setIsRight(!isRight);
    if (onClick) onClick();
  };

  return (
    <PillButtonStyle onClick={togglePosition}>
      <FaSun className="fs-6 me-2 text-warning " />
      <PillDotStyle $isRight={isRight} />
      <FaMoon className="fs-6 text-dark" />
    </PillButtonStyle>
  );
}
