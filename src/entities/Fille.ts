export class File {
    constructor(
        private id: string,
        private name: string,
        private key: string,
        private url: string,
        private createdAt: number,
        private userId?: string,
    ) { }

    public getId() {
        return this.id;
    }
    public getName() {
        return this.name;
    }
    public getKey() {
        return this.key;
    }
    public getUrl() {
        return this.url;
    }
    public getCreateAt() {
        return this.createdAt;
    }
    public getUserId() {
        return this.userId
    }
    public static toFileModel(result: any): File {
        const { id, name, key, url, createdAt } = result;

        const file = new File(
            id, name, key, url, createdAt
        );

        return file;
    }
}