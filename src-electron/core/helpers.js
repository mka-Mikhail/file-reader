export class MainWindow {
	constructor() {
		if (!!MainWindow.instance) {
			return MainWindow.instance
		}
		MainWindow.instance = this
		return this
	}
	setWindow(window) {
		this.window = window
	}
}