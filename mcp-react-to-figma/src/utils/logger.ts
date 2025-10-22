/**
 * Logger utilities with colors and formatting
 */

import chalk from 'chalk';

export class Logger {
  private verbose: boolean;

  constructor(verbose: boolean = false) {
    this.verbose = verbose;
  }

  info(message: string) {
    console.log(chalk.blue('ℹ'), message);
  }

  success(message: string) {
    console.log(chalk.green('✓'), message);
  }

  warn(message: string) {
    console.log(chalk.yellow('⚠'), message);
  }

  error(message: string, error?: Error) {
    console.log(chalk.red('✗'), message);
    if (error && this.verbose) {
      console.error(chalk.gray(error.stack || error.message));
    }
  }

  debug(message: string, data?: any) {
    if (this.verbose) {
      console.log(chalk.gray('  '), chalk.gray(message));
      if (data) {
        console.log(chalk.gray('  '), chalk.gray(JSON.stringify(data, null, 2)));
      }
    }
  }

  step(current: number, total: number, message: string) {
    console.log(chalk.cyan(`[${current}/${total}]`), message);
  }

  section(title: string) {
    console.log();
    console.log(chalk.bold.cyan(`━━━ ${title} ━━━`));
  }

  link(label: string, url: string) {
    console.log(chalk.blue('🔗'), label + ':', chalk.underline(url));
  }

  code(code: string) {
    console.log(chalk.gray('  '), chalk.bgGray(chalk.white(` ${code} `)));
  }
}

export const logger = new Logger();




