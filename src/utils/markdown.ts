import { browser } from '$app/environment';
import Dompurify from 'dompurify';
import { marked } from 'marked';

export function markdownToHtml(markdown: string) {
	markdown = markdown
		.replace(/(https?:\/\/)?\w+[.]([a-zA-Z]{2,3})[^\w]/g, (match) => {
			const web = match.replace(/^(https?:\/\/)/, '');
			return `[${web}](https://${web})`;
		})
		.replace(/\n+/g, '\n\n');

	return Dompurify(browser ? window : null).sanitize(
		marked(markdown, {
			sanitize: true
		})
	);
}
