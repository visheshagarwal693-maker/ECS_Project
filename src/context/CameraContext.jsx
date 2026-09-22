import React, {
  createContext,
  useContext,
  useState,
} from "react";

const CameraContext = createContext(null);

export function CameraProvider({ children }) {

  // No camera is selected when the dashboard first opens
  const [selectedCamera, setSelectedCamera] = useState(null);

  return (
    <CameraContext.Provider
      value={{
        selectedCamera,
        setSelectedCamera,
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  return useContext(CameraContext);
}