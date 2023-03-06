export class MyProcessData {

  constructor(
    public creditor: string,
    public amount: string,
    public invoiceNumber: boolean,
    public reviewer: string,
  ) {  }

}

export class StartNewProcess {

  constructor(
    public firstName: string,
    public lastName: string,
    public type: string,
  ) {  }

}

