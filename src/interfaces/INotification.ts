export enum TypeNotification {
	SUCCESS,
	FAILURE,
	ATTENTION,
}

export interface INotification {
	title: string,
	text: string,
	type: TypeNotification,
	id: number
}
