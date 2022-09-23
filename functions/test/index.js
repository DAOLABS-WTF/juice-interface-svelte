#!/usr/bin/env node
const { fetch } = require('undici');
const args = require('args');
const firebase = require('firebase-admin');

firebase.initializeApp({
	databaseURL: 'http://localhost:9000/?ns=juicebox-svelte'
});
const account = '0x0000000000000000000000000000000000000000';

const generationFn = async (_, sub) => {
	const [projectID] = sub;
	const res = await fetch('http://localhost:5001/juicebox-svelte/us-central1/generation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			account,
			projectID
		})
	});
	const json = await res.json();
	console.log(`
    The generation ${json.buildName} was successful.
    See the result: http://localhost:4000/storage/juicebox-svelte.appspot.com/v1/${account}/projects/${projectID}/build/${json.buildName}
  `);
};

const animationFn = async (_, sub) => {
	const [projectID] = sub;
	const res = await fetch('http://localhost:5001/juicebox-svelte/us-central1/animation', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			account,
			projectID
		})
	});
	const json = await res.json();
	console.log(`
    The animation was successful.
    See the result: http://localhost:4000/storage/juicebox-svelte.appspot.com/${json.output[0]}
  `);
};

const collagesFn = async (_, sub) => {
	const [projectID, buildName] = sub;
	await fetch('http://localhost:5001/juicebox-svelte/us-central1/collages', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			account,
			projectID,
			buildName
		})
	});
	console.log(`
    The collages ${buildName} was successful.
    See the result: http://localhost:4000/storage/juicebox-svelte.appspot.com/v1/${account}/projects/${projectID}/build/${buildName}
  `);
};

const metadataFn = async (_, sub) => {
	const [projectID, buildName] = sub;
	await fetch('http://localhost:5001/juicebox-svelte/us-central1/metadata', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			account,
			projectID,
			buildName
		})
	});
	console.log(`
    The metadata ${buildName} was successful.
    See the result: http://localhost:4000/storage/juicebox-svelte.appspot.com/v1/${account}/projects/${projectID}/build/${buildName}
  `);
};

const getAllProjects = async () => {
	try {
		const projectsSnapshot = await firebase.database().ref(`/users/${account}/projects`).get();
		const projects = Object.entries(projectsSnapshot.toJSON());
		const table = await Promise.all(
			projects.map(async (item) => {
				const buildsProject = await firebase
					.database()
					.ref(`/users/${account}/projects/${item[0]}/builds`)
					.get();
				if (buildsProject.exists()) {
					const builds = Object.keys(buildsProject.toJSON()).join(',');
					return { projectName: item[1].config.name, projectId: item[0], builds };
				} else {
					return { projectName: item[1].config.name, projectId: item[0], builds: '' };
				}
			})
		);
		console.table(table);
		process.exit(0);
	} catch (error) {
		throw new Error(error);
	}
};

args
	.command('all-projects', `Get all projects`, getAllProjects, ['a'])
	.command('generation', 'Generate test assets', generationFn, ['g'])
	.command('collages', 'Collages', collagesFn, ['c'])
	.command('metadata', 'Metadata', metadataFn, ['m'])
	.command('animation', 'Animation', animationFn);

args.parse(process.argv);
