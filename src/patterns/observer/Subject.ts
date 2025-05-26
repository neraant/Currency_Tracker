import { IObserver, ISubject } from './interfaces';

export class Subject<T> implements ISubject<T> {
  private observers: Set<IObserver<T>> = new Set();
  private state: T;

  constructor(initialState: T) {
    this.state = initialState;
  }

  addObserver(observer: IObserver<T>): void {
    this.observers.add(observer);
  }
  removeObserver(observer: IObserver<T>): void {
    this.observers.delete(observer);
  }
  getState(): T {
    return this.state;
  }
  setState(newState: T) {
    this.state = newState;
    this.notify();
  }
  notify(): void {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }
}
