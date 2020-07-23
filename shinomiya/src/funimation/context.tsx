import React, { createContext, useContext } from 'react';
import { FunimationOptions, Territory } from './types';
import FunimationClient from './client';

const FunimationContext = createContext<FunimationClient>({} as FunimationClient);

const defaultOptions: FunimationOptions = {
  hostname: 'https://prod-api-funimationnow.dadcdigital.com',
  territory: Territory.US,
  token: undefined
}
type WithFunimationHOC = (options?: Partial<FunimationOptions>) => (Component: React.ComponentType) => React.FunctionComponent;
const withFunimation: WithFunimationHOC = (partialOptions) => Component => {
  const options: FunimationOptions = {...defaultOptions, ...partialOptions};
  const client = new FunimationClient(options);
  return () => (
    <FunimationContext.Provider value={client}>
      <Component />
    </FunimationContext.Provider>
  );
};

export const useFunimation = () => useContext(FunimationContext);
export default withFunimation;