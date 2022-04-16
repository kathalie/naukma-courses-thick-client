export function convertString(str: string): string {
	return str.trim().replaceAll('  ', ' ').replaceAll('\t', '').replaceAll('\n', '');
}