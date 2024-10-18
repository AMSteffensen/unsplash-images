import { useGlobalContext } from "./context";

const SearchForm = () => {
  // Correctly calling useGlobalContext() to get the values
  const { setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements);
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue); // Updating global context with the search value
    console.log(searchValue);
  };

  return (
    <>
      <h1 className="title">Unsplash Images</h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-input search-input"
          name="search"
          placeholder="cat"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchForm;
