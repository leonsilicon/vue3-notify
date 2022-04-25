export interface NotificationsOptions {
	id?: number;
	title?: string;
	text?: string;
	type?: string;
	group?: string;
	duration?: number;
	speed?: number;
	data?: unknown;
	clean?: boolean;
	clear?: boolean;
	ignoreDuplicates?: boolean;
}

export type NotificationItem = Pick<
	NotificationsOptions,
	'id' | 'title' | 'text' | 'type' | 'speed' | 'data'
> & {
	length: number;
};

export type NotificationItemWithTimer = NotificationItem & {
	timer?: NodeJS.Timeout;
};
