interface Subject {
  request(): void;
}

class SubjectInst implements Subject {
  public request(): void {
    console.log("SubjectInst: Handling request");
  }
}

class MyProxy implements Subject {
  private subjectInst: SubjectInst;

  constructor(subjectInst: SubjectInst) {
    this.subjectInst = subjectInst;
  }

  public request(): void {
    if (this.checkAccess()) {
      this.subjectInst.request();
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    console.log("Proxy: Check access");
    return true;
  }

  private logAccess() {
    console.log("Proxy: Log access");
  }
}

function clientCode(subject: Subject) {
  subject.request();
}

const subjectInst = new SubjectInst();
clientCode(subjectInst);
const myProxy = new MyProxy(subjectInst);
clientCode(myProxy);

export default {};
