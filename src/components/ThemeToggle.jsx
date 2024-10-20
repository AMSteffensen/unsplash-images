import styled from "styled-components";
import { useGlobalContext } from "../context";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";

// Styled components
const ToggleContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: var(--view-width);
  max-width: var(--max-width);
  padding: 1rem 0;
  margin: 0 auto;
`;

const DarkToggleButton = styled.button`
  background: transparent;
  border-color: transparent;
  width: 5rem;
  height: 2rem;
  display: grid;
  place-items: center;
  cursor: pointer;
`;

const Icon = styled.div`
  font-size: 1.5rem;
  color: var(--textColor);
`;

const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useGlobalContext();
  return (
    <ToggleContainer>
      <DarkToggleButton onClick={toggleDarkTheme}>
        {isDarkTheme ? (
          <Icon as={BsFillMoonFill} />
        ) : (
          <Icon as={BsFillSunFill} />
        )}
      </DarkToggleButton>
    </ToggleContainer>
  );
};

export default ThemeToggle;
