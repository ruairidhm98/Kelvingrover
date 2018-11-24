/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export now */
/* unused harmony export addScript */
/* harmony export (immutable) */ __webpack_exports__["i"] = getTabUrl;
/* unused harmony export removeScript */
/* unused harmony export saveAsBlob */
/* harmony export (immutable) */ __webpack_exports__["d"] = executeCode;
/* unused harmony export loadJsonAsset */
/* harmony export (immutable) */ __webpack_exports__["k"] = isDomainInList;
/* unused harmony export getDomainName */
/* unused harmony export toQueryString */
/* harmony export (immutable) */ __webpack_exports__["o"] = randId;
/* harmony export (immutable) */ __webpack_exports__["a"] = GUID;
/* harmony export (immutable) */ __webpack_exports__["h"] = getManifestInfo;
/* harmony export (immutable) */ __webpack_exports__["j"] = getTodayBlockCount;
/* harmony export (immutable) */ __webpack_exports__["c"] = copyTextToClipboard;
/* harmony export (immutable) */ __webpack_exports__["f"] = getBrowser;
/* unused harmony export getRandomInt */
/* harmony export (immutable) */ __webpack_exports__["n"] = isValidUrl;
/* harmony export (immutable) */ __webpack_exports__["e"] = getAbsoluteURL;
/* harmony export (immutable) */ __webpack_exports__["m"] = isI18N;
/* harmony export (immutable) */ __webpack_exports__["g"] = getI18N;
/* unused harmony export insertBeforeRoot */
/* unused harmony export sendGoogleAnalyticsEvent */
/* unused harmony export sendToBackground */
/* harmony export (immutable) */ __webpack_exports__["p"] = sendToActiveTab;
/* harmony export (immutable) */ __webpack_exports__["l"] = isFireFoxIncognito;
/* unused harmony export run */
function now() {
  return Math.floor(Date.now() / 1000);
}
function addScript(template) {
  let s = document.createElement("script");
  if (document.querySelector("#" + template.id) != undefined) {
    return;
  }
  if (template.src) {
    s.src = template.src;
  }
  if (template.textContent) {
    s.textContent = template.textContent;
  }
  s.setAttribute("id", template.id);
  insertBeforeRoot(s);
}

function getTabUrl() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage({ name: 'requestTabUrl' }, function (response) {
      try {
        let url = new URL(response.url);

        resolve({ domain: url.hostname, href: url.href });
      } catch (e) {
        resolve({ domain: document.domain, href: location.href });
      }
    });
  });
}

function removeScript(template) {
  let addedScript = document.querySelector("#" + template.id);
  if (addedScript != undefined) {
    addedScript.parentNode.removeChild(addedScript);
  }
}
function saveAsBlob(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.responseType = 'blob';
  xhr.onload = function (e) {
    if (this.status == 200) {
      var url = URL.createObjectURL(this.response);
      callback(url);
    }
  };
  xhr.send();
}

function executeCode(code) {
  let s = document.createElement("script");
  s.textContent = code;

  insertBeforeRoot(s);

  s.remove();
}

function loadJsonAsset(jsonPath) {
  return $.getJSON(jsonPath);
}

/**
 * Checks whether domain fits the whitelist
 * @param String domain
 * @param Array [String] domainList
 * @returns {boolean}
 */
function isDomainInList(domain, domainList, returnValue) {
  domainList = domainList || [];

  for (var i = 0; i < domainList.length; i++) {
    var domainTail = domainList[i];
    if (new RegExp("\\b[(www\\.)|.*\.]?" + domainTail + "\\b").test(domain)) {
      return returnValue ? domainTail : true;
    }
  }
  return false;
}

function getDomainName(href) {
  var l = document.createElement("a");
  l.href = href;
  return l.hostname;
}

function toQueryString(obj) {
  return Object.keys(obj).filter(function (key) {
    return !!obj[key] || false === obj[key];
  }).map(function (key) {
    return key + '=' + obj[key];
  }).join('&');
}

function randId() {
  var randid = localStorage.getItem("randid");
  if (!randid) {
    var rr = function () {
      return ((1 + Math.random(Date.now() + 14)) * 0x10000 | 0).toString(28).substring(1);
    };
    randid = rr() + rr() + rr() + rr() + rr() + rr() + rr() + rr() + rr();
    localStorage.setItem("randid", randid);
  }
  return randid;
}

function GUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}

function getManifestInfo() {
  return chrome.runtime.getManifest();
}

class Retension {
  constructor(conf) {
    this.Storage = conf.Storage;
    this.GAEvents = conf.GAEvents;
    this.minHoursFromInstall = 8;

    this.Storage.requestGet().then(data => {
      this.data = this.initialize(data);

      this.report();
    });
  }

  initialize(data) {
    if (data && data.installDate && data.sentDays) {
      return data;
    } else {
      data = data || {};
      data.installDate = data.installDate ? data.installDate : (() => {
        this.GAEvents.Install();

        return Date.now();
      })();
      data.sentDays = data.sentDays || {};

      this.Storage.requestSet(data);

      return data;
    }
  }

  report() {
    this.reportRetentoin();

    setTimeout(this.report.bind(this), 1000 * 60 * 60);
  }

