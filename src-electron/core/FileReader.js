import { ipcMain } from 'electron'
import fs from 'node:fs'
import path from 'node:path'
import readXlsxFile from 'read-excel-file'
import csvParser from 'csv-parser'
import { MainWindow } from './helpers'

export default class FileReader {
	constructor() {
		this.allDataFromFile = []

		ipcMain.handle('read-file', (event, pathToFile) => {
			let fileExtension = path.extname(pathToFile)
			switch (fileExtension) {
				case '.csv':
					this.readCSV(pathToFile)
					break
				case '.xlsx':
					this.readXLSX(pathToFile)
					break
			}
		})
	}

	async readXLSX(pathToFile) {
		let namesOfVariables = (await readXlsxFile(pathToFile)).at(0)
		let map = {}
		namesOfVariables.forEach((name) => {
			map[name] = name
		})
		this.allDataFromFile = (await readXlsxFile(pathToFile, { map })).rows
		new MainWindow().window.webContents.send('file-has-been-read')
	}

	readCSV(pathToFile) {
		fs.createReadStream(pathToFile)
			.pipe(csvParser({ separator: ';' }))
			.on('data', (data) => this.allDataFromFile.push(data))
			.on('end', () => new MainWindow().window.webContents.send('file-has-been-read'))
	}
}