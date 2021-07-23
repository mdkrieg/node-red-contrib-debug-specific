module.exports=function(RED){
    RED.nodes.registerType("debug-specific",function(){});

    const fs = require("fs-extra");
    const path = require("path");
    
    let cachedDebugView;
    RED.httpAdmin.get("/debug/specific/view.html", function(req,res) {
     if (!cachedDebugView) {
            fs.readFile(path.join(__dirname,"lib","debug","view.html")).then(data => {
                let customStyles = "";
                try {
                    let customStyleList = RED.settings.editorTheme.page._.css || [];
                    customStyleList.forEach(style => {
                        customStyles += `<link rel="stylesheet" href="../../${style}">\n`
                    })
                } catch(err) {}
                cachedDebugView = data.toString().replace("<!-- INSERT-THEME-CSS -->",customStyles)
                res.set('Content-Type', 'text/html');
                res.send(cachedDebugView).end();
            }).catch(err => {
                res.sendStatus(404);
            })
        } else {
            res.send(cachedDebugView).end();
        }

    });

    // As debug/view/debug-utils.js is loaded via <script> tag, it won't get
    // the auth header attached. So do not use RED.auth.needsPermission here.
    RED.httpAdmin.get("/debug/specific/*",function(req,res) {
        var options = {
            root: path.join(__dirname,"lib","debug"),
            dotfiles: 'deny'
        };
        res.sendFile(req.params[0], options);
    });
};
