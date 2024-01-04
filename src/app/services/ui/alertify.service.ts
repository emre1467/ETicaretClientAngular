import { Injectable } from '@angular/core';
declare var alertify: any

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  message(message: string,options:AlertifyOptions){
    alertify.set("notifier","delay",options.delay);
    alertify.set("notifier","position",options.position);
    alertify[options.messageType](message);
  }
}

export class AlertifyOptions{
  messageType:MessageType=MessageType.Message;
  delay:number=3;
  position:Position=Position.BottomRight

}

export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Success="success",
  Warning="warning"
}
export enum Position{
  TopCenter="top-center",
  TopRight="top-right",
  TopLeft="top-left",
  BottomRight="bottom-right",
  BottomCenter="bottom-center",
  BottomLeft="bottom-left"
}
