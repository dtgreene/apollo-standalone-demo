import express from 'express';
import { AuthContext } from 'src/auth/auth-context.interface.js';
import { DataSources } from 'src/data-source/data-sources.js';

export interface CustomContext extends AuthContext {
  req: express.Request;
  dataSources: DataSources;
}
