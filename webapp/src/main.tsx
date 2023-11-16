import App from '/src/App.tsx'
import store from "/src/app/store.ts"
import "bootstrap/dist/css/bootstrap.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
)

// Remove Preload scripts loading
postMessage({payload: 'removeLoading'}, '*')

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})
