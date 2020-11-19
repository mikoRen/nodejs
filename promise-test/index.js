const fs = require('fs');
const path = require('path');
const { resolve } = require('path');
const { rejects } = require('assert');




//callback 方式获取一个文件的内容
// function getFileContent (fileName,callback) {
// 	//获取绝对路径
// 	const fullFileName = path.resolve(__dirname,'files',fileName);
// 	fs.readFile(fullFileName,(err,data) => {
// 		if(err) {
// 			console.error(err);
// 			return
// 		}
// 		callback(
// 			JSON.parse(data.toString())
// 		);
// 	})
// }

//  callback-hell 非常不好 所以要用Promise
// getFileContent('a.json',aData => {
// 	console.log('a data',aData);
// 	getFileContent(aData.next,bData => {
// 		console.log('b data',bData);
// 		getFileContent(bData.next,cData => {
// 			console.log('c data',cData);
// 		})
// 	})
// })

// Promise的实现方式
function getFileContent(fileName) {
	const promise = new Promise((resolve,reject) => {
		const fullFileName = path.resolve(__dirname,'files',fileName);
		fs.readFile(fullFileName,(err,data) => {
			if(err) {
				reject(err)
				return
			}
			resolve(
				JSON.parse(data.toString())
			);
		})
	})
	return promise;
}

getFileContent('a.json').then(aData => {
	console.log('a Data', aData);
	return getFileContent(aData.next)
}).then(bData => {
	console.log('b Data',bData);
	return getFileContent(bData.next);
}).then(cData => {
	console.log('c Data',cData);
})

// 还有更方便的实现方法
// asyn await
//koa2