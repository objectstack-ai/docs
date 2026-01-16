#!/usr/bin/env node
import { cac } from 'cac';
import 'dotenv/config';
import { registerTranslateCommand } from '../src/commands/translate.mjs';
import { registerDevCommand } from '../src/commands/dev.mjs';
import { registerBuildCommand } from '../src/commands/build.mjs';
import { registerStartCommand } from '../src/commands/start.mjs';

const cli = cac('objectdocs');

registerTranslateCommand(cli);
registerDevCommand(cli);
registerBuildCommand(cli);
registerStartCommand(cli);

cli.help();
cli.version('0.0.1');

cli.parse();

