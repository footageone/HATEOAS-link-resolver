import { suite, test } from '@testdeck/jest';
import { assert } from 'chai';
import { resolve } from '../src/resolve';

@suite
class SimplePath {
  @test simplePathParamsAtEnd() {
    assert.equal(
      resolve('https://example.org/{id}', { id: '2345' }),
      'https://example.org/2345',
    );
  }

  @test simplePathParamsInMiddle() {
    assert.equal(
      resolve('https://example.org/{id}/sub', { id: '2345' }),
      'https://example.org/2345/sub',
    );
  }

  @test onlyQueryParams() {
    assert.equal(
      resolve('https://example.org/path?elementIds={ids}', { ids: '234,345' }),
      'https://example.org/path?elementIds=234,345',
      'Resolve mandatory query params',
    );
  }
}

@suite
class PathAndQuery {
  @test pathMandatoryAndOptionalQuery() {
    assert.equal(
      resolve('https://example.org/path/{entity}/sub?ids={ids}{&lang,set}', {
        entity: 'abc',
        ids: '678',
      }),
      'https://example.org/path/abc/sub?ids=678',
      'If only mandatory given',
    );
  }

  @test queryAndOptionalOnlyMandatory() {
    assert.equal(
      resolve('https://example.org/path?ids={ids}{&lang,set}', { ids: '678' }),
      'https://example.org/path?ids=678',
      'If only mandatory given',
    );
  }

  @test queryAndOptionalAdditionalQueryParams() {
    assert.equal(
      resolve('https://example.org/path?ids={ids}{&lang,set}', {
        ids: '678',
        set: 'ALL',
      }),
      'https://example.org/path?ids=678&set=ALL',
      'With additional query params',
    );
  }

  @test queryAndOptionalAdditionalQueryParamsWithNullValue() {
    assert.equal(
      resolve('https://example.org/path?ids={ids}{&lang,set}', {
        ids: '678',
        lang: 'en',
        set: null,
      }),
      'https://example.org/path?ids=678&lang=en',
      'With additional query params and null value',
    );
  }
}

@suite
class MultiplePathParams {
  @test multiplePathParamsInside() {
    assert.equal(
      resolve('https://example.org/path/{id}/do/{query}/end', {
        id: '456',
        query: 'TEST',
      }),
      'https://example.org/path/456/do/TEST/end',
    );
  }

  @test twoPathParamsAsQuery() {
    assert.equal(
      resolve('https://example.org/path?id={id}&query={query}{&lang}', {
        id: '456',
        query: 'TEST',
      }),
      'https://example.org/path?id=456&query=TEST',
    );
  }

  @test twoPathQueryParamsAndQuery() {
    assert.equal(
      resolve('https://example.org/path?id={id}&query={query}{&lang}', {
        id: '456',
        query: 'TEST',
        lang: 'de',
      }),
      'https://example.org/path?id=456&query=TEST&lang=de',
    );
  }
}

@suite
class OnlyQueryParams {
  @test oneFromList() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
      }),
      'https://example.org/?two=ONE',
    );
  }

  @test oneFromListWithBooleanValue() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: true,
      }),
      'https://example.org/?two=true',
    );
  }

  @test oneFromListWithNumberValue() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 2,
      }),
      'https://example.org/?two=2',
    );
  }

  @test twoFromList() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
      }),
      'https://example.org/?one=TWO&two=ONE',
    );
  }

  @test twoFromListOneNotExistent() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
        six: 'NO',
      }),
      'https://example.org/?one=TWO&two=ONE',
    );
  }

  @test twoFromListOneNotExistentOneNullValue() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
        three: null,
        six: 'NO',
      }),
      'https://example.org/?one=TWO&two=ONE',
    );
  }

  @test twoFromListOneNotExistentOneUndefinedValue() {
    assert.equal(
      resolve('https://example.org/{?query,one,two,three,four}', {
        two: 'ONE',
        one: 'TWO',
        three: undefined,
        six: 'NO',
      }),
      'https://example.org/?one=TWO&two=ONE',
    );
  }
}

@suite
class Errors {
  @test noParams() {
    assert.throw(
      () => resolve('https://example.org/{id}'),
      'Path param id is missing',
    );
  }

  @test paramIsNull() {
    assert.throw(() => resolve('https://example.org/{id}', { id: null }));
  }

  @test paramIsUndefined() {
    assert.throw(() => resolve('https://example.org/{id}', { id: undefined }));
  }
}
