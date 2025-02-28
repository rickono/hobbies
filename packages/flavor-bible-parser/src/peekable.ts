export class PeekableIterator<T> {
  private iterator: Iterator<T>;
  private _next: IteratorResult<T>;

  constructor(iterable: Iterable<T>) {
    this.iterator = iterable[Symbol.iterator]();
    this._next = this.iterator.next(); // Preload first value
  }

  next(): IteratorResult<T> {
    const current = this._next;
    this._next = this.iterator.next(); // Advance the iterator
    return current;
  }

  peek(): IteratorResult<T> {
    return this._next; // Return next value without advancing
  }

  hasNext(): boolean {
    return !this._next.done;
  }
}
