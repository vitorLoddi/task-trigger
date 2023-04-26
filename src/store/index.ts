/* eslint-disable import/no-cycle */
import ITask from '@/interfaces/ITask';
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { INotification } from '@/interfaces/INotification';
import http from '@/http/index';

import {
	NOTIFY,
	SET_TASKS,
	ADD_TASK,
	CHANGE_TASK,
} from '@/store/type-mutations';

import {
	AC_GET_TASKS,
	AC_ADD_TASK,
	AC_CHANGE_TASK,
} from '@/store/type-actions';

import { StateProject, project } from '@/store/modules/project';

export interface State {
	tasks: ITask[],
	notifications: INotification[],
	project: StateProject,
}

export const key: InjectionKey<Store<State>> = Symbol('Key');

export const store = createStore<State>({
	state: {
		notifications: [],
		tasks: [],
		project: {
			projects: [],
		},
	},

	mutations: {
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

	modules: {
		project,
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}