  reportRetentoin() {
    let now = new Date();
    let installDate = new Date(this.data.installDate);
    let installStart = this.getDateStart(installDate);
    let todayStart = this.getDateStart(now);
    let msStartDiff = Math.abs(todayStart - installStart);
    let hoursFromTrueInstall = Math.floor((now - installDate) / (1000 * 60 * 60));
    let daysDiff = Math.floor(msStartDiff / (1000 * 60 * 60 * 24));

    if (daysDiff > 0) {
      if (!this.data.sentDays[daysDiff] && hoursFromTrueInstall > this.minHoursFromInstall) {
        this.GAEvents.Retentoin(daysDiff);

        this.data.sentDays[daysDiff] = true;
        this.Storage.requestSet(this.data);
      }
    }
  }

  getDateStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getHours() >= 0 && date.getHours() < 5 ? date.getDate() - 1 : date.getDate(), 5, 0, 1); //day starts at 5PM
  }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = Retension;


function getTodayBlockCount(PBStorageSync, domain, callback) {
  function isBetweenTimeRange(dateRange) {
    let now = new Date();
    let start = new Date(dateRange[0]);
    let end = new Date(dateRange[1]);

    return now >= start && now < end;
  }

  PBStorageSync.pb_counterBlockedSites.get().then(response => {
    let data = (response || {})[domain];

    if (data && isBetweenTimeRange(data.currentTimeRange)) {
      callback(data.todayCount);
    } else {
      callback(0);
    }
  });
}

function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  textArea.value = text;

  document.body.appendChild(textArea);

  textArea.select();

  try {
    var successful = document.execCommand('copy');
  } catch (err) {}

  document.body.removeChild(textArea);
}

function getBrowser() {
  if (/firefox/i.test(navigator.userAgent)) {
    return 'FF';
  }

  return 'CH';
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function isValidUrl(url) {
  return url.indexOf("http") === 0 && !url.includes("://localhost") && !url.includes("chrome/newtab");
}

function getAbsoluteURL(baseURL) {
  if (/^about:blank/i.test(baseURL)) {
    return baseURL;
  }

  if (/^(https?:)?\/\//.test(baseURL)) {
    return baseURL;
  }

  baseURL = location.origin + (!/^\//.test(baseURL) ? '/' : '') + baseURL;

  return baseURL;
}

function isI18N(id) {
  return !!chrome.i18n.getMessage(id);
}

function getI18N(msgName, alternative) {
  return chrome.i18n.getMessage(msgName) || chrome.i18n.getMessage(alternative || msgName) || msgName;
}

function insertBeforeRoot(dom) {
  const head = document.head;

  if (head) {
    head.appendChild(dom);
  } else {
    const rootDocument = document.documentElement;

    rootDocument.insertBefore(dom, rootDocument.firstChild);
  }
}

function sendGoogleAnalyticsEvent(data) {
  sendMessageToBackground({
    name: "trackEvent",
    category: data.category,
    action: data.action,
    label: data.label,
    isCount: data.isCount
  });
}

function sendToBackground(name, data) {
  chrome.runtime.sendMessage({ name: name, data: data || '' });
}

function sendToActiveTab(name, data) {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { name: name, data: data || '' });
  });
}

function isFireFoxIncognito(callback) {
  return new Promise(resolve => {
    if (getBrowser() != 'FF') {
      return resolve(false);
    }

    chrome.tabs.query({ currentWindow: true, active: true }, tabArray => {
      let tabId = tabArray[0].id;

      chrome.tabs.executeScript(tabId, {
        code: "isI=chrome.extension.inIncognitoContext; isI;"
      }, isIncognito => {
        if (chrome.runtime.lastError) {
          return resolve(false);
        } else {
          return resolve(isIncognito && Array.isArray(isIncognito) ? isIncognito[0] : false);
        }
      });
    });
  });
}

function run() {}

/***/ }),

/***/ 30:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);


function sendGoogleAnalyticsEvent(category, action, label = '') {
  chrome.runtime.sendMessage({ name: 'trackEvent', category: category, action: action, label: label });
}

$(_ => {
  const isNew = location.hash == '#n';

  $('#title').html('Thank you for ' + (isNew ? 'installing' : 'updating') + ' Poper Blocker');
  $('#disagree').focus();

  sendGoogleAnalyticsEvent('Options_welcome', 'view');

  $('#agree').on('click', _ => {
    sendGoogleAnalyticsEvent('Options_welcome', 'click', 'agree');

    chrome.runtime.sendMessage({ name: "welcomeOptIn", isNew: isNew });
  });

  $('#disagree').on('click', _ => {
    sendGoogleAnalyticsEvent('Options_welcome', 'click', 'disagree');

    $('#flow-1').hide();
    $('#flow-2').show();
    $('#disable').focus();
  });

  $('#privacy-1').on('click', _ => {
    sendGoogleAnalyticsEvent('Options_welcome', 'click', 'privacy policy');
  });

  $('#cancel').on('click', _ => {
    sendGoogleAnalyticsEvent('Options_welcome_confirm', 'click', 'cancel');

    $('#flow-2').hide();
    $('#flow-1').show();
  });

  $('#disable').on('click', _ => {
    sendGoogleAnalyticsEvent('Options_welcome_confirm', 'click', 'disable');

    chrome.runtime.sendMessage({ name: "welcomeOptOut", isNew: isNew });
  });

  $('#privacy-2').on('click', _ => {
    sendGoogleAnalyticsEvent('Options_welcome_confirm', 'click', 'privacy policy');
  });
});

/***/ })

/******/ });