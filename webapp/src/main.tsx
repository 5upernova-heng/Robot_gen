import App from '/src/App.tsx'
import store from "/src/app/store.ts"
import "bootstrap/dist/css/bootstrap.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ToastContainer/>
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
