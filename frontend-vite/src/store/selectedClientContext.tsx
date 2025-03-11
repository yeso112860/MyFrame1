import React, { createContext, useContext, useState } from "react";

interface SelectedClientType {
  selectedId: string;
  selectedClientID: string;
  selectedClientType: string;
  selectedClientName: string;
  setSelectedClient: ({
    id,
    clientID,
    clientType,
    clientName,
  }: {
    id: string;
    clientID: string;
    clientType?: string;
    clientName: string;
  }) => void;
}

const SelectedClientContext = createContext<SelectedClientType | undefined>(
  undefined,
);

export const SelectedClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [selectedId, setSelectedId] = useState<string>("-");
  const [selectedClientID, setSelectedClientID] = useState<string>("-");
  const [selectedClientType, setSelectedClientType] = useState<string>("");
  const [selectedClientName, setSelectedClientName] = useState<string>("");

  const setSelectedClient = ({
    id,
    clientID,
    clientType,
    clientName,
  }: {
    id: string;
    clientID: string;
    clientType: string;
    clientName: string;
  }) => {
    setSelectedId(id);
    setSelectedClientID(clientID);
    setSelectedClientType(clientType);
    setSelectedClientName(clientName);
    localStorage.setItem("selectedId", id);
    localStorage.setItem("selectedClientId", clientID);
    localStorage.setItem("selectedClientType", clientType);
    localStorage.setItem("selectedClientName", clientName);
  };

  return (
    <SelectedClientContext.Provider
      value={{
        selectedId,
        selectedClientID,
        selectedClientType,
        selectedClientName,
        setSelectedClient,
      }}
    >
      {children}
    </SelectedClientContext.Provider>
  );
};

export const useSelectedClient = () => {
  const context = useContext(SelectedClientContext);
  if (!context) {
    throw new Error(
      "useSelectedClient must be used within a SelectedClientProvider",
    );
  }
  return context;
};
