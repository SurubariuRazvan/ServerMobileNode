import dataStore from 'nedb-promise';

export class GameStore {
    constructor({filename, autoload}) {
        this.store = dataStore({filename, autoload});
    }

    async getNextId() {
        const a = await this.store.findOne({_id: '__autoid__'});
        const nextId = a.value + 1;
        await this.store.update({_id: '__autoid__'}, {$set: {value: nextId}}, {});
        return nextId;
    }

    async find(props, offset, size) {
        // this.store.find({ planet: /ar/ }, function (err, docs) {
        //     // docs contains Mars and Earth
        // });

       return new Promise((resolve, reject)=> {
            this.store.nedb.find(props).sort({_id: 1}).skip(offset).limit(size)
                .exec(function async(err, docs) {
                    resolve(docs);
                })
        });
        // return this.store.find(props);
    }

    async findOne(id) {
        return this.store.findOne({_id: id});
    }

    async insert(game) {
        // validation
        if (game.appid === undefined)
            throw new Error('Missing appid property')
        if (game.name === undefined || game.name === '')
            throw new Error('Missing name property')
        if (game.developer === undefined || game.developer === '')
            throw new Error('Missing developer property')
        if (game.positive === undefined)
            throw new Error('Missing positive property')
        if (game.negative === undefined)
            throw new Error('Missing negative property')
        if (game.owners === undefined || game.owners === '')
            throw new Error('Missing owners property')
        if (game.price === undefined)
            throw new Error('Missing price property')
        game._id = await this.getNextId();
        return this.store.insert(game);
    };

    async update(id, game) {
        return this.store.update({_id: id}, game);
    }

    async remove(id) {
        return this.store.remove({_id: id});
    }
}

export default new GameStore({filename: './db/games.json', autoload: true});
