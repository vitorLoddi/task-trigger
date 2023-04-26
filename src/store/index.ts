/* eslint-disable import/no-cycle */
import { InjectionKey } from 'vue';
import { createStore, Store, useStore as vuexUseStore } from 'vuex';
import { INotification } from '@/interfaces/INotification';

import {
	NOTIFY,
} from '@/store/type-mutations';

import { StateProject, project } from '@/store/modules/project';
import { StateTask, task } from '@/store/modules/task';

export interface State {
	task: StateTask,
	notifications: INotification[],
	project: StateProject,
}

export const key: InjectionKey<Store<State>> = Symbol('Key');

export const store = createStore<State>({
	state: {
		notifications: [],
		task: {
			tasks: [],
		},
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
	},

	modules: {
		project,
		task,
	},
});

export function useStore(): Store<State> {
	return vuexUseStore(key);
}
