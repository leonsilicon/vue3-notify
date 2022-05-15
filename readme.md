# vue3-notify

Notification library for Vue 3. Most of the code is heavily borrowed from <https://github.com/kyvg/vue3-notification>.

Online demo: <https://leonzalion.github.io/vue3-notify/>

## Installation

```shell
npm install vue3-notify
```

## Usage

Import and install the `VueNotify` plugin in your app's entrypoint:

```typescript
import App from './app.vue';
import VueNotify from 'vue3-notify';

const app = createApp(App);
app.use(VueNotify);
// ...
```

Then, add the `<VueNotifications />` component somewhere in your component tree (such as `app.vue`):

```vue
<template>
  <!-- ... -->
  <VueNotifications
    :reverse="reverse"
    :width="width"
    :position="position"
    :max="max"
    :close-on-click="closeOnClick"
    :pause-on-hover="pauseOnHover"
  />
</template>
```

Then, to display a notification, import and call the `notify` function from anywhere in your code (even outside of Vue components!):

```typescript
import { notify } from 'vue3-notify';

notify({
  title: 'My notification',
  text: 'Hello from vue3-notify!',
  duration: 1000,
  type: 'success',
});
```

## API

### notify(options)

#### options

Type: `NotificationOptions | string`

If `options` is a string, it is equivalent to calling `notify({ title: '', text: options })`.

### NotificationsOptions

#### id

Type: `number`\
Required: `false`

The ID of the notification (used internally to identify notifications).

#### title

Type: `string`\
Required: `false`

The title of the notification.

#### text

Type: `string`

The text for the notification.

#### type

Type: `'warn' | 'error' | 'success'`\
Required: `false`

The type of the notification (just adds an extra class to the notification).

#### group

Type: `string`\
Required: `false`

#### duration

Type: `number`\
Default: `3000`

#### speed

Type: `number`\
Default: `300`

The transition time of the notification in milliseconds.

#### clear

Type: `boolean`\
Default: `false`

If true, clears all existing notifications.

#### ignoreDuplicates

Type: `boolean`\
Default: `false`

If true, doesn't display duplicate notifications.
