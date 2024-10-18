import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "./context";

const API_KEY = import.meta.env.VITE_API_KEY;
const url = `https://api.unsplash.com/search/photos?client_id=${API_KEY}`;

const Gallery = () => {
  const { searchTerm } = useGlobalContext();
  const { data, error, isLoading } = useQuery({
    queryKey: ["images", searchTerm],
    queryFn: async () => {
      const result = await axios.get(`${url}&query=${searchTerm}`);
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

  // Check if there are results
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
        {results?.map((item) => {
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
