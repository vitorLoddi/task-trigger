/* eslint-disable import/no-cycle */
import ITask from '@/interfaces/ITask';
import { Module } from 'vuex';
import { State } from '@/store';
import http from '@/http';
import { AC_GET_TASKS, AC_ADD_TASK, AC_CHANGE_TASK } from '@/store/type-actions';
import { SET_TASKS, ADD_TASK, CHANGE_TASK } from '@/store/type-mutations';

export interface StateTask {
	tasks: ITask[],
}

export const task: Module<StateTask, State> = {
	mutations: {
		[SET_TASKS](state, jobs: ITask[]) {
			state.tasks = jobs;
		},

		[ADD_TASK](state, job: ITask) {
			state.tasks.push(job);
		},

		[CHANGE_TASK](state, job: ITask) {
			const index = state.tasks.findIndex(
				(t) => t.id === job.id,
			);
			state.tasks[index] = job;
		},
	},

	actions: {
		[AC_GET_TASKS]({ commit }) {
			return http.get('/tasks')
				.then((response) => commit(SET_TASKS, response.data));
		},

		[AC_ADD_TASK]({ commit }, job: ITask) {
			return http.post('/tasks', job)
				.then((response) => commit(ADD_TASK, response.data));
		},

		[AC_CHANGE_TASK]({ commit }, job: ITask) {
			return http.put(`/tasks/${job.id}`, job)
				.then((response) => commit('CHANGE_TASK', response.data));
		},
	},
};
