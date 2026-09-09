import { useEffect, useRef, useState } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Markdown from './components/Markdown'
import TopicNav from './components/TopicNav'
import { folders, getAdjacentTopics, getTopics, loadTopic } from './content/loader'
import { useTheme } from './hooks/useTheme'
import './App.css'

const initialFolder = folders[0] ?? null
const initialTopic = initialFolder ? (getTopics(initialFolder)[0] ?? null) : null

function App() {
  const [folder, setFolder] = useState(initialFolder)
  const [topic, setTopic] = useState(initialTopic)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const contentPaneRef = useRef(null)

  useEffect(() => {
    if (!folder || !topic) {
      setContent('')
      return
    }
    let cancelled = false
    setLoading(true)
    loadTopic(folder, topic)
      .then((text) => {
        if (!cancelled) setContent(text)
      })
      .catch(() => {
        if (!cancelled) setContent(`Could not load "${topic}".`)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [folder, topic])

  useEffect(() => {
    contentPaneRef.current?.scrollTo({ top: 0 })
  }, [folder, topic])

  const { prev, next } = folder && topic ? getAdjacentTopics(folder, topic) : { prev: null, next: null }

  function handleSelectTopic(nextFolder, nextTopic) {
    setFolder(nextFolder)
    setTopic(nextTopic)
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((v) => !v)}
        theme={theme}
        onToggleTheme={toggleTheme}
        onLogoClick={() => {
          setSidebarOpen(false)
          handleSelectTopic(initialFolder, initialTopic)
        }}
      />
      <div className="layout">
        <Sidebar
          folders={folders}
          activeFolder={folder}
          activeTopic={topic}
          onSelectTopic={handleSelectTopic}
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main className="content-pane" id="main-content" tabIndex={-1} ref={contentPaneRef}>
          {loading ? (
            <div className="skeleton" aria-hidden="true">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line" />
              <div className="skeleton-line" />
              <div className="skeleton-line skeleton-short" />
            </div>
          ) : (
            <>
              <Markdown>{content}</Markdown>
              <TopicNav prev={prev} next={next} onSelectTopic={handleSelectTopic} />
            </>
          )}
        </main>
      </div>
    </>
  )
}

export default App
