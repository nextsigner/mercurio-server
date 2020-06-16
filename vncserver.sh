#!/bin/bash
### BEGIN INIT INFO
# Provides:          vncserver
# Required-Start:    $remote_fs $syslog
# Required-Stop:     $remote_fs $syslog
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start daemon at boot time
# Description:       Enable vncserver for mercurio-server service provided by daemon.
### END INIT INFO
vncserver :1 -geometry 1920x1080
