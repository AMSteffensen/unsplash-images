import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "./context";

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
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  if (error)
    return (
      <section className="image-container">
        <h4>There was an error</h4>
      </section>
    );

  const results = data?.results;
  if (!results || results.length === 0) {
    return (
      <section className="image-container">
        <h4>No results found</h4>
      </section>
    );
  }

  return (
    <div>
      <h2>Gallery</h2>
      <div>
        {results.map((item) => {
          const url = item?.urls?.regular;
          return (
            <img
              key={item.id}
              src={url}
              alt={item.alt_description}
              className="img"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
