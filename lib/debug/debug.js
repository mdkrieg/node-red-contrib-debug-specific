$(function() {
    RED.i18n.init({apiRootUrl:"../../"},function() {
        var options = {
            messageMouseEnter: function(sourceId) {
                window.opener.postMessage({event:"mouseEnter",id:sourceId},'*');
            },
            messageMouseLeave: function(sourceId) {
                window.opener.postMessage({event:"mouseLeave",id:sourceId},'*');
            },
            messageSourceClick: function(sourceId, aliasId, path) {
                window.opener.postMessage({event:"mouseClick",id:sourceId, _alias: aliasId, path: path},'*');
            },
            clear: function() {
                window.opener.postMessage({event:"clear"},'*');
            }
        }

        var uiComponents = RED.debug.init(options);
        
        // this ID is the key to this whole thing
        var subNodeID;

        $(".red-ui-debug-window").append(uiComponents.content);

        window.addEventListener('message',function(evt) {
            if (evt.data.event === "message") {
                console.log(evt.data.msg);
                if (evt.data.subNodeID == subNodeID){
                    RED.debug.handleDebugMessage(evt.data.msg);
                }
            } else if (evt.data.event === "workspaceChange") {
                subNodeID = evt.data.subNodeID;
                RED.debug.refreshMessageList(evt.data.activeWorkspace);
            } else if (evt.data.event === "projectChange") {
                RED.debug.clearMessageList(true);
            }
        },false);
    })
});
