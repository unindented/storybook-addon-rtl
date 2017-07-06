# Storybook Addon RTL [![Version](https://img.shields.io/npm/v/storybook-addon-rtl.svg)](https://www.npmjs.com/package/storybook-addon-rtl) [![Build Status](https://img.shields.io/travis/unindented/storybook-addon-rtl.svg)](https://travis-ci.org/unindented/storybook-addon-rtl)

Storybook Addon RTL allows you to switch to right-to-left flow in your stories in [Storybook](https://storybook.js.org).

This addon works with Storybook for:
[React](https://github.com/storybooks/storybook/tree/master/app/react).

![Storybook Addon RTL Demo](docs/demo.png)


### Getting Started

```sh
npm i --save-dev storybook-addon-rtl
```

Create a file called `addons.js` in your storybook config, and add the following content to it:

```js
import 'storybook-addon-rtl/register';
```

Create a file called `config.js` in your storybook config, and add the following content to it:

```js
import { configure } from '@storybook/react';
import { initializeRTL } from 'storybook-addon-rtl';

initializeRTL();

configure(() => { require('./stories') }, module);
```

Then write your stories normally:

```js
import React from 'react';
import { storiesOf } from '@storybook/react';
import Component from './Component';

storiesOf('Component', module)
  .add('default', () => (
    <Component />
  ));
```

**Note:** You can force a story to show in right-to-left mode by adding the query parameter `direction=rtl`.


## Meta

* Code: `git clone https://github.com/unindented/storybook-addon-rtl.git`
* Home: <https://github.com/unindented/storybook-addon-rtl/>


## Contributors

* Daniel Perez Alvarez ([unindented@gmail.com]mailto:unindented@gmail.com))


## License

Copyright (c) 2017 Daniel Perez Alvarez ([unindented.org](https://unindented.org/)). This is free software, and may be redistributed under the terms specified in the LICENSE file.
