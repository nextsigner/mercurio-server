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
sudo apt install xfce4 xfce4-goodies gnome-icon-theme tightvncserver nodejs qt5declarative qtcreators

echo "install.sh copiando archivo /etc/init.d/vncserver..."
sudo cp vncserver /etc/init.d/vncserver
sudo chmod +x /etc/init.d/vncserver
sudo update-rc.d vncserver defaults

echo "install.sh copiando archivo /etc/init.d/mercurio..."
sudo cp vncserver /etc/init.d/mercurio
sudo chmod +x /etc/init.d/mercurio
sudo update-rc.d mercurio defaults

