import path from 'path';
import fse from 'fs-extra';
import * as execa from 'execa';

const exampleDir = path.resolve(__dirname, '../e2e/playground/basic');
// 将子进程 log 信息传递到父进程里面
const defaultExecaOpts = {
  cwd: exampleDir,
  stdout: process.stdout,
  stdin: process.stdin,
  stderr: process.stderr
};

async function prepareE2E() {
  // ensure after build 产物不存在则执行打包命令
  if (!fse.existsSync(path.resolve(__dirname, '../dist'))) {
    // exec build command
    execa.commandSync('pnpm build', {
      cwd: path.resolve(__dirname, '../')
    });
  }

  // 安装无头浏览器
  execa.commandSync('npx playwright install', {
    cwd: path.join(__dirname, '../'),
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  // 启动
  execa.commandSync('pnpm i', {
    cwd: exampleDir,
    stdout: process.stdout,
    stdin: process.stdin,
    stderr: process.stderr
  });

  // exec dev command
  execa.commandSync('pnpm dev', defaultExecaOpts);
}

prepareE2E();
