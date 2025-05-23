interface MyIterator<T> {
  curItem(): T;
  nextItem(): T;
  curIdx(): number;
  isValid(): boolean;
  rewind(): void;
}

class AlphabeticalOlderIterator implements MyIterator<string> {
  private position: number = 0;
  constructor(
    private collection: WordsCollection,
    private reverse: boolean = false,
  ) {
    if (reverse) {
      this.position = collection.getSize() - 1;
    }
  }

  public rewind() {
    this.position = this.reverse ? this.collection.getSize() - 1 : 0;
  }
  public curItem(): string {
    return this.collection.items[this.position];
  }
  public curIdx(): number {
    return this.position;
  }
  public nextItem(): string {
    const item = this.collection.items[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }
  public isValid(): boolean {
    if (this.reverse) {
      return this.position >= 0;
    }
    return this.position < this.collection.getSize();
  }
}

interface Aggregator {
  getIterator(): MyIterator<string>;
}

class WordsCollection implements Aggregator {
  #items: string[] = [];
  public get items(): string[] {
    return this.#items;
  }

  public getSize(): number {
    return this.#items.length;
  }

  public addItem(item: string) {
    this.#items.push(item);
  }

  public getIterator(): MyIterator<string> {
    return new AlphabeticalOlderIterator(this);
  }

  public getReverseIterator(): MyIterator<string> {
    return new AlphabeticalOlderIterator(this, true);
  }
}

const collection = new WordsCollection();
collection.addItem("first");
collection.addItem("second");
collection.addItem("third");

const iterator = collection.getIterator();
while (iterator.isValid()) {
  console.log(iterator.nextItem());
}

const reverseIterator = collection.getReverseIterator();
while (reverseIterator.isValid()) {
  console.log(reverseIterator.nextItem());
}

export default {};
