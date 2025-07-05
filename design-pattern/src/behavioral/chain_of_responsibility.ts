interface Handler<Request = string, Result = string> {
  setNext(handler: Handler<Request, Result>): Handler<Request, Result>;
  handle(request: Request): Result;
}

abstract class AbstractHandler implements Handler {
  private nextHandler: Handler | null = null;
  public setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return "丢弃请求 " + request;
  }
}

class HandlerA extends AbstractHandler {
  public handle(request: string): string {
    if (request.toLowerCase().includes("a")) {
      return `处理器 A: 请求 ${request} 完成`;
    }
    return "处理器 A => " + super.handle(request);
  }
}

class HandlerB extends AbstractHandler {
  public handle(request: string): string {
    if (request.toLowerCase().includes("b")) {
      return `处理器 B: 请求 ${request} 完成`;
    }
    return "处理器 B => " + super.handle(request);
  }
}

class HandlerC extends AbstractHandler {
  public handle(request: string): string {
    if (request.toLowerCase().includes("c")) {
      return `处理器 C: 请求 ${request} 完成`;
    }
    return super.handle(request);
  }
}

function clientCode(handler: Handler) {
  const requests = ["requestA", "requestB", "requestC"];
  for (const request of requests) {
    console.log(handler.handle(request));
  }
}

const handlerA = new HandlerA();
const handlerB = new HandlerB();
const handlerC = new HandlerC();

handlerA.setNext(handlerB).setNext(handlerC);
clientCode(handlerA);
clientCode(handlerB);

export default {};
