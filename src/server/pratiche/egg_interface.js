
var axios = require('axios');
const username = "api.affida";
const password = "ApiAffida2022@@";
const client_id = "affida.api.affida.e5ef0e64-4aef-11ed-8d4d-42010a7e5035";
const client_secret = "e5ef0e7a-4aef-11ed-8d4d-42010a7e5035"


module.exports.getToken = async function(){
    return new Promise((resolve,reject)=>{
        var config = {
            method: 'get',
            url: `https://finance.blackbird71.com/api/v2/oauth/token?grant_type=password&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`,
        };

        axios(config)
        .then(function (response) {
            if(!response.data) return reject();
            if(!response.data.access_token) return reject();
            return resolve(response.data.access_token);
        })
        .catch(function (error) {
            return reject(error);
        });
    })
}

module.exports.fetchPratiche = async function(token,limit=-1,skip=-1,date){
    return new Promise((resolve,reject)=>{
        var data;
        if(date){
            data = JSON.stringify({
                "where": {
                    "datamodifica": {
                       "$gte": date
                    }
                },
                "limit": limit!=-1?limit:2000,
                "skip": skip!=-1?skip:0,
                "sort": ""
            });
        }else{
            data = JSON.stringify({
                "where": {
                    // "datamodifica": {
                    //     "$gte": "2022-12-04T12:20:27+01:00"
                    // }
                },
                "limit": limit!=-1?limit:2000,
                "skip": skip!=-1?skip:0,
                "sort": ""
            });
        }
        

        var config = {
            method: 'post',
            url: 'https://finance.blackbird71.com/api/v2/data/entity/opportunity/query',
            headers: { 
              'Authorization': 'Bearer '+token,
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            if(!response.data) return reject();
            if(!response.data.ok) return reject();
            return resolve(response.data.result);
        })
        .catch(function (error) {
            return reject(error);
        });
    })
}

module.exports.fetchStoricoPratiche = async function(token,limit=-1,skip=-1,date){
    return new Promise((resolve,reject)=>{
        var states = ['Caricamento in banca-3','Caricamento in Banca','Deliberata-4','Deliberata','Attesa Stipula-5']
        var data;
        if(date){
            data = JSON.stringify({
                "where": {
                    "datamodifica": {
                        "$gte": date
                    },
                    "stato":states,
                },
                "limit": limit!=-1?limit:2000,
                "skip": skip!=-1?skip:0,
                "sort": ""
            });
        }else{
            data = JSON.stringify({
                "where": {
                    "stato":states,
                },
                "limit": limit!=-1?limit:2000,
                "skip": skip!=-1?skip:0,
                "sort": ""
            });
        }
        var config = {
            method: 'post',
            url: 'https://finance.blackbird71.com/api/v2/data/entity/opportunityStage/query',
            headers: { 
            'Authorization': 'Bearer '+token,
            },
            data : data
        };
        axios(config)
        .then(function (response) {
            if(!response.data) return reject();
            if(!response.data.ok) return reject();
            return resolve(response.data.result);
        })
        .catch(function (error) {
            return reject(error);
        });
    })
}

module.exports.fetchCampagne = async function(token){
    return new Promise((resolve,reject)=>{
        var data = JSON.stringify({
            "where": {},
            "limit": 20000,
            "skip": 0,
            "sort": ""
        });

        var config = {
            method: 'post',
            url: 'https://finance.blackbird71.com/api/v2/data/entity/campaign/query',
            headers: { 
                'Authorization': 'Bearer '+token,
            },
            data : data
          };

        axios(config)
          .then(function (response) {
              if(!response.data) return reject();
              if(!response.data.ok) return reject();
              return resolve(response.data.result);
          })
          .catch(function (error) {
                console.log(error);
              return reject(error);
          });
    })
}
