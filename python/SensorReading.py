from datetime import datetime as dt
import Reading
from json import dumps

class SensorReading:
    def __init__( self, node_id=None, reading=Reading ):
        self.node_id = node_id
        self.reading = reading
        self.datetime = {
            "date": dt.now().date().strftime("%m/%d/%Y"), 
            "time": dt.now().astimezone().strftime("%H:%M:%S"), 
        }
    def toDict(self):
        return {
            "reading": self.reading.toDict(),
            "datetime": {
                "date": self.datetime["date"],
                "time": self.datetime["time"]
            }
        }
    def toJSON(self):
        return dumps( self.toDict() )