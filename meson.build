project('shade-shell', version: '0.1.0')

domain = 'com.caioasmuniz.shade_shell'
name = meson.project_name()
version = meson.project_version()

prefix = get_option('prefix')
datadir = prefix / get_option('datadir')
bindir = prefix / get_option('bindir')

custom_target(
  input: configure_file(
    input: 'src/main.ts',
    output: 'main.ts',
    configuration: {
      'gjs': find_program('gjs').full_path(),
    },
  ),
  command: [
    find_program('esbuild'),
    '--bundle', '@INPUT@',
    '--outfile=@OUTPUT@',
    '--external:gi://*',
    '--external:resource://*',
    '--external:system',
    '--external:gettext',
    '--format=esm',
    '--sourcemap=inline',
    '--loader:.css=text',
    '--define:import.meta.name="' + name + '"',
    '--define:import.meta.version="' + version + '"',
    '--define:import.meta.domain="' + domain + '"',
    '--define:import.meta.datadir="' + datadir + '"',
  ],
  output: name,
  install: true,
  install_dir: bindir,
)
custom_target(
  input: configure_file(
    input: 'src/lib/gschema.ts',
    output: domain + '.gschema.ts',
    configuration: {
      'domain': domain,
      'datadir': datadir,
    },
  ),
  command: [
    find_program('gjs'),
    '-m', '@SOURCE_ROOT@/node_modules/gnim-schemas/lib/cli.js',
    meson.current_build_dir(),
  ],
  output: domain + '.gschema.xml',
  install: true,
  install_dir: datadir / 'glib-2.0' / 'schemas',
)

configure_file(
  input: 'data/desktop.in.desktop',
  output: domain + '.desktop',
  configuration: {
    'exe': bindir / name + ' toggle settings',
    'name': name + 'settings',
    'comment': 'open shade settings'},
  install: true,
  install_dir: datadir / 'applications',
)

install_data(['data/wp-day.jpg', 'data/wp-night.jpg'])

import('gnome').post_install(
  # gtk_update_icon_cache: true,
  glib_compile_schemas: true,
  update_desktop_database: true,
)
