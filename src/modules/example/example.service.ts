import { IReject, IResolve } from "@core/interfaces";
import { SendMessage } from "./example.interfaces";
import { HttpStatus } from "@core/enums";

export class ExampleService {
  
  constructor() {}

  getMessage(): Promise<IResolve<SendMessage>> {
    return new Promise((resolve: (data: IResolve<SendMessage>) => void, reject: (reason: IReject) => void) => { 
      let showError: boolean = false;
      
      if (showError) return reject({
        status: HttpStatus.Server.INTERNAL_SERVER_ERROR,
        msg: 'There\'s an error getting the message.',
        error: null
      });

      resolve({
        status: HttpStatus.Success.CREATED,
        msg: 'This is a message from the server',
        data: {
          title: 'Hello',
          msg: 'Hello, from ExampleService'
        }
      });
    });
  }

  sendMessage(data: SendMessage): Promise<IResolve<SendMessage>> {    
    return new Promise((resolve: (data: IResolve<SendMessage>) => void, reject: (reason: IReject) => void) => {
      let showError: boolean = false;
      
      if (showError) return reject({
        status: HttpStatus.Server.INTERNAL_SERVER_ERROR,
        msg: 'There\'s an error sending message.',
        error: null
      });

      resolve({
        status: HttpStatus.Success.CREATED,
        msg: 'Message sent.',
        data
      });
    });
  }
}