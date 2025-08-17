import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import config from './.eslintrc.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next', 'next/core-web-vitals', 'next/typescript'),
  ...compat.config({
    ...config,
  }),
];

export default eslintConfig;
