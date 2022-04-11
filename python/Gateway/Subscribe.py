import paho.mqtt.client as mqtt
import time

# below details will need to be changed to work on campus
broker_address = "node02.myqtthub.com"
port = 1883
client_id = "PC-Gateway"
user = "AudeciGateway"
password = "A123"

subscribe_location = "location/readings"

connected = False


def on_connect(client, userdata, flags, rc):
    if rc == 0:
        # location should be changed to something unique relating to area deployed
        print("Connected to broker")
        client.subscribe(subscribe_location)
        print("Subscribed to: " + subscribe_location)

        global connected
        connected = True

    else:
        print("connection failed")


def on_message(client, userdata, msg):
    print("Message received ->" + msg.topic + " " + str(msg.payload))


def listen():
    client = mqtt.Client(client_id)
    client.username_pw_set(user, password)
    client.on_connect = on_connect
    client.connect(broker_address, port)
    client.on_message = on_message

    client.loop_forever()

    while connected != True:
        time.sleep(0.5)

    if KeyboardInterrupt:
        client.disconnect()
        client.loop_stop()
