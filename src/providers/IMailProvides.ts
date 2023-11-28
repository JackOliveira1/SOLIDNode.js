interface IaAddress {
    email: string;
    name: string;
}


export interface IMessagem {
    to: IaAddress;
    from: IaAddress;
    subject: string;
    body: string;
}

export interface IMailProvider {
    sendMail(message: IMessagem): Promise<void>;
}