const { cosmosConfig } = require("./config");
const CosmosClient = require('@azure/cosmos').CosmosClient

class dataAccess {
    /**
     * Manages reading, adding, and updating Koedos in Cosmos DB
    * @param {string} databaseId
    * @param {string} containerId
     */
    constructor(databaseId, containerId) {
        const { cosmosdb_endpoint: endpoint, cosmosdb_key: key } = cosmosConfig;
        this.client = new CosmosClient({ endpoint, key });
        this.database = this.client.database(databaseId);
        this.container = this.database.container(containerId);
    }

    async init() {
    }

    async find(querySpec) {
        console.log('Querying for items from the database')
        if (!this.container) {
            throw new Error('Collection is not initialized.')
        }
        const { resources } = await this.container.items.query(querySpec).fetchAll()
        return resources
    }

    async addItem(item) {
        console.log('Adding an item to the database')
        const { resource: doc } = await this.container.items.create(item)
        return doc
    }

    async updateItem(item, partitionKey) {
        console.log('Update an item in the database')

        const { resource: replaced } = await this.container
            .item(item.id, item[partitionKey])
            .replace(item)
        return replaced
    }

    async deleteItem(itemId, partitionKey) {
        console.log(`Deleting an item from the database: ${itemId}`);
        const doc = await this.getItem(itemId)
        const { resource: result } = await this.container.item(itemId, doc[partitionKey]).delete();
    }

    async getItem(itemId, idfieldName = 'Id') {
        console.log('Getting an item from the database');
        const docs = await this.find(`SELECT * FROM c WHERE lower(c.${idfieldName}) = lower('${itemId}')`);
        return docs[0];
    }
}

module.exports = dataAccess;
