import IProject from '@/interfaces/IProject';

export default interface ITask {
	description: string,
	elapsedTime: number,
	project: IProject,
}
