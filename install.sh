#!/bin/bash
sudo chmod -R 755 .
sudo mkdir files
sudo chmod -R 755 files

sudo mkdir cns
sudo chmod -R 755 cns

#Instlando aplicaciones necesarias
git clone https://github.com/nextsigner/zodiacserver.git
sudo chmod +x zodiacserver/bin/zodiac_server


#Instalando entorno de escritorio y aplicaciones necesarias para zodiacserver
sudo apt-get install nano xfce4 xfce4-goodies gnome-icon-theme tightvncserver nodejs qtquick1-5-dev qtscript5-dev

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs 
sudo apt-get install -y npm

echo "install.sh copiando archivo /etc/init.d/vncserver..."
sudo cp xstartup ~/.vnc/xstartup
sudo chmod +x ~/.vnc/xstartup

echo "install.sh copiando archivo /etc/init.d/vncserver..."
sudo cp vncserver /etc/init.d/vncserver
sudo chmod +x /etc/init.d/vncserver
sudo update-rc.d vncserver defaults

#echo "install.sh copiando archivo /etc/init.d/mercurio..."
#sudo cp vncserver /etc/init.d/mercurio
#sudo chmod +x /etc/init.d/mercurio
#sudo update-rc.d mercurio defaults

vncserver

echo "Mercurio dice: Conectar con Vnc Viewer server_ip:5901"
