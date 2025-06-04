abstract class Component {
  isComposite: boolean = false;
  protected _parent: Component | null = null;

  public set parent(parent: Component | null) {
    this._parent = parent;
  }

  public get parent(): Component | null {
    return this._parent;
  }
  public abstract operation(): string;
}

class Leaf extends Component {
  public operation(): string {
    return "Leaf";
  }
}

class Composite extends Component {
  isComposite: boolean = true;
  protected children: Component[] = [];

  public add(component: Component) {
    this.children.push(component);
    component.parent = this;
  }

  public remove(component: Component) {
    const componentIndex = this.children.indexOf(component);
    this.children.splice(componentIndex, 1);
    component.parent = null;
  }

  public operation(): string {
    const result = [];
    for (const child of this.children) {
      result.push(child.operation());
    }
    return `Branch(${result.join("+")})`;
  }
}

function clientCode(component: Component) {
  console.log(component.operation());
}

const leaf = new Leaf();
clientCode(leaf);

const tree = new Composite();
const branch = new Composite();
branch.add(new Leaf());
const branch2 = new Composite();
branch2.add(new Leaf());
branch2.add(new Leaf());
tree.add(branch);
tree.add(branch2);
clientCode(tree);

export default {};
