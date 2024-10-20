import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../context";
import styled from "styled-components";

export const ImageContainer = styled.section`
  width: 100%;
  max-width: var(--max-width);
  margin: 3rem auto;
  padding: 1rem;
  text-align: center;
  display: grid;
  gap: 2rem;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Title = styled.section`
  margin: 0 auto;
  padding: 1rem;
  text-align: center;
`;

export const ImageGallery = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 15rem;
  object-fit: cover;
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-1);
`;

// Use different base URL for local vs production
const BASE_URL = import.meta.env.DEV
  ? "http://localhost:8888/.netlify/functions" // Local Netlify functions during development
  : "/.netlify/functions"; // Production

const Gallery = () => {
  const { searchTerm } = useGlobalContext();

  const { data, error, isLoading } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(
        `${BASE_URL}/unsplash-proxy?query=${searchTerm}`
      );
      return result.data;
    },
  });

  if (isLoading)
    return (
      <ImageContainer>
        <h4>Loading...</h4>
      </ImageContainer>
    );
  if (error)
    return (
      <ImageContainer>
        <h4>There was an error</h4>
      </ImageContainer>
    );

  const results = data?.results;
  if (!results || results.length === 0) {
    return (
      <ImageContainer>
        <h4>No results found</h4>
      </ImageContainer>
    );
  }

  return (
    <div>
      <Title>Gallery</Title>
      <ImageGallery>
        {results.map((item) => {
          const url = item?.urls?.regular;
          return <Image key={item.id} src={url} alt={item.alt_description} />;
        })}
      </ImageGallery>
    </div>
  );
};

export default Gallery;
