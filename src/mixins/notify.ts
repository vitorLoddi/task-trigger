import { TypeNotification } from '@/interfaces/INotification';
import { NOTIFY } from '@/store/type-mutations';
import { store } from '@/store';

export const notifyMixin = {
	methods: {
		notify(title: string, text: string, type: TypeNotification) : void {
			store.commit(NOTIFY, {
				title,
				text,
				type,
			});
		},
	},
};
