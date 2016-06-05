define(['jquery'],function($){
    var mainConfig, mod,ref;
    mainConfig = {
        modules:[
            {
                "name":"guide",
                "status":[
                            ["login","/login","guide", "login"]
                        ]
            }
        ],
        modulePath : "/build",
        states : []
    };
    ref = mainConfig.modules;
    for (mod in ref) { 
            module = ref[mod];
            mainConfig.states.push(module);
    }
  return mainConfig;
});