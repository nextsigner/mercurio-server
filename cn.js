module.exports=function(app){
    var spawn = require('child_process').spawn;
    var cp
    function setAndSendEmail(v1, v2, v3, v4, v5, v6, v7, v8, v9){
        console.log("Creando carta natal...");
        let d='d1: '+v1
        //        +'d2: '+v2+'\n'
        //        +'d3: '+v3+'\n'
        //        +'d4: '+v4+'\n'
        //        +'d5: '+v5+'\n'
        //        +'d6: '+v6+'\n'
        //        +'d7: '+v7+'\n'
        //        +'d8: '+v8+'\n'
        //        +'d9: '+v9+'\n'
        cp = spawn('mail', ['-s', 'Mercurio - Nueva Carta', 'nextsigner@gmail.com', '<<<', d]);
        cp.std.on("data", function(data) {
            console.error(data.toString());
        });
        cp.stderr.on("data", function(data) {
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
            //console.log(data.toString().trim());
            if(data.toString().trim().indexOf('AppSettings: saved to')>=0){
                console.log('Response code 0')
                //res.status(200).send(o)
            }
            if(data.toString().trim().indexOf('Saving json file')>=0){
                console.error(data.toString());
                res.status(200).send(o)
            }
        });
        cp.stderr.on("data", function(data) {
            //console.error(data.toString());
            if(data.toString().trim().indexOf('AppSettings: saved to')>=0){
                console.log('Response code 1')
                //res.status(200).send(o)
            }
            if(data.toString().trim().indexOf('Saving json file')>=0){
                console.error(data.toString());
                res.status(200).send(o)
            }
        });
        setAndSendEmail(v1, v2, v3, v4, v5, v6, v7, v8, v9)
    }
    app.get('/cn/get', newCN);
    app.get('/ping', newPing);
}
