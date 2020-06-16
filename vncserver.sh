#!/bin/bash
### BEGIN INIT INFO
# Provides:          mercurio
# Required-Start:    $syslog
# Required-Stop:     $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Iniciar forever de Mercurio Server
# Description:
#
### END INIT INFO
vncserver :1 -geometry 1920x1080
