export enum Selected {
	Incomplete = 1 << 0,
	Completed = 1 << 1,

	All = Incomplete | Completed,
}