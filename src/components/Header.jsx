import './Header.css'

function MenuIcon({ open }) {
  return open ? (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 5l10 10M15 5L5 15" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M3 5h14M3 10h14M3 15h14" />
    </svg>
  )
}

function ThemeIcon({ theme }) {
  return theme === 'dark' ? (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M10 2.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2.5Zm0 12.25a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75ZM17.5 10a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm-12.25 0a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 .75.75Zm10.02-6.02a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0ZM6.55 14.39a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0Zm8.9 2.12a.75.75 0 0 1-1.06 0l-1.06-1.06a.75.75 0 1 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM5.49 5.49a.75.75 0 0 1-1.06 0L3.37 4.43a.75.75 0 0 1 1.06-1.06l1.06 1.06a.75.75 0 0 1 0 1.06ZM10 6a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M17.293 13.293A8 8 0 0 1 6.707 2.707a.75.75 0 0 0-.92-1.079A9.5 9.5 0 1 0 18.372 14.213a.75.75 0 0 0-1.079-.92Z" />
    </svg>
  )
}

function Header({ sidebarOpen, onToggleSidebar, theme, onToggleTheme, onLogoClick }) {
  return (
    <header className="site-header">
      <button
        type="button"
        className="icon-button menu-button"
        aria-label={sidebarOpen ? 'Close navigation' : 'Open navigation'}
        aria-expanded={sidebarOpen}
        onClick={onToggleSidebar}
      >
        <MenuIcon open={sidebarOpen} />
      </button>
      <button type="button" className="site-title" onClick={onLogoClick}>
        <svg className="site-logo" width="20" height="20" viewBox="0 0 21 20" aria-hidden="true">
          <use href="/icons.svg#documentation-icon" />
        </svg>
        Risk Content
      </button>
      <div className="header-spacer" />
      <button
        type="button"
        className="icon-button theme-toggle"
        aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
        onClick={onToggleTheme}
      >
        <ThemeIcon theme={theme} />
      </button>
    </header>
  )
}

export default Header
