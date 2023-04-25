import IProject from '@/interfaces/IProject';
import ITask from '@/interfaces/ITask';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import {
	ADD_PROJECT,
	CHANGE_PROJECT,
	SET_PROJECTS,
	DELETE_PROJECT,
	NOTIFY,
	SET_TASKS,
	ADD_TASK,
	CHANGE_TASK,
} from '@/store/type-mutations';
import {
	AC_GET_PROJECTS,
	AC_ADD_PROJECT,
	AC_CHANGE_PROJECT,
	AC_DELETE_PROJECT,
	AC_GET_TASKS,
	AC_ADD_TASK,
	AC_CHANGE_TASK,
} from '@/store/type-actions';
import { INotification } from '@/interfaces/INotification';
import http from '@/http/index';

interface State {
	projects: IProject[],
	tasks: ITask[],
	notifications: INotification[],
}

export const key: InjectionKey<Store<State>> = Symbol('Key');

export const store = createStore<State>({
	state: {
		projects: [],
		notifications: [],
		tasks: [],
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

		[SET_TASKS](state, tasks: ITask[]) {
			state.tasks = tasks;
		},

		[ADD_TASK](state, task: ITask) {
			state.tasks.push(task);
		},

		[CHANGE_TASK](state, task: ITask) {
			const index = state.tasks.findIndex(
				(t) => t.id === task.id,
			);
			state.tasks[index] = task;
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

		[AC_GET_TASKS]({ commit }) {
			return http.get('/tasks')
				.then((response) => commit(SET_TASKS, response.data));
		},

		[AC_ADD_TASK]({ commit }, task: ITask) {
			return http.post('/tasks', task)
				.then((response) => commit(ADD_TASK, response.data));
		},

		[AC_CHANGE_TASK]({ commit }, task: ITask) {
			return http.put(`/tasks/${task.id}`, task)
				.then((response) => commit('CHANGE_TASK', response.data));
		},
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}
