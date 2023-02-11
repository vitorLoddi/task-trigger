import { TypeNotification } from '@/interfaces/INotification';
import { store } from '@/store';
import { NOTIFY } from '@/store/type-mutations';

type Notifier = {
	notify: (title: string, text: string, type: TypeNotification) => void
}

export default () : Notifier => {
	const notify = (title: string, text: string, type: TypeNotification) : void => {
		store.commit(NOTIFY, {
			title,
			text,
			type,
		});
	};

	return {
		notify,
	};
};
