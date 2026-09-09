import { useState } from 'react'
import { getTopics } from '../content/loader'
import './Sidebar.css'

function Sidebar({ folders, activeFolder, activeTopic, onSelectTopic }) {
  const [openFolders, setOpenFolders] = useState(() => new Set([activeFolder]))

  function toggleFolder(folder) {
    setOpenFolders((prev) => {
      const next = new Set(prev)
      if (next.has(folder)) {
        next.delete(folder)
      } else {
        next.add(folder)
      }
      return next
    })
  }

  return (
    <aside className="sidebar">
      {folders.map((folder) => {
        const isOpen = openFolders.has(folder)
        return (
          <div className="folder-section" key={folder}>
            <button
              type="button"
              className="folder-header"
              aria-expanded={isOpen}
              onClick={() => toggleFolder(folder)}
            >
              <span className={`chevron${isOpen ? ' open' : ''}`} aria-hidden="true">
                ▸
              </span>
              {folder}
            </button>
            {isOpen && (
              <nav className="topic-list">
                {getTopics(folder).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`topic-item${
                      folder === activeFolder && t === activeTopic ? ' active' : ''
                    }`}
                    onClick={() => onSelectTopic(folder, t)}
                  >
                    {t}
                  </button>
                ))}
              </nav>
            )}
          </div>
        )
      })}
    </aside>
  )
}

export default Sidebar
