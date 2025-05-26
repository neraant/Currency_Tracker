import { useEffect, useState } from 'react';
import { IObserver } from '@patterns/observer/interfaces';
import { Subject } from '@patterns/observer/Subject';

export function useObserver<T>(subject: Subject<T>): T {
  const [state, setState] = useState<T>(subject.getState());

  useEffect(() => {
    const observer: IObserver<T> = {
      update: (data: T) => setState(data),
    };

    subject.addObserver(observer);
    return () => subject.removeObserver(observer);
  }, [subject]);

  return state;
}
