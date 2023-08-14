import { ExecutorContext } from 'nx/src/config/misc-interfaces';
import { ProjectConfiguration } from '@nx/devkit';
import { execSync } from 'child_process';
import { PrepareOptions } from './prepareOptions';
import { copySchematics } from './copySchematics';

export default async function (
  options: PrepareOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  if (options.schematics) {
    const projectConfig: ProjectConfiguration =
      context.workspace.projects[context.projectName as string];
    await copySchematics(options, projectConfig, context.projectName as string);
  }
  const [outputPath] =
    context.workspace.projects[context.projectName].targets.build.outputs;
  execSync('npm pack', {
    cwd: outputPath,
    stdio: 'inherit',
  });
  return { success: true };
}
