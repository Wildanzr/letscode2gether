import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  define: {
    global: 'window'
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          'react-dom': ['react-dom'],
          'react-router-dom': ['react-router-dom'],
          antd: ['antd'],
          'framer-motion': ['framer-motion'],
          'react-icons': ['react-icons'],
          axios: ['axios'],
          sweetalert2: ['sweetalert2'],
          'react-draggable': ['react-draggable'],
          'sweetalert2-react-content': ['sweetalert2-react-content'],
          '@monaco-editor/react': ['@monaco-editor/react'],
          '@ant-design/icons': ['@ant-design/icons'],
          moment: ['moment'],
          yjs: ['yjs'],
          'y-websocket': ['y-websocket'],
          'y-monaco': ['y-monaco'],
          'react-joyride': ['react-joyride'],
          'react-quill': ['react-quill'],
          'socket.io-client': ['socket.io-client']
        }
      }
    }
  }
})
