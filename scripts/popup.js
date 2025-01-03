// Store Result on document Change
document.getElementById("ambientMode").addEventListener('change',  function (e) {
    chrome.storage.local.set({"ambientMode": this.checked})
})
document.getElementById("stableVolume").addEventListener('change', function(e) {
    chrome.storage.local.set({"stableVolume":this.checked})
})

chrome.storage.local.get(["ambientMode","stableVolume"]).then((result) => {
    console.log("setting ambient mode checkbox on startup to " + result.ambientMode);
    document.getElementById("ambientMode").checked = result.ambientMode;
    console.log("setting stable colume checkbox on startup to " + result.stableVolume);
    document.getElementById("stableVolume").checked = result.stableVolume;
});




