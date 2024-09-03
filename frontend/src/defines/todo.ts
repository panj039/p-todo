export default class Todo {
	public _id?: number;
	public title: string;
	public completed: boolean;
	public createdAt?: Date;
	constructor(title: string, completed: boolean, createdAt?: Date, id?: number) {
		this._id = id;
		this.title = title;
		this.completed = completed;
		this.createdAt = createdAt;
	}
}