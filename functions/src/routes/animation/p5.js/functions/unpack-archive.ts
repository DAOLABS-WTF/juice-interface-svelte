import { rmSync } from 'fs-extra';
import path from 'path';
import tar from 'tar';

const writeFirame = (acrhivePath: string) => {
	const dir = path.dirname(acrhivePath);

	tar.extract({
		file: acrhivePath,
		cwd: dir,
		sync: true
	});

	rmSync(acrhivePath);
};

export { writeFirame };
