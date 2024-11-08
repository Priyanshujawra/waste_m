import React, { createContext, useState } from "react";

const WasteLogContext = createContext();

export const WasteLogProvider = ({ children }) => {
  const [wasteLogs, setWasteLogs] = useState([]);

  const addWasteLog = (logData) => {
    setWasteLogs((prevLogs) => [...prevLogs, logData]);
  };

  return (
    <WasteLogContext.Provider value={{ wasteLogs, addWasteLog }}>
      {children}
    </WasteLogContext.Provider>
  );
};

export default WasteLogContext;
