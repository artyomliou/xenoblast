
enum LogLevel {
  Debug,
  Info,
  Warning,
  Error,
}

class Logger {
  level: LogLevel = LogLevel.Info;

  constructor() {
    if (import.meta.env.DEV) {
      this.level = LogLevel.Info;
    }
  }

  debug(message?: any, ...optionalParams: any[]) {
    if (this.level > LogLevel.Debug) {
      return
    }
    console.debug(message, ...optionalParams);
  }

  info(message?: any, ...optionalParams: any[]) {
    if (this.level > LogLevel.Info) {
      return
    }
    console.info(message, ...optionalParams);
  }

  warn(message?: any, ...optionalParams: any[]) {
    if (this.level > LogLevel.Warning) {
      return
    }
    console.warn(message, ...optionalParams);
  }

  error(message?: any, ...optionalParams: any[]) {
    console.error(message, ...optionalParams);
  }
}

const logger = new Logger(); // singleton
export default logger;