from Reading import Reading
from json import dumps

class SensorReading:
    def __init__(self, reading, node_id, timestamp):
        self.node_id = node_id
        self.reading = reading
        self.timestamp = timestamp

    def toDict(self):
        return {
            "node_id": self.node_id,
            "reading": self.reading.toDict(),
            "timestamp": self.timestamp
        }

    def toJSON(self):
        return dumps(self.toDict())
