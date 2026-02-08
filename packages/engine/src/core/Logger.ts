export type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  private enabled = import.meta.env.MODE !== "production";

  constructor(private scope: string) {}

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  private log(level: LogLevel, message: string, ...args: unknown[]) {
    if (!this.enabled && level === "debug") {
      return;
    }
    const prefix = `[${this.scope}]`;
    if (level === "debug") {
      console.debug(prefix, message, ...args);
    } else if (level === "info") {
      console.info(prefix, message, ...args);
    } else if (level === "warn") {
      console.warn(prefix, message, ...args);
    } else {
      console.error(prefix, message, ...args);
    }
  }

  debug(message: string, ...args: unknown[]) {
    this.log("debug", message, ...args);
  }

  info(message: string, ...args: unknown[]) {
    this.log("info", message, ...args);
  }

  warn(message: string, ...args: unknown[]) {
    this.log("warn", message, ...args);
  }

  error(message: string, ...args: unknown[]) {
    this.log("error", message, ...args);
  }
}
