module.exports=function(app){
    var spawn = require('child_process').spawn;
    var spawnEMail = require('child_process').spawn;
    var cp
    var cpEMail

    function setAndSendEmail(v1, v2, v3, v4, v5, v6, v7, v8, v9){
        console.log("Creando carta natal...");
        let d0=new Date(Date.now())
        let sd=''+d0.getDate()+'/'+parseInt(d0.getMonth()+1)+'/'+d0.getFullYear()+' '+d0.getHours()+':'+d0.getMinutes()+':'+d0.getSeconds()
        let d='<b>Nombre: </b>'+v1+'<br />'
                +'<b>Fecha: </b>'+v4+'/'+v3+'/'+v2+'<br />'
                +'<b>Hora: </b>'+v5+':'+v6+'hs <br />'
                +'<b>GMT: </b>'+v7+'<br />'
                +'<b>Latitud: </b>'+v8+'<br />'
                +'<b>Longitud: </b>'+v9+'<br />'
                +''
        cpEMail = spawnEMail('sh', ['sendEmail.sh', '"'+d+'"', "Mercurio - Nueva Carta", 'qtpizarro@gmail.com']);
        cpEMail.on("exit", function(data) {
            console.log('Mail enviado: '+sd);
            console.log('Datos: '+d.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<br \/>/g, '\n'));
        });
        cpEMail.stderr.on("data", function(data) {
            console.error(data.toString());
        });
    }

    newPing = function(req, res){
        res.status(200).send({'ping':10})
    }
    newCN = function(req, res){
        let v1 = req.query.nom
        let v2 = req.query.a
        let v3 = req.query.m
        let v4 = req.query.d
        let v5 = req.query.h
        let v6 = req.query.min
        let v7 = '-3'
        let v8 = req.query.lat
        let v9 = req.query.lon
        let v10=req.query.loc
        let date=new Date(Date.now())
        let ms=date.getTime()
        let fn=__dirname+'/files/'+ms+'_'+v1+'.json'
        console.log('Get new cn: '+v1+' '+v2+' '+v3+' '+v4+' '+v5+' '+v6+' '+v7+' '+v8+' '+v9+' '+v10+' '+fn+' '+ms)
        let o={'file':''+ms+'_'+v1}
        cp = spawn('/root/mercurio-server/zodiacserver/bin/zodiac_server', [v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, fn, ms]);
        cp.stdout.on("data", function(data) {
            if(data.toString().trim().indexOf('AppSettings: saved to')>=0){
                console.log('Sistema Mercurio: '+data.toString());
            }
            if(data.toString().trim().indexOf('Saving json file')>=0){
                console.log('Sistema Mercurio: '+data.toString());
                res.status(200).send(o)
            }
        });
        cp.stderr.on("data", function(data) {
            //console.error(data.toString());
            if(data.toString().trim().indexOf('AppSettings: saved to')>=0){
                //console.log('Response code 1')
                //res.status(200).send(o)
            }
            if(data.toString().trim().indexOf('Saving json file')>=0){
                //Zodiac devuelve salida por qDebug() como error.
                console.log('Sistema Mercurio: '+data.toString());
                res.status(200).send(o)
            }
        });
        setAndSendEmail(v1, v2, v3, v4, v5, v6, v7, v8, v9)
    }
    app.get('/cn/get', newCN);
    app.get('/ping', newPing);
}
