import './search-bar.css';

export default function SearchBar({ onSearch, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const city = e.target.city.value.trim();
    if (city) {
      onSearch(city);
      e.target.city.value = '';
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          placeholder="Enter city name..."
          disabled={isLoading}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
}
