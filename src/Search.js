import { useSearch } from "./SearchState";

const Search = () => {
  const { searchText, handleSearchChange, displayArray } = useSearch();
  return (
    <div>
      <input
        aria-label="pokemon search"
        placeholder="Pokemon Search"
        value={searchText}
        onChange={(e) => handleSearchChange(e.target.value)}
      />

      {displayArray.map((item) => (
        <div>
          <span>{item.name}</span>
          <img src={item.url} />
        </div>
      ))}
    </div>
  );
};

export default Search;
