# node-red-contrib-debug-specific
Custom patch to give the option of opening a debug console pop-out window for individual debug nodes

The debug popout feature is great but lacks some of the core features, namely the "filter by selected nodes" features don't work.

This registers as a node but patches the interface to add a second button to the debug window which will open a pop-out that listens only to the node which was selected.

![image](https://user-images.githubusercontent.com/66855036/126832236-835d70ac-f762-415e-ad0e-789391ee9d58.png)

## Release Notes
#### 0.0.1
* Realized the whole thing works with the normal debug/view/view.html thus,
* ----Removing the http endpoints from index.js
* ----Removing the hosted lib files
* ----No more npm dependencies :)
* Got the windows to close on page unload
#### 0.0.0
* Initial release

## TODO:
* [x] Make the windows close properly on page unload
* [ ] Improve the buttonWatcher function (currently runs on an interval)
* [ ] Since view.html is forked, should clean up the interface by removing non-working features
* ----view.html no longer forked, was able to use the original /debug/view/view.html
* [ ] Add some indication to the top of view.html to give a better idea of what node we're listening to
