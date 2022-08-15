# GitHub Contextual Merge Strategy

> Defines a contextual merge strategy on GitHub pull requests according to the source branch.

## Overview

GitHub defaults to the last merging strategy used (e.g. squashing vs.
creating a merge commit).

This is annoying because we usually squash feature branches into
`staging` but want to do a merge commit when we merge `staging` to
`master`. It's easy to forget about it and when `staging` is squashed to
`master` it causes nasty issues.

This extension prevents that by defaulting the merge strategy based on
the branch we want to merge!

See the full story and implementation details
[this blog post](https://hookdeck.com/blog/post/building-chrome-extension-disable-squash-and-merge-github-branches).

## Customization

### Organization

By default the extension runs only on GitHub repos in the [Hookdeck organization](https://github.com/hookdeck)!

This is probably not what you want, so you should configure the
`permissions` in [`manifest.json`](manifest.json) accordingly, as well
as the URL host and prefix in [`background.js`](background.js).

This can be done with this simple script:

```sh
sed -i.old 's/hookdeck/your-github-org/g' manifest.json background.js
rm manifest.json.old background.js.old
```

### Branches

By default, it will select merge commit on `master`, `main`, `staging`
and `preview`, and squash & merge on other branches. If you want to tweak
that, edit [`script.js`](script.js)!

## Installation

Clone this repository:

```sh
git clone https://github.com/hookdeck/github-contextual-merge-strategy
```

### Chrome

In the Chrome extensions page `chrome://extensions`, enable *developer
mode* to get the option to *load unpacked* extensions, and point it to
this directory.

### Firefox

In Firefox, the extension needs to be packaged as XPI and signed before
being installed permanently. It can be loaded from
`about:debugging#/runtime/this-firefox` *load temporary add-on* but it
won't persist across restarts.

To package and sign the extension, you need to setup the
`AMO_JWT_ISSUER` and `AMO_JWT_SECRET` environment variables from
[your credentials from the developer hub](https://addons.mozilla.org/developers/addon/api/key/),
then run:

```sh
npm install
npm run sign -- --api-key=$AMO_JWT_ISSUER --api-secret=$AMO_JWT_SECRET
```

It will generate a XPI file that you can permanently add to your
Firefox.
