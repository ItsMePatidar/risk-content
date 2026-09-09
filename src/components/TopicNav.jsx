import './TopicNav.css'

function TopicNav({ prev, next, onSelectTopic }) {
  if (!prev && !next) return null

  return (
    <nav className="topic-nav" aria-label="Topic navigation">
      {prev ? (
        <button
          type="button"
          className="topic-nav-link prev"
          onClick={() => onSelectTopic(prev.folder, prev.topic)}
        >
          <span className="topic-nav-label">← Previous</span>
          <span className="topic-nav-title">{prev.topic}</span>
        </button>
      ) : (
        <span />
      )}
      {next ? (
        <button
          type="button"
          className="topic-nav-link next"
          onClick={() => onSelectTopic(next.folder, next.topic)}
        >
          <span className="topic-nav-label">Next →</span>
          <span className="topic-nav-title">{next.topic}</span>
        </button>
      ) : (
        <span />
      )}
    </nav>
  )
}

export default TopicNav
