import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

import Notifications from '~/components/vue-notifications.vue';

describe('Notifications', () => {
	it('has correct default props', () => {
		const wrapper = mount(Notifications);
		const props = wrapper.props();

		expect(props.width).toEqual(300);
		expect(props.reverse).toEqual(false);
		expect(props.position).toStrictEqual(['top', 'right']);
		expect(props.classes).toEqual('vue-notification');
		expect(props.speed).toEqual(300);
		expect(props.duration).toEqual(3000);
		expect(props.delay).toEqual(0);
		expect(props.ignoreDuplicates).toEqual(false);
	});

	it('list is empty', () => {
		const wrapper = mount(Notifications);
		const items = wrapper.findAll('.vue-notification-wrapper');
		expect(items.length).toBe(0);
	});

	describe('addItem method', () => {
		it('adds item to list when no group', () => {
			const wrapper = mount(Notifications);

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);
			expect(wrapper.vm.list.length).toEqual(1);
			expect(wrapper.vm.list[0].id).toBeDefined();
			expect(wrapper.vm.list[0].title).toEqual('Title');
			expect(wrapper.vm.list[0].text).toEqual('Text');
			expect(wrapper.vm.list[0].type).toEqual('success');
			expect(wrapper.vm.list[0].state).toEqual(0);
			expect(wrapper.vm.list[0].speed).toEqual(300);
			expect(wrapper.vm.list[0].length).toEqual(3600);
			expect(wrapper.vm.list[0].timer).toBeDefined();
		});
	});

	it('adds item to list when a group is defined and matches event group name', () => {
		const props = {
			group: 'Group',
		};

		const wrapper = mount(Notifications, { props });
		const event = {
			group: 'Group',
			title: 'Title',
			text: 'Text',
			type: 'success',
		};

		wrapper.vm.addItem(event);

		expect(wrapper.vm.list.length).toEqual(1);
		expect(wrapper.vm.list[0].id).toBeDefined();
		expect(wrapper.vm.list[0].title).toEqual('Title');
		expect(wrapper.vm.list[0].text).toEqual('Text');
		expect(wrapper.vm.list[0].type).toEqual('success');
		expect(wrapper.vm.list[0].state).toEqual(0);
		expect(wrapper.vm.list[0].speed).toEqual(300);
		expect(wrapper.vm.list[0].length).toEqual(3600);
		expect(wrapper.vm.list[0].timer).toBeDefined();
	});

	it('does not add item to list when a group is defined and does not match event group name', () => {
		const props = {
			group: 'Does Not Match',
		};

		const wrapper = mount(Notifications, { props });
		const event = {
			group: 'Group',
			title: 'Title',
			text: 'Text',
			type: 'success',
		};

		wrapper.vm.addItem(event);

		expect(wrapper.vm.list.length).toEqual(0);
	});

	describe('item property overrides', () => {
		it('item length calculated from duration and speed props', () => {
			const duration = 50;
			const speed = 25;
			const expectedLength = duration + 2 * speed;

			const props = {
				duration,
				speed,
			};

			const wrapper = mount(Notifications, { props });

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			expect(wrapper.vm.list.length).toEqual(1);
			expect(wrapper.vm.list[0].speed).toEqual(speed);
			expect(wrapper.vm.list[0].length).toEqual(expectedLength);
		});
	});

	describe('order of inserted items', () => {
		it('by default inserts items in reverse order', () => {
			const wrapper = mount(Notifications);

			const event1 = {
				title: 'First',
			};

			const event2 = {
				title: 'Second',
			};

			wrapper.vm.addItem(event1);
			wrapper.vm.addItem(event2);

			expect(wrapper.vm.list.length).toEqual(2);
			expect(wrapper.vm.list[0].title).toEqual('Second');
			expect(wrapper.vm.list[1].title).toEqual('First');
		});

		it('when position is top and reverse is false, inserts in reverse order', async () => {
			const propsData = {
				position: 'top right',
				reverse: false,
			};

			const wrapper = mount(Notifications);
			await wrapper.setProps(propsData);

			const event1 = {
				title: 'First',
			};

			const event2 = {
				title: 'Second',
			};

			wrapper.vm.addItem(event1);
			wrapper.vm.addItem(event2);

			expect(wrapper.vm.list.length).toEqual(2);
			expect(wrapper.vm.list[0].title).toEqual('Second');
			expect(wrapper.vm.list[1].title).toEqual('First');
		});

		it('when position is top and reverse is true, inserts in sequential order', () => {
			const props = {
				position: 'top right',
				reverse: true,
			};

			const wrapper = mount(Notifications, { props });

			const event1 = {
				title: 'First',
			};

			const event2 = {
				title: 'Second',
			};

			wrapper.vm.addItem(event1);
			wrapper.vm.addItem(event2);

			expect(wrapper.vm.list.length).toEqual(2);
			expect(wrapper.vm.list[0].title).toEqual('First');
			expect(wrapper.vm.list[1].title).toEqual('Second');
		});

		it('when position is bottom and reverse is false, inserts in sequential order', () => {
			const props = {
				position: 'bottom right',
				reverse: false,
			};

			const wrapper = mount(Notifications, { props });

			const event1 = {
				title: 'First',
			};

			const event2 = {
				title: 'Second',
			};

			wrapper.vm.addItem(event1);
			wrapper.vm.addItem(event2);

			expect(wrapper.vm.list.length).toEqual(2);
			expect(wrapper.vm.list[0].title).toEqual('First');
			expect(wrapper.vm.list[1].title).toEqual('Second');
		});

		it('when position is bottom and reverse is true, inserts in reverse order', () => {
			const props = {
				position: 'bottom right',
				reverse: true,
			};

			const wrapper = mount(Notifications, { props });
			const event1 = {
				title: 'First',
			};

			const event2 = {
				title: 'Second',
			};

			wrapper.vm.addItem(event1);
			wrapper.vm.addItem(event2);

			expect(wrapper.vm.list.length).toEqual(2);
			expect(wrapper.vm.list[0].title).toEqual('Second');
			expect(wrapper.vm.list[1].title).toEqual('First');
		});
	});

	describe('auto-destroys items', () => {
		it('item is destroyed after certain duration', () => {
			const duration = 50;
			const speed = 25;
			const expectedLength = duration + 2 * speed;

			const props = {
				duration,
				speed,
			};

			vi.useFakeTimers();

			const wrapper = mount(Notifications, { props });
			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			expect(wrapper.vm.list.length).toEqual(1);

			vi.advanceTimersByTime(expectedLength);

			expect(wrapper.vm.list.length).toEqual(0);
		});
	});

	describe('when ignoreDuplicates is on', async () => {
		const wrapper = mount(Notifications, {
			props: {
				ignoreDuplicates: true,
			},
		});

		it('adds unique item to list', () => {
			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			expect(wrapper.vm.list.length).toEqual(1);
			expect(wrapper.vm.list[0].id).toBeDefined();
			expect(wrapper.vm.list[0].title).toEqual('Title');
			expect(wrapper.vm.list[0].text).toEqual('Text');
			expect(wrapper.vm.list[0].type).toEqual('success');
			expect(wrapper.vm.list[0].state).toEqual(0);
			expect(wrapper.vm.list[0].speed).toEqual(300);
			expect(wrapper.vm.list[0].length).toEqual(3600);
			expect(wrapper.vm.list[0].timer).toBeDefined();
		});
	});

	it('does not add item with same title and text to list', () => {
		const wrapper = mount(Notifications);

		const event = {
			title: 'Title',
			text: 'Text',
			type: 'success',
		};

		wrapper.vm.addItem(event);

		expect(wrapper.vm.list.length).toEqual(1);
		expect(wrapper.vm.list[0].id).toBeDefined();
		expect(wrapper.vm.list[0].title).toEqual('Title');
		expect(wrapper.vm.list[0].text).toEqual('Text');
		expect(wrapper.vm.list[0].type).toEqual('success');
		expect(wrapper.vm.list[0].state).toEqual(0);
		expect(wrapper.vm.list[0].speed).toEqual(300);
		expect(wrapper.vm.list[0].length).toEqual(3600);
		expect(wrapper.vm.list[0].timer).toBeDefined();
	});
});

