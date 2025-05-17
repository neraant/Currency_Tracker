import { createContext, ReactNode, useContext } from 'react';

import { Subject } from '@patterns/observer/Subject';

interface ObserverStateMap {
  last_updated: string | null;
}

type SubjectsMap = {
  [K in keyof ObserverStateMap]: Subject<ObserverStateMap[K]>;
};

const ObserverContext = createContext<SubjectsMap | null>(null);

interface SubjectProviderProps {
  children: ReactNode;
}

export const SubjectProvider = ({ children }: SubjectProviderProps) => {
  const subjects: SubjectsMap = {
    last_updated: new Subject<string | null>(null),
  };

  return <ObserverContext.Provider value={subjects}>{children}</ObserverContext.Provider>;
};

export const useSubject = <K extends keyof ObserverStateMap>(
  key: K
): Subject<ObserverStateMap[K]> => {
  const context = useContext(ObserverContext);
  if (!context) {
    throw new Error('useSubject must be used within a SubjectProvider');
  }
  return context[key];
};
