import { useState } from 'react';

const SUGGESTED_QUERIES = [
  { label: '🏔️ Vacation Decision (0-word overlap)', text: 'when did we decide on the vacation destination' },
  { label: '🍻 Dinner Meetup (0-word overlap)', text: 'which eatery was chosen for our weekend meetup' },
  { label: '⏰ Deadline Cutoff (0-word overlap)', text: 'what is the official cutoff time for project deliverables' },
  { label: '💰 Group Gift Cash (0-word overlap)', text: 'how much cash should each participant contribute for the group gift' },
  { label: '🏨 Goa Hotel Budget', text: 'what did Priya say about hotel prices for Goa' },
  { label: '🍜 Indiranagar Food', text: 'which ramen restaurant did Ananya recommend in Indiranagar' },
];

function SearchBar({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleChipClick = (text) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <div className="search-section">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="search-input"
            type="text"
            className="search-input"
            placeholder="Ask anything naturally (e.g. 'when did we decide on Manali' or 'what did Priya say about hotels')..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            autoFocus
          />
          {query && !isLoading && (
            <button
              type="button"
              className="btn-clear"
              onClick={() => setQuery('')}
              title="Clear query"
            >
              ✕
            </button>
          )}
        </div>
        <button
          id="btn-search-submit"
          type="submit"
          className="btn-search-primary"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner" style={{ width: 14, height: 14 }} />
              <span>Searching...</span>
            </>
          ) : (
            <span>Search</span>
          )}
        </button>
      </form>

      {/* Suggested Query Chips */}
      <div className="suggestions-container">
        <span className="suggestions-label">Try asking:</span>
        <div className="chips-wrapper">
          {SUGGESTED_QUERIES.map((chip, idx) => (
            <button
              key={idx}
              type="button"
              className="chip-btn"
              onClick={() => handleChipClick(chip.text)}
              disabled={isLoading}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
