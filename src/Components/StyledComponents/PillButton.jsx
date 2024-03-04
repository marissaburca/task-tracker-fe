import styled from "styled-components";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

//Button shape
const PillButtonStyle = styled.div`
  position: fixed;
  top: 12px;
  width: 45px;
  height: 25px;
  background-color: white;
  border: 2px solid #999691;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 11;
  @media (max-width: 770px) {
    top: 5px;
    right:15px;
    width:30px;
    height:15px;
  }
`;

// Button content
const PillDotStyle = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: rgb(255, 255, 235);
  border: 2px solid #999691;
  border-radius: 50%;
  transition: transform 0.3s ease;
  z-index: 2;
  transform: ${(props) =>
    props.$isRight ? "translateX(12.5px)" : "translateX(-12.5px)"};
  @media (max-width: 770px) {
    height: 15px;
    width: 15px;
    transform: ${(props) =>
      props.$isRight ? "translateX(7.5px)" : "translateX(-7.5px)"};
  }
`;

export default function PillButton({ onClick }) {
  const [isRight, setIsRight] = useState(false);
  const togglePosition = () => {
    setIsRight(!isRight);
    if (onClick) onClick();
  };

  return (
    <PillButtonStyle onClick={togglePosition}>
      <FaSun className="fs-6 me-1 text-warning " />
      <PillDotStyle $isRight={isRight} />
      <FaMoon className="fs-6" />
    </PillButtonStyle>
  );
}
