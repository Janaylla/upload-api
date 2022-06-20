import { BaseData } from "./BaseData";

class ModelUpload extends BaseData {
    public createUser = async () => {
        await this.getConnection().schema.createTable('user', (table) => {
            table.string(`id`).primary()
            table.string('nickname').notNullable().unique()
            table.string('email').notNullable().unique()
            table.string('password').notNullable()
        })
    }
    public createFile = async () => {
        await this.getConnection().schema.createTable('file', (table) => {
            table.uuid(`id`).primary()
            table.string('name').notNullable()
            table.string('key').notNullable().unique()
            table.string('url').notNullable().unique()
            table.bigInteger("createdAt").notNullable()
            table.string('userId')
                .notNullable()
                .references('id')
                .inTable('user')
        })
    }
}

const migration = async () => {
    const modelUpload = new ModelUpload()
    await modelUpload.createUser()
    await modelUpload.createFile()
}

migration().then((res) => {
    console.log("Migration done successfully")
})