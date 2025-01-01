import { type SchemaTypeDefinition } from 'sanity'
import { author } from '@/sanity/schemaTypes//author'
import { lore } from '@/sanity/schemaTypes/lore';
import { playlist } from './playlist';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, lore, playlist],
};
