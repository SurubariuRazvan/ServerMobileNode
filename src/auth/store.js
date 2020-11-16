import dataStore from 'nedb-promise';

export class UserStore {
    constructor({filename, autoload}) {
        this.store = dataStore({filename, autoload});
    }

    async getNextId() {
        const a = await this.store.findOne({_id: '__autoid__'});
        const nextId = a.value + 1;
        await this.store.update({_id: '__autoid__'}, {$set: {value: nextId}}, {});
        return nextId;
    }

    async findOne(username) {
        return this.store.findOne({username});
    }

    async insert(user) {
        if ((await this.store.findOne({username: user.username})) != null)
            throw new Error("Username already exists");
        user._id = await this.getNextId();
        return this.store.insert(user);
    };
}

export default new UserStore({filename: './db/users.json', autoload: true});

