abstract class Creator {
  public abstract factoryMethod(): Product;
}

interface Product {
  operation(): string;
}
