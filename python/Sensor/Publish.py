import paho.mqtt.client as mqtt
import time

# below details will need to be changed to work on campus
broker_address = "node02.myqtthub.com"
port = 1883
client_id = "PC-Sensor"
user = "AudeciSensor"
password = "A123"

connected = False


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")

        global connected
        connected = True
        return

    else:
        print("Connection failed")


def connect_to_broker():
    client = mqtt.Client(client_id)
    client.username_pw_set(user, password)
    client.on_connect = on_connect
    client.connect(broker_address, port)

    client.loop_start()

    while connected != True:
        time.sleep(0.5)

    try:
        while True:
            value = input('Enter message:')
            client.publish("location/readings", value)

    except KeyboardInterrupt:

        client.disconnect()
        client.loop_stop()
