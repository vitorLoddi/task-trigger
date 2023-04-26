/* eslint-disable import/no-cycle */
import http from '@/http/index';
import IProject from '@/interfaces/IProject';
import { State } from '@/store';
import { Module } from 'vuex';

import {
	AC_ADD_PROJECT,
	AC_CHANGE_PROJECT,
	AC_DELETE_PROJECT,
	AC_GET_PROJECTS,
} from '@/store/type-actions';

import {
	ADD_PROJECT,
	CHANGE_PROJECT,
	DELETE_PROJECT,
	SET_PROJECTS,
} from '@/store/type-mutations';

export interface StateProject {
	projects: IProject[],
}

export const project: Module<StateProject, State> = {
	state: {
		projects: [],
	},

	mutations: {
		[SET_PROJECTS](state, scheme: IProject[]) {
			state.projects = scheme;
		},

		[ADD_PROJECT](state, nameProject: string) {
			const scheme = {
				id: new Date().toISOString(),
				name: nameProject,
			} as IProject;

			state.projects.push(scheme);
		},

		[CHANGE_PROJECT](state, scheme: IProject) {
			const index = state.projects.findIndex(
				(proj) => proj.id === scheme.id,
			);
			state.projects[index] = scheme;
		},

		[DELETE_PROJECT](state, idProject: string) {
			state.projects = state.projects.filter(
				(proj) => proj.id !== idProject,
			);
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

		[AC_CHANGE_PROJECT](context, scheme: IProject) {
			return http.put(`/projects/${scheme.id}`, scheme);
		},

		[AC_DELETE_PROJECT]({ commit }, id: string) {
			return http.delete(`/projects/${id}`)
				.then(() => commit(DELETE_PROJECT, id));
		},
	},

};
