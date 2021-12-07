export const compare = (options) => {
	return (a, b) => {
		let res = 0
		Object.entries(options).forEach(([field, order]) => {
			res = res || (a[field].localeCompare(b[field]) * (order === 'asc' || -1))
		})
		return res
	}
}
