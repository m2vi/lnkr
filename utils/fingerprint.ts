import { fontList } from './get.data';

export const fingerprint = () => {
  let { devicePixelRatio } = window;
  devicePixelRatio = +parseInt(devicePixelRatio as any);

  const {
    appName,
    appCodeName,
    appVersion,
    cookieEnabled,
    doNotTrack,
    hardwareConcurrency,
    language,
    languages,
    maxTouchPoints,
    platform,
    product,
    productSub,
    userAgent,
    vendor,
    vendorSub,
    webdriver,
  } = window.navigator;

  const fonts = getFonts();
  const plugins = Object.entries(window.navigator.plugins).map(([, plugin]) => plugin.name);
  const mimeTypes = Object.entries(window.navigator.mimeTypes).map(([, mimeType]) => mimeType.type);

  const { width, height, colorDepth, pixelDepth } = window.screen;
  const timezoneOffset = new Date().getTimezoneOffset();
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const touchSupport = 'ontouchstart' in window;

  const webglInfo = getWebglInfo();

  const data = {
    devicePixelRatio,
    appName,
    appCodeName,
    appVersion,
    cookieEnabled,
    doNotTrack,
    hardwareConcurrency,
    language,
    languages,
    maxTouchPoints,
    mimeTypes,
    platform,
    plugins,
    fonts,
    product,
    productSub,
    userAgent,
    vendor,
    vendorSub,
    webdriver,
    width,
    height,
    colorDepth,
    pixelDepth,
    timezoneOffset,
    timezone,
    touchSupport,
    webglInfo,
  };

  return data;
};

export const getFonts = () => {
  const fontCheck = new Set(fontList.sort());

  const fontAvailable = new Set();

  for (const font of fontCheck.values()) {
    if (document.fonts.check(`12px "${font}"`)) {
      fontAvailable.add(font);
    }
  }

  return [...fontAvailable.values()];
};

export const getWebglInfo = () => {
  try {
    const ctx = document.createElement('canvas').getContext('webgl')!;

    const result = {
      VERSION: ctx.getParameter(ctx.VERSION),
      SHADING_LANGUAGE_VERSION: ctx.getParameter(ctx.SHADING_LANGUAGE_VERSION),
      VENDOR: ctx.getParameter(ctx.VENDOR),
      SUPORTED_EXTENSIONS: ctx.getSupportedExtensions(),
    };

    return result;
  } catch {
    return null;
  }
};
