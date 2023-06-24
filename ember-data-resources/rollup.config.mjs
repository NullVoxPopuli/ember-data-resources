import typescript from 'rollup-plugin-ts';
import copy from 'rollup-plugin-copy';
import { Addon } from '@embroider/addon-dev/rollup';

const addon = new Addon({
  srcDir: 'src',
  destDir: 'dist',
});

export default {
  // This provides defaults that work well alongside `publicEntrypoints` below.
  // You can augment this if you need to.
  output: addon.output(),

  plugins: [
    addon.publicEntrypoints(['index.js', '**/*.js']),
    addon.appReexports(['loose-mode-compat/**/*.js'], {
      mapFilename(fileName) {
        return fileName.replace('loose-mode-compat/', '');
      },
    }),
    addon.dependencies(),
    typescript({
      transpiler: 'babel',
      browserslist: ['last 1 firefox versions'],
      transpileOnly: true,
    }),
    addon.clean(),
    copy({
      targets: [
        { src: '../README.md', dest: '.' },
        { src: '../LICENSE.md', dest: '.' },
      ],
    }),
  ],
};
