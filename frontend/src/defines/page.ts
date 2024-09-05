export default class Page {
	public no: number;
	public size: number;
	public total: number;
	constructor(no: number = 1, size: number = 5, total: number = 0) {
		this.no = no;
		this.size = size;
		this.total = total;
	}
}