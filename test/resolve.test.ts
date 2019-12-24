import { suite, test } from "@testdeck/mocha";
import { assert } from "chai";
import { resolve } from '../resolve';

@suite
class SimplePath {
    @test simplePathParamsAtEnd() {
        assert.equal(resolve("https://example.org/{id}", {id: "2345"}), "https://example.org/2345");
    }

    @test simplePathParamsInMiddle() {
        assert.equal(resolve("https://example.org/{id}/sub", {id: "2345"}), "https://example.org/2345/sub");
    }

    @test onlyQueryParams() {
        assert.equal(resolve("https://example.org/path?elementIds={ids}", {ids: "234,345"}), "https://example.org/path?elementIds=234,345", "Resolve mandatory query params");
    }


}

@suite
class PathAndQuery {
    @test pathMandatoryAndOptionalQuery() {
        assert.equal(resolve("https://example.org/path/{entity}/sub?ids={ids}{&lang,set}", {entity: "abc", ids: "678"}), "https://example.org/path/abc/sub?ids=678", "If only mandatory given")
    }

    @test queryAndOptionalOnlyMandatory() {
        assert.equal(resolve("https://example.org/path?ids={ids}{&lang,set}", {ids: "678"}), "https://example.org/path?ids=678", "If only mandatory given")
    }

    @test queryAndOptionalAdditionalQueryParams() {
        assert.equal(resolve("https://example.org/path?ids={ids}{&lang,set}", {ids: "678", set: "ALL"}), "https://example.org/path?ids=678&set=ALL", "With additional query params")
    }
}

@suite
class MultiplePathParams {
    @test multiplePathParamsInside() {
        assert.equal(resolve("https://example.org/path/{id}/do/{query}/end", {
            id: "456",
            query: "TEST",
        }), "https://example.org/path/456/do/TEST/end")
    }

    @test twoPathParamsAsQuery() {
        assert.equal(resolve("https://example.org/path?id={id}&query={query}{&lang}", {
            id: "456",
            query: "TEST",
        }), "https://example.org/path?id=456&query=TEST")
    }

    @test twoPathQueryParamsAndQuery() {
        assert.equal(resolve("https://example.org/path?id={id}&query={query}{&lang}", {
            id: "456",
            query: "TEST",
            lang: "de"
        }), "https://example.org/path?id=456&query=TEST&lang=de")
    }
}

@suite
class OnlyQueryParams {
    @test oneFromList() {
        assert.equal(resolve("https://example.org/{?query,one,two,three,four}", {
            two: "ONE",
        }), "https://example.org/?two=ONE")
    }

    @test twoFromList() {
        assert.equal(resolve("https://example.org/{?query,one,two,three,four}", {
            two: "ONE",
            one: "TWO",
        }), "https://example.org/?one=TWO&two=ONE")
    }

    @test twoFromListOneNotExistant() {
        assert.equal(resolve("https://example.org/{?query,one,two,three,four}", {
            two: "ONE",
            one: "TWO",
            six: "NO"
        }), "https://example.org/?one=TWO&two=ONE")
    }
}
