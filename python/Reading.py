
from json import dumps

class Reading:
    def __init__( self, noise=None, temperature=None, air_quality=None, pressure=None, humidity=None, light=None ):
        self.noise = noise
        self.temperature = temperature
        self.air_quality = air_quality
        self.pressure = pressure
        self.humidity = humidity
        self.light = light
    
    def toDict(self):
        return {
            "noise": self.noise,
            "temperature": self.temperature,
            "air_quality": self.air_quality,
            "pressure": self.pressure,
            "humidity": self.humidity,
            "light": self.light
        }
    def toJSON(self):
        return dumps( self.toDict() )