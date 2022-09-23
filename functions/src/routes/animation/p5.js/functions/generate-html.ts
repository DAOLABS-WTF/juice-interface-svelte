import { GIFParams, PFPParams } from '../../interfaces/p5Params';

const startingFrame = 100;

const templateScripts = [
	'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.0/p5.js',
	'https://cdn.rawgit.com/jwagner/simplex-noise.js/87440528bcf8ec89840e974d8f76cfe3da548c37/simplex-noise.min.js',
	'https://unpkg.com/@metamoar/moarp5@0.0.58/dist/moarp5.js',
	'https://unpkg.com/ccapture.js@1.1.0/build/CCapture.all.min.js'
].reduce((acumm, scriptPath) => acumm + `<script src="${scriptPath}"></script>`, '');

async function generateAnimationCaptureProgramm(sketchLines: string[]) {
	const beforeDraw = [
		`var capturer = new CCapture({ format: 'png', framerate: 25 })`,
		`var startMillis`,
		`function downloadBlob(blob, name = 'file.tar') {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement('a');

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );

    // Remove link from body
    document.body.removeChild(link);
  }`
	];

	const inDraw = `if (frameCount === ${startingFrame}) {
  // start the recording on the first frame
  // this avoids the code freeze which occurs if capturer.start is called
  // in the setup, since v0.9 of p5.js
  capturer.start()
}
if (frameCount >= ${startingFrame}) {
  // handle saving the frame
  console.log('capturing frame');
  capturer.capture(document.getElementById('defaultCanvas0'));
}

if (startMillis == null) {
  startMillis = millis()
}

// duration in milliseconds
var duration = 1000 + ${(startingFrame * 1000) / 25}

// compute how far we are through the animation as a value between 0 and 1.
var elapsed = millis() - startMillis
var t = map(elapsed, 0, duration, 0, 1)

// if we have passed t=1 then end the animation.
if (t > 1) {
  noLoop()
  capturer.stop()
  capturer.save(downloadBlob)
  console.log('finished recording.')
  return
}`;

	const indexDrawFunc = sketchLines.findIndex((item) => item.includes('function draw()'));
	sketchLines.splice(indexDrawFunc + 1, 0, inDraw);
	sketchLines.splice(indexDrawFunc, 0, ...beforeDraw);

	return sketchLines.join('\n');
}

async function generatePFPGeneratingProgramm(sketchLines: string[], params: PFPParams) {
	const inSetup = `randomSeed(${params.seed});`;
	const afterNoLoop = `save('myCanvas.jpg');`;

	const indexSetupFunc = sketchLines.findIndex((item) => item.includes('function setup()'));
	sketchLines.splice(indexSetupFunc + 1, 0, inSetup);
	const indexNoLoop = sketchLines.findIndex((item) => item.includes('noLoop();'));
	sketchLines.splice(indexNoLoop + 1, 0, afterNoLoop);

	return sketchLines.join('\n');
}

function generateTemplatedHtml(sketchProgramm: string) {
	return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      ${templateScripts}
      <style>
          html, body {
              margin: 0;
              padding: 0;
          }
          canvas {
              display: block;
          }
      </style>
      <title>Render sketch p5.js</title>
  </head>
  <body>
      <script>
          ${sketchProgramm}
      </script>
  </body>
  </html>
`;
}

export const generateHtmlContent = async (sketchLines: string[], params: GIFParams | PFPParams) => {
	let sketchProgramm = ``;

	if (sketchLines) {
		switch (params.type) {
			case 'GIF':
				sketchProgramm = await generateAnimationCaptureProgramm(sketchLines);
				break;

			case 'PFP':
				sketchProgramm = await generatePFPGeneratingProgramm(sketchLines, params);
				break;

			default:
				break;
		}
	}

	return generateTemplatedHtml(sketchProgramm);
};
