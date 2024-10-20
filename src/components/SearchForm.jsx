import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: var(--primary-500);
`;

const Form = styled.form`
  width: var(--view-width);
  max-width: var(--max-width);
  margin: 0 auto;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 1fr auto;
`;

const Input = styled.input`
  border-color: var(--grey-300);
  transition: var(--darkModeTransition);
  color: var(--black);
  border-radius: 0;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 15px 15px;
  border: none;
  border-radius: 0;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const SearchForm = ({ setSearchHistory }) => {
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value.trim();
    if (!searchValue) return;

    setSearchTerm(searchValue);

    // Update search history in the App component
    setSearchHistory((prevHistory) => {
      if (!prevHistory.includes(searchValue)) {
        return [searchValue, ...prevHistory];
      }
      return prevHistory;
    });

    // Clear the input field
    e.target.reset();
  };

  return (
    <>
      <Title>Unsplash Images</Title>
      <Form className="search-form" onSubmit={handleSubmit}>
        <Input type="text" name="search" placeholder="Search for images..." />
        <Button type="submit">Search</Button>
      </Form>
    </>
  );
};

export default SearchForm;
