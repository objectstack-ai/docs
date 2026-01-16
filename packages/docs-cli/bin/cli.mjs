#!/usr/bin/env node
import { cac } from 'cac';
import 'dotenv/config';
import { registerTranslateCommand } from '../src/commands/translate.mjs';

const cli = cac('docs-cli');

registerTranslateCommand(cli);

cli.help();
cli.version('0.0.1');

cli.parse();

