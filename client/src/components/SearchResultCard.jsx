function formatTimestamp(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatTimeOnly(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

// Consistent avatar background colors for participants
const PARTICIPANT_COLORS = {
  Priya: '#ec4899',   // pink
  Aarav: '#3b82f6',   // blue
  Rohan: '#8b5cf6',   // purple
  Ananya: '#f59e0b',  // amber
  Kabir: '#10b981',   // emerald
  Neha: '#06b6d4',    // cyan
  Vikram: '#ef4444',  // red
  Sneha: '#6366f1',   // indigo
};

function getSenderColor(sender) {
  return PARTICIPANT_COLORS[sender] || '#38bdf8';
}

function SearchResultCard({ result, rank }) {
  const { sender, text, timestamp, score, context } = result;
  const matchPercentage = Math.min(100, Math.round(score * 100));

  return (
    <article className="result-card">
      {/* Card Header: Score & Timestamp */}
      <header className="result-card-header">
        <div className="rank-and-score">
          <span className="rank-badge">#{rank}</span>
          <span
            className={`score-pill ${
              matchPercentage >= 70
                ? 'score-high'
                : matchPercentage >= 55
                ? 'score-med'
                : 'score-low'
            }`}
          >
            {matchPercentage}% Match ({score.toFixed(3)})
          </span>
        </div>
        <time className="result-timestamp" dateTime={timestamp}>
          📅 {formatTimestamp(timestamp)}
        </time>
      </header>

      {/* Conversation Thread Feed */}
      <div className="thread-timeline">
        {/* Messages Before */}
        {context?.before && context.before.length > 0 && (
          <div className="context-group context-before">
            <div className="context-label">Earlier messages</div>
            {context.before.map((msg, idx) => (
              <div key={msg._id || idx} className="thread-msg dimmed">
                <span
                  className="msg-sender"
                  style={{ color: getSenderColor(msg.sender) }}
                >
                  {msg.sender}:
                </span>
                <span className="msg-text">{msg.text}</span>
                <span className="msg-time">{formatTimeOnly(msg.timestamp)}</span>
              </div>
            ))}
          </div>
        )}

        {/* PRIMARY MATCHED MESSAGE */}
        <div className="thread-msg matched-msg">
          <div className="matched-msg-indicator">
            <span className="match-tag">🎯 Matched Message</span>
          </div>
          <div className="matched-msg-content">
            <div className="matched-sender-avatar" style={{ backgroundColor: getSenderColor(sender) }}>
              {sender ? sender[0] : 'U'}
            </div>
            <div className="matched-body">
              <div className="matched-meta">
                <span className="matched-sender" style={{ color: getSenderColor(sender) }}>
                  {sender}
                </span>
                <span className="matched-time">{formatTimestamp(timestamp)}</span>
              </div>
              <p className="matched-text">{text}</p>
            </div>
          </div>
        </div>

        {/* Messages After */}
        {context?.after && context.after.length > 0 && (
          <div className="context-group context-after">
            <div className="context-label">Following responses</div>
            {context.after.map((msg, idx) => (
              <div key={msg._id || idx} className="thread-msg dimmed">
                <span
                  className="msg-sender"
                  style={{ color: getSenderColor(msg.sender) }}
                >
                  {msg.sender}:
                </span>
                <span className="msg-text">{msg.text}</span>
                <span className="msg-time">{formatTimeOnly(msg.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default SearchResultCard;
