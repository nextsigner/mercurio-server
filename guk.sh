#!/bin/bash
#Script creado por nextsigner para crear Carta Astral de todo un mes
#Sirve para analizar cómo estarán las energías del mundo día a día en el mes y año enviado como parametro o argumento de este script.


#MODO DE USO
#Arg1=Ubicación de Zodiac zodiacserver
#Arg2=Año
#Arg3=Mes
#Arg4=Carpeta de destino de las imágenes guk.
#Arg5=Segundos de espera para crear la imagen siguiente.

#./guk.sh /media/nextsigner/ZONA-A12/nsp/unik-dev-apps/zodiacserver/bin/zodiac_server 2020 12 /media/nextsigner/ZONA-A12/guks 10
FOLDERDESTINATION=$4
d=$2"-"$3"-01"
#echo $d
V1=0
MS=$3
AN=$2
#echo "Mes $3"
if [ $3 -eq 12 ]
then
#echo "Mes pasará a uno!"
MS=01
AN=$((AN + 1))
else
MS=$((MS + 1))
fi

echo "Mes siguiente $MS"
echo "Fecha limite $AN-$MS-01"

until [[ $d > $AN-$MS-01 ]];
do
if [ $V1 -lt 1 ]
then
    d=$(date -I -d "$d + 1 day")
else
    #echo "$d"
    d=$(date -I -d "$d + 1 day")
    d2=$(date -I -d "$d - 2 day")
    #echo "$d2 --- $V1"
    FILENAME=GUK_$d2
    PN0=$(echo $FILENAME | cut -d'_' -f2)
    PN1=$(echo $PN0 | cut -d'-' -f1)
    PN2=$(echo $PN0 | cut -d'-' -f2)
    PN3=$(echo $PN0 | cut -d'-' -f3)
    mkdir -p $FOLDERDESTINATION"/"$PN1"/"$PN2
    IMAGEFULLFILENAME=$FOLDERDESTINATION"/"$PN1"/"$PN2"/"$FILENAME.png
    echo "Creando la imagen "$IMAGEFULLFILENAME
   $1 $FILENAME $PN1 $PN2 $PN3 12 00 0 51.48739 0.0 Greeewich_United_Kingston $FOLDERDESTINATION"/"$PN1"/"$PN2/$FILENAME.json 1500000 5 $IMAGEFULLFILENAME 5120x2880 /tmp/$FILENAME.json
    sleep $5
fi
V1=$((V1 + 1))
done
exit
