import * as React from "react";
import { ServiceContainer } from "../core/service-container";

const ServiceContainerContext = React.createContext<ServiceContainer | null>(
  null
);

export function useService(): ServiceContainer {
  const service = React.useContext(ServiceContainerContext);

  if (!service) {
    throw new Error("useService() is called outside <ServiceProvider>.");
  }

  return service;
}

interface ServiceProviderProps {
  serviceContainer: ServiceContainer;
}

export const ServiceProvider: React.FC<ServiceProviderProps> = ({
  serviceContainer,
  children,
  ...props
}) => {
  return (
    <ServiceContainerContext.Provider value={serviceContainer} {...props}>
      {children}
    </ServiceContainerContext.Provider>
  );
};
