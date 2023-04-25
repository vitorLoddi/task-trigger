import IProject from '@/interfaces/IProject';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import {
	ADD_PROJECT,
	CHANGE_PROJECT,
	SET_PROJECTS,
	DELETE_PROJECT,
	NOTIFY,
} from '@/store/type-mutations';
import {
	AC_GET_PROJECTS,
	AC_ADD_PROJECT,
	AC_CHANGE_PROJECT,
	AC_DELETE_PROJECT,
} from '@/store/type-actions';
import { INotification } from '@/interfaces/INotification';
import http from '@/http/index';

interface State {
	projects: IProject[],
	notifications: INotification[],
}

export const key: InjectionKey<Store<State>> = Symbol('Key');

export const store = createStore<State>({
	state: {
		projects: [],
		notifications: [],
	},

	mutations: {
		[SET_PROJECTS](state, projects: IProject[]) {
			state.projects = projects;
		},

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

		[DELETE_PROJECT](state, idProject: string) {
			state.projects = state.projects.filter(
				(proj) => proj.id !== idProject,
			);
		},

		[NOTIFY](state, Notify: INotification) {
			const newNotify = { ...Notify };

			newNotify.id = new Date().getTime();
			state.notifications.push(newNotify);

			setTimeout(() => {
				state.notifications = state.notifications.filter(
					(notify) => notify.id !== newNotify.id,
				);
			}, 3000);
		},
	},

	actions: {
		[AC_GET_PROJECTS]({ commit }) {
			http.get('projects')
				.then((response) => commit(SET_PROJECTS, response.data));
		},

		[AC_ADD_PROJECT](context, nameProject: string) {
			return http.post('/projects', {
				name: nameProject,
			});
		},

		[AC_CHANGE_PROJECT](context, project: IProject) {
			return http.put(`/projects/${project.id}`, project);
		},

		[AC_DELETE_PROJECT]({ commit }, id: string) {
			return http.delete(`/projects/${id}`)
				.then(() => commit(DELETE_PROJECT, id));
		},
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}
