import * as jquery from "jquery";

declare global {
  interface JQuery {
    datetimepicker(options?: any): JQuery;
    data(key: string): any;
  }
}
