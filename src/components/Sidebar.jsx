import { useState } from 'react'
import { getTopics } from '../content/loader'
import './Sidebar.css'

function Sidebar({ folders, activeFolder, activeTopic, onSelectTopic, open, onClose }) {
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

  function handleSelectTopic(folder, t) {
    onSelectTopic(folder, t)
    onClose?.()
  }

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} aria-hidden="true" />}
      <aside className={`sidebar${open ? ' open' : ''}`}>
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
                  {getTopics(folder).map((t) => {
                    const isActive = folder === activeFolder && t === activeTopic
                    return (
                      <button
                        key={t}
                        type="button"
                        className={`topic-item${isActive ? ' active' : ''}`}
                        aria-current={isActive ? 'page' : undefined}
                        onClick={() => handleSelectTopic(folder, t)}
                      >
                        {t}
                      </button>
                    )
                  })}
                </nav>
              )}
            </div>
          )
        })}
      </aside>
    </>
  )
}

export default Sidebar
