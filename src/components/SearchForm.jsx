// SearchForm.js
import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context";

const Title = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Input = styled.input`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
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
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="search" placeholder="Search for images..." />
        <Button type="submit">Search</Button>
      </Form>
    </>
  );
};

export default SearchForm;
