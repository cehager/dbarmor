import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable()
export class AlertifyService {

  constructor() { }

  confirm(message: string, okCallback: () => any) {
    alertify.confirm(message, function(e) {
      if (e) {
        okCallback();
      } else {

      }
    });
  }

  dialog(label: string, message: string) {
    //let closable = alertify.alert().setting('closable');
    alertify.alert().setHeader('<span style="color:red"><h4><em>dbARMOR Alert!</em></h4></span>');
    alertify.alert().setting({
      'label': label,
      'message': message,
      'closable': true
    }).show();
  }

  success(message: string) {
    alertify.success(message);
  }

  error(message: string) {
    alertify.error(message);
   }

  warning(message: string) {
    alertify.warning(message);
  }

   message(message: string) {
    alertify.message(message);
  }


}
