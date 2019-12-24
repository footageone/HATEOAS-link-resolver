import { Params, resolve } from './resolve';

export interface LinkModel {
    href: string;
    templated?: boolean;
}

export interface LinkRepositoryDTO {
    [key: string]: LinkModel;
}

export class LinkRepository {
    private _links: Map<string, LinkModel>;
    constructor(links: LinkRepositoryDTO) {
        this._links = new Map(Object.entries(links));
    }

    has(key: string) {
        return this._links.has(key);
    }

    get(key: string) {
        if (this.has(key)) {
            return this._links.get(key)?.href;
        }
    }

    resolve(key: string, params: Params) {
        const url = this.get(key);
        if (url != null) {
            return resolve(url , params);
        }
    }
}