describe('rendering', () => {
	describe('notification wrapper', () => {
		it('adds notification item with correct title and text', async () => {
			const wrapper = mount(Notifications);

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			await wrapper.vm.$nextTick();
			const notifications = wrapper.findAll('.vue-notification-wrapper');

			expect(notifications.length).toEqual(1);

			const title = wrapper.find('.notification-title').text();
			expect(title).toEqual('Title');

			const text = wrapper.find('.notification-content').text();
			expect(text).toEqual('Text');
		});

		it('adds notification with correct inline styling', async () => {
			const wrapper = mount(Notifications);

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			await wrapper.vm.$nextTick();

			const notification = wrapper.get<HTMLElement>(
				'.vue-notification-wrapper'
			);

			expect(notification.element.style.transition).toEqual('all 300ms');
		});

		it('adds the event type as css class body', async () => {
			const wrapper = mount(Notifications);

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			await wrapper.vm.$nextTick();
			const notification = wrapper.get('.vue-notification-wrapper > div');

			expect(notification.classes()).toContain('vue-notification');
			expect(notification.classes()).toContain('success');
		});

		it('has correct default body classes', async () => {
			const wrapper = mount(Notifications);

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			await wrapper.vm.$nextTick();
			const notification = wrapper.get('.vue-notification-wrapper > div');
			expect(notification.classes()).toContain('vue-notification');
		});

		it('body classes can be customized via prop', async () => {
			const props = {
				classes: 'pizza taco-sushi',
			};

			const wrapper = mount(Notifications, { props });

			const event = {
				title: 'Title',
				text: 'Text',
				type: 'success',
			};

			wrapper.vm.addItem(event);

			await wrapper.vm.$nextTick();
			const notification = wrapper.get('.vue-notification-wrapper > div');

			expect(notification.element).toBeDefined();
			expect(notification.classes()).toContain('pizza');
			expect(notification.classes()).toContain('taco-sushi');
		});
	});
});
