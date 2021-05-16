import { suite, test } from "@testdeck/jest";
import { assert } from 'chai';
import { LinkRepository } from '../src/link-repository';

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
        expect(repo.has("endpoint1")).toBe(true);
        expect(repo.has("endpoint2")).toBe(true);
        // @ts-ignore
        expect(repo.has("endpoint3")).toBe(false);
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
        expect(repo.get("endpoint1")).toEqual("https://example.org/{id}");
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
        expect(repo.resolve("endpoint1", {id: "124"})).toEqual("https://example.org/124");
    }
}
