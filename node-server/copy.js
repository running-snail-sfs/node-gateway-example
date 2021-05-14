const fs = require('fs-extra')
const chalk = require('chalk');
 function copyFiles () {
     console.log(process.cwd()+'/dist');
     console.log(process.cwd()+'/node-server');
    try {
    fs.copy(process.cwd()+'/dist', process.cwd()+'/node-server')
      console.log(chalk.green('copy文件success!'))
    } catch (err) {
      console.error(err)
    }
  }
  
  copyFiles()