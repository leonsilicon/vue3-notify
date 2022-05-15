<script setup lang="ts">
import { notify } from 'vue3-notify';

const positionX = $ref('right');
const positionY = $ref('top');
const width = $ref(300);
const reverse = $ref(false);
const position = $computed(() => [positionX, positionY]);
const speed = $ref(300);
const duration = $ref(3000);
const max = $ref(Number.POSITIVE_INFINITY);
const ignoreDuplicates = $ref(false);
const closeOnClick = $ref(true);
const pauseOnHover = $ref(false);
const text = $ref('This is a notification!');
const clear = $ref(false);
const title = $ref('Notification Title');
const type = $ref<'warn' | 'error' | 'success' | undefined>();

function createNotification() {
	notify({
		text,
		duration,
		clear,
		speed,
		ignoreDuplicates,
		title,
		type,
	});
}
</script>

<template>
	<div class="column items-center">
		<h1 class="text-4xl font-bold my-4">vue3-notify</h1>
		<button
			class="px-4 py-2 bg-orange-500 rounded-md text-white font-medium"
			@click="createNotification"
		>
			Create notification!
		</button>
		<h2 class="text-xl font-bold my-4">Configure Props</h2>
		<div
			class="grid grid-cols-[max-content,1fr] text-right items-center font-bold gap-y-2 gap-x-4"
		>
			<label for="title">Title</label>
			<input id="title" v-model="title" type="text" />
			<label for="text">Text</label>
			<input id="text" v-model="text" type="text" />
			<label for="width">Width</label>
			<input id="width" v-model="width" type="text" />
			<label for="reverse">Reverse?</label>
			<input id="reverse" v-model="reverse" type="checkbox" />
			<div>Position X</div>
			<div class="row gap-5 font-normal">
				<div>
					<input
						id="position-left"
						v-model="positionX"
						name="position-x"
						type="radio"
						value="left"
					/>
					<label for="position-left"> Left</label>
				</div>
				<div>
					<input
						id="position-center"
						v-model="positionX"
						name="position-x"
						type="radio"
						value="center"
					/>
					<label for="position-center"> Center</label>
				</div>
				<div>
					<input
						id="position-right"
						v-model="positionX"
						name="position-x"
						type="radio"
						value="right"
					/>
					<label for="position-right"> Right</label>
				</div>
			</div>
			<div>Position Y</div>
			<div class="row gap-3 font-normal">
				<div>
					<input
						id="position-top"
						v-model="positionY"
						name="position-y"
						type="radio"
						value="top"
					/>
					<label for="position-top"> Top</label>
				</div>
				<div>
					<input
						id="position-bottom"
						v-model="positionY"
						name="position-y"
						type="radio"
						value="bottom"
					/>
					<label for="position-bottom"> Bottom</label>
				</div>
			</div>
			<label for="speed">Speed</label>
			<input id="speed" v-model.number="speed" type="number" />
			<label for="duration">Duration</label>
			<input id="duration" v-model.number="duration" type="number" />
			<label for="ignore-duplicates">Ignore Duplicates</label>
			<input
				id="ignore-duplicates"
				v-model="ignoreDuplicates"
				type="checkbox"
			/>
			<label for="close-on-click">Close on Click</label>
			<input id="close-on-click" v-model="closeOnClick" type="checkbox" />
			<label for="pause-on-hover">Pause on Hover</label>
			<input id="pause-on-hover" v-model="pauseOnHover" type="checkbox" />
			<div>Type</div>
			<div class="row gap-5 font-normal">
				<div>
					<input
						id="type-none"
						v-model="type"
						name="type"
						type="radio"
						value=""
					/>
					<label for="type-none"> None</label>
				</div>
				<div>
					<input
						id="type-warn"
						v-model="type"
						name="type"
						type="radio"
						value="warn"
					/>
					<label for="type-warn"> Warn</label>
				</div>
				<div>
					<input
						id="type-success"
						v-model="type"
						name="type"
						type="radio"
						value="success"
					/>
					<label for="type-success"> Success</label>
				</div>
				<div>
					<input
						id="type-error"
						v-model="type"
						name="type"
						type="radio"
						value="error"
					/>
					<label for="type-error"> Error</label>
				</div>
			</div>
		</div>
	</div>
	<VueNotifications
		:reverse="reverse"
		:width="width"
		:position="position"
		:max="max"
		:close-on-click="closeOnClick"
		:pause-on-hover="pauseOnHover"
	/>
</template>

<style lang="postcss">
#app {
	font-family: Avenir, Arial, Helvetica, sans-serif;
}

body,
html {
	height: 100%;
}

input {
	@apply border-1 border-gray-200 rounded-md py-0.5 px-1;
}
</style>
