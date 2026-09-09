import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './Markdown.css'

function Markdown({ children }) {
  return (
    <article className="markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
    </article>
  )
}

export default Markdown
