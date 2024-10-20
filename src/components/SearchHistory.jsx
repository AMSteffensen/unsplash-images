import React from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";

const HistoryContainer = styled.div`
  width: 150px;
  border-right: 1px solid var(--grey-300);
  padding: 10px;
  position: sticky;
  top: 0;
  overflow-y: auto;
`;

const Title = styled.h2`
  text-align: center;
  margin: 10px 0;
  font-size: var(--small-text);
  color: var(--primary-500);
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
`;

const HistoryItem = styled.li`
  padding: 8px;
  cursor: pointer;
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--grey-100); /* Use a light grey for hover */
  }

  /* Adjust font size and color to match your theme */
  font-size: var(--small-text);
  color: var(--textColor);
`;

const SearchHistory = ({ history }) => {
  const { setSearchTerm } = useGlobalContext();

  const handleHistoryClick = (term) => {
    setSearchTerm(term);
  };

  return (
    <HistoryContainer>
      <Title>History</Title>
      <HistoryList>
        {history.map((term, index) => (
          <HistoryItem key={index} onClick={() => handleHistoryClick(term)}>
            {term}
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
};

export default SearchHistory;
