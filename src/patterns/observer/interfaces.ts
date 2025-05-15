export interface ISubject<T> {
  addObserver(observer: IObserver<T>): void;
  removeObserver(observer: IObserver<T>): void;
  notify(): void;
}

export interface IObserver<T> {
  update(data: T): void;
}
