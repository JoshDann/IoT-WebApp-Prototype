import Publish as Pub
from Reading import Reading
from SensorReading import SensorReading
from datetime import datetime as dt

# node id to match up with db and register page on web app


def main():
    print("Hello")
    test_reading = Reading(
        noise=12,
        temperature=-1,
        air_quality=100,
        pressure=19,
        humidity=0.8,
        light=None
    )

    test_sensor_reading = SensorReading(test_reading, "node_01", dt.now().timestamp()).toJSON()

    Pub.publish_reading(test_sensor_reading)



if __name__ == "__main__":
    main()
