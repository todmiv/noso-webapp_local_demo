import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { default: HomePage } = await import('./pages/HomePage');
          return { Component: HomePage };
        }
      },
      {
        path: "documents",
        lazy: async () => {
          const { default: DocumentsPage } = await import('./pages/DocumentsPage');
          return { Component: DocumentsPage };
        }
      },
      {
        path: "chat",
        lazy: async () => {
          const { default: ChatAgentPage } = await import('./pages/ChatAgentPage');
          return { Component: ChatAgentPage };
        }
      },
      {
        path: "document/:id",
        lazy: async () => {
          const { default: DocumentViewPage } = await import('./pages/DocumentViewPage');
          return { Component: DocumentViewPage };
        }
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
