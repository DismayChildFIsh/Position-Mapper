import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.tsx'

// root要素をReactのルートに設定し、Appコンポーネントをレンダリング
createRoot(document.getElementById('root')!).render(
  // 開発時にバグを知らせてくれる特別なコンポーネント
  <StrictMode>
    {/* アプリケーション本体 */}
    <App />
  </StrictMode>,
)
