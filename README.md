# HATEOAS-link-resolver

Small helper library for resolving templated HATEOAS links

## Install

Use your favourite package manager

``npm i -S hateoas-link-resolver``

or

``yarn add hateoas-link-resolver``


## Usage

Just resolve templated links

````javascript
import { resolve } from 'hateoas-link-resolver';
const templatedLink = 'https://example.org/{id}/sub';
const resolvedLink = resolve(link, {id: '123'});
````

Use Link repository. Put all link into repository and then
retrieve from there and resolve

````javascript
import { LinkRepository } from 'hateoas-link-resolver';
const links = {
    endpoint1: {
        href: "https://example.org/{id}",
        templated: true
    },
    endpoint2: {
        href: "https://example.org/path/{id}",
        templated: true
    }
};
const repo = new LinkRepository(links);

// resolve
repo.resolve('endpoint1', {id: '123'});

// check existence
repo.has('endpoint1');

// get unresolved link
repo.get('endpoint1');
````

## Limitations

This helper is for rather simple link structures and does not support list of links.

## Alternatives

If you need resolving of list of links you might want to try [hateoas-hal-link-resolver](https://github.com/just-paja/hateoas-hal-link-resolver)
