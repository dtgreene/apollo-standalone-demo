import express from 'express';
import { AuthContext } from 'src/auth/auth-context.interface.js';
import { BaseDataSource } from 'src/data-source/base-data-source.class.js';
import {
  createDataSources,
  DataSources,
} from 'src/data-source/data-sources.js';

export interface CustomContext extends AuthContext {
  req: express.Request;
  dataSources: DataSources;
}

export const createContext = async ({ req }: { req: express.Request }) => {
  const context: CustomContext = {
    req,
    dataSources: createDataSources(),
  };

  // Initialize each data source
  Object.values(context.dataSources).forEach((source: BaseDataSource) => {
    source.init(context);
  });

  return context;
};
