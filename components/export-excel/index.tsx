
import ExcelJS, { Column as ExcelColumn } from 'exceljs'
import {saveAs} from 'file-saver';
import React from 'react';
import { ColumnProps } from '../table';

/**
 * 导出xlsx
 * @param {{header:string,key:string,width:number}} columns 
 * @param {Array} rows 
 * @param {string} fileName 
 * @returns Promise
 */
export const exportXlsx = (columns: Partial<ExcelColumn>[], rows: Array<any>, fileName: string) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet('My Sheet');
	worksheet.columns = columns
	worksheet.addRows(rows);
	worksheet.getRow(1).font = { bold: true };
	if (!fileName) {
		fileName = `${new Date().valueOf()}`
	}
	fileName = /\.xlsx$/.test(fileName) ? fileName : `${fileName}.xlsx`
	return workbook.xlsx.writeBuffer().then(function (buffer) {
		saveAs(new Blob([buffer], { type: "application/octet-stream" }), fileName);
	});
}

/**
 * 获取react dom元素文本
 * @param {*} node 
 * @returns 
 */
const getReactNodeText = (children: any): string => {
	const childrenType = typeof children;
	if (childrenType === 'number' || childrenType === 'string') {
		return children + '';
	}
	if (!children) {
		return '';
	}
	return React.Children.map(children, child => {
		if (!child) {
			return '';
		}
		if (!child.props) {
			return getReactNodeText(child);
		}
		return getReactNodeText(child.props.children);
	}).join(' ');
};



/**
 * 跟table一样的参数类型，自动处理了table render/ title为react node节点的情况
 * @param {*} columns 
 * @param {*} dataSource 
 * @param {*} fileName 
 * @returns 
 */
export const exportTableExcel = (columns: Array<ColumnProps<any>>, dataSource: any[], fileName: string) => {
	dataSource = dataSource.map(row => ({ ...row }))
	columns.forEach((column: any) => {
		if (column.render) {
			dataSource.forEach((row, index) => {
				row[column.dataIndex] = getReactNodeText(column.render(row[column.dataIndex], row, index))
			})
		}
	})
	let excelColumns: Partial<ExcelColumn>[];
	excelColumns = columns.map(column => {
		const width = Number.parseInt(column.width + '');
		return {
			header: getReactNodeText(column.title),
			key: column.dataIndex,
			// Excel 宽度跟Table宽度视觉效果大概相差十倍
			width: isNaN(width) ? 20 : width / 10
		}
	})
	return exportXlsx(excelColumns, dataSource, fileName)
}

export default exportTableExcel;