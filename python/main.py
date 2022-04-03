
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
    collection = db.nodes

    # noise, temperature, air_quality, humidity, light, pressure
    reading = Reading(
        noise=12,
        temperature=-1,
        air_quality=100,
        pressure=19,
        humidity=0.8,
        light=None
    )

    testSensor = Node(
        node_id = "TEST_001",
        reading = reading
    )


    collection.find_one_and_update( 
        { "node_id": testSensor.node_id },
        { "$push": { "readings": testSensor.toDict() } }
    )

if __name__ == "__main__":
    main()
