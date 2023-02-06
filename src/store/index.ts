import IProject from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';

interface State {
	projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol('Key');

export const store = createStore<State>({
	state: {
		projects: [],
	},

	mutations: {
		ADD_PROJECT(state, nameProject: string) {
			const project = {
				id: new Date().toISOString(),
				name: nameProject,
			} as IProject;

			state.projects.push(project);
		},

		CHANGE_PROJECT(state, project: IProject) {
			const index = state.projects.findIndex((proj) => proj.id === project.id);
			state.projects[index] = project;
		},
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}
