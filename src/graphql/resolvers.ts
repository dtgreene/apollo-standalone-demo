import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';

const resolversArray = await loadFiles('**/*.resolver.js');
export const resolvers = mergeResolvers(resolversArray);
