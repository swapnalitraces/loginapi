import { ILogger } from './ILogger';

export class ConsoleLogger implements ILogger {
  public console: Console;
  public isDebugEnabled: boolean;

  constructor(isDebugEnabled: boolean, console: Console) {
    this.isDebugEnabled = isDebugEnabled;
    this.console = console;
  }

  public debug(message: string): void {
    if (this.isDebugEnabled) {
      this.console.log(message);
    }
  }

  public info(message: string): void {
    this.console.info(message);
  }

  public log(message: string): void {
    this.console.log(message);
  }

  public warn(message: string): void {
    this.console.warn(message);
  }

  public error(message: string): void {
    this.console.error(message);
  }
}
