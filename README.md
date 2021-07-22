# action-dependabot-title-fixer

[![Test](https://github.com/Submitty/action-dependabot-title-fixer/actions/workflows/test.yml/badge.svg)](https://github.com/Submitty/action-dependabot-title-fixer/actions/workflows/test.yml)

GitHub action that fixes the PR title Dependabot uses so that it meets
[our title guidelines](https://submitty.org/developer/how_to_contribute#how-to-make-a-pull-request-pr-to-submitty).
Dependabot on creating a new PR will append a `:` to the module type (e.g. `[DevDependency]:`), and there's no way
to configure it to not do this (see [dependabot/dependabot-core#2934](https://github.com/dependabot/dependabot-core/issues/2934)).

## Usage

```yaml

name: 'Dependabot Title Fixer'
on:
  pull_request:
    # check when PR
    # * is created,
    # * title is edited, and
    # * new commits are added (to ensure failing title blocks merging)
    types: [ opened, reopened, edited, synchronize ]

jobs:
  title-check:
    runs-on: ubuntu-latest
    steps:
      - uses: submitty/action-dependabot-title-fixer@master
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
```
