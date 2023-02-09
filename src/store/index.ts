import IProject from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { ADD_PROJECT, CHANGE_PROJECT, DELETE_PROJECT } from '@/store/type-mutations';

interface State {
	projects: IProject[]
}

export const key: InjectionKey<Store<State>> = Symbol('Key');

export const store = createStore<State>({
	state: {
		projects: [],
	},

	mutations: {
		[ADD_PROJECT](state, nameProject: string) {
			const project = {
				id: new Date().toISOString(),
				name: nameProject,
			} as IProject;

			state.projects.push(project);
		},

		[CHANGE_PROJECT](state, project: IProject) {
			const index = state.projects.findIndex(
				(proj) => proj.id === project.id,
			);
			state.projects[index] = project;
		},

		[DELETE_PROJECT](state, idProject : string) {
			state.projects = state.projects.filter(
				(proj) => proj.id !== idProject,
			);
		},
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}
