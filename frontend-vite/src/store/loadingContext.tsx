import { createContext, useId, useState } from "react";
import { ChildContainerProps } from "../utilities/types";

export type LoadingQueueContextType = {
  addLoading: () => void;
  removeLoading: () => void;
  getId: () => string;
  isLoading: boolean;
};

export const LoadingQueueContext = createContext<LoadingQueueContextType>(
  {} as LoadingQueueContextType,
);

export const LoadingQueueProvider = ({ children }: ChildContainerProps) => {
  const [loadingQueue, setLoadingQueue] = useState<number>(0);

  const addLoading = () => {
    setLoadingQueue((prevQueue: number) => prevQueue + 1);
  };

  const removeLoading = () => {
    setLoadingQueue((prevQueue: number) => prevQueue - 1);
  };

  function getId() {
    return useId;
  }

  const value = {
    addLoading,
    removeLoading,
    isLoading: loadingQueue > 0,
    getId,
  };

  return (
    <LoadingQueueContext.Provider value={value}>
      {children}
    </LoadingQueueContext.Provider>
  );
};
