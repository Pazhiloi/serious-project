import { resolve } from 'path'
import { lazy } from 'react'

export const ArticleEditPageAsync = lazy(async () => await new Promise(resolve => {
  // @ts-expect-error
  setTimeout(() => resolve(import('./ArticleEditPage')), 400)
}))