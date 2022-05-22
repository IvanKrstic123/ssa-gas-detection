using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson;
using MongoDB.Driver;
using SmokeDetection.Entities;

namespace SmokeDetection.Repositories
{
    public class MongoDbItemsRepository : IGasConcentrationRepository
    {
        private const string databaseName = "gas-concentration";
        private const string collectionName = "measure";
        private readonly IMongoCollection<GasConcentration> itemsCollection;
        private readonly FilterDefinitionBuilder<GasConcentration> filterBuilder = Builders<GasConcentration>.Filter;


        public MongoDbItemsRepository(IMongoClient mongoClient)
        {
            IMongoDatabase database = mongoClient.GetDatabase(databaseName);
            itemsCollection = database.GetCollection<GasConcentration>(collectionName);
        }

        public void CreateGasConcentration(GasConcentration item)
        {
            itemsCollection.InsertOne(item);
        }

        public IEnumerable<GasConcentration> GetAllGasConcentrations()
        {
            return itemsCollection.Find(new BsonDocument()).ToList();
        }

        public GasConcentration GetGasConcentration(Guid id)
        {
            var filter = filterBuilder.Eq(item => item.Id, id);
            return itemsCollection.Find(filter).SingleOrDefault();
        }
        
        public void UpdateGasConcentration(GasConcentration item)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, item.Id);
            itemsCollection.ReplaceOne(filter, item);
        }

        public void DeleteGasConcentration(Guid id)
        {
            var filter = filterBuilder.Eq(existingItem => existingItem.Id, id);

            itemsCollection.DeleteOne(filter);

        }

        public IEnumerable<GasConcentration> GetConcentrationByCity(string city)
        {
            var filter = filterBuilder.Eq(item => item.City, city);
            return itemsCollection.Find(filter).ToList();
        }

        public List<string> GetCities()
        {
            var distinctWords = itemsCollection.AsQueryable<GasConcentration>().Select(e => e.City).Distinct().ToList();

            return distinctWords;
        }
    }
}