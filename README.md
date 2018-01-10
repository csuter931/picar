# picar

![](https://github.com/lawsonkeith/Pi-Rc-Car/raw/master/media/DSC_0216.jpg)

## Overview
Use your raspberry pi to control a 1/10 scale RC car via a web page hosted wirelessly on your PI.  All you need to do is set up your PI to use your mobile as a hotspot then log onto it's hosted web page and tilt your phone to control your car like a Wii Remote.  I've used an old Tamiya hornet in this example; any car will do but if you are buying one try and get one with enough space under the bodyshell to fit all your electronics.

## Electrical
This project is based on [shaunuk/picar] but replaces the servo board with a soft PWM driver on the PIs GPIO pins. 

### Pi Power supply
When it comes to powering the PI it is necessary to have a stable 5V power supply otherwise the Pi will reset.  We will use a didcated 5V 2.5A USB power pack to run the Pi.

There are a number of RC car electrical setups but this example uses an ESC and receiver with battery eliminator circuit.  The electronics supply normally comes from the electronic speed controller (ESC) and powers the receiver and steeirng servo with 5V (note these devices are more tolerant of power supply dips than the Pi).  The receiver normally receives commands from the radio controller than sends them to the ESC. The ESC then provides PWM signals to the drive motor and steering servo.

### Servo signal levels
We'll be using PWM to control the servo and motor which will oporate within 0-3.3V in 3.3mv steps; it is therefore necessary first to measure what your servo command signal voltage levels are and check they fall within this range.    You can do this with a multi-meter connected to the receiver pins. Speed and steering both use 3 pin headers which are wired:
<ul>
   <li>Gnd - Black</li>
   <li>Power - Red</li>
   <li>Throttle / Steer - White</li>
</ul>

## Software 
The Pi-Blaster program allows pins 17 and 18 of the PI to act as PWM outputs and control steering and throttle.
The Pi uses node.js to run a web server. The wi-fi on the PI connects to the same wireless network your phone is connected to. Once you enter the web address of the PI a dialog box appears prompting you to begin racing; at that point you can control your car by tiliting your phone.  An emergency stop is built into the app so if it loses comms to your phone the vehicle stops accelerating and steers forwards.

To setup your Pi you need to download some software packages then setup your Pi to run the node.js program on boot.

### Get the app 
First we need to clone the picar repo from github and place it in it's own directory under /home/pi. The picar directory MUST be located in /home/pi because the setup.sh script is hardcoded to point to that location.
<ul>
<li>[cd /home/pi]</li>
<li>Get this project from GITHUB.</li>
<li>[sudo git clone https://github.com/lawsonkeith/picar]</li>
<li>[cd picar]</li>
<li>Note - do everything in this dir from now on unless instructed otherwise.</li>
</ul>

### Run setup.sh
<ul>
<li>[cd picar]</li>
<li>[./setup.sh]</li>
</ul>

###Setup the pi to boot to command line
You will want to not boot to the windows environment because the PWM library can interfere with it.  If you do need to use the desktop you can always start it with the command 
* [startx].