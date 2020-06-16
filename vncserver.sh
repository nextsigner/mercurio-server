#!/bin/bash
### BEGIN INIT INFO
# Provides:          vncserver-mercurio
# Required-Start:    $syslog
# Required-Stop:     $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Iniciar VncServer para Mercurio Server
# Description: Se inicia vncserver :1 -geometry 1920x1080 para Zodiac Server 
#
### END INIT INFO
vncserver :1 -geometry 1920x1080
