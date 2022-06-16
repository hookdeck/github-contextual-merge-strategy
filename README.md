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
