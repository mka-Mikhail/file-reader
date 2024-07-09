import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
	invoke(channel, data) {
		ipcRenderer.invoke(channel, data)
	},
	on(channel, data) {
		ipcRenderer.on(channel, data)
	}
})
