import { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';

function App() {
  const rawApiUrl = import.meta.env.VITE_API_URL || '';
  const apiUrl = rawApiUrl.replace(/\/+$/, '');

  // Search state
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [activeQuery, setActiveQuery] = useState('');
  const [searchLatency, setSearchLatency] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Connectivity test state (perserved from skeleton)
  const [showTester, setShowTester] = useState(false);
  const [testLoading, setTestLoading] = useState(null);
  const [testOutput, setTestOutput] = useState(null);
  const [testError, setTestError] = useState(null);

  const handleSearch = async (queryText) => {
    if (!queryText.trim()) return;

    setIsSearching(true);
    setActiveQuery(queryText);
    setSearchError(null);
    setHasSearched(true);

    const startTime = performance.now();
    const endpoint = `${apiUrl || 'http://localhost:5001'}/api/search`;

    try {
      const response = await axios.post(endpoint, {
        query: queryText,
        limit: 8,
      });

      const elapsed = Math.round(performance.now() - startTime);
      setSearchLatency(elapsed);

      if (response.data?.success) {
        setSearchResults(response.data.data.results || []);
      } else {
        setSearchError(response.data?.error || 'Failed to fetch search results');
        setSearchResults([]);
      }
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      setSearchLatency(elapsed);
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Network error contacting search API';
      setSearchError(msg);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleRunTest = async (type, endpoint) => {
    setTestLoading(type);
    setTestError(null);
    setTestOutput(null);

    const targetUrl = `${apiUrl || 'http://localhost:5001'}${endpoint}`;
    try {
      const res = await axios.get(targetUrl);
      setTestOutput(res.data);
    } catch (err) {
      setTestError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message
      );
    } finally {
      setTestLoading(null);
    }
  };

  return (
    <div className="container">
      {/* App Header */}
      <header className="header">
        <div className="header-badge">🧠 Semantic Group Chat Search</div>
        <h1 className="title">ChatMind</h1>
        <p className="subtitle">
          Search WhatsApp archives by <strong>meaning and intent</strong>, not just keywords.
          Find hidden decisions, venues, and plans even with zero word overlap.
        </p>

        {/* Dataset Stats Pills */}
        <div className="stats-row">
          <span className="stat-pill">💬 4,991 Indexed Messages</span>
          <span className="stat-pill">👥 8 Participants</span>
          <span className="stat-pill">⚡ Atlas $vectorSearch (384-dim)</span>
        </div>
      </header>

      {/* Main Search Component */}
      <SearchBar onSearch={handleSearch} isLoading={isSearching} />

      {/* Search Results Feed */}
      <SearchResults
        results={searchResults}
        query={activeQuery}
        latency={searchLatency}
        hasSearched={hasSearched}
        error={searchError}
      />

      {/* Developer & Connectivity Diagnostics Drawer */}
      <section className="diagnostics-section">
        <button
          type="button"
          className="btn-toggle-diagnostics"
          onClick={() => setShowTester(!showTester)}
        >
          <span>{showTester ? '▼ Hide System Diagnostics' : '▶ Show System Diagnostics & Health Check'}</span>
        </button>

        {showTester && (
          <div className="diagnostics-drawer">
            <div className="diag-meta-row">
              <span className="diag-label">Target Backend API:</span>
              <code className="diag-code">{apiUrl || 'http://localhost:5001'}</code>
            </div>

            <div className="diag-actions">
              <button
                id="btn-check-health"
                className="btn-diag health"
                onClick={() => handleRunTest('health', '/api/health')}
                disabled={testLoading !== null}
              >
                {testLoading === 'health' ? 'Checking...' : 'Check Health (GET /api/health)'}
              </button>

              <button
                id="btn-check-db"
                className="btn-diag db"
                onClick={() => handleRunTest('db', '/api/test-db')}
                disabled={testLoading !== null}
              >
                {testLoading === 'db' ? 'Checking...' : 'Check DB (GET /api/test-db)'}
              </button>

              <button
                id="btn-check-seed-status"
                className="btn-diag seed"
                onClick={() => handleRunTest('seed', '/api/seed/status')}
                disabled={testLoading !== null}
              >
                {testLoading === 'seed' ? 'Checking...' : 'Check Messages Count (GET /api/seed/status)'}
              </button>
            </div>

            {testError && (
              <div className="diag-error">
                ⚠️ {testError}
              </div>
            )}

            {testOutput && (
              <pre className="diag-output">
                {JSON.stringify(testOutput, null, 2)}
              </pre>
            )}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer-info">
        ChatMind &bull; Built with React, Vite, Express &amp; MongoDB Atlas Vector Search
      </footer>
    </div>
  );
}

export default App;
