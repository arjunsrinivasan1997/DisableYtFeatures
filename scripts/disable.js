function findSettingsLabel(settingsName) {
    //console.log("searching for " + settingsName);
    let settingsList = document.getElementsByClassName("ytp-menuitem-label");
    for (let i = 0; i < settingsList.length; i++) {
        if (settingsList[i].innerText === settingsName) {
            return [settingsList[i].nextElementSibling.children[0],
                settingsList[i].parentElement.getAttribute('aria-checked') === "true"]
        }
    }
    return [null, null]
}


//Retrieving User Preferences
let ambientModeSetting, stableVolumeSetting;
chrome.storage.local.get(["ambientMode", "stableVolume"], function (result) {
    ambientModeSetting = result.ambientMode;
    stableVolumeSetting = result.stableVolume;
})
//Add Listener for whenever storage changes
chrome.storage.onChanged.addListener(function () {
    console.log("updating settings");
    chrome.storage.local.get(["ambientMode", "stableVolume"], function (result) {
        ambientModeSetting = result.ambientMode;
        stableVolumeSetting = result.stableVolume;
    })
});


(function disableAmbientMode() {
    const interval = setInterval(() => {
        if (ambientModeSetting) {
            let ambientModeButton, isAmbientModeEnabled;
            [ambientModeButton, isAmbientModeEnabled] = findSettingsLabel('Ambient mode');
            /*console.log("Ambient mode button " + ambientModeButton);
            console.log("Ambient mode enabled  " + isAmbientModeEnabled); */
            if (ambientModeButton && isAmbientModeEnabled) {
                ambientModeButton.click();
                console.log('Ambient mode disabled (button clicked).');
            }
        } else {
            console.log("Skipping ambient mode, as user has disabled it via settings popup")
        }
    }, 2000);
})();

(function disableStableVolume() {
    const interval = setInterval(() => {
        if (stableVolumeSetting) {
            let stableVolumeButton, isStableVolumeEnabled;
            [stableVolumeButton, isStableVolumeEnabled] = findSettingsLabel('Stable Volume');
            /*console.log("Stable volume button " + stableVolumeButton);
            console.log("Stable volume enabled  " + isStableVolumeEnabled);*/
            if (stableVolumeButton && isStableVolumeEnabled) {
                stableVolumeButton.click();
                console.log('Stable volume button clicked');
            }
        } else {
            console.log("Skipping stable volume, as user has disabled it via settings popup")
        }
        // Timeout for stable volume is higher because toggling it stops and starts video playback
    }, 5000);
})();


