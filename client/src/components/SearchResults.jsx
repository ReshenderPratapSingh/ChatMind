import SearchResultCard from './SearchResultCard';

function SearchResults({ results, query, latency, hasSearched, error }) {
  if (error) {
    return (
      <div className="search-error-card">
        <div className="error-icon">⚠️</div>
        <h3>Search Request Failed</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="search-welcome-state">
        <div className="welcome-icon">💬</div>
        <h3>Semantic Group Chat Search</h3>
        <p>
          ChatMind searches by <strong>meaning and intent</strong>, not just keyword matching.
          Surface decisions, recommendations, and plans buried deep inside 4,000+ messages even when they share zero words with your query.
        </p>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="search-empty-state">
        <div className="empty-icon">🔍</div>
        <h3>No matching messages found</h3>
        <p>
          No conversations closely matched &ldquo;<strong>{query}</strong>&rdquo;.
          Try rephrasing your question or explore one of the recommended queries above.
        </p>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="results-summary-bar">
        <span className="results-count">
          Found <strong>{results.length}</strong> matching conversation{results.length === 1 ? '' : 's'}
        </span>
        {latency !== null && (
          <span className="results-latency">
            ⚡ {latency} ms (MongoDB Atlas $vectorSearch)
          </span>
        )}
      </div>

      <div className="results-list">
        {results.map((item, index) => (
          <SearchResultCard
            key={item._id || index}
            result={item}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
