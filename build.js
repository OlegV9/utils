import esbuild from 'esbuild';

await Promise.all([
	esbuild.build({
		entryPoints: ['src/index.js'],
		outfile: 'dist/index.js',
		format: 'esm',
		platform: 'node',
		bundle: false,
	}),
	esbuild.build({
		entryPoints: ['src/index.js'],
		outfile: 'dist/index.cjs',
		format: 'cjs',
		platform: 'node',
		bundle: false,
	}),
]);
