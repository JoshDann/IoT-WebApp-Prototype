from datetime import datetime as dt
import Reading
from json import dumps

class SensorReading:
    def __init__(self, node_id=None, reading=Reading):
        self.node_id = node_id
        self.reading = reading
        self.timestamp = dt.now().timestamp()

    def toDict(self):
        return {
            "reading": self.reading.toDict(),
            "timestamp": self.timestamp
        }
    def toJSON(self):
        return dumps( self.toDict() )