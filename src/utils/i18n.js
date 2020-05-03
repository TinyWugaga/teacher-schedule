import Vue from 'vue';
import VueI18n from 'vue-i18n';

/**
 * =============================================================================
 * = 自動加載語系檔案
 * =============================================================================
 *
 * 加載 lang 目錄下的檔案
 *
 */

const messages = {};
const req = require.context('../lang/', true, /\.(js|json)$/i);

req.keys().forEach(function (key) {
  let nameparts = key.split('/');

  // 處理名稱為 ./localeName.js 格式之檔案
  if (nameparts.length === 2) {
    let lang = nameparts[1].split('.')[0];
    messages[lang] = req(key);
  }

  // 處理名稱為 ./localeName/index.js 格式之檔案
  if (nameparts.length === 3) {
    if (nameparts[2].match(/index\./)) {
      messages[nameparts[1]] = req(key);
    }
  }
})

/**
 * =============================================================================
 * = 初始化 VueI18n
 * =============================================================================
 *
 */

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zh-TW',
  messages,
});

export default i18n;

/**
 * 修改當前語系
 *
 * @param {String} lang
 */
export function setLocale(lang) {
  let langs = Object.keys(messages);

  if (langs.indexOf(lang) >= 0) {
    i18n.locale = lang;
  }
}