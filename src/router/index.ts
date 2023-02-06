import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

// Pages
import Tasks from '@/views/Tasks.vue';
import Projects from '@/views/Projects.vue';
import Form from '@/views/Projects/Form.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Tarefas',
		component: Tasks,
	},
	{
		path: '/projetos',
		name: 'Projetos',
		component: Projects,
	},
	{
		path: '/projetos/novo',
		name: 'Novo Projeto',
		component: Form,
	},
	{
		path: '/projetos/:id',
		name: 'Editar Projeto',
		component: Form,
		props: true,
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
