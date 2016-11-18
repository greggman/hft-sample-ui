define([
    './hft/scripts/commonui',
    './hft/scripts/misc/dialog',
    './hft/scripts/misc/dpad',
    './hft/scripts/misc/input',
    './hft/scripts/misc/misc',
    './hft/scripts/misc/mobilehacks',
    './hft/scripts/misc/strings',
    './hft/scripts/misc/touch',
  ], function (
    commonUI,
    dialog,
    DPad,
    input,
    misc,
    mobileHacks,
    strings,
    touch) {
  return {
    commonUI: commonUI,
    dialog: dialog,
    DPad: DPad,
    input: input,
    misc: misc,
    mobileHacks: mobileHacks,
    strings: strings,
    touch: touch,
  };
});

