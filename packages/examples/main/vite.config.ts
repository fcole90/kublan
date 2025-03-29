import { defineConfig } from 'vite';

const config = defineConfig(
  ({
    command: _command,
    mode: _mode,
    isSsrBuild: _isSsrBuild,
    isPreview: _isPreview,
  }) => {
    return {};
  },
);

export default config;
