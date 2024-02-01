restify-validators
==================
[![License](https://img.shields.io/badge/license-Apache--2.0%20OR%20MIT-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![NPM version](https://img.shields.io/npm/v/@offscale/restify-validators.svg)](https://www.npmjs.com/package/@offscale/restify-validators)
![npm-publish](https://github.com/SamuelMarks/restify-validators/workflows/npm-publish/badge.svg)

Custom validators for the Node.JS restify framework.

## Install

    npm i -S @offscale/restify-validators

## Miscellaneous

Clone the dist repo in the same directory this repo was cloned into, then you can synchronise them with:

    dst="${PWD##*/}"-dist;
    find -type f -not -path './node_modules*' -a -not -path './.git*' -a -not -path './.idea*' -a -not -path './typings*' -a -not -name '*.ts' -not -name 'ts*' | cpio -pdamv ../"$dst";

Or simply:

    cp {*.md,*.js*} ../restify-validators-dist

---

## License

Licensed under either of

- Apache License, Version 2.0 ([LICENSE-APACHE](LICENSE-APACHE) or <https://www.apache.org/licenses/LICENSE-2.0>)
- MIT license ([LICENSE-MIT](LICENSE-MIT) or <https://opensource.org/licenses/MIT>)

at your option.

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted
for inclusion in the work by you, as defined in the Apache-2.0 license, shall be
dual licensed as above, without any additional terms or conditions.
