module.exports=function(app){

    var jsonHades=''
    //-->Hades
    // write to a new file named 2pac.txt
    const fs = require('fs');


    function testPlanetCalculation()
    {
        return astrologyService.CalculateCelestialBodiesAndTime(date, timezone, location);
    }

    function testAspects(celestialBodies)
    {
        return astrologyService.CalculateAspects(celestialBodies);
    }

    function testHouseCalculation(houseSystemType)
    {
        return astrologyService.CalculateHouseSystem(houseSystemType, date, timezone, location);
    }
    //<--Hades

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
        cpEMail = spawnEMail('sh', ['sendEmail.sh', ''+d+'', "Mercurio - Nueva Carta", 'qtpizarro@gmail.com']);
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

        //-->Hades
        var dia = v4
        var mes = v3
        var anio = v2
        var hora = v5
        var minutos = v6
        var lat = v8//parseFloat(v8)
        var lon = v9//parseFloat(v9)
        console.log("Calculando Carta Natal ..."+dia+"/"+mes+"/"+anio+" "+hora+":"+minutos+"hs lat:"+lat+" lon:"+lon)

        const {AstrologyService, AspectService,
            EphemerisJSONRepository, OrbJSONRepository,
            TrigonometricUtilities,HouseSystemFactory,
            TimeConversions, WorldTimezoneRepository,
            ZodiacFactory, GeodeticLocation, HouseSystemType,
            RetrogradesService} = require("@goldenius/hades-js");
        const moment = require('moment-timezone');

        let timeConversions = new TimeConversions();
        let retrogradesService = new RetrogradesService();
        let ephemerisJSONRepository = new EphemerisJSONRepository(timeConversions,retrogradesService);
        let worldTimezoneRepository = new WorldTimezoneRepository();
        let orbRepository = new OrbJSONRepository();
        let aspectService = new AspectService(orbRepository);
        let trigonometricUtilities = new TrigonometricUtilities();
        let zodiacFactory = new ZodiacFactory();
        let houseSystemFactory = new HouseSystemFactory(trigonometricUtilities,zodiacFactory);


        let astrologyService = new AstrologyService(ephemerisJSONRepository,
                                                    timeConversions,
                                                    worldTimezoneRepository,
                                                    aspectService,
                                                    houseSystemFactory);

        let location = new GeodeticLocation(''+lon,''+lat);
        let dateH = moment(''+anio+'-'+mes+'-'+dia+' '+hora+':'+minutos+':00');
        let timezone = 'America/Argentina/Buenos_Aires';

        let celestialBodiesAndTime = testPlanetCalculation();
        let calculatedAspects = testAspects(celestialBodiesAndTime.CelestialBodies);
        let calculatedHouses = testHouseCalculation(HouseSystemType.Placidus);

        console.log(JSON.stringify(celestialBodiesAndTime));
        console.log(JSON.stringify(calculatedAspects));
        console.log(JSON.stringify(calculatedHouses));

        let dtf=new Date(Date.now())
        jsonHades='/tmp/'+dtf.getTime()+'.json'

        let fullData=JSON.stringify(celestialBodiesAndTime)
        fullData+=JSON.stringify(calculatedAspects)
        fullData+=JSON.stringify(calculatedHouses)
        fs.writeFile(jsonHades, fullData, (err) => {
                         // throws an error, you could also catch it here
                         if (err) throw err;

                         // success case, the file was saved
                         console.log('jsonHades: '+jsonHades);

                         //-->Spawn zodiacserver
                         cp = spawn('/root/mercurio-server/zodiacserver/bin/zodiac_server', [v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, fn, ms, '10', '/root/mercurio-server/files/'+ms+'_'+v1+'.png', '5120x2880']);
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
                         //<--Spawn zodiacserver
                     });
        //<---Hades
    }



    app.get('/cn/get', newCN);
    app.get('/ping', newPing);
}
