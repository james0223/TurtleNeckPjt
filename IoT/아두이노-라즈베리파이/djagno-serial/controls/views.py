from django.shortcuts import render
import serial, time

arduino = serial.Serial("COM3",9600)

# Create your views here.
def index(reqest):
    return render(reqest,'controls/index.html')

def sensor_read(request):
    arduino.write('s'.encode())
    if arduino.readable():
        tmp = arduino.readline()
        res = tmp.decode()[:len(tmp)-1]
    # arduino.close()
    context={
        'res':res
    }

    return render(request,'controls/response.html',context)

def motor_control(request):
    arduino.write('c'.encode())
    if arduino.readable():
        tmp = arduino.readline()
        res = tmp.decode()[:len(tmp)-1]
    # arduino.close()
    context={
        'res':res
    }
    return render(request,'controls/response.html',context)