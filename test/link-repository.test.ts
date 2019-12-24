import { suite, test } from "@testdeck/mocha";
import { assert } from 'chai';
import { LinkRepository } from '../link-repository';
import { resolve } from '../resolve';

@suite
class LinkRepositoryTest {
    @test createRepository() {
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
        assert.isTrue(repo.has("endpoint1"));
        assert.isTrue(repo.has("endpoint2"));
        assert.isFalse(repo.has("endpoint3"));
    }

    @test getLink() {
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
        assert.equal(repo.get("endpoint1"), "https://example.org/{id}");
    }

    @test resolveLink() {
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
        assert.equal(repo.resolve("endpoint1", {id: "124"}), "https://example.org/124");
    }
}
