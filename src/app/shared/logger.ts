interface IMessage { message: string; error?: any; status?: any }
export const logger = (messageObject: IMessage) => console.log(messageObject);
