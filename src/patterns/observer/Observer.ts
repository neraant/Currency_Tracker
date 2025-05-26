import { IObserver } from './interfaces';

export abstract class Observer<T> implements IObserver<T> {
  abstract update(data: T): void;
}
