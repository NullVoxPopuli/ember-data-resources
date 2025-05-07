import copy from 'rollup-plugin-copy';
import { Addon } from '@embroider/addon-dev/rollup';
import { babel } from '@rollup/plugin-babel';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  output: addon.output(),
  plugins: [
    addon.publicEntrypoints(['index.js', '**/*.js']),
    addon.appReexports(['loose-mode-compat/**/*.js'], {
      mapFilename(fileName) {
        return fileName.replace('loose-mode-compat/', '');
      },
    }),
    addon.dependencies(),
    babel({
      extensions: ['.js', '.gjs', '.ts', '.gts'],
      babelHelpers: 'bundled',
    }),
    addon.declarations('dist-types'),
    addon.clean(),
    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
      ],
    }),
  ],
};
