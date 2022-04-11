# note: pymongo version must be 3.11.3 (pip install pymongo==3.11.3)
import pymongo
from SensorReading import SensorReading as Node
from Reading import Reading
import Subscribe as Sub

from json import dumps

uri = "mongodb+srv://adsu:adsu@rgu-adsu.y36bi.mongodb.net/?ssl=true&ssl_cert_reqs=CERT_NONE"
client = pymongo.MongoClient(host=uri, connect=False)

# cluster (client) => db => collection
db = client.audeci
collection = db.nodes


def main():
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
        node_id="TEST_001",
        reading=reading
    )

    collection.find_one_and_update(
        {"node_id": testSensor.node_id},
        {"$push": {"readings": testSensor.toDict()}}
    )


def test():
    # from random import randint
    # for i in range(30):
    #     node = Node(
    #         node_id="TEST_%d" % (randint(1, 5)),
    #         reading=Reading(
    #             noise=randint(0, 100),
    #             air_quality=randint(0, 100),
    #             light=randint(0, 100),
    #             pressure=randint(0, 100),
    #             temperature=randint(0, 100)
    #         )
    #     )
    #
    #     print("NODE:%d \nnode id: %s" % (i, node.node_id))
    #
    #     collection.find_one_and_update(
    #         {"node_id": node.node_id},
    #         {"$push": {"readings": node.toDict()}}
    #     )

    Sub.listen()


if __name__ == "__main__":
    test()
