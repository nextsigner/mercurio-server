!#/bin/bash
cd /root
sudo mkdir mercurio-server
cd mercurio-server
sudo mkdir files
sudo chmod -R 755 files

#Instlando aplicaciones necesarias
sudo apt install git
git clone https://github.com/nextsigner/zodiacserver.git

#instalando zodiacserver


#Instalando entorno de escritorio y aplicaciones necesarias para zodiacserver
sudo apt install xfce4 xfce4-goodies gnome-icon-theme tightvncserver qt5declarative qtcreators

sudo cp vncserver.sh /etc/init.d/vncserver.sh
sudo chmod +x /etc/init.d/vncserver.sh
sudo update-rc.d vncserver.sh defaults
vncserver :1 -geometry 1920x1080
