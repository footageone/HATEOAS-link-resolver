import { resolve } from './resolve';
import { Params } from './params';

export interface LinkModel {
  href: string;
  templated?: boolean;
}

export type LinkRepositoryDTO = Record<string, LinkModel>;

export class LinkRepository<T extends LinkRepositoryDTO = LinkRepositoryDTO> {
  private _links: Map<keyof T, LinkModel>;

  constructor(links: T) {
    this._links = new Map(Object.entries(links));
  }

  has(key: keyof T) {
    return this._links.has(key);
  }

  get(key: keyof T) {
    if (this.has(key)) {
      return this._links.get(key)?.href;
    }
  }

  resolve(key: keyof T, params: Params) {
    const url = this.get(key);
    if (url != null) {
      return resolve(url, params);
    }
  }
}
