import React from "react";

const EditingContext = React.createContext(false);
export function EditingProvider({
  editing,
  children,
}: {
  editing?: boolean;
  children?: any;
}) {
  return (
    <EditingContext.Provider value={!!editing}>
      {children}
    </EditingContext.Provider>
  );
}

export function useEditing() {
  return React.useContext(EditingContext);
}
