export default class Logger {
    private static instance: Logger;
    private logs: string[] = [];
  
    private constructor() {
    }
  
    public static getInstance(): Logger {
      if (!Logger.instance) {
        Logger.instance = new Logger();
      }
      return Logger.instance;
    }
  
    public log(message: string): void {
      console.log(message);
    }
}