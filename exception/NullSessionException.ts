export default class NullSessionException extends Error {
  constructor() {
    super("No Session Detected");
    this.name = "NullSessionException";
  }
}
