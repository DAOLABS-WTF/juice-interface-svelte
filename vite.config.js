import { sveltekit } from '@sveltejs/kit/vite';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = ({ mode }) => {
	const development = mode === 'development';
	return {
		server: {
			fs: {
				strict: false
			}
		},
		plugins: [
			sveltekit(),
			development &&
				nodePolyfills({
					include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
					http: true,
					crypto: true
				})
		],
		resolve: {
			alias: {
				$stores: path.resolve('./src/stores'),
				$utils: path.resolve('./src/utils'),
				$assets: path.resolve('./src/assets'),
				$constants: path.resolve('./src/constants'),
				$models: path.resolve('./src/models'),
				$data: path.resolve('./src/data'),
				crypto: 'crypto-browserify',
				stream: 'stream-browserify',
				assert: 'assert',
				'@coinbase/wallet-sdk': '@coinbase/wallet-sdk/dist/index.js'
			}
		},
		// Seems to be issues with bigint, I guess this will change shortly so depending on what happens
		// with this issue we'll be able to remove the next lines https://github.com/vitejs/vite/issues/9062
		optimizeDeps: {
			esbuildOptions: { target: 'es2020' }
		},
		esbuild: {
			target: ['es2020']
		},
		//
		ssr: {
			noExternal: ['@lingui/*', 'lingui-core/*']
		},
		build: {
			target: ['es2020'],
			rollupOptions: {
				plugins: [
					nodePolyfills({
						crypto: true,
						http: true
					})
				]
			},
			commonjsOptions: {
				transformMixedEsModules: true
			}
		}
	};
};

export default config;
