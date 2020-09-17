from django.shortcuts import render
import serial, time
from rest_framework.response import Response
from rest_framework.decorators import api_view

arduino = serial.Serial("COM3",9600)

# Create your views here.
def index(request):
    return render(request, 'index.html')

@api_view(['GET'])
def sensor_read(request):
    arduino.write('SR'.encode())
    if arduino.readable():
        tmp = arduino.readline()
        res = tmp.decode('utf-8')[2:len(tmp)-1]

    context={
        'res':res
    }

    return Response(context)

@api_view(['GET'])
def motor_control(request,level):
    cmd = "MC"+str(level)
    arduino.write(cmd.encode())
    if arduino.readable():
        tmp = arduino.readline()
        res = tmp.decode('utf-8')[:len(tmp)-1]
    context={
        'res':res
    }
    return Response(context)