import { createBrowserRouter, Navigate } from 'react-router'
import { SiteLayout } from './components/layout/SiteLayout'
import { PortfolioPage } from './pages/PortfolioPage'
import { CurriculumPage } from './pages/CurriculumPage'
import { CollectionPage } from './pages/CollectionPage'
import { ArticlePage } from './pages/ArticlePage'
import { ResourcePage } from './pages/ResourcePage'
import { PythonEmulatorPage } from './pages/PythonEmulatorPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { aLevelPage, gcsePage } from './content/curriculum'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { index: true, element: <PortfolioPage /> },
      { path: 'portfolio', element: <Navigate to="/" replace /> },
      { path: 'a-level', element: <CurriculumPage content={aLevelPage} /> },
      { path: 'gcse', element: <CurriculumPage content={gcsePage} /> },
      { path: 'resources/:level/:board/:topic', element: <ResourcePage /> },
      { path: 'python-emulator', element: <PythonEmulatorPage /> },
      { path: 'super-curricular', element: <CollectionPage collection="super-curricular" /> },
      { path: 'super-curricular/:slug', element: <ArticlePage collection="super-curricular" /> },
      { path: 'extras', element: <CollectionPage collection="extras" /> },
      { path: 'extras/:slug', element: <ArticlePage collection="extras" /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
