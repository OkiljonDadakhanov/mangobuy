import React, {createContext, useState} from "react";

export const Context = createContext();

export const ContextProvider = ({children}) => {
  const [paymentData, setPaymentData] = useState({
    session_id: "",
    transaction_id: "",
  });
  const [uuid, setUUID] = useState("");

  return (
    <Context.Provider value={{paymentData, setPaymentData, uuid, setUUID}}>
      {children}
    </Context.Provider>
  );
};
