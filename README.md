# Code review using Reek

Analyze code statically by using [Reek](https://github.com/troessner/reek) in Github actions

## Inputs

### `files`

Specify files or directories

(Multiple files or directories can be specified by separating them with line feed)

### `options`

Changes `reek` command line options.

Specify the options in JSON array format.
e.g.: `'["--smell", "NilCheck"]'`

### `working_directory`

Changes the current working directory of the Node.js process

## Example usage

```yaml
name: Analyze code statically
"on": pull_request
jobs:
  reek:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Analyze code statically using Reek
        uses: moneyforward/reek-action@v0
```

## Contributing
Bug reports and pull requests are welcome on GitHub at https://github.com/moneyforward/reek-action

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
