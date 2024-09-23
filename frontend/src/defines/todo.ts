export default class Todo {
	public _id?: number;
	public username: string;
	public title: string;
	public completed: boolean;
	public createdAt?: Date;
	constructor(title: string, completed: boolean, username: string | null, createdAt?: Date, id?: number) {
		this._id = id;
		this.username = username || '';
		this.title = title;
		this.completed = completed;
		this.createdAt = createdAt;
	}
}