import path from 'node:path';
import { loadFiles } from '@graphql-tools/load-files';
import { mergeTypeDefs } from '@graphql-tools/merge';

const schemaPath = path.join(
  import.meta.dirname,
  '../__generated__/schema.graphql',
);
const typesArray = await loadFiles(schemaPath);
export const typeDefs = mergeTypeDefs(typesArray);
