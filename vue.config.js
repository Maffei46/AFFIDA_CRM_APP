module.exports = {
    pluginOptions: {
      electronBuilder: {
        nodeIntegration: true,
        builderOptions:{
          "publish":[{
            "provider": "github",
            "owner": "Maffei46",
            "repo": "AFFIDA_CRM_APP"
          }]
        }
      }
    }
  }