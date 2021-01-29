const strExample = 'key1=value1;key2=value2\nkeyA=valueA;keyB=valueB';

// Functions
const store = function(array) {
	let str = "";
	array.forEach((a, i) => {
		for (const [key, value] of Object.entries(a)) {
			str += `${key}=${value};`;
		}
		str = str.slice(0, -1);
		if (i !== array.length - 1) str += '\n';
	});
	return str;
}

const load = function(str) {
	let rows = str.split('\n');
	rows = rows.map((d) => {
		const keys = d.split(';');
		const obj = {};
		keys.forEach(k => {
			const keyValue = k.split('=');
			obj[keyValue[0]] = keyValue[1];
		});
		return obj;
	});
	return rows;
}
console.time('load');
const loaded = load(strExample);
console.log(loaded);
console.timeEnd('load');

console.time('store');
const stored = store(loaded);
console.log(stored);
console.timeEnd('store');
