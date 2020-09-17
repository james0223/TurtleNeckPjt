import serial,time

arduino = serial.Serial("COM3",9600)
    
time.sleep(1)
arduino.write('s'.encode())
for _ in range(5):
    print(_)
    if arduino.readable():
        res = arduino.readline()
        print(res.decode()[:len(res)-1])
        break
    time.sleep(0.1)
arduino.close()
