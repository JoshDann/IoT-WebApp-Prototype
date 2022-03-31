
# note: pymongo version must be 3.11.3 (pip install pymongo==3.11.3)
import pymongo
from SensorReading import SensorReading as Node
from Reading import Reading

from json import dumps

def main():
    uri = "mongodb+srv://adsu:adsu@rgu-adsu.y36bi.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE"
    client = pymongo.MongoClient( host=uri, connect=False )

    # cluster (client) => db => collection
    db = client.audeci
    collection = db.readings

    # noise, temperature, air_quality, humidity, light, pressure
    reading = Reading()

    testSensor = Node(
        id = "",
        reading = reading
    )

    # print( dumps( testSensor.toDict() ) )
    collection.insert_one( testSensor.toDict() )

if __name__ == "__main__":
    main()
