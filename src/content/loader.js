import rootIndexRaw from './index.md?raw'

const indexModules = import.meta.glob('./*/index.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

const topicModules = import.meta.glob('./*/*.md', {
  query: '?raw',
  import: 'default',
})

function folderFromIndexPath(path) {
  return path.slice('./'.length, -'/index.md'.length)
}

const orderedNames = rootIndexRaw
  .split('\n')
  .map((line) => line.trim())
  .filter(Boolean)

const availableFolders = new Set(Object.keys(indexModules).map(folderFromIndexPath))

const unlisted = [...availableFolders]
  .filter((name) => !orderedNames.includes(name))
  .sort()

export const folders = [
  ...orderedNames.filter((name) => availableFolders.has(name)),
  ...unlisted,
]

export function getTopics(folder) {
  const raw = indexModules[`./${folder}/index.md`] ?? ''
  return raw
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function loadTopic(folder, topic) {
  const loader = topicModules[`./${folder}/${topic}.md`]
  if (!loader) {
    return Promise.reject(new Error(`Topic not found: ${folder}/${topic}`))
  }
  return loader()
}

const flatTopics = folders.flatMap((folder) =>
  getTopics(folder).map((topic) => ({ folder, topic })),
)

export function getAdjacentTopics(folder, topic) {
  const index = flatTopics.findIndex(
    (item) => item.folder === folder && item.topic === topic,
  )
  if (index === -1) return { prev: null, next: null }
  return {
    prev: index > 0 ? flatTopics[index - 1] : null,
    next: index < flatTopics.length - 1 ? flatTopics[index + 1] : null,
  }
}
