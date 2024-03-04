'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var immer = require('immer');
var effects = require('@redux-saga/core/effects');
var reselect = require('reselect');
var routing = require('@zengenti/contensis-react-base/routing');
var React = require('react');
var PropTypes = require('prop-types');
var reactRedux = require('react-redux');
var styled = require('styled-components');
var _commonjsHelpers = require('./_commonjsHelpers-b3309d7b.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var PropTypes__default = /*#__PURE__*/_interopDefaultLegacy(PropTypes);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const ACTION_PREFIX = '@FORM2/';
const SET_FORM_DATA = `${ACTION_PREFIX}SET_FORM_DATA`;
const SET_FORM_ID = `${ACTION_PREFIX}SET_FORM_ID`;
const SET_CURRENT_PAGE = `${ACTION_PREFIX}SET_CURRENT_PAGE`;
const PAGE_BACK = `${ACTION_PREFIX}PAGE_BACK`;
const PAGE_FORWARD = `${ACTION_PREFIX}PAGE_FORWARD`;
const SET_FIELD_VALUE = `${ACTION_PREFIX}SET_FIELD_VALUE`;
const SET_DEFAULT_FIELD_VALUE = `${ACTION_PREFIX}SET_DEFAULT_FIELD_VALUE`;
const SUBMIT_FORM_FOR_VALIDATION = `${ACTION_PREFIX}SUBMIT_FORM_FOR_VALIDATION`;
const SUBMIT_FORM = `${ACTION_PREFIX}SUBMIT_FORM`;
const SUBMIT_FORM_SUCCESS = `${ACTION_PREFIX}SUBMIT_FORM_SUCCESS`;
const SUBMIT_FORM_ERROR = `${ACTION_PREFIX}SUBMIT_FORM_ERROR`;
const SET_SUBMITTING_FORM = `${ACTION_PREFIX}SET_SUBMITTING_FORM`;
const SET_ERROR = `${ACTION_PREFIX}SET_ERROR`;
const VALIDATE_FIELD = `${ACTION_PREFIX}VALIDATE_FIELD`;
const SET_FIELD_ERROR = `${ACTION_PREFIX}SET_FIELD_ERROR`;
const SET_DATE_RANGE_VALUES = `${ACTION_PREFIX}SET_DATE_RANGE_VALUES`;
const SET_FORM_ENTRIES = `${ACTION_PREFIX}SET_FORM_ENTRIES`;
const SET_SUCCESS_MESSAGE = `${ACTION_PREFIX}SET_SUCCESS_MESSAGE`;
const SET_MULTIPLE_CHECKBOX_VALUE = `${ACTION_PREFIX}SET_MULTIPLE_CHECKBOX_VALUE`;
const SET_SINGLE_CHECKBOX_VALUE = `${ACTION_PREFIX}SET_SINGLE_CHECKBOX_VALUE`;

const initialSettings = {
  recaptcha: {
    siteKey: null
  }
};
const initialStatus = {
  isLoading: true,
  isSubmitting: false,
  hasSuccess: false,
  hasError: false,
  messages: {
    success: null
  },
  validation: {
    sent: false
  }
};
const initialPagingInfo = {
  pageIndex: 0,
  pageCount: 0,
  currentPageId: null
};
const initialFormData = {
  formId: null,
  data: {},
  fields: [],
  entries: [],
  fieldErrors: [],
  groups: [],
  defaultLanguage: null,
  pagingInfo: initialPagingInfo,
  status: initialStatus,
  settings: {}
};
let initialState = {
  settings: initialSettings
};
var reducer = immer.produce((state, action) => {
  switch (action.type) {
    case SET_FORM_ID:
      {
        const {
          formId
        } = action || {};
        state[formId] = initialFormData;
        return;
      }
    case SET_FORM_DATA:
      {
        const {
          fields,
          formId,
          groups,
          defaultLanguage,
          settings
        } = action || {};
        state[formId].fields = fields;
        state[formId].formId = formId;
        state[formId].groups = groups;
        state[formId].defaultLanguage = defaultLanguage;
        state[formId].status.isSubmitting = false;
        state[formId].status.isLoading = false;
        state[formId].status.hasSuccess = false;
        state[formId].status.hasError = false;
        state[formId].settings = settings;
        return;
      }
    case SET_CURRENT_PAGE:
      {
        const {
          formId,
          pageId,
          pageIndex,
          pageCount
        } = action || {};
        state[formId].pagingInfo.currentPageId = pageId;
        state[formId].pagingInfo.pageIndex = pageIndex;
        state[formId].pagingInfo.pageCount = pageCount;
        return;
      }
    case SET_FIELD_VALUE:
      {
        const {
          formId,
          id,
          value
        } = action || {};
        state[formId].data[id] = value;
        return;
      }
    case SET_DEFAULT_FIELD_VALUE:
      {
        const {
          formId,
          value
        } = action || {};
        state[formId].data = {
          ...state[formId].data,
          ...value
        };
        return;
      }
    case SET_SINGLE_CHECKBOX_VALUE:
      {
        const {
          formId,
          id,
          value
        } = action || {};
        state[formId].data[id] = value;
        return;
      }
    case SET_MULTIPLE_CHECKBOX_VALUE:
      {
        const {
          formId,
          id,
          label,
          value
        } = action || {};
        const checked = state[formId].data[id] || [];
        if (value) state[formId].data[id] = [...checked, label];else state[formId].data[id] = checked.filter(v => v !== label);
        return;
      }
    case SET_DATE_RANGE_VALUES:
      {
        const {
          formId,
          id,
          value,
          dateType
        } = action || {};
        state[formId].data[id][dateType] = value;
        return;
      }
    case SET_FIELD_ERROR:
      {
        const {
          formId,
          value
        } = action || {};
        state[formId].fieldErrors = value;
        return;
      }
    case SET_SUBMITTING_FORM:
      {
        const {
          formId,
          isSubmitting
        } = action || {};
        state[formId].status.isSubmitting = isSubmitting;
        return;
      }
    case SUBMIT_FORM_SUCCESS:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = false;
        state[formId].status.isSubmitting = false;
        state[formId].status.hasSuccess = true;
        state[formId].status.validation.sent = false;
        return;
      }
    case SUBMIT_FORM_FOR_VALIDATION:
      {
        const {
          formId
        } = action || {};
        state[formId].status.validation.sent = true;
        state[formId].status.isSubmitting = false;
        state[formId].status.hasSuccess = false;
        state[formId].status.hasError = false;
        return;
      }
    case SET_SUCCESS_MESSAGE:
      {
        const {
          formId,
          message
        } = action || {};
        state[formId].status.messages.success = message;
        return;
      }
    case SUBMIT_FORM_ERROR:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
        state[formId].status.validation.sent = false;
        return;
      }
    case SET_FORM_ENTRIES:
      {
        const {
          formId,
          entries
        } = action || {};
        const entryObject = {};
        entries.map(entry => {
          if (!entry) return null;
          entryObject[entry.id] = entry.entries;
          return entryObject;
        });
        state[formId].entries = entryObject;
        return;
      }
    case SET_ERROR:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
        return;
      }
    default:
      return state;
  }
}, initialState);

const selectForms = state => state.forms;
const makeSelectPagedFields = formId => reselect.createSelector(selectForms, forms => {
  if (forms !== null && forms !== void 0 && forms[formId]) {
    var _forms$formId, _forms$formId2;
    const pagingInfo = forms === null || forms === void 0 ? void 0 : (_forms$formId = forms[formId]) === null || _forms$formId === void 0 ? void 0 : _forms$formId.pagingInfo;
    const fields = forms === null || forms === void 0 ? void 0 : (_forms$formId2 = forms[formId]) === null || _forms$formId2 === void 0 ? void 0 : _forms$formId2.fields;
    if ((fields === null || fields === void 0 ? void 0 : fields.length) > 0 && pagingInfo.pageCount > 1) return fields.filter(f => f.groupId == pagingInfo.currentPageId);else return fields;
  }
});
const makeSelectFormStatus = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId3;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId3 = forms[formId]) === null || _forms$formId3 === void 0 ? void 0 : _forms$formId3.status;
});
const makeSelectPagingInfo = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId4;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId4 = forms[formId]) === null || _forms$formId4 === void 0 ? void 0 : _forms$formId4.pagingInfo;
});
const makeSelectFormSettings = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId5;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId5 = forms[formId]) === null || _forms$formId5 === void 0 ? void 0 : _forms$formId5.settings;
});
const makeSelectFormFieldErrors = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId6;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId6 = forms[formId]) === null || _forms$formId6 === void 0 ? void 0 : _forms$formId6.fieldErrors;
});
const makeSelectFormEntries = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId7;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId7 = forms[formId]) === null || _forms$formId7 === void 0 ? void 0 : _forms$formId7.entries;
});
const makeSelectFormPostData = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId8;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId8 = forms[formId]) === null || _forms$formId8 === void 0 ? void 0 : _forms$formId8.data;
});
const makeSelectIsLoading = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId9;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId9 = forms[formId]) === null || _forms$formId9 === void 0 ? void 0 : _forms$formId9.status.isLoading;
});
const makeSelectIsSubmitting = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId10;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId10 = forms[formId]) === null || _forms$formId10 === void 0 ? void 0 : _forms$formId10.status.isSubmitting;
});
const makeSelectHasSuccess = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId11;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId11 = forms[formId]) === null || _forms$formId11 === void 0 ? void 0 : _forms$formId11.status.hasSuccess;
});
const makeSelectHasError = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId12;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId12 = forms[formId]) === null || _forms$formId12 === void 0 ? void 0 : _forms$formId12.status.hasError;
});
const makeSelectFormFields = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId13;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId13 = forms[formId]) === null || _forms$formId13 === void 0 ? void 0 : _forms$formId13.fields;
});
const makeSelectDefaultLang = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId14;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId14 = forms[formId]) === null || _forms$formId14 === void 0 ? void 0 : _forms$formId14.defaultLanguage;
});
const makeSelectFormSuccessMessage = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId15;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId15 = forms[formId]) === null || _forms$formId15 === void 0 ? void 0 : _forms$formId15.status.messages.success;
});
const makeSelectFormValidationSent = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId16;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId16 = forms[formId]) === null || _forms$formId16 === void 0 ? void 0 : _forms$formId16.status.validation.sent;
});
const makeSelectFormGroup = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId17;
  return forms === null || forms === void 0 ? void 0 : (_forms$formId17 = forms[formId]) === null || _forms$formId17 === void 0 ? void 0 : _forms$formId17.groups;
});
const selectors = {
  selectForms,
  makeSelectPagedFields,
  makeSelectFormStatus,
  makeSelectPagingInfo,
  makeSelectFormSettings,
  makeSelectFormFieldErrors,
  makeSelectFormEntries,
  makeSelectFormPostData,
  makeSelectIsLoading,
  makeSelectIsSubmitting,
  makeSelectHasSuccess,
  makeSelectFormFields,
  makeSelectDefaultLang,
  makeSelectFormSuccessMessage,
  makeSelectFormValidationSent,
  makeSelectFormGroup,
  makeSelectHasError
};

const URI = '/forms';
const getFormSchema = async formId => {
  var options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const getUrl = `${URI}/${formId}`;
  const schema = await request(getUrl, options);
  return schema;
};
const getEntries = async (formObj, id) => {
  var options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  };
  const entriesUrl = `${URI}/entries`;
  const entries = await request(entriesUrl, options);
  return {
    entries,
    id
  };
};
const postForm = async formObj => {
  var options = {
    method: 'POST',
    headers: {
      Accept: '*/*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formObj)
  };
  const submitted = await request(URI, options);
  return submitted;
};
const request = async (url, options) => {
  return fetch(url, options).then(response => response.json()).then(result => {
    return result;
  })
  // eslint-disable-next-line no-console
  .catch(error => console.log('error', error));
};

const domains = ['1033edge.com', '11mail.com', '123.com', '123box.net', '123india.com', '123mail.cl', '123qwe.co.uk', '126.com', '150ml.com', '15meg4free.com', '163.com', '1coolplace.com', '1freeemail.com', '1funplace.com', '1internetdrive.com', '1mail.net', '1me.net', '1mum.com', '1musicrow.com', '1netdrive.com', '1nsyncfan.com', '1under.com', '1webave.com', '1webhighway.com', '212.com', '24horas.com', '2911.net', '2bmail.co.uk', '2d2i.com', '2die4.com', '3000.it', '321media.com', '37.com', '3ammagazine.com', '3dmail.com', '3email.com', '3xl.net', '444.net', '4email.com', '4email.net', '4mg.com', '4newyork.com', '4x4man.com', '5iron.com', '5star.com', '88.am', '8848.net', '888.nu', '97rock.com', 'aaamail.zzn.com', 'aamail.net', 'aaronkwok.net', 'abbeyroadlondon.co.uk', 'abcflash.net', 'abdulnour.com', 'aberystwyth.com', 'abolition-now.com', 'about.com', 'academycougars.com', 'acceso.or.cr', 'access4less.net', 'accessgcc.com', 'ace-of-base.com', 'acmecity.com', 'acmemail.net', 'acninc.net', 'adelphia.net', 'adexec.com', 'adfarrow.com', 'adios.net', 'ados.fr', 'advalvas.be', 'aeiou.pt', 'aemail4u.com', 'aeneasmail.com', 'afreeinternet.com', 'africamail.com', 'agoodmail.com', 'ahaa.dk', 'aichi.com', 'aim.com', 'airforce.net', 'airforceemail.com', 'airmail.net', 'airpost.net', 'ajacied.com', 'ak47.hu', 'aknet.kg', 'albawaba.com', 'alex4all.com', 'alexandria.cc', 'algeria.com', 'alhilal.net', 'alibaba.com', 'alice.it', 'aliceadsl.fr', 'alive.cz', 'aliyun.com', 'allmail.net', 'alloymail.com', 'allracing.com', 'allsaintsfan.com', 'alltel.net', 'alskens.dk', 'altavista.com', 'altavista.net', 'altavista.se', 'alternativagratis.com', 'alumnidirector.com', 'alvilag.hu', 'amele.com', 'america.hm', 'ameritech.net', 'amnetsal.com', 'amrer.net', 'amuro.net', 'amuromail.com', 'ananzi.co.za', 'ancestry.com', 'andylau.net', 'anfmail.com', 'angelfan.com', 'angelfire.com', 'animal.net', 'animalhouse.com', 'animalwoman.net', 'anjungcafe.com', 'anote.com', 'another.com', 'anotherwin95.com', 'anti-social.com', 'antisocial.com', 'antongijsen.com', 'antwerpen.com', 'anymoment.com', 'anytimenow.com', 'aol.com', 'aol.it', 'apexmail.com', 'apmail.com', 'apollo.lv', 'approvers.net', 'arabia.com', 'arabtop.net', 'arcademaster.com', 'archaeologist.com', 'arcor.de', 'arcotronics.bg', 'argentina.com', 'aristotle.org', 'army.net', 'arnet.com.ar', 'artlover.com', 'artlover.com.au', 'as-if.com', 'asean-mail.com', 'asheville.com', 'asia-links.com', 'asia.com', 'asiafind.com', 'asianavenue.com', 'asiancityweb.com', 'asiansonly.net', 'asianwired.net', 'asiapoint.net', 'assala.com', 'assamesemail.com', 'astroboymail.com', 'astrolover.com', 'astrosfan.com', 'astrosfan.net', 'asurfer.com', 'athenachu.net', 'atina.cl', 'atl.lv', 'atlanticbb.net', 'atlaswebmail.com', 'atlink.com', 'ato.check.com', 'atozasia.com', 'att.net', 'att.net', 'attbi.com', 'attglobal.net', 'attglobal.net', 'attymail.com', 'au.ru', 'ausi.com', 'austin.rr.com', 'australia.edu', 'australiamail.com', 'austrosearch.net', 'autoescuelanerja.com', 'automotiveauthority.com', 'avh.hu', 'awsom.net', 'axoskate.com', 'ayna.com', 'azimiweb.com', 'bachelorboy.com', 'bachelorgal.com', 'backpackers.com', 'backstreet-boys.com', 'backstreetboysclub.com', 'bagherpour.com', 'bangkok.com', 'bangkok2000.com', 'bannertown.net', 'baptistmail.com', 'baptized.com', 'barcelona.com', 'baseballmail.com', 'basketballmail.com', 'batuta.net', 'baudoinconsulting.com', 'bboy.zzn.com', 'bcpl.net', 'bcvibes.com', 'beeebank.com', 'beenhad.com', 'beep.ru', 'beer.com', 'beethoven.com', 'belice.com', 'belizehome.com', 'bellatlantic.net', 'bellnet.ca', 'bellsouth.net', 'bellsouth.net', 'berkscounty.com', 'berlin.com', 'berlin.de', 'berlinexpo.de', 'bestmail.us', 'bestweb.net', 'bettergolf.net', 'bev.net', 'bharatmail.com', 'bigassweb.com', 'bigblue.net.au', 'bigboab.com', 'bigfoot.com', 'bigfoot.de', 'bigger.com', 'bigmailbox.com', 'bigpond.com', 'bigpond.com.au', 'bigpond.net.au', 'bigramp.com', 'bikemechanics.com', 'bikeracer.com', 'bikeracers.net', 'bikerider.com', 'billsfan.com', 'billsfan.net', 'bimamail.com', 'bimla.net', 'birdowner.net', 'bisons.com', 'bitmail.com', 'bitpage.net', 'bizhosting.com', 'bla-bla.com', 'blackburnmail.com', 'blackplanet.com', 'blacksburg.net', 'blazemail.com', 'blazenet.net', 'bluehyppo.com', 'bluemail.ch', 'bluemail.dk', 'bluesfan.com', 'bluewin.ch', 'blueyonder.co.uk', 'blushmail.com', 'bmlsports.net', 'boardermail.com', 'boatracers.com', 'bol.com.br', 'bolando.com', 'bollywoodz.com', 'bolt.com', 'boltonfans.com', 'bombdiggity.com', 'bonbon.net', 'boom.com', 'bootmail.com', 'bornnaked.com', 'bossofthemoss.com', 'bostonoffice.com', 'bounce.net', 'box.az', 'boxbg.com', 'boxemail.com', 'boxfrog.com', 'boyzoneclub.com', 'bradfordfans.com', 'brasilia.net', 'brazilmail.com.br', 'breathe.com', 'bresnan.net', 'brfree.com.br', 'bright.net', 'britneyclub.com', 'brittonsign.com', 'broadcast.net', 'bt.com', 'btinternet.com', 'btopenworld.co.uk', 'buffymail.com', 'bullsfan.com', 'bullsgame.com', 'bumerang.ro', 'bunko.com', 'buryfans.com', 'business-man.com', 'businessman.net', 'businessweekmail.com', 'busta-rhymes.com', 'busymail.com', 'buyersusa.com', 'bvimailbox.com', 'byteme.com', 'c2i.net', 'c3.hu', 'c4.com', 'cabacabana.com', 'cableone.net', 'caere.it', 'cairomail.com', 'cais.net', 'callnetuk.com', 'callsign.net', 'caltanet.it', 'camidge.com', 'canada-11.com', 'canada.com', 'canadianmail.com', 'canoemail.com', 'canwetalk.com', 'capu.net', 'caramail.com', 'care2.com', 'careerbuildermail.com', 'carioca.net', 'cartestraina.ro', 'casablancaresort.com', 'casino.com', 'catcha.com', 'catholic.org', 'catlover.com', 'catsrule.garfield.com', 'ccnmail.com', 'cd2.com', 'celineclub.com', 'celtic.com', 'centoper.it', 'centralpets.com', 'centrum.cz', 'centrum.sk', 'centurytel.net', 'cfl.rr.com', 'cgac.es', 'chaiyomail.com', 'chance2mail.com', 'chandrasekar.net', 'charm.net', 'charmedmail.com', 'charter.net', 'chat.ru', 'chattown.com', 'chauhanweb.com', 'check.com', 'check1check.com', 'cheerful.com', 'chek.com', 'chello.nl', 'chemist.com', 'chequemail.com', 'cheyenneweb.com', 'chez.com', 'chickmail.com', 'china.net.vg', 'chinalook.com', 'chirk.com', 'chocaholic.com.au', 'christianmail.net', 'churchusa.com', 'cia-agent.com', 'cia.hu', 'ciaoweb.it', 'cicciociccio.com', 'cincinow.net', 'citeweb.net', 'citlink.net', 'city-of-bath.org', 'city-of-birmingham.com', 'city-of-brighton.org', 'city-of-cambridge.com', 'city-of-coventry.com', 'city-of-edinburgh.com', 'city-of-lichfield.com', 'city-of-lincoln.com', 'city-of-liverpool.com', 'city-of-manchester.com', 'city-of-nottingham.com', 'city-of-oxford.com', 'city-of-swansea.com', 'city-of-westminster.com', 'city-of-westminster.net', 'city-of-york.net', 'city2city.com', 'cityofcardiff.net', 'cityoflondon.org', 'claramail.com', 'classicalfan.com', 'classicmail.co.za', 'clerk.com', 'cliffhanger.com', 'close2you.net', 'club-internet.fr', 'club4x4.net', 'clubalfa.com', 'clubbers.net', 'clubducati.com', 'clubhonda.net', 'clubvdo.net', 'cluemail.com', 'cmpmail.com', 'cnnsimail.com', 'codec.ro', 'coder.hu', 'coid.biz', 'coldmail.com', 'collectiblesuperstore.com', 'collegebeat.com', 'collegeclub.com', 'collegemail.com', 'colleges.com', 'columbus.rr.com', 'columbusrr.com', 'columnist.com', 'comcast.net', 'comic.com', 'communityconnect.com', 'comprendemail.com', 'compuserve.com', 'computer-freak.com', 'computermail.net', 'concentric.net', 'conexcol.com', 'conk.com', 'connect4free.net', 'connectbox.com', 'conok.com', 'consultant.com', 'cookiemonster.com', 'cool.br', 'coolgoose.ca', 'coolgoose.com', 'coolkiwi.com', 'coollist.com', 'coolmail.com', 'coolmail.net', 'coolsend.com', 'cooooool.com', 'cooperation.net', 'cooperationtogo.net', 'copacabana.com', 'cornells.com', 'cornerpub.com', 'corporatedirtbag.com', 'correo.terra.com.gt', 'cortinet.com', 'cotas.net', 'counsellor.com', 'countrylover.com', 'covad.net', 'cox.net', 'coxinet.net', 'coxmail.com', 'cpaonline.net', 'cracker.hu', 'crazedanddazed.com', 'crazysexycool.com', 'cristianemail.com', 'critterpost.com', 'croeso.com', 'crosshairs.com', 'crosslink.net', 'crosswinds.net', 'crwmail.com', 'cry4helponline.com', 'cs.com', 'csi.com', 'csinibaba.hu', 'cuemail.com', 'curio-city.com', 'cute-girl.com', 'cuteandcuddly.com', 'cutey.com', 'cww.de', 'cyber-africa.net', 'cyber4all.com', 'cyberbabies.com', 'cybercafemaui.com', 'cyberdude.com', 'cyberforeplay.net', 'cybergal.com', 'cybergrrl.com', 'cyberinbox.com', 'cyberleports.com', 'cybermail.net', 'cybernet.it', 'cyberspace-asia.com', 'cybertrains.org', 'cyclefanz.com', 'cynetcity.com', 'dabsol.net', 'dadacasa.com', 'daha.com', 'dailypioneer.com', 'dallas.theboys.com', 'dangerous-minds.com', 'dansegulvet.com', 'data54.com', 'daum.net', 'davegracey.com', 'dawnsonmail.com', 'dawsonmail.com', 'dazedandconfused.com', 'dbzmail.com', 'dca.net', 'dcemail.com', 'deadlymob.org', 'deal-maker.com', 'dearriba.com', 'death-star.com', 'dejanews.com', 'deliveryman.com', 'deltanet.com', 'deneg.net', 'depechemode.com', 'deseretmail.com', 'desertmail.com', 'desilota.com', 'deskmail.com', 'deskpilot.com', 'destin.com', 'detik.com', 'deutschland-net.com', 'devotedcouples.com', 'dfwatson.com', 'di-ve.com', 'digibel.be', 'diplomats.com', 'direcway.com', 'dirtracer.com', 'discofan.com', 'discovery.com', 'discoverymail.com', 'disinfo.net', 'dmailman.com', 'dmv.com', 'dnsmadeeasy.com', 'doctor.com', 'dog.com', 'doglover.com', 'dogmail.co.uk', 'dogsnob.net', 'doityourself.com', 'doneasy.com', 'donjuan.com', 'dontgotmail.com', 'dontmesswithtexas.com', 'doramail.com', 'dostmail.com', 'dotcom.fr', 'dott.it', 'dplanet.ch', 'dr.com', 'dragoncon.net', 'dragracer.com', 'dropzone.com', 'drotposta.hu', 'dslextreme.com', 'dubaimail.com', 'dublin.com', 'dublin.ie', 'dunlopdriver.com', 'dunloprider.com', 'duno.com', 'dwp.net', 'dygo.com', 'dynamitemail.com', 'e-apollo.lv', 'e-mail.dk', 'e-mail.ru', 'e-mailanywhere.com', 'e-mails.ru', 'e-tapaal.com', 'earthalliance.com', 'earthcam.net', 'earthdome.com', 'earthling.net', 'earthlink.net', 'earthonline.net', 'eastcoast.co.za', 'eastmail.com', 'easy.to', 'easypost.com', 'eatmydirt.com', 'ecardmail.com', 'ecbsolutions.net', 'echina.com', 'ecompare.com', 'edge.net', 'edmail.com', 'ednatx.com', 'edtnmail.com', 'educacao.te.pt', 'educastmail.com', 'ehmail.com', 'eircom.net', 'elsitio.com', 'elvis.com', 'email-london.co.uk', 'email.com', 'email.cz', 'email.ee', 'email.it', 'email.nu', 'email.ro', 'email.ru', 'email.si', 'email.women.com', 'email2me.net', 'emailacc.com', 'emailaccount.com', 'emailchoice.com', 'emailcorner.net', 'emailem.com', 'emailengine.net', 'emailforyou.net', 'emailgroups.net', 'emailpinoy.com', 'emailplanet.com', 'emails.ru', 'emailuser.net', 'emailx.net', 'ematic.com', 'embarqmail.com', 'emumail.com', 'end-war.com', 'enel.net', 'engineer.com', 'england.com', 'england.edu', 'enter.net', 'epatra.com', 'epix.net', 'epost.de', 'eposta.hu', 'eqqu.com', 'eramail.co.za', 'eresmas.com', 'eriga.lv', 'erols.com', 'estranet.it', 'ethos.st', 'etoast.com', 'etrademail.com', 'eudoramail.com', 'europe.com', 'euroseek.com', 'every1.net', 'everyday.com.kh', 'everyone.net', 'examnotes.net', 'excite.co.jp', 'excite.com', 'excite.it', 'execs.com', 'expressasia.com', 'extenda.net', 'extended.com', 'eyou.com', 'ezcybersearch.com', 'ezmail.egine.com', 'ezmail.ru', 'ezrs.com', 'ezy.net', 'f1fans.net', 'facebook.com', 'fan.com', 'fan.theboys.com', 'fansonlymail.com', 'fantasticmail.com', 'farang.net', 'faroweb.com', 'fastem.com', 'fastemail.us', 'fastemailer.com', 'fastermail.com', 'fastimap.com', 'fastmail.fm', 'fastmailbox.net', 'fastmessaging.com', 'fatcock.net', 'fathersrightsne.org', 'fbi-agent.com', 'fbi.hu', 'fcc.net', 'federalcontractors.com', 'felicity.com', 'felicitymail.com', 'femenino.com', 'fetchmail.co.uk', 'fetchmail.com', 'feyenoorder.com', 'ffanet.com', 'fiberia.com', 'fibertel.com.ar', 'filipinolinks.com', 'financemail.net', 'financier.com', 'findmail.com', 'finebody.com', 'finfin.com', 'fire-brigade.com', 'fishburne.org', 'flashcom.net', 'flashemail.com', 'flashmail.com', 'flashmail.net', 'flipcode.com', 'fmail.co.uk', 'fmailbox.com', 'fmgirl.com', 'fmguy.com', 'fnbmail.co.za', 'fnmail.com', 'folkfan.com', 'foodmail.com', 'football.theboys.com', 'footballmail.com', 'for-president.com', 'forfree.at', 'forpresident.com', 'forthnet.gr', 'fortuncity.com', 'fortunecity.com', 'forum.dk', 'foxmail.com', 'free-org.com', 'free.com.pe', 'free.fr', 'freeaccess.nl', 'freeaccount.com', 'freeandsingle.com', 'freedom.usa.com', 'freedomlover.com', 'freegates.be', 'freeghana.com', 'freeler.nl', 'freemail.c3.hu', 'freemail.com.au', 'freemail.com.pk', 'freemail.de', 'freemail.et', 'freemail.gr', 'freemail.hu', 'freemail.it', 'freemail.lt', 'freemail.nl', 'freemail.org.mk', 'freenet.de', 'freenet.kg', 'freeola.com', 'freeola.net', 'freeserve.co.uk', 'freestamp.com', 'freestart.hu', 'freesurf.fr', 'freesurf.nl', 'freeuk.com', 'freeuk.net', 'freeukisp.co.uk', 'freeweb.org', 'freewebemail.com', 'freeyellow.com', 'freezone.co.uk', 'fresnomail.com', 'friends-cafe.com', 'friendsfan.com', 'from-africa.com', 'from-america.com', 'from-argentina.com', 'from-asia.com', 'from-australia.com', 'from-belgium.com', 'from-brazil.com', 'from-canada.com', 'from-china.net', 'from-england.com', 'from-europe.com', 'from-france.net', 'from-germany.net', 'from-holland.com', 'from-israel.com', 'from-italy.net', 'from-japan.net', 'from-korea.com', 'from-mexico.com', 'from-outerspace.com', 'from-russia.com', 'from-spain.net', 'fromalabama.com', 'fromalaska.com', 'fromarizona.com', 'fromarkansas.com', 'fromcalifornia.com', 'fromcolorado.com', 'fromconnecticut.com', 'fromdelaware.com', 'fromflorida.net', 'fromgeorgia.com', 'fromhawaii.net', 'fromidaho.com', 'fromillinois.com', 'fromindiana.com', 'fromiowa.com', 'fromjupiter.com', 'fromkansas.com', 'fromkentucky.com', 'fromlouisiana.com', 'frommaine.net', 'frommaryland.com', 'frommassachusetts.com', 'frommiami.com', 'frommichigan.com', 'fromminnesota.com', 'frommississippi.com', 'frommissouri.com', 'frommontana.com', 'fromnebraska.com', 'fromnevada.com', 'fromnewhampshire.com', 'fromnewjersey.com', 'fromnewmexico.com', 'fromnewyork.net', 'fromnorthcarolina.com', 'fromnorthdakota.com', 'fromohio.com', 'fromoklahoma.com', 'fromoregon.net', 'frompennsylvania.com', 'fromrhodeisland.com', 'fromru.com', 'fromsouthcarolina.com', 'fromsouthdakota.com', 'fromtennessee.com', 'fromtexas.com', 'fromthestates.com', 'fromutah.com', 'fromvermont.com', 'fromvirginia.com', 'fromwashington.com', 'fromwashingtondc.com', 'fromwestvirginia.com', 'fromwisconsin.com', 'fromwyoming.com', 'front.ru', 'frontier.com', 'frontiernet.net', 'frostbyte.uk.net', 'fsmail.net', 'ftml.net', 'fullchannel.net', 'fullmail.com', 'funkfan.com', 'fuorissimo.com', 'furnitureprovider.com', 'fuse.net', 'fut.es', 'fwnb.com', 'fxsmails.com', 'galamb.net', 'galaxy5.com', 'gamebox.net', 'gamegeek.com', 'games.com', 'gamespotmail.com', 'garbage.com', 'gardener.com', 'gateway.net', 'gawab.com', 'gaybrighton.co.uk', 'gaza.net', 'gazeta.pl', 'gazibooks.com', 'gci.net', 'gee-wiz.com', 'geecities.com', 'geek.com', 'geek.hu', 'geeklife.com', 'general-hospital.com', 'geocities.com', 'geologist.com', 'geopia.com', 'gh2000.com', 'ghanamail.com', 'ghostmail.com', 'giantsfan.com', 'giga4u.de', 'gigileung.org', 'givepeaceachance.com', 'glay.org', 'glendale.net', 'globalfree.it', 'globalpagan.com', 'globalsite.com.br', 'globo.com', 'globomail.com', 'gmail.com', 'gmx.at', 'gmx.com', 'gmx.de', 'gmx.fr', 'gmx.li', 'gmx.net', 'gnwmail.com', 'go.com', 'go.ro', 'go.ru', 'go2.com.py', 'go2net.com', 'gocollege.com', 'gocubs.com', 'gofree.co.uk', 'goldenmail.ru', 'goldmail.ru', 'golfemail.com', 'golfmail.be', 'gonavy.net', 'goodstick.com', 'google.com', 'googlemail.com', 'goplay.com', 'gorontalo.net', 'gospelfan.com', 'gothere.uk.com', 'gotmail.com', 'gotomy.com', 'govolsfan.com', 'gportal.hu', 'grabmail.com', 'graffiti.net', 'gramszu.net', 'grapplers.com', 'gratisweb.com', 'grungecafe.com', 'gtemail.net', 'gti.net', 'gtmc.net', 'gua.net', 'guessmail.com', 'guju.net', 'gurlmail.com', 'guy.com', 'guy2.com', 'guyanafriends.com', 'gyorsposta.com', 'gyorsposta.hu', 'hackermail.net', 'hailmail.net', 'hairdresser.net', 'hamptonroads.com', 'handbag.com', 'handleit.com', 'hang-ten.com', 'hanmail.net', 'happemail.com', 'happycounsel.com', 'happypuppy.com', 'hardcorefreak.com', 'hawaii.rr.com', 'hawaiiantel.net', 'headbone.com', 'heartthrob.com', 'heerschap.com', 'heesun.net', 'hehe.com', 'hello.hu', 'hello.net.au', 'hello.to', 'helter-skelter.com', 'hempseed.com', 'herediano.com', 'heremail.com', 'herono1.com', 'hetnet.nl', 'hey.to', 'hhdevel.com', 'highmilton.com', 'highquality.com', 'highveldmail.co.za', 'hiphopfan.com', 'hispavista.com', 'hitthe.net', 'hkg.net', 'hkstarphoto.com', 'hockeymail.com', 'hollywoodkids.com', 'home-email.com', 'home.nl', 'home.no.net', 'home.ro', 'home.se', 'homeart.com', 'homelocator.com', 'homemail.com', 'homestead.com', 'homeworkcentral.com', 'hongkong.com', 'hookup.net', 'hoopsmail.com', 'horrormail.com', 'host-it.com.sg', 'hot-shot.com', 'hot.ee', 'hotbot.com', 'hotbrev.com', 'hotepmail.com', 'hotfire.net', 'hotletter.com', 'hotmail.be', 'hotmail.co.il', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.br', 'hotmail.com.mx', 'hotmail.de', 'hotmail.es', 'hotmail.fr', 'hotmail.it', 'hotmail.kg', 'hotmail.kz', 'hotmail.ru', 'hotpop.com', 'hotpop3.com', 'hotvoice.com', 'housefancom', 'housemail.com', 'hsuchi.net', 'html.tou.com', 'hughes.net', 'hunsa.com', 'hush.com', 'hushmail.com', 'hypernautica.com', 'i-connect.com', 'i-france.com', 'i-mail.com.au', 'i-p.com', 'i-plus.net', 'i.am', 'i12.com', 'iamawoman.com', 'iamwaiting.com', 'iamwasted.com', 'iamyours.com', 'ibm.net', 'icestorm.com', 'icloud.com', 'icmsconsultants.com', 'icq.com', 'icqmail.com', 'icrazy.com', 'id-base.com', 'ididitmyway.com', 'idirect.com', 'iespana.es', 'ifoward.com', 'ig.com.br', 'ignazio.it', 'ignmail.com', 'ihateclowns.com', 'ihwy.com', 'iinet.net.au', 'ijustdontcare.com', 'ilovechocolate.com', 'ilovejesus.com', 'ilovethemovies.com', 'ilovetocollect.net', 'ilse.nl', 'imaginemail.com', 'imail.org', 'imail.ru', 'imailbox.com', 'imel.org', 'imneverwrong.com', 'imposter.co.uk', 'imstressed.com', 'imtoosexy.com', 'in-box.net', 'iname.com', 'inbox.com', 'inbox.net', 'inbox.ru', 'incamail.com', 'incredimail.com', 'indexa.fr', 'india.com', 'indiatimes.com', 'indo-mail.com', 'indocities.com', 'indomail.com', 'indyracers.com', 'info-media.de', 'info66.com', 'infohq.com', 'infomail.es', 'infomart.or.jp', 'infospacemail.com', 'infovia.com.ar', 'inicia.es', 'inmail.sk', 'innocent.com', 'inorbit.com', 'insidebaltimore.net', 'insight.rr.com', 'insurer.com', 'integra.net', 'interaccess.com', 'interburp.com', 'interfree.it', 'interia.pl', 'interlap.com.ar', 'intermail.co.il', 'internet-club.com', 'internet-police.com', 'internetbiz.com', 'internetdrive.com', 'internetegypt.com', 'internetemails.net', 'internetmailing.net', 'internetmci.com', 'investormail.com', 'inwind.it', 'iobox.com', 'iobox.fi', 'iol.it', 'ionet.net', 'iowaemail.com', 'ip3.com', 'iprimus.com.au', 'iqemail.com', 'irangate.net', 'iraqmail.com', 'ireland.com', 'irj.hu', 'isellcars.com', 'islamonline.net', 'isleuthmail.com', 'ismart.net', 'isonfire.com', 'isp9.net', 'itelefonica.com.br', 'itloox.com', 'itmom.com', 'itol.com', 'ivebeenframed.com', 'ivillage.com', 'iwan-fals.com', 'iwmail.com', 'iwon.com', 'izadpanah.com', 'jahoopa.com', 'jakuza.hu', 'japan.com', 'jaydemail.com', 'jazzandjava.com', 'jazzfan.com', 'jazzgame.com', 'jerusalemmail.com', 'jetemail.net', 'jewishmail.com', 'jippii.fi', 'jmail.co.za', 'joinme.com', 'jokes.com', 'jordanmail.com', 'journalist.com', 'jovem.te.pt', 'joymail.com', 'jpopmail.com', 'jubiimail.dk', 'jump.com', 'jumpy.it', 'juniormail.com', 'juno.com', 'justemail.net', 'justicemail.com', 'kaazoo.com', 'kaixo.com', 'kalpoint.com', 'kansascity.com', 'kapoorweb.com', 'karachian.com', 'karachioye.com', 'karbasi.com', 'katamail.com', 'kayafmmail.co.za', 'kbjrmail.com', 'kcks.com', 'keg-party.com', 'keko.com.ar', 'kellychen.com', 'keromail.com', 'keyemail.com', 'kgb.hu', 'khosropour.com', 'kickassmail.com', 'killermail.com', 'kimo.com', 'kinki-kids.com', 'kittymail.com', 'kitznet.at', 'kiwibox.com', 'kiwitown.com', 'kmail.com.au', 'konx.com', 'korea.com', 'kozmail.com', 'krongthip.com', 'krunis.com', 'ksanmail.com', 'ksee24mail.com', 'kube93mail.com', 'kukamail.com', 'kumarweb.com', 'kuwait-mail.com', 'la.com', 'ladymail.cz', 'lagerlouts.com', 'lahoreoye.com', 'lakmail.com', 'lamer.hu', 'land.ru', 'lankamail.com', 'laposte.net', 'latemodels.com', 'latinmail.com', 'latino.com', 'lavabit.com', 'law.com', 'lawyer.com', 'leehom.net', 'legalactions.com', 'legislator.com', 'leonlai.net', 'letsgomets.net', 'letterbox.com', 'levele.com', 'levele.hu', 'lex.bg', 'lexis-nexis-mail.com', 'libero.it', 'liberomail.com', 'lick101.com', 'linkmaster.com', 'linktrader.com', 'linuxfreemail.com', 'linuxmail.org', 'lionsfan.com.au', 'liontrucks.com', 'liquidinformation.net', 'list.ru', 'littleblueroom.com', 'live.be', 'live.ca', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.au', 'live.com.mx', 'live.de', 'live.fr', 'live.it', 'live.nl', 'liverpoolfans.com', 'llandudno.com', 'llangollen.com', 'lmxmail.sk', 'lobbyist.com', 'localbar.com', 'london.com', 'loobie.com', 'looksmart.co.uk', 'looksmart.com', 'looksmart.com.au', 'lopezclub.com', 'louiskoo.com', 'love.com', 'love.cz', 'loveable.com', 'lovelygirl.net', 'lovemail.com', 'lover-boy.com', 'lovergirl.com', 'lovingjesus.com', 'lowandslow.com', 'luso.pt', 'luukku.com', 'lycos.co.uk', 'lycos.com', 'lycos.es', 'lycos.it', 'lycos.ne.jp', 'lycosemail.com', 'lycosmail.com', 'm-a-i-l.com', 'm-hmail.com', 'm4.org', 'mac.com', 'macbox.com', 'macfreak.com', 'machinecandy.com', 'macmail.com', 'madcreations.com', 'madrid.com', 'maffia.hu', 'magicmail.co.za', 'mahmoodweb.com', 'mail-awu.de', 'mail-box.cz', 'mail-center.com', 'mail-central.com', 'mail-page.com', 'mail.austria.com', 'mail.az', 'mail.be', 'mail.bulgaria.com', 'mail.byte.it', 'mail.co.za', 'mail.com', 'mail.ee', 'mail.entrepeneurmag.com', 'mail.freetown.com', 'mail.gr', 'mail.hitthebeach.com', 'mail.kmsp.com', 'mail.md', 'mail.nu', 'mail.org.uk', 'mail.pf', 'mail.pharmacy.com', 'mail.pt', 'mail.r-o-o-t.com', 'mail.ru', 'mail.salu.net', 'mail.sisna.com', 'mail.spaceports.com', 'mail.theboys.com', 'mail.usa.com', 'mail.vasarhely.hu', 'mail15.com', 'mail1st.com', 'mail2007.com', 'mail2aaron.com', 'mail2abby.com', 'mail2abc.com', 'mail2actor.com', 'mail2admiral.com', 'mail2adorable.com', 'mail2adoration.com', 'mail2adore.com', 'mail2adventure.com', 'mail2aeolus.com', 'mail2aether.com', 'mail2affection.com', 'mail2afghanistan.com', 'mail2africa.com', 'mail2agent.com', 'mail2aha.com', 'mail2ahoy.com', 'mail2aim.com', 'mail2air.com', 'mail2airbag.com', 'mail2airforce.com', 'mail2airport.com', 'mail2alabama.com', 'mail2alan.com', 'mail2alaska.com', 'mail2albania.com', 'mail2alcoholic.com', 'mail2alec.com', 'mail2alexa.com', 'mail2algeria.com', 'mail2alicia.com', 'mail2alien.com', 'mail2allan.com', 'mail2allen.com', 'mail2allison.com', 'mail2alpha.com', 'mail2alyssa.com', 'mail2amanda.com', 'mail2amazing.com', 'mail2amber.com', 'mail2america.com', 'mail2american.com', 'mail2andorra.com', 'mail2andrea.com', 'mail2andy.com', 'mail2anesthesiologist.com', 'mail2angela.com', 'mail2angola.com', 'mail2ann.com', 'mail2anna.com', 'mail2anne.com', 'mail2anthony.com', 'mail2anything.com', 'mail2aphrodite.com', 'mail2apollo.com', 'mail2april.com', 'mail2aquarius.com', 'mail2arabia.com', 'mail2arabic.com', 'mail2architect.com', 'mail2ares.com', 'mail2argentina.com', 'mail2aries.com', 'mail2arizona.com', 'mail2arkansas.com', 'mail2armenia.com', 'mail2army.com', 'mail2arnold.com', 'mail2art.com', 'mail2artemus.com', 'mail2arthur.com', 'mail2artist.com', 'mail2ashley.com', 'mail2ask.com', 'mail2astronomer.com', 'mail2athena.com', 'mail2athlete.com', 'mail2atlas.com', 'mail2atom.com', 'mail2attitude.com', 'mail2auction.com', 'mail2aunt.com', 'mail2australia.com', 'mail2austria.com', 'mail2azerbaijan.com', 'mail2baby.com', 'mail2bahamas.com', 'mail2bahrain.com', 'mail2ballerina.com', 'mail2ballplayer.com', 'mail2band.com', 'mail2bangladesh.com', 'mail2bank.com', 'mail2banker.com', 'mail2bankrupt.com', 'mail2baptist.com', 'mail2bar.com', 'mail2barbados.com', 'mail2barbara.com', 'mail2barter.com', 'mail2basketball.com', 'mail2batter.com', 'mail2beach.com', 'mail2beast.com', 'mail2beatles.com', 'mail2beauty.com', 'mail2becky.com', 'mail2beijing.com', 'mail2belgium.com', 'mail2belize.com', 'mail2ben.com', 'mail2bernard.com', 'mail2beth.com', 'mail2betty.com', 'mail2beverly.com', 'mail2beyond.com', 'mail2biker.com', 'mail2bill.com', 'mail2billionaire.com', 'mail2billy.com', 'mail2bio.com', 'mail2biologist.com', 'mail2black.com', 'mail2blackbelt.com', 'mail2blake.com', 'mail2blind.com', 'mail2blonde.com', 'mail2blues.com', 'mail2bob.com', 'mail2bobby.com', 'mail2bolivia.com', 'mail2bombay.com', 'mail2bonn.com', 'mail2bookmark.com', 'mail2boreas.com', 'mail2bosnia.com', 'mail2boston.com', 'mail2botswana.com', 'mail2bradley.com', 'mail2brazil.com', 'mail2breakfast.com', 'mail2brian.com', 'mail2bride.com', 'mail2brittany.com', 'mail2broker.com', 'mail2brook.com', 'mail2bruce.com', 'mail2brunei.com', 'mail2brunette.com', 'mail2brussels.com', 'mail2bryan.com', 'mail2bug.com', 'mail2bulgaria.com', 'mail2business.com', 'mail2buy.com', 'mail2ca.com', 'mail2california.com', 'mail2calvin.com', 'mail2cambodia.com', 'mail2cameroon.com', 'mail2canada.com', 'mail2cancer.com', 'mail2capeverde.com', 'mail2capricorn.com', 'mail2cardinal.com', 'mail2cardiologist.com', 'mail2care.com', 'mail2caroline.com', 'mail2carolyn.com', 'mail2casey.com', 'mail2cat.com', 'mail2caterer.com', 'mail2cathy.com', 'mail2catlover.com', 'mail2catwalk.com', 'mail2cell.com', 'mail2chad.com', 'mail2champaign.com', 'mail2charles.com', 'mail2chef.com', 'mail2chemist.com', 'mail2cherry.com', 'mail2chicago.com', 'mail2chile.com', 'mail2china.com', 'mail2chinese.com', 'mail2chocolate.com', 'mail2christian.com', 'mail2christie.com', 'mail2christmas.com', 'mail2christy.com', 'mail2chuck.com', 'mail2cindy.com', 'mail2clark.com', 'mail2classifieds.com', 'mail2claude.com', 'mail2cliff.com', 'mail2clinic.com', 'mail2clint.com', 'mail2close.com', 'mail2club.com', 'mail2coach.com', 'mail2coastguard.com', 'mail2colin.com', 'mail2college.com', 'mail2colombia.com', 'mail2color.com', 'mail2colorado.com', 'mail2columbia.com', 'mail2comedian.com', 'mail2composer.com', 'mail2computer.com', 'mail2computers.com', 'mail2concert.com', 'mail2congo.com', 'mail2connect.com', 'mail2connecticut.com', 'mail2consultant.com', 'mail2convict.com', 'mail2cook.com', 'mail2cool.com', 'mail2cory.com', 'mail2costarica.com', 'mail2country.com', 'mail2courtney.com', 'mail2cowboy.com', 'mail2cowgirl.com', 'mail2craig.com', 'mail2crave.com', 'mail2crazy.com', 'mail2create.com', 'mail2croatia.com', 'mail2cry.com', 'mail2crystal.com', 'mail2cuba.com', 'mail2culture.com', 'mail2curt.com', 'mail2customs.com', 'mail2cute.com', 'mail2cutey.com', 'mail2cynthia.com', 'mail2cyprus.com', 'mail2czechrepublic.com', 'mail2dad.com', 'mail2dale.com', 'mail2dallas.com', 'mail2dan.com', 'mail2dana.com', 'mail2dance.com', 'mail2dancer.com', 'mail2danielle.com', 'mail2danny.com', 'mail2darlene.com', 'mail2darling.com', 'mail2darren.com', 'mail2daughter.com', 'mail2dave.com', 'mail2dawn.com', 'mail2dc.com', 'mail2dealer.com', 'mail2deanna.com', 'mail2dearest.com', 'mail2debbie.com', 'mail2debby.com', 'mail2deer.com', 'mail2delaware.com', 'mail2delicious.com', 'mail2demeter.com', 'mail2democrat.com', 'mail2denise.com', 'mail2denmark.com', 'mail2dennis.com', 'mail2dentist.com', 'mail2derek.com', 'mail2desert.com', 'mail2devoted.com', 'mail2devotion.com', 'mail2diamond.com', 'mail2diana.com', 'mail2diane.com', 'mail2diehard.com', 'mail2dilemma.com', 'mail2dillon.com', 'mail2dinner.com', 'mail2dinosaur.com', 'mail2dionysos.com', 'mail2diplomat.com', 'mail2director.com', 'mail2dirk.com', 'mail2disco.com', 'mail2dive.com', 'mail2diver.com', 'mail2divorced.com', 'mail2djibouti.com', 'mail2doctor.com', 'mail2doglover.com', 'mail2dominic.com', 'mail2dominica.com', 'mail2dominicanrepublic.com', 'mail2don.com', 'mail2donald.com', 'mail2donna.com', 'mail2doris.com', 'mail2dorothy.com', 'mail2doug.com', 'mail2dough.com', 'mail2douglas.com', 'mail2dow.com', 'mail2downtown.com', 'mail2dream.com', 'mail2dreamer.com', 'mail2dude.com', 'mail2dustin.com', 'mail2dyke.com', 'mail2dylan.com', 'mail2earl.com', 'mail2earth.com', 'mail2eastend.com', 'mail2eat.com', 'mail2economist.com', 'mail2ecuador.com', 'mail2eddie.com', 'mail2edgar.com', 'mail2edwin.com', 'mail2egypt.com', 'mail2electron.com', 'mail2eli.com', 'mail2elizabeth.com', 'mail2ellen.com', 'mail2elliot.com', 'mail2elsalvador.com', 'mail2elvis.com', 'mail2emergency.com', 'mail2emily.com', 'mail2engineer.com', 'mail2english.com', 'mail2environmentalist.com', 'mail2eos.com', 'mail2eric.com', 'mail2erica.com', 'mail2erin.com', 'mail2erinyes.com', 'mail2eris.com', 'mail2eritrea.com', 'mail2ernie.com', 'mail2eros.com', 'mail2estonia.com', 'mail2ethan.com', 'mail2ethiopia.com', 'mail2eu.com', 'mail2europe.com', 'mail2eurus.com', 'mail2eva.com', 'mail2evan.com', 'mail2evelyn.com', 'mail2everything.com', 'mail2exciting.com', 'mail2expert.com', 'mail2fairy.com', 'mail2faith.com', 'mail2fanatic.com', 'mail2fancy.com', 'mail2fantasy.com', 'mail2farm.com', 'mail2farmer.com', 'mail2fashion.com', 'mail2fat.com', 'mail2feeling.com', 'mail2female.com', 'mail2fever.com', 'mail2fighter.com', 'mail2fiji.com', 'mail2filmfestival.com', 'mail2films.com', 'mail2finance.com', 'mail2finland.com', 'mail2fireman.com', 'mail2firm.com', 'mail2fisherman.com', 'mail2flexible.com', 'mail2florence.com', 'mail2florida.com', 'mail2floyd.com', 'mail2fly.com', 'mail2fond.com', 'mail2fondness.com', 'mail2football.com', 'mail2footballfan.com', 'mail2found.com', 'mail2france.com', 'mail2frank.com', 'mail2frankfurt.com', 'mail2franklin.com', 'mail2fred.com', 'mail2freddie.com', 'mail2free.com', 'mail2freedom.com', 'mail2french.com', 'mail2freudian.com', 'mail2friendship.com', 'mail2from.com', 'mail2fun.com', 'mail2gabon.com', 'mail2gabriel.com', 'mail2gail.com', 'mail2galaxy.com', 'mail2gambia.com', 'mail2games.com', 'mail2gary.com', 'mail2gavin.com', 'mail2gemini.com', 'mail2gene.com', 'mail2genes.com', 'mail2geneva.com', 'mail2george.com', 'mail2georgia.com', 'mail2gerald.com', 'mail2german.com', 'mail2germany.com', 'mail2ghana.com', 'mail2gilbert.com', 'mail2gina.com', 'mail2girl.com', 'mail2glen.com', 'mail2gloria.com', 'mail2goddess.com', 'mail2gold.com', 'mail2golfclub.com', 'mail2golfer.com', 'mail2gordon.com', 'mail2government.com', 'mail2grab.com', 'mail2grace.com', 'mail2graham.com', 'mail2grandma.com', 'mail2grandpa.com', 'mail2grant.com', 'mail2greece.com', 'mail2green.com', 'mail2greg.com', 'mail2grenada.com', 'mail2gsm.com', 'mail2guard.com', 'mail2guatemala.com', 'mail2guy.com', 'mail2hades.com', 'mail2haiti.com', 'mail2hal.com', 'mail2handhelds.com', 'mail2hank.com', 'mail2hannah.com', 'mail2harold.com', 'mail2harry.com', 'mail2hawaii.com', 'mail2headhunter.com', 'mail2heal.com', 'mail2heather.com', 'mail2heaven.com', 'mail2hebe.com', 'mail2hecate.com', 'mail2heidi.com', 'mail2helen.com', 'mail2hell.com', 'mail2help.com', 'mail2helpdesk.com', 'mail2henry.com', 'mail2hephaestus.com', 'mail2hera.com', 'mail2hercules.com', 'mail2herman.com', 'mail2hermes.com', 'mail2hespera.com', 'mail2hestia.com', 'mail2highschool.com', 'mail2hindu.com', 'mail2hip.com', 'mail2hiphop.com', 'mail2holland.com', 'mail2holly.com', 'mail2hollywood.com', 'mail2homer.com', 'mail2honduras.com', 'mail2honey.com', 'mail2hongkong.com', 'mail2hope.com', 'mail2horse.com', 'mail2hot.com', 'mail2hotel.com', 'mail2houston.com', 'mail2howard.com', 'mail2hugh.com', 'mail2human.com', 'mail2hungary.com', 'mail2hungry.com', 'mail2hygeia.com', 'mail2hyperspace.com', 'mail2hypnos.com', 'mail2ian.com', 'mail2ice-cream.com', 'mail2iceland.com', 'mail2idaho.com', 'mail2idontknow.com', 'mail2illinois.com', 'mail2imam.com', 'mail2in.com', 'mail2india.com', 'mail2indian.com', 'mail2indiana.com', 'mail2indonesia.com', 'mail2infinity.com', 'mail2intense.com', 'mail2iowa.com', 'mail2iran.com', 'mail2iraq.com', 'mail2ireland.com', 'mail2irene.com', 'mail2iris.com', 'mail2irresistible.com', 'mail2irving.com', 'mail2irwin.com', 'mail2isaac.com', 'mail2israel.com', 'mail2italian.com', 'mail2italy.com', 'mail2jackie.com', 'mail2jacob.com', 'mail2jail.com', 'mail2jaime.com', 'mail2jake.com', 'mail2jamaica.com', 'mail2james.com', 'mail2jamie.com', 'mail2jan.com', 'mail2jane.com', 'mail2janet.com', 'mail2janice.com', 'mail2japan.com', 'mail2japanese.com', 'mail2jasmine.com', 'mail2jason.com', 'mail2java.com', 'mail2jay.com', 'mail2jazz.com', 'mail2jed.com', 'mail2jeffrey.com', 'mail2jennifer.com', 'mail2jenny.com', 'mail2jeremy.com', 'mail2jerry.com', 'mail2jessica.com', 'mail2jessie.com', 'mail2jesus.com', 'mail2jew.com', 'mail2jeweler.com', 'mail2jim.com', 'mail2jimmy.com', 'mail2joan.com', 'mail2joann.com', 'mail2joanna.com', 'mail2jody.com', 'mail2joe.com', 'mail2joel.com', 'mail2joey.com', 'mail2john.com', 'mail2join.com', 'mail2jon.com', 'mail2jonathan.com', 'mail2jones.com', 'mail2jordan.com', 'mail2joseph.com', 'mail2josh.com', 'mail2joy.com', 'mail2juan.com', 'mail2judge.com', 'mail2judy.com', 'mail2juggler.com', 'mail2julian.com', 'mail2julie.com', 'mail2jumbo.com', 'mail2junk.com', 'mail2justin.com', 'mail2justme.com', 'mail2kansas.com', 'mail2karate.com', 'mail2karen.com', 'mail2karl.com', 'mail2karma.com', 'mail2kathleen.com', 'mail2kathy.com', 'mail2katie.com', 'mail2kay.com', 'mail2kazakhstan.com', 'mail2keen.com', 'mail2keith.com', 'mail2kelly.com', 'mail2kelsey.com', 'mail2ken.com', 'mail2kendall.com', 'mail2kennedy.com', 'mail2kenneth.com', 'mail2kenny.com', 'mail2kentucky.com', 'mail2kenya.com', 'mail2kerry.com', 'mail2kevin.com', 'mail2kim.com', 'mail2kimberly.com', 'mail2king.com', 'mail2kirk.com', 'mail2kiss.com', 'mail2kosher.com', 'mail2kristin.com', 'mail2kurt.com', 'mail2kuwait.com', 'mail2kyle.com', 'mail2kyrgyzstan.com', 'mail2la.com', 'mail2lacrosse.com', 'mail2lance.com', 'mail2lao.com', 'mail2larry.com', 'mail2latvia.com', 'mail2laugh.com', 'mail2laura.com', 'mail2lauren.com', 'mail2laurie.com', 'mail2lawrence.com', 'mail2lawyer.com', 'mail2lebanon.com', 'mail2lee.com', 'mail2leo.com', 'mail2leon.com', 'mail2leonard.com', 'mail2leone.com', 'mail2leslie.com', 'mail2letter.com', 'mail2liberia.com', 'mail2libertarian.com', 'mail2libra.com', 'mail2libya.com', 'mail2liechtenstein.com', 'mail2life.com', 'mail2linda.com', 'mail2linux.com', 'mail2lionel.com', 'mail2lipstick.com', 'mail2liquid.com', 'mail2lisa.com', 'mail2lithuania.com', 'mail2litigator.com', 'mail2liz.com', 'mail2lloyd.com', 'mail2lois.com', 'mail2lola.com', 'mail2london.com', 'mail2looking.com', 'mail2lori.com', 'mail2lost.com', 'mail2lou.com', 'mail2louis.com', 'mail2louisiana.com', 'mail2lovable.com', 'mail2love.com', 'mail2lucky.com', 'mail2lucy.com', 'mail2lunch.com', 'mail2lust.com', 'mail2luxembourg.com', 'mail2luxury.com', 'mail2lyle.com', 'mail2lynn.com', 'mail2madagascar.com', 'mail2madison.com', 'mail2madrid.com', 'mail2maggie.com', 'mail2mail4.com', 'mail2maine.com', 'mail2malawi.com', 'mail2malaysia.com', 'mail2maldives.com', 'mail2mali.com', 'mail2malta.com', 'mail2mambo.com', 'mail2man.com', 'mail2mandy.com', 'mail2manhunter.com', 'mail2mankind.com', 'mail2many.com', 'mail2marc.com', 'mail2marcia.com', 'mail2margaret.com', 'mail2margie.com', 'mail2marhaba.com', 'mail2maria.com', 'mail2marilyn.com', 'mail2marines.com', 'mail2mark.com', 'mail2marriage.com', 'mail2married.com', 'mail2marries.com', 'mail2mars.com', 'mail2marsha.com', 'mail2marshallislands.com', 'mail2martha.com', 'mail2martin.com', 'mail2marty.com', 'mail2marvin.com', 'mail2mary.com', 'mail2maryland.com', 'mail2mason.com', 'mail2massachusetts.com', 'mail2matt.com', 'mail2matthew.com', 'mail2maurice.com', 'mail2mauritania.com', 'mail2mauritius.com', 'mail2max.com', 'mail2maxwell.com', 'mail2maybe.com', 'mail2mba.com', 'mail2me4u.com', 'mail2mechanic.com', 'mail2medieval.com', 'mail2megan.com', 'mail2mel.com', 'mail2melanie.com', 'mail2melissa.com', 'mail2melody.com', 'mail2member.com', 'mail2memphis.com', 'mail2methodist.com', 'mail2mexican.com', 'mail2mexico.com', 'mail2mgz.com', 'mail2miami.com', 'mail2michael.com', 'mail2michelle.com', 'mail2michigan.com', 'mail2mike.com', 'mail2milan.com', 'mail2milano.com', 'mail2mildred.com', 'mail2milkyway.com', 'mail2millennium.com', 'mail2millionaire.com', 'mail2milton.com', 'mail2mime.com', 'mail2mindreader.com', 'mail2mini.com', 'mail2minister.com', 'mail2minneapolis.com', 'mail2minnesota.com', 'mail2miracle.com', 'mail2missionary.com', 'mail2mississippi.com', 'mail2missouri.com', 'mail2mitch.com', 'mail2model.com', 'mail2moldova.commail2molly.com', 'mail2mom.com', 'mail2monaco.com', 'mail2money.com', 'mail2mongolia.com', 'mail2monica.com', 'mail2montana.com', 'mail2monty.com', 'mail2moon.com', 'mail2morocco.com', 'mail2morpheus.com', 'mail2mors.com', 'mail2moscow.com', 'mail2moslem.com', 'mail2mouseketeer.com', 'mail2movies.com', 'mail2mozambique.com', 'mail2mp3.com', 'mail2mrright.com', 'mail2msright.com', 'mail2museum.com', 'mail2music.com', 'mail2musician.com', 'mail2muslim.com', 'mail2my.com', 'mail2myboat.com', 'mail2mycar.com', 'mail2mycell.com', 'mail2mygsm.com', 'mail2mylaptop.com', 'mail2mymac.com', 'mail2mypager.com', 'mail2mypalm.com', 'mail2mypc.com', 'mail2myphone.com', 'mail2myplane.com', 'mail2namibia.com', 'mail2nancy.com', 'mail2nasdaq.com', 'mail2nathan.com', 'mail2nauru.com', 'mail2navy.com', 'mail2neal.com', 'mail2nebraska.com', 'mail2ned.com', 'mail2neil.com', 'mail2nelson.com', 'mail2nemesis.com', 'mail2nepal.com', 'mail2netherlands.com', 'mail2network.com', 'mail2nevada.com', 'mail2newhampshire.com', 'mail2newjersey.com', 'mail2newmexico.com', 'mail2newyork.com', 'mail2newzealand.com', 'mail2nicaragua.com', 'mail2nick.com', 'mail2nicole.com', 'mail2niger.com', 'mail2nigeria.com', 'mail2nike.com', 'mail2no.com', 'mail2noah.com', 'mail2noel.com', 'mail2noelle.com', 'mail2normal.com', 'mail2norman.com', 'mail2northamerica.com', 'mail2northcarolina.com', 'mail2northdakota.com', 'mail2northpole.com', 'mail2norway.com', 'mail2notus.com', 'mail2noway.com', 'mail2nowhere.com', 'mail2nuclear.com', 'mail2nun.com', 'mail2ny.com', 'mail2oasis.com', 'mail2oceanographer.com', 'mail2ohio.com', 'mail2ok.com', 'mail2oklahoma.com', 'mail2oliver.com', 'mail2oman.com', 'mail2one.com', 'mail2onfire.com', 'mail2online.com', 'mail2oops.com', 'mail2open.com', 'mail2ophthalmologist.com', 'mail2optometrist.com', 'mail2oregon.com', 'mail2oscars.com', 'mail2oslo.com', 'mail2painter.com', 'mail2pakistan.com', 'mail2palau.com', 'mail2pan.com', 'mail2panama.com', 'mail2paraguay.com', 'mail2paralegal.com', 'mail2paris.com', 'mail2park.com', 'mail2parker.com', 'mail2party.com', 'mail2passion.com', 'mail2pat.com', 'mail2patricia.com', 'mail2patrick.com', 'mail2patty.com', 'mail2paul.com', 'mail2paula.com', 'mail2pay.com', 'mail2peace.com', 'mail2pediatrician.com', 'mail2peggy.com', 'mail2pennsylvania.com', 'mail2perry.com', 'mail2persephone.com', 'mail2persian.com', 'mail2peru.com', 'mail2pete.com', 'mail2peter.com', 'mail2pharmacist.com', 'mail2phil.com', 'mail2philippines.com', 'mail2phoenix.com', 'mail2phonecall.com', 'mail2phyllis.com', 'mail2pickup.com', 'mail2pilot.com', 'mail2pisces.com', 'mail2planet.com', 'mail2platinum.com', 'mail2plato.com', 'mail2pluto.com', 'mail2pm.com', 'mail2podiatrist.com', 'mail2poet.com', 'mail2poland.com', 'mail2policeman.com', 'mail2policewoman.com', 'mail2politician.com', 'mail2pop.com', 'mail2pope.com', 'mail2popular.com', 'mail2portugal.com', 'mail2poseidon.com', 'mail2potatohead.com', 'mail2power.com', 'mail2presbyterian.com', 'mail2president.com', 'mail2priest.com', 'mail2prince.com', 'mail2princess.com', 'mail2producer.com', 'mail2professor.com', 'mail2protect.com', 'mail2psychiatrist.com', 'mail2psycho.com', 'mail2psychologist.com', 'mail2qatar.com', 'mail2queen.com', 'mail2rabbi.com', 'mail2race.com', 'mail2racer.com', 'mail2rachel.com', 'mail2rage.com', 'mail2rainmaker.com', 'mail2ralph.com', 'mail2randy.com', 'mail2rap.com', 'mail2rare.com', 'mail2rave.com', 'mail2ray.com', 'mail2raymond.com', 'mail2realtor.com', 'mail2rebecca.com', 'mail2recruiter.com', 'mail2recycle.com', 'mail2redhead.com', 'mail2reed.com', 'mail2reggie.com', 'mail2register.com', 'mail2rent.com', 'mail2republican.com', 'mail2resort.com', 'mail2rex.com', 'mail2rhodeisland.com', 'mail2rich.com', 'mail2richard.com', 'mail2ricky.com', 'mail2ride.com', 'mail2riley.com', 'mail2rita.com', 'mail2rob.com', 'mail2robert.com', 'mail2roberta.com', 'mail2robin.com', 'mail2rock.com', 'mail2rocker.com', 'mail2rod.com', 'mail2rodney.com', 'mail2romania.com', 'mail2rome.com', 'mail2ron.com', 'mail2ronald.com', 'mail2ronnie.com', 'mail2rose.com', 'mail2rosie.com', 'mail2roy.com', 'mail2rudy.com', 'mail2rugby.com', 'mail2runner.com', 'mail2russell.com', 'mail2russia.com', 'mail2russian.com', 'mail2rusty.com', 'mail2ruth.com', 'mail2rwanda.com', 'mail2ryan.com', 'mail2sa.com', 'mail2sabrina.com', 'mail2safe.com', 'mail2sagittarius.com', 'mail2sail.com', 'mail2sailor.com', 'mail2sal.com', 'mail2salaam.com', 'mail2sam.com', 'mail2samantha.com', 'mail2samoa.com', 'mail2samurai.com', 'mail2sandra.com', 'mail2sandy.com', 'mail2sanfrancisco.com', 'mail2sanmarino.com', 'mail2santa.com', 'mail2sara.com', 'mail2sarah.com', 'mail2sat.com', 'mail2saturn.com', 'mail2saudi.com', 'mail2saudiarabia.com', 'mail2save.com', 'mail2savings.com', 'mail2school.com', 'mail2scientist.com', 'mail2scorpio.com', 'mail2scott.com', 'mail2sean.com', 'mail2search.com', 'mail2seattle.com', 'mail2secretagent.com', 'mail2senate.com', 'mail2senegal.com', 'mail2sensual.com', 'mail2seth.com', 'mail2sevenseas.com', 'mail2sexy.com', 'mail2seychelles.com', 'mail2shane.com', 'mail2sharon.com', 'mail2shawn.com', 'mail2ship.com', 'mail2shirley.com', 'mail2shoot.com', 'mail2shuttle.com', 'mail2sierraleone.com', 'mail2simon.com', 'mail2singapore.com', 'mail2single.com', 'mail2site.com', 'mail2skater.com', 'mail2skier.com', 'mail2sky.com', 'mail2sleek.com', 'mail2slim.com', 'mail2slovakia.com', 'mail2slovenia.com', 'mail2smile.com', 'mail2smith.com', 'mail2smooth.com', 'mail2soccer.com', 'mail2soccerfan.com', 'mail2socialist.com', 'mail2soldier.com', 'mail2somalia.com', 'mail2son.com', 'mail2song.com', 'mail2sos.com', 'mail2sound.com', 'mail2southafrica.com', 'mail2southamerica.com', 'mail2southcarolina.com', 'mail2southdakota.com', 'mail2southkorea.com', 'mail2southpole.com', 'mail2spain.com', 'mail2spanish.com', 'mail2spare.com', 'mail2spectrum.com', 'mail2splash.com', 'mail2sponsor.com', 'mail2sports.com', 'mail2srilanka.com', 'mail2stacy.com', 'mail2stan.com', 'mail2stanley.com', 'mail2star.com', 'mail2state.com', 'mail2stephanie.com', 'mail2steve.com', 'mail2steven.com', 'mail2stewart.com', 'mail2stlouis.com', 'mail2stock.com', 'mail2stockholm.com', 'mail2stockmarket.com', 'mail2storage.com', 'mail2store.com', 'mail2strong.com', 'mail2student.com', 'mail2studio.com', 'mail2studio54.com', 'mail2stuntman.com', 'mail2subscribe.com', 'mail2sudan.com', 'mail2superstar.com', 'mail2surfer.com', 'mail2suriname.com', 'mail2susan.com', 'mail2suzie.com', 'mail2swaziland.com', 'mail2sweden.com', 'mail2sweetheart.com', 'mail2swim.com', 'mail2swimmer.com', 'mail2swiss.com', 'mail2switzerland.com', 'mail2sydney.com', 'mail2sylvia.com', 'mail2syria.com', 'mail2taboo.com', 'mail2taiwan.com', 'mail2tajikistan.com', 'mail2tammy.com', 'mail2tango.com', 'mail2tanya.com', 'mail2tanzania.com', 'mail2tara.com', 'mail2taurus.com', 'mail2taxi.com', 'mail2taxidermist.com', 'mail2taylor.com', 'mail2taz.com', 'mail2teacher.com', 'mail2technician.com', 'mail2ted.com', 'mail2telephone.com', 'mail2teletubbie.com', 'mail2tenderness.com', 'mail2tennessee.com', 'mail2tennis.com', 'mail2tennisfan.com', 'mail2terri.com', 'mail2terry.com', 'mail2test.com', 'mail2texas.com', 'mail2thailand.com', 'mail2therapy.com', 'mail2think.com', 'mail2tickets.com', 'mail2tiffany.com', 'mail2tim.com', 'mail2time.com', 'mail2timothy.com', 'mail2tina.com', 'mail2titanic.com', 'mail2toby.com', 'mail2todd.com', 'mail2togo.com', 'mail2tom.com', 'mail2tommy.com', 'mail2tonga.com', 'mail2tony.com', 'mail2touch.com', 'mail2tourist.com', 'mail2tracey.com', 'mail2tracy.com', 'mail2tramp.com', 'mail2travel.com', 'mail2traveler.com', 'mail2travis.com', 'mail2trekkie.com', 'mail2trex.com', 'mail2triallawyer.com', 'mail2trick.com', 'mail2trillionaire.com', 'mail2troy.com', 'mail2truck.com', 'mail2trump.com', 'mail2try.com', 'mail2tunisia.com', 'mail2turbo.com', 'mail2turkey.com', 'mail2turkmenistan.com', 'mail2tv.com', 'mail2tycoon.com', 'mail2tyler.com', 'mail2u4me.com', 'mail2uae.com', 'mail2uganda.com', 'mail2uk.com', 'mail2ukraine.com', 'mail2uncle.com', 'mail2unsubscribe.com', 'mail2uptown.com', 'mail2uruguay.com', 'mail2usa.com', 'mail2utah.com', 'mail2uzbekistan.com', 'mail2v.com', 'mail2vacation.com', 'mail2valentines.com', 'mail2valerie.com', 'mail2valley.com', 'mail2vamoose.com', 'mail2vanessa.com', 'mail2vanuatu.com', 'mail2venezuela.com', 'mail2venous.com', 'mail2venus.com', 'mail2vermont.com', 'mail2vickie.com', 'mail2victor.com', 'mail2victoria.com', 'mail2vienna.com', 'mail2vietnam.com', 'mail2vince.com', 'mail2virginia.com', 'mail2virgo.com', 'mail2visionary.com', 'mail2vodka.com', 'mail2volleyball.com', 'mail2waiter.com', 'mail2wallstreet.com', 'mail2wally.com', 'mail2walter.com', 'mail2warren.com', 'mail2washington.com', 'mail2wave.com', 'mail2way.com', 'mail2waycool.com', 'mail2wayne.com', 'mail2webmaster.com', 'mail2webtop.com', 'mail2webtv.com', 'mail2weird.com', 'mail2wendell.com', 'mail2wendy.com', 'mail2westend.com', 'mail2westvirginia.com', 'mail2whether.com', 'mail2whip.com', 'mail2white.com', 'mail2whitehouse.com', 'mail2whitney.com', 'mail2why.com', 'mail2wilbur.com', 'mail2wild.com', 'mail2willard.com', 'mail2willie.com', 'mail2wine.com', 'mail2winner.com', 'mail2wired.com', 'mail2wisconsin.com', 'mail2woman.com', 'mail2wonder.com', 'mail2world.com', 'mail2worship.com', 'mail2wow.com', 'mail2www.com', 'mail2wyoming.com', 'mail2xfiles.com', 'mail2xox.com', 'mail2yachtclub.com', 'mail2yahalla.com', 'mail2yemen.com', 'mail2yes.com', 'mail2yugoslavia.com', 'mail2zack.com', 'mail2zambia.com', 'mail2zenith.com', 'mail2zephir.com', 'mail2zeus.com', 'mail2zipper.com', 'mail2zoo.com', 'mail2zoologist.com', 'mail2zurich.com', 'mail3000.com', 'mail333.com', 'mailandftp.com', 'mailandnews.com', 'mailas.com', 'mailasia.com', 'mailbolt.com', 'mailbomb.net', 'mailboom.com', 'mailbox.as', 'mailbox.co.za', 'mailbox.gr', 'mailbox.hu', 'mailbr.com.br', 'mailc.net', 'mailcan.com', 'mailcc.com', 'mailchoose.co', 'mailcity.com', 'mailclub.fr', 'mailclub.net', 'mailexcite.com', 'mailforce.net', 'mailftp.com', 'mailgate.gr', 'mailgenie.net', 'mailhaven.com', 'mailhood.com', 'mailingweb.com', 'mailisent.com', 'mailite.com', 'mailme.dk', 'mailmight.com', 'mailmij.nl', 'mailnew.com', 'mailops.com', 'mailoye.com', 'mailpanda.com', 'mailpost.zzn.com', 'mailpride.com', 'mailpuppy.com', 'mailroom.com', 'mailru.com', 'mailsent.net', 'mailshuttle.com', 'mailstart.com', 'mailstartplus.com', 'mailsurf.com', 'mailtag.com', 'mailto.de', 'mailup.net', 'mailwire.com', 'maktoob.com', 'malayalamtelevision.net', 'manager.de', 'mantrafreenet.com', 'mantramail.com', 'mantraonline.com', 'marchmail.com', 'mariah-carey.ml.org', 'mariahc.com', 'marijuana.nl', 'marketing.lu', 'married-not.com', 'marsattack.com', 'martindalemail.com', 'masrawy.com', 'matmail.com', 'mauimail.com', 'mauritius.com', 'maxleft.com', 'maxmail.co.uk', 'mbox.com.au', 'mchsi.com', 'mciworldcom.net', 'me-mail.hu', 'me.com', 'medical.net.au', 'medione.net', 'medmail.com', 'medscape.com', 'meetingmall.com', 'megago.com', 'megamail.pt', 'megapathdsl.net', 'megapoint.com', 'mehrani.com', 'mehtaweb.com', 'mekhong.com', 'melodymail.com', 'meloo.com', 'members.student.com', 'message.hu', 'messages.to', 'metacrawler.com', 'metalfan.com', 'metta.lk', 'miatadriver.com', 'miesto.sk', 'mighty.co.za', 'miho-nakayama.com', 'mikrotamanet.com', 'millionaireintraining.com', 'milmail.com', 'mindless.com', 'mindspring.com', 'mini-mail.com', 'misery.net', 'mittalweb.com', 'mixmail.com', 'mjfrogmail.com', 'ml1.net', 'mobilbatam.com', 'mochamail.com', 'mohammed.com', 'moldova.cc', 'moldova.com', 'moldovacc.com', 'money.net', 'montevideo.com.uy', 'moonman.com', 'moose-mail.com', 'mortaza.com', 'mosaicfx.com', 'most-wanted.com', 'mostlysunny.com', 'motormania.com', 'movemail.com', 'movieluver.com', 'mp4.it', 'mr-potatohead.com', 'mrpost.com', 'mscold.com', 'msgbox.com', 'msn.com', 'mttestdriver.com', 'mundomail.net', 'munich.com', 'music.com', 'musician.org', 'musicscene.org', 'mybox.it', 'mycabin.com', 'mycampus.com', 'mycity.com', 'mycool.com', 'mydomain.com', 'mydotcomaddress.com', 'myfamily.com', 'mygo.com', 'myiris.com', 'mynamedot.com', 'mynetaddress.com', 'myownemail.com', 'myownfriends.com', 'mypad.com', 'mypersonalemail.com', 'myplace.com', 'myrealbox.com', 'myremarq.com', 'myself.com', 'mystupidjob.com', 'mythirdage.com', 'myway.com', 'myworldmail.com', 'n2.com', 'n2business.com', 'n2mail.com', 'n2software.com', 'nabc.biz', 'nafe.com', 'nagpal.net', 'nakedgreens.com', 'name.com', 'nameplanet.com', 'nandomail.com', 'naplesnews.net', 'naseej.com', 'nate.com', 'nativestar.net', 'nativeweb.net', 'naui.net', 'nauticom.net', 'naver.com', 'navigator.lv', 'navy.org', 'naz.com', 'nchoicemail.com', 'neeva.net', 'nemra1.com', 'nenter.com', 'neo.rr.com', 'nervhq.org', 'net-pager.net', 'net4b.pt', 'net4you.at', 'netbounce.com', 'netbroadcaster.com', 'netby.dk', 'netcenter-vn.net', 'netcom.ca', 'netcom.com', 'netcourrier.com', 'netexecutive.com', 'netexpressway.com', 'netgenie.com', 'netian.com', 'netizen.com.ar', 'netlane.com', 'netlimit.com', 'netmanor.com', 'netmongol.com', 'netnet.com.sg', 'netpiper.com', 'netposta.net', 'netradiomail.com', 'netralink.com', 'netscape.com', 'netscape.net', 'netscapeonline.co.uk', 'netsero.net', 'netspeedway.com', 'netsquare.com', 'netster.com', 'nettaxi.com', 'netzero.com', 'netzero.net', 'neuf.fr', 'newmail.com', 'newmail.net', 'newmail.ru', 'newyork.com', 'nexxmail.com', 'nfmail.com', 'nhmail.com', 'nicebush.com', 'nicegal.com', 'nicholastse.net', 'nicolastse.com', 'nightmail.com', 'nikopage.com', 'nimail.com', 'nirvanafan.com', 'noavar.com', 'norika-fujiwara.com', 'norikomail.com', 'northgates.net', 'nospammail.net', 'ntlworld.com', 'ntscan.com', 'ny.com', 'nyc.com', 'nycmail.com', 'nzoomail.com', 'o-tay.com', 'o2.co.uk', 'oaklandas-fan.com', 'oceanfree.net', 'oddpost.com', 'odmail.com', 'office-email.com', 'officedomain.com', 'offroadwarrior.com', 'oi.com.br', 'oicexchange.com', 'okbank.com', 'okhuman.com', 'okmad.com', 'okmagic.com', 'okname.net', 'okuk.com', 'oldies1041.com', 'oldies104mail.com', 'ole.com', 'olemail.com', 'olg.com', 'olympist.net', 'omaninfo.com', 'onebox.com', 'onenet.com.ar', 'onet.pl', 'oninet.pt', 'online.de', 'online.ie', 'onlinewiz.com', 'onmilwaukee.com', 'onobox.com', 'onvillage.com', 'operafan.com', 'operamail.com', 'optician.com', 'optonline.net', 'optusnet.com.au', 'orange.fr', 'orange.net', 'orbitel.bg', 'orgmail.net', 'osite.com.br', 'oso.com', 'otakumail.com', 'our-computer.com', 'our-office.com', 'our.st', 'ourbrisbane.com', 'ournet.md', 'outel.com', 'outgun.com', 'outlook.com', 'outlook.com.br', 'over-the-rainbow.com', 'ownmail.net', 'ozbytes.net.au', 'ozemail.com.au', 'pacbell.net', 'pacific-re.com', 'packersfan.com', 'pagina.de', 'pagons.org', 'pakistanoye.com', 'palestinemail.com', 'parkjiyoon.com', 'parrot.com', 'parsmail.com', 'partlycloudy.com', 'partynight.at', 'parvazi.com', 'passwordmail.com', 'pathfindermail.com', 'patmedia.net', 'pconnections.net', 'pcpostal.com', 'pcsrock.com', 'peachworld.com', 'pediatrician.com', 'pemail.net', 'penpen.com', 'peoplepc.com', 'peopleweb.com', 'perfectmail.com', 'personal.ro', 'personales.com', 'petml.com', 'pettypool.com', 'pezeshkpour.com', 'phayze.com', 'phreaker.net', 'pickupman.com', 'picusnet.com', 'pigpig.net', 'pinoymail.com', 'pipeline.com', 'piracha.net', 'pisem.net', 'planet-mail.com', 'planet.nl', 'planetaccess.com', 'planetall.com', 'planetarymotion.net', 'planetdirect.com', 'planetearthinter.net', 'planetout.com', 'plasa.com', 'playersodds.com', 'playful.com', 'plusmail.com.br', 'pmail.net', 'pobox.com', 'pobox.hu', 'pobox.sk', 'pochta.ru', 'poczta.fm', 'poetic.com', 'polbox.com', 'policeoffice.com', 'pool-sharks.com', 'poond.com', 'popaccount.com', 'popmail.com', 'popsmail.com', 'popstar.com', 'populus.net', 'portableoffice.com', 'portugalmail.com', 'portugalmail.pt', 'portugalnet.com', 'positive-thinking.com', 'post.com', 'post.cz', 'post.sk', 'posta.net', 'posta.ro', 'postaccesslite.com', 'postafree.com', 'postaweb.com', 'poste.it', 'postinbox.com', 'postino.ch', 'postmark.net', 'postmaster.co.uk', 'postpro.net', 'pousa.com', 'powerfan.com', 'praize.com', 'premiumservice.com', 'presidency.com', 'press.co.jp', 'priest.com', 'primposta.com', 'primposta.hu', 'pro.hu', 'probemail.com', 'prodigy.net', 'prodigy.net.mx', 'progetplus.it', 'programmer.net', 'programozo.hu', 'proinbox.com', 'project2k.com', 'prolaunch.com', 'promessage.com', 'prontomail.com', 'protonmail.com', 'psi.net', 'psv-supporter.com', 'ptd.net', 'public.usa.com', 'publicist.com', 'pulp-fiction.com', 'punkass.com', 'qatarmail.com', 'qis.net', 'qprfans.com', 'qq.com', 'qrio.com', 'quackquack.com', 'quakemail.com', 'qudsmail.com', 'quepasa.com', 'quickwebmail.com', 'quiklinks.com', 'quikmail.com', 'qwest.net', 'qwestoffice.net', 'r-o-o-t.com', 'r7.com', 'raakim.com', 'racedriver.com', 'racefanz.com', 'racingfan.com.au', 'racingmail.com', 'radicalz.com', 'ragingbull.com', 'rambler.ru', 'ranmamail.com', 'rastogi.net', 'ratt-n-roll.com', 'rattle-snake.com', 'ravearena.com', 'ravemail.com', 'razormail.com', 'rccgmail.org', 'rcn.com', 'realemail.net', 'reallyfast.biz', 'realradiomail.com', 'recycler.com', 'rediffmail.com', 'rediffmailpro.com', 'rednecks.com', 'redseven.de', 'redsfans.com', 'reggafan.com', 'registerednurses.com', 'repairman.com', 'reply.hu', 'representative.com', 'rescueteam.com', 'resumemail.com', 'rezai.com', 'richmondhill.com', 'rickymail.com', 'rin.ru', 'riopreto.com.br', 'rn.com', 'roadrunner.com', 'roanokemail.com', 'rock.com', 'rocketmail.com', 'rockfan.com', 'rodrun.com', 'rome.com', 'roosh.com', 'rotfl.com', 'roughnet.com', 'rr.com', 'rrohio.com', 'rsub.com', 'rubyridge.com', 'runbox.com', 'rushpost.com', 'ruttolibero.com', 'rvshop.com', 's-mail.com', 'sabreshockey.com', 'sacbeemail.com', 'safarimail.com', 'safe-mail.net', 'sagra.lu', 'sailormoon.com', 'saintly.com', 'saintmail.net', 'sale-sale-sale.com', 'salehi.net', 'samerica.com', 'samilan.net', 'sammimail.com', 'sanfranmail.com', 'sanook.com', 'sapo.pt', 'sativa.ro.org', 'saudia.com', 'sayhi.net', 'sbcglobal.net', 'scandalmail.com', 'schizo.com', 'schoolemail.com', 'schoolmail.com', 'schoolsucks.com', 'schweiz.org', 'sci.fi', 'science.com.au', 'scientist.com', 'scifianime.com', 'scottishmail.co.uk', 'scubadiving.com', 'seanet.com', 'searchwales.com', 'sebil.com', 'secret-police.com', 'secretservices.net', 'seductive.com', 'seekstoyboy.com', 'seguros.com.br', 'send.hu', 'sendme.cz', 'sent.com', 'sentrismail.com', 'serga.com.ar', 'servemymail.com', 'sesmail.com', 'sexmagnet.com', 'seznam.cz', 'sfr.fr', 'shahweb.net', 'shaniastuff.com', 'sharewaredevelopers.com', 'sharmaweb.com', 'shaw.ca', 'she.com', 'shootmail.com', 'shotgun.hu', 'shuf.com', 'sialkotcity.com', 'sialkotian.com', 'sialkotoye.com', 'sify.com', 'silkroad.net', 'sina.cn', 'sina.com', 'sinamail.com', 'singapore.com', 'singmail.com', 'singnet.com.sg', 'singpost.com', 'skafan.com', 'skim.com', 'skizo.hu', 'sky.com', 'skynet.be', 'slamdunkfan.com', 'slingshot.com', 'slo.net', 'slotter.com', 'smapxsmap.net', 'smileyface.comsmithemail.net', 'smoothmail.com', 'snail-mail.net', 'snail-mail.ney', 'snakemail.com', 'sndt.net', 'sneakemail.com', 'snet.net', 'snip.net', 'sniper.hu', 'snoopymail.com', 'snowboarding.com', 'snowdonia.net', 'socamail.com', 'socceramerica.net', 'soccermail.com', 'soccermomz.com', 'sociologist.com', 'softhome.net', 'sol.dk', 'soldier.hu', 'soon.com', 'soulfoodcookbook.com', 'sp.nl', 'space-bank.com', 'space-man.com', 'space-ship.com', 'space-travel.com', 'space.com', 'spaceart.com', 'spacebank.com', 'spacemart.com', 'spacetowns.com', 'spacewar.com', 'spamex.com', 'spartapiet.com', 'spazmail.com', 'speedemail.net', 'speedpost.net', 'speedrules.com', 'speedrulz.com', 'speedy.com.ar', 'spils.com', 'spinfinder.com', 'sportemail.com', 'sportsmail.com', 'sporttruckdriver.com', 'spray.no', 'spray.se', 'sprintmail.com', 'sprynet.com', 'spymac.com', 'srilankan.net', 'st-davids.net', 'stade.fr', 'stalag13.com', 'stargateradio.com', 'starmail.com', 'starmail.org', 'starmedia.com', 'starplace.com', 'starpower.net', 'starspath.com', 'start.com.au', 'starting-point.com', 'startrekmail.com', 'stealthmail.com', 'stockracer.com', 'stones.com', 'stopdropandroll.com', 'storksite.com', 'stribmail.com', 'strompost.com', 'strongguy.com', 'studentcenter.org', 'subnetwork.com', 'subram.com', 'sudanmail.net', 'suhabi.com', 'suisse.org', 'sukhumvit.net', 'sunpoint.net', 'sunrise-sunset.com', 'sunsgame.com', 'sunumail.sn', 'superdada.com', 'supereva.it', 'supermail.ru', 'surat.com', 'surf3.net', 'surfree.com', 'surfy.net', 'surimail.com', 'survivormail.com', 'swbell.net', 'sweb.cz', 'swiftdesk.com', 'swingeasyhithard.com', 'swingfan.com', 'swipermail.zzn.com', 'swirve.com', 'swissinfo.org', 'swissmail.net', 'switchboardmail.com', 'switzerland.org', 'swva.net', 'sx172.com', 'sympatico.ca', 'syom.com', 'syriamail.com', 't-online.de', 't2mail.com', 'takuyakimura.com', 'talk21.com', 'talkcity.com', 'talktalk.co.uk', 'tamil.com', 'tampabay.rr.com', 'tatanova.com', 'tbwt.com', 'tds.net', 'teamdiscovery.com', 'teamtulsa.net', 'tech4peace.org', 'techemail.com', 'techie.com', 'technisamail.co.za', 'technologist.com', 'techpointer.com', 'techscout.com', 'techseek.com', 'techspot.com', 'teenagedirtbag.com', 'telebot.com', 'telebot.net', 'teleline.es', 'telenet.be', 'telerymd.com', 'teleserve.dynip.com', 'teletu.it', 'telinco.net', 'telkom.net', 'telpage.net', 'telus.net', 'temtulsa.net', 'tenchiclub.com', 'tenderkiss.com', 'tennismail.com', 'terra.cl', 'terra.com', 'terra.com.ar', 'terra.com.br', 'terra.es', 'tfanus.com.er', 'tfz.net', 'thai.com', 'thaimail.com', 'thaimail.net', 'the-african.com', 'the-airforce.com', 'the-aliens.com', 'the-american.com', 'the-animal.com', 'the-army.com', 'the-astronaut.com', 'the-beauty.com', 'the-big-apple.com', 'the-biker.com', 'the-boss.com', 'the-brazilian.com', 'the-canadian.com', 'the-canuck.com', 'the-captain.com', 'the-chinese.com', 'the-country.com', 'the-cowboy.com', 'the-davis-home.com', 'the-dutchman.com', 'the-eagles.com', 'the-englishman.com', 'the-fastest.net', 'the-fool.com', 'the-frenchman.com', 'the-galaxy.net', 'the-genius.com', 'the-gentleman.com', 'the-german.com', 'the-gremlin.com', 'the-hooligan.com', 'the-italian.com', 'the-japanese.com', 'the-lair.com', 'the-madman.com', 'the-mailinglist.com', 'the-marine.com', 'the-master.com', 'the-mexican.com', 'the-ministry.com', 'the-monkey.com', 'the-newsletter.net', 'the-pentagon.com', 'the-police.com', 'the-prayer.com', 'the-professional.com', 'the-quickest.com', 'the-russian.com', 'the-snake.com', 'the-spaceman.com', 'the-stock-market.com', 'the-student.net', 'the-whitehouse.net', 'the-wild-west.com', 'the18th.com', 'thecoolguy.com', 'thecriminals.com', 'thedoghousemail.com', 'thedorm.com', 'theend.hu', 'theglobe.com', 'thegolfcourse.com', 'thegooner.com', 'theheadoffice.com', 'thelanddownunder.com', 'themillionare.net', 'theoffice.net', 'thepokerface.com', 'thepostmaster.net', 'theraces.com', 'theracetrack.com', 'thestreetfighter.com', 'theteebox.com', 'thewatercooler.com', 'thewebpros.co.uk', 'thewizzard.com', 'thewizzkid.com', 'thezhangs.net', 'thirdage.com', 'thisgirl.com', 'thoic.com', 'thundermail.com', 'tidni.com', 'timein.net', 'tin.it', 'tiscali.at', 'tiscali.be', 'tiscali.co.uk', 'tiscali.it', 'tiscali.lu', 'tiscali.se', 'tkcity.com', 'toolsource.com', 'topchat.com', 'topgamers.co.uk', 'topletter.com', 'topmail.com.ar', 'topsurf.com', 'topteam.bg', 'torchmail.com', 'tot.net', 'totalmusic.net', 'toughguy.net', 'tpg.com.au', 'travel.li', 'trialbytrivia.com', 'tritium.net', 'trmailbox.com', 'tropicalstorm.com', 'truckers.com', 'truckerz.com', 'truckracer.com', 'trust-me.com', 'tsamail.co.za', 'ttml.co.in', 'tunisiamail.com', 'turkey.com', 'tvcablenet.be', 'twinstarsmail.com', 'tycoonmail.com', 'typemail.com', 'u2club.com', 'uae.ac', 'uaemail.com', 'ubbi.com', 'ubbi.com.br', 'uboot.com', 'uk2k.com', 'uk2net.com', 'uk7.net', 'uk8.net', 'ukbuilder.com', 'ukcool.com', 'ukdreamcast.com', 'ukmail.org', 'ukmax.com', 'ukr.net', 'uku.co.uk', 'ultapulta.com', 'ultrapostman.com', 'ummah.org', 'umpire.com', 'unbounded.com', 'unforgettable.com', 'uni.de', 'unican.es', 'unihome.com', 'universal.pt', 'uno.ee', 'uno.it', 'unofree.it', 'unomail.com', 'uol.com.ar', 'uol.com.br', 'uol.com.co', 'uol.com.mx', 'uol.com.ve', 'uole.com', 'uole.com.ve', 'uolmail.com', 'uomail.com', 'upf.org', 'ureach.com', 'urgentmail.biz', 'usa.com', 'usa.net', 'usaaccess.net', 'usanetmail.com', 'usermail.com', 'usit.net', 'usma.net', 'usmc.net', 'uswestmail.net', 'uu.net', 'uymail.com', 'uyuyuy.com', 'v-sexi.com', 'vahoo.com', 'varbizmail.com', 'vcmail.com', 'velnet.co.uk', 'velocall.com', 'verizon.net', 'verizonmail.com', 'veryfast.biz', 'veryspeedy.net', 'videotron.ca', 'violinmakers.co.uk', 'vip.gr', 'vipmail.ru', 'virgilio.it', 'virgin.net', 'virginmedia.com', 'virtualactive.com', 'virtualmail.com', 'visitmail.com', 'visitweb.com', 'visto.com', 'visualcities.com', 'vivavelocity.com', 'vivianhsu.net', 'vjmail.com', 'vjtimail.com', 'vlmail.com', 'vnn.vn', 'voila.fr', 'volcanomail.com', 'voo.be', 'vote-democrats.com', 'vote-hillary.com', 'vote-republicans.com', 'vote4gop.org', 'votenet.com', 'vr9.com', 'w3.to', 'wahoye.com', 'wales2000.net', 'wam.co.za', 'wanadoo.co.uk', 'wanadoo.es', 'wanadoo.fr', 'warmmail.com', 'warpmail.net', 'warrior.hu', 'waumail.com', 'wbdet.com', 'wearab.net', 'web-mail.com.ar', 'web-police.com', 'web.de', 'webave.com', 'webcammail.com', 'webcity.ca', 'webdream.com', 'webinbox.com', 'webindia123.com', 'webjump.com', 'webmail.bellsouth.net', 'webmail.co.yu', 'webmail.co.za', 'webmail.hu', 'webmails.com', 'webprogramming.com', 'webstable.net', 'webstation.com', 'websurfer.co.za', 'webtopmail.com', 'weedmail.com', 'weekmail.com', 'weekonline.com', 'wehshee.com', 'welsh-lady.com', 'whale-mail.com', 'whartontx.com', 'wheelweb.com', 'whipmail.com', 'whoever.com', 'whoopymail.com', 'wickedmail.com', 'wideopenwest.com', 'wildmail.com', 'windrivers.net', 'windstream.net', 'wingnutz.com', 'winmail.com.au', 'winning.com', 'witty.com', 'wiz.cc', 'wkbwmail.com', 'woh.rr.com', 'wolf-web.com', 'wombles.com', 'wonder-net.com', 'wongfaye.com', 'wooow.it', 'workmail.com', 'worldemail.com', 'worldmailer.com', 'worldnet.att.net', 'wosaddict.com', 'wouldilie.com', 'wow.com', 'wowgirl.com', 'wowmail.com', 'wowway.com', 'wp.pl', 'wptamail.com', 'wrestlingpages.com', 'wrexham.net', 'writeme.com', 'writemeback.com', 'wrongmail.com', 'wtvhmail.com', 'wwdg.com', 'www.com', 'www2000.net', 'wx88.net', 'wxs.net', 'wyrm.supernews.com', 'x-mail.net', 'x-networks.net', 'x5g.com', 'xmastime.com', 'xmsg.com', 'xoom.com', 'xoommail.com', 'xpressmail.zzn.com', 'xsmail.com', 'xuno.com', 'xzapmail.com', 'ya.ru', 'yada-yada.com', 'yaho.com', 'yahoo.ca', 'yahoo.co.id', 'yahoo.co.in', 'yahoo.co.jp', 'yahoo.co.kr', 'yahoo.co.nz', 'yahoo.co.uk', 'yahoo.com', 'yahoo.com.ar', 'yahoo.com.au', 'yahoo.com.br', 'yahoo.com.cn', 'yahoo.com.hk', 'yahoo.com.is', 'yahoo.com.mx', 'yahoo.com.ph', 'yahoo.com.ru', 'yahoo.com.sg', 'yahoo.de', 'yahoo.dk', 'yahoo.es', 'yahoo.fr', 'yahoo.ie', 'yahoo.in', 'yahoo.it', 'yahoo.jp', 'yahoo.ru', 'yahoo.se', 'yahoofs.com', 'yalla.com', 'yalla.com.lb', 'yalook.com', 'yam.com', 'yandex.com', 'yandex.ru', 'yapost.com', 'yawmail.com', 'yclub.com', 'yebox.com', 'yehaa.com', 'yehey.com', 'yemenmail.com', 'yepmail.net', 'yesbox.net', 'ygm.com', 'yifan.net', 'ymail.com', 'ynnmail.com', 'yogotemail.com', 'yopolis.com', 'youareadork.com', 'youpy.com', 'your-house.com', 'yourinbox.com', 'yourlover.net', 'yourname.ddns.org', 'yourname.freeservers.com', 'yournightmare.com', 'yours.com', 'yourssincerely.com', 'yoursubdomain.findhere.com', 'yoursubdomain.zzn.com', 'yourteacher.net', 'yourwap.com', 'youvegotmail.net', 'yuuhuu.net', 'yyhmail.com', 'zahadum.com', 'zcities.com', 'zdnetmail.com', 'zeeks.com', 'zeepost.nl', 'zensearch.net', 'zhaowei.net', 'zionweb.org', 'zip.net', 'zipido.com', 'ziplink.net', 'ziplip.com', 'zipmail.com', 'zipmail.com.br', 'zipmax.com', 'zmail.ru', 'zoho.com', 'zonnet.nl', 'zoominternet.net', 'zubee.com', 'zuvio.com', 'zuzzurello.com', 'zwallet.com', 'zybermail.com', 'zydecofan.com', 'zzn.com', 'zzom.co.uk'];

const doA11yValidation = (v, field, formValidationSent) => {
  const error = doValidateField(field, v);
  if (JSON.stringify(field.validations) !== '{}') {
    if (((v === null || v === void 0 ? void 0 : v.length) >= 1 || formValidationSent) && (error === null || error === void 0 ? void 0 : error.fieldId) === field.id) return 'true';else if ((v === null || v === void 0 ? void 0 : v.length) >= 1) return 'false';else return '';
  }
};
const doValidateField = (field, value) => {
  var _field$validations, _field$validations$re;
  const isRequired = field.validations && field.validations.required;
  const minLength = field.validations && field.validations.minLength;
  const maxLength = field.validations && field.validations.maxLength;
  const hasRegex = field !== null && field !== void 0 && (_field$validations = field.validations) !== null && _field$validations !== void 0 && (_field$validations$re = _field$validations.regex) !== null && _field$validations$re !== void 0 && _field$validations$re.pattern ? true : false;
  const integer = field.dataType === 'integer';
  const decimal = field.dataType === 'decimal';
  const isBusinessEmail = field.id === 'businessEmail';
  if (isRequired && (value === null || value === void 0 ? void 0 : value.length) <= 0) {
    var _isRequired$message, _field$name;
    const errorMessage = (isRequired === null || isRequired === void 0 ? void 0 : (_isRequired$message = isRequired.message) === null || _isRequired$message === void 0 ? void 0 : _isRequired$message['en-GB']) || `${(_field$name = field.name) === null || _field$name === void 0 ? void 0 : _field$name['en-GB']} is required`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }
  if (minLength && minLength.value > value.length) {
    const errorMessage = minLength.message ? minLength.message['en-GB'] : `Minimum characters ${minLength.value}`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }
  if (maxLength && maxLength.value < value.length) {
    const errorMessage = maxLength.message && maxLength.message['en-GB'] ? maxLength.message['en-GB'] : `Maximum characters ${maxLength.value}`;
    return {
      fieldId: field.id,
      groupId: field.groupId,
      message: errorMessage
    };
  }
  /** Check Regex and Business Emails */
  if (hasRegex && value.length >= 1) {
    var _r$message;
    const r = field.validations.regex;
    const msg = (r === null || r === void 0 ? void 0 : (_r$message = r.message) === null || _r$message === void 0 ? void 0 : _r$message['en-GB']) || `${field.name['en-GB']} is invalid`;
    if (isValidRegex(field, value) && isBusinessEmail) {
      if (!isBusinessEmailValid(field, value)) {
        return {
          fieldId: field.id,
          groupId: field.groupId,
          message: 'You must enter a business email address.'
        };
      }
    } else if (!isValidRegex(field, value)) {
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: msg
      };
    }
  }
  if (integer) {
    const isInteger = value % 1 === 0;
    if (!isInteger) {
      const errorMessage = `${value} is not an ${field.dataType}`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }
  if (decimal) {
    const isDecimal = value % 1 !== 0;
    if (!isDecimal) {
      const errorMessage = `${value} is not an ${field.dataType}`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
      };
    }
  }
};
const isValidRegex = (field, value) => {
  var _field$validations2, _field$validations2$r;
  const regexPattern = field === null || field === void 0 ? void 0 : (_field$validations2 = field.validations) === null || _field$validations2 === void 0 ? void 0 : (_field$validations2$r = _field$validations2.regex) === null || _field$validations2$r === void 0 ? void 0 : _field$validations2$r.pattern;
  if (!regexPattern || regexPattern === '') return false;
  try {
    // Create RegExp object from string pattern
    const regexObject = new RegExp(regexPattern.replace(/^\/|\/$/g, ''));
    // Check the value being tested
    const result = regexObject.test(value);
    return result;
  } catch (err) {
    return false;
  }
};
const isBusinessEmailValid = (field, value) => {
  const domain = value.split('@').pop();
  if (!domains.includes(domain)) return true;else return false;
};

const doCreateMessage = (type, minLength, maxLength, currentLength, defaultLanguage) => {
  if (!type) return null;
  switch (type) {
    case 'min':
      {
        if (!minLength) return;
        const minLengthVal = minLength && minLength.value;
        const errorMessage = minLength && minLength.message && minLength.message[defaultLanguage];
        const minText = `Minimum of ${minLengthVal.toString()} characters`;
        if (errorMessage) {
          return errorMessage;
        } else {
          return minText;
        }
      }
    case 'max':
      {
        if (!maxLength) return;
        const maxLengthVal = maxLength && maxLength.value;
        const errorMessage = maxLength && maxLength.message && maxLength.message[defaultLanguage];
        const maxText = `Maximum of ${maxLengthVal.toString()} characters`;
        if (errorMessage) {
          return errorMessage;
        } else {
          return maxText;
        }
      }
    case 'between':
      {
        if (!maxLength || !minLength) return;
        const minLengthVal = minLength && minLength.value;
        const maxLengthVal = maxLength && maxLength.value;
        const errorMessage = minLength && minLength.message && minLength.message[defaultLanguage];
        const rangeText = `Between ${minLengthVal.toString()}-${maxLengthVal.toString()} characters)`;
        if (errorMessage) {
          return errorMessage;
        } else if (currentLength < minLengthVal) {
          return `${(minLengthVal - currentLength).toString()} character${minLengthVal > 1 ? 's' : ''} required ${rangeText}`;
        } else if (currentLength > maxLengthVal) {
          return `${(currentLength - maxLengthVal).toString()} character${currentLength - maxLengthVal > 1 ? 's' : ''} over ${rangeText}`;
        } else if (currentLength) {
          return `${(maxLengthVal - currentLength).toString()} characters remaining ${rangeText}`;
        } else {
          return rangeText;
        }
      }
    default:
      return null;
  }
};
const getFieldType = field => {
  var _field$editor, _field$editor$propert;
  if (!field) return null;
  if (field.id === 'country' && field.dataType === 'string') {
    return 'country';
  }
  if (field.dataType === 'string' && field.editor && field.editor.id === 'multiline') {
    return 'textarea';
  } else if (field.dataType === 'string' && field.editor && field.editor.id === 'list-dropdown') {
    return 'dropdown';
  } else if (field !== null && field !== void 0 && (_field$editor = field.editor) !== null && _field$editor !== void 0 && (_field$editor$propert = _field$editor.properties) !== null && _field$editor$propert !== void 0 && _field$editor$propert.readOnly || (field === null || field === void 0 ? void 0 : field.groupId) === 'private' || (field === null || field === void 0 ? void 0 : field.groupId) === 'settings') {
    return 'hidden';
  } else if (field.dataType === 'stringArray' || field.dataType === 'boolean') {
    return 'checkbox';
  } else if (field.dataType === 'string' && field.validations && field.validations.allowedValues) {
    return 'radio';
  } else if (field.dataType === 'integer') {
    return 'number';
  } else if (field.dataType === 'dateTime') {
    return 'date';
  } else if (field.dataFormat === 'daterange') {
    return 'dateRange';
  } else if (field.dataFormat === 'entry') {
    return 'entryPicker';
  }
  if (field.dataFormat === 'quote') return 'title';else return 'textfield';
};

const sagas = [effects.takeEvery(SUBMIT_FORM_SUCCESS, onFormSuccess), effects.takeEvery(SUBMIT_FORM_FOR_VALIDATION, doValidateForm), effects.takeEvery(SUBMIT_FORM, onSubmitForm), effects.takeEvery(SET_FORM_ID, doFetchForm),
// takeLatest(VALIDATE_FIELD, onValidateField),
effects.takeEvery(PAGE_FORWARD, doTogglePage), effects.takeEvery(PAGE_BACK, doTogglePage), effects.takeEvery(SET_FORM_DATA, getEntryPickerData), effects.takeLatest(SET_FORM_DATA, setDefaultValueFields)];
function* doValidateForm(action) {
  const {
    formId
  } = action;
  yield onValidateAllFields(formId);
  yield effects.put({
    type: SUBMIT_FORM,
    formId
  });
}
// function* onValidateField(action) {
//   const { formId, id, value } = action;
//   if (value?.length >= 1) yield call(onValidateSingleField, formId, id, value);
// }

function* onValidateGroupFields(formId, groupId) {
  const state = yield effects.select();
  const selectFormFieldErrors = makeSelectFormFieldErrors(formId);
  const existingErrors = selectFormFieldErrors(state) || [];
  const existingErrorsFiltered = (existingErrors === null || existingErrors === void 0 ? void 0 : existingErrors.filter(ee => (ee === null || ee === void 0 ? void 0 : ee.groupId) !== groupId)) || [];
  const selectPostData = makeSelectFormPostData(formId);
  const postData = selectPostData(state);
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const groupFields = fields.filter(f => f.groupId == groupId);
  let errors = [...existingErrorsFiltered];
  groupFields.forEach(field => {
    let value = '';
    if (postData[field.id]) value = postData[field.id];
    const error = doValidateField(field, value);
    if (error) errors.push(error);
  });
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: errors
  });
  return errors;
}
function* onValidateAllFields(formId) {
  const state = yield effects.select();
  const selectPostData = makeSelectFormPostData(formId);
  const postData = selectPostData(state);
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const errors = [];
  fields.forEach(field => {
    let value = '';
    if (postData[field.id]) value = postData[field.id];
    const error = doValidateField(field, value);
    if (error) errors.push(error);
  });
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: errors
  });
}

// function* onValidateSingleField(formId, fieldId, value) {
//   const state = yield select();
//   const selectFormFields = makeSelectFormFields(formId);
//   const fields = selectFormFields(state);

//   const selectFormFieldErrors = makeSelectFormFieldErrors(formId)
//   const errors = selectFormFieldErrors(state);

//   const fieldData = fields.find(f => f.id == fieldId);

//   const newErrors = [];
//   // loop through current errors to remove any of the item we currently edit
//   errors.forEach(error => {
//     // push any existing errors to new array
//     if (error.fieldId !== fieldId) newErrors.push(error);
//   });
//   const err = doValidateField(fieldData, value);
//   if (err) newErrors.push(err);
//   yield put({ type: SET_FIELD_ERROR, formId: formId, value: newErrors });
// }

function* doTogglePage(action) {
  const {
    formId,
    pageIndex
  } = action;
  const state = yield effects.select();
  const selectFormGroups = makeSelectFormGroup(formId);
  const formGroups = selectFormGroups(state);
  if (action.type === PAGE_FORWARD) {
    const groupdId = formGroups[pageIndex - 1].id;
    const errors = yield onValidateGroupFields(formId, groupdId);
    const hasErrorsWithinGroup = errors === null || errors === void 0 ? void 0 : errors.filter(e => e.groupId === groupdId).length;
    if (!hasErrorsWithinGroup) {
      yield effects.put({
        type: SET_CURRENT_PAGE,
        formId: formId,
        pageId: formGroups[pageIndex].id,
        pageCount: formGroups.length,
        pageIndex: pageIndex
      });
    }
  } else if (action.type === PAGE_BACK) {
    yield effects.put({
      type: SET_CURRENT_PAGE,
      formId: formId,
      pageId: formGroups[pageIndex].id,
      pageCount: formGroups.length,
      pageIndex: pageIndex
    });
  }
}
function* doFetchForm(action) {
  var _schema$groups;
  const formId = action.formId;
  const schema = yield getFormSchema(formId);
  const groups = schema === null || schema === void 0 ? void 0 : (_schema$groups = schema.groups) === null || _schema$groups === void 0 ? void 0 : _schema$groups.filter(group => group.id !== 'private' && group.id !== 'settings');
  if (formId && schema) {
    var _schema$groups2, _submitButtonText$def;
    if ((schema === null || schema === void 0 ? void 0 : (_schema$groups2 = schema.groups) === null || _schema$groups2 === void 0 ? void 0 : _schema$groups2.length) > 0) {
      yield effects.put({
        type: SET_CURRENT_PAGE,
        formId: formId,
        pageId: groups[0].id,
        pageIndex: 0,
        pageCount: groups.length
      });
    }
    const submitButtonText = schema.fields.find(f => f.id === 'submitButtonText');
    const fields = schema === null || schema === void 0 ? void 0 : schema.fields.map(field => {
      return {
        ...field,
        type: getFieldType(field)
      };
    });
    yield effects.put({
      type: SET_FORM_DATA,
      formId: formId,
      fields,
      groups: groups,
      defaultLanguage: schema.defaultLanguage,
      settings: {
        submitButtonText: submitButtonText === null || submitButtonText === void 0 ? void 0 : (_submitButtonText$def = submitButtonText.default) === null || _submitButtonText$def === void 0 ? void 0 : _submitButtonText$def['en-GB']
      }
    });
  }
}
function* onFormSuccess(action) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields(action.formId);
  const fields = selectFormFields(state);
  const redirect = fields.find(f => f.id === 'formSettingsRedirect');
  const message = fields.find(f => f.id === 'formSettingsMessage');
  if (redirect !== null && redirect !== void 0 && redirect.default) {
    window.location.href = redirect.default['en-GB'];
  }
  if (message !== null && message !== void 0 && message.default) {
    const m = message.default['en-GB'];
    if (m) {
      yield effects.put({
        type: SET_SUCCESS_MESSAGE,
        message: m,
        formId: action.formId
      });
    }
  }
}
function* onSubmitForm(action) {
  const {
    formId
  } = action || {};
  const state = yield effects.select();
  const selectFormFieldErrors = makeSelectFormFieldErrors(formId);
  const errors = selectFormFieldErrors(state);
  const canSubmit = (errors === null || errors === void 0 ? void 0 : errors.length) === 0;
  if (canSubmit) {
    var _formResObj$sys;
    yield effects.put({
      type: SET_SUBMITTING_FORM,
      isSubmitting: true,
      formId: action.formId
    });
    const forms = yield effects.select(selectForms);
    const rawData = forms[action.formId];
    const formObj = {
      contentType: action.formId,
      formPost: rawData.data
    };
    const formResObj = yield postForm(formObj);
    if (formResObj !== null && formResObj !== void 0 && (_formResObj$sys = formResObj.sys) !== null && _formResObj$sys !== void 0 && _formResObj$sys.id) {
      yield effects.put({
        type: SUBMIT_FORM_SUCCESS,
        formId: action.formId
      });
    } else {
      yield effects.put({
        type: SUBMIT_FORM_ERROR,
        formId: action.formId
      });
    }
  }
}
function* setDefaultValueFields(action) {
  const {
    formId,
    fields,
    defaultLanguage
  } = action;
  const entryId = yield effects.select(routing.selectors.selectRouteEntryEntryId);
  let fieldObj = {};
  fields.forEach(field => {
    if (field.dataType == 'string' && field.default) {
      const val = field.default[defaultLanguage];
      if (val) {
        fieldObj[field.id] = val;
      }
    }
    if (field.id == 'sourceEntry') {
      const val = entryId;
      if (val) {
        fieldObj[field.id] = val;
      }
    }
  });
  yield effects.put({
    type: SET_DEFAULT_FIELD_VALUE,
    formId: formId,
    value: fieldObj
  });
}
function* getEntryPickerData(action) {
  const {
    formId,
    fields
  } = action;
  const entriesToGet = fields.filter(f => f.dataFormat == 'entry');
  let entriesList = [];
  if (entriesToGet) {
    entriesList = yield effects.all(entriesToGet.map(entry => {
      const entriesObj = {
        contentType: entry.validations.allowedContentTypes.contentTypes,
        versionStatus: 'published',
        language: 'en-GB',
        pageSize: '10'
      };
      return effects.call(getEntries, entriesObj, entry.id);
    }));
    yield effects.put({
      type: SET_FORM_ENTRIES,
      formId: formId,
      entries: entriesList
    });
  }
}

const action = (type, payload = {}) => ({
  type,
  ...payload
});
const onSubmit = formId => action(SUBMIT_FORM_FOR_VALIDATION, {
  formId
});
const setFormId = formId => action(SET_FORM_ID, {
  formId
});
const setValue = (formId, id, value) => action(SET_FIELD_VALUE, {
  formId,
  id,
  value
});
const setSingleCheckboxValue = (formId, id, value) => action(SET_SINGLE_CHECKBOX_VALUE, {
  formId,
  id,
  value
});
const setMultipleCheckboxValue = (formId, id, label, value) => action(SET_MULTIPLE_CHECKBOX_VALUE, {
  formId,
  id,
  label,
  value
});
const setDateRangeValues = (formId, id, dateType, value) => action(SET_DATE_RANGE_VALUES, {
  formId,
  id,
  dateType,
  value
});
const onValidateField = (formId, id, value) => action(VALIDATE_FIELD, {
  formId,
  id,
  value
});
const doTogglePageForward = (formId, pageIndex) => action(PAGE_FORWARD, {
  formId,
  pageIndex
});
const doTogglePageBack = (formId, pageIndex) => action(PAGE_BACK, {
  formId,
  pageIndex
});
const actions = {
  onSubmit,
  setFormId,
  setValue,
  setSingleCheckboxValue,
  setMultipleCheckboxValue,
  onValidateField,
  doTogglePageForward,
  doTogglePageBack
};

const ThemeContext = /*#__PURE__*/React.createContext();
const ThemeProvider = ({
  children,
  theme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ThemeContext.Provider, {
    value: ""
  }, /*#__PURE__*/React__default["default"].createElement(styled.ThemeProvider, {
    theme: theme
  }, children));
};
ThemeProvider.propTypes = {
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]),
  theme: PropTypes__default["default"].object
};

const colors = {
  white: '#fff',
  black: '#000',
  dark_grey_lighter: '#757575',
  dark_grey_lightest: '#595959',
  dark_grey_light: '#444',
  dark_grey_dark: '#333',
  dark_grey_darker: '#262626',
  dark_grey_darkest: '#1F1F1F',
  light_grey_lightest: '#FAFAFA',
  light_grey_lighter: '#FDFDFD',
  light_grey_light: '#F0F0F0',
  light_grey_dark: '#DBDBDB',
  light_grey_darker: '#CCCCCC',
  light_grey_darkest: '#949494',
  green_lightest: '#D5FCE9',
  green_lighter: '#A3F2CD',
  green_light: '#74D8A8',
  green_dark: '#0FCE72',
  green_darker: '#008A48',
  green_darkest: '#008545',
  red_lightest: '#F9D7D7',
  red_lighter: '#F4B5B5',
  red_light: '#F67979',
  red_dark: '#d42d2d',
  red_darker: '#ca2121',
  red_darkest: '#B71A1A'
};

const defaultTheme = {
  colors
};

const FormStyled = styled__default["default"].form.withConfig({
  displayName: "formstyled__FormStyled",
  componentId: "sc-1t4n03w-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["> div:not(:first-child){margin-top:16px;}padding:0 16px;.success-message{font-size:18px;margin:0;}.visuallyHidden{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}.loading{display:block;margin:24px auto;}label{display:inline-block;.isRequired{color:", ";}}input,textarea,select{display:block;font-family:inherit;background-color:", ";border-radius:3px;border:1px solid ", ";height:40px;padding:8px;margin-top:4px;width:100%;}input:-webkit-autofill,input:-webkit-autofill:hover,input:-webkit-autofill:focus,input:-webkit-autofill:active{-webkit-box-shadow:0 0 0 30px ", " inset;}textarea{height:200px;resize:none;}[aria-invalid='false']{background:", ";border:1px solid ", ";&:-webkit-autofill,&:-webkit-autofill:hover,&:-webkit-autofill:focus,&:-webkit-autofill:active{-webkit-box-shadow:0 0 0 30px", " inset;}}[aria-invalid='true']{background:", ";border:1px solid ", ";&:-webkit-autofill,&:-webkit-autofill:hover,&:-webkit-autofill:focus,&:-webkit-autofill:active{-webkit-box-shadow:0 0 0 30px", " inset;}}input ~ .svg{position:absolute;right:8px;top:50%;transform:translateY(-50%);}textarea ~ .svg{position:absolute;right:8px;top:8px;}button:not(:last-of-type){margin-right:16px;}"], theme.colors.red_darker, theme.colors.white, theme.colors.light_grey_darkest, theme.colors.white, theme.colors.green_lightest, theme.colors.green_darker, theme.colors.green_lightest, theme.colors.red_lightest, theme.colors.red_darker, theme.colors.red_lightest));
});

const Label = ({
  className,
  label,
  id,
  isRequired,
  isHidden
}) => {
  return /*#__PURE__*/React__default["default"].createElement("label", {
    className: `${className} ${isHidden ? 'visuallyHidden' : ''}`,
    htmlFor: id
  }, label, isRequired ? /*#__PURE__*/React__default["default"].createElement("span", {
    className: "label__required"
  }, "(required)") : /*#__PURE__*/React__default["default"].createElement("span", {
    className: "label__optional"
  }, "(optional)"));
};
Label.propTypes = {
  className: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  isRequired: PropTypes__default["default"].bool,
  isHidden: PropTypes__default["default"].bool
};

const CharacterLimitStyled = styled__default["default"].div.withConfig({
  displayName: "characterLimit__CharacterLimitStyled",
  componentId: "sc-4gr2nf-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["display:block;", ""], useDefaultTheme && styled.css(["font-size:14px;color:", ";font-weight:400;line-height:24px;text-align:right;max-width:320px;width:100%;"], theme.colors.neutrals.empress_gray));
});
const CharacterLimit = ({
  className,
  value,
  validations,
  defaultLanguage,
  useDefaultTheme
}) => {
  if (!validations) return null;
  let valueAsString = typeof value === 'number' ? value.toString() : value;
  const currentLength = valueAsString && valueAsString.length ? valueAsString.length : 0;
  const {
    minLength,
    maxLength
  } = validations;
  const hasMaxLength = maxLength && !minLength;
  const hasMinLength = minLength && !maxLength;
  const hasInBetween = minLength && maxLength;
  const type = hasMinLength ? 'min' : hasMaxLength ? 'max' : hasInBetween ? 'between' : null;
  if (!type) return null;
  return /*#__PURE__*/React__default["default"].createElement(CharacterLimitStyled, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, doCreateMessage(type, minLength, maxLength, currentLength, defaultLanguage));
};
CharacterLimit.propTypes = {
  validations: PropTypes__default["default"].object,
  value: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  className: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

const TextfieldStyled = styled__default["default"].div.withConfig({
  displayName: "textfield__TextfieldStyled",
  componentId: "sc-whkw86-0"
})(["", ";"], ({
  isHidden
}) => {
  return styled.css(["display:", ";"], isHidden ? 'none' : 'block');
});
const Textfield = ({
  className,
  field,
  formId,
  id,
  label,
  type,
  setValue,
  onValidateField,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  isHidden,
  useDefaultTheme
}) => {
  const [hasCharLimit, setCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue && defaultValue[defaultLanguage] ? defaultValue[defaultLanguage] : defaultValue;
  const [a11yInvalid, setA11yInvalid] = React.useState('');
  const [_, setTextfieldValue] = React.useState(defaultValueText || '');
  const selectFormValidationSent = makeSelectFormValidationSent(formId);
  const formValidationSent = reactRedux.useSelector(selectFormValidationSent);
  React.useEffect(() => {
    if (formValidationSent) setA11yInvalid(doA11yValidation(_, field, true));
  }, [formValidationSent]);
  return /*#__PURE__*/React__default["default"].createElement(TextfieldStyled, {
    className: className,
    isHidden: isHidden
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "text-field__label"
  }), hasCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "text-field__input--wrapper",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    className: "text-field__input",
    type: type,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    "aria-invalid": a11yInvalid,
    id: id,
    name: id,
    onChange: e => {
      setTextfieldValue(e.target.value);
      setValue(formId, id, e.target.value);
    },
    onBlur: e => {
      onValidateField(formId, id, e.target.value);
      setCharLimit(false);
      setA11yInvalid(doA11yValidation(e.target.value, field, formValidationSent));
    },
    onFocus: () => {
      setCharLimit(true);
    }
  }), a11yInvalid == 'true' && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    "aria-hidden": "true",
    role: "presentation",
    width: "16",
    height: "16",
    fill: "none"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    fill: "#333",
    d: "M12.2 3.807a.664.664 0 0 0-.94 0L8 7.06 4.74 3.8a.665.665 0 0 0-.94.94L7.06 8 3.8 11.26a.664.664 0 1 0 .94.94L8 8.94l3.26 3.26a.665.665 0 0 0 .94-.94L8.94 8l3.26-3.26a.668.668 0 0 0 0-.933Z"
  })), a11yInvalid == 'false' && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    "aria-hidden": "true",
    role: "presentation",
    width: "16",
    height: "16",
    fill: "none"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    fill: "#333",
    d: "m2 8 4.418 4.667L14 4.659l-1.246-1.326-6.336 6.692-3.18-3.332L2 8Z"
  }))));
};
Textfield.propTypes = {
  className: PropTypes__default["default"].string,
  field: PropTypes__default["default"].any,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  onValidateField: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  isHidden: PropTypes__default["default"].bool,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool
};

const Textarea = ({
  className,
  field,
  formId,
  id,
  label,
  type,
  setValue,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  onValidateField,
  useDefaultTheme
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue ? defaultValue[defaultLanguage] : null;
  const [a11yInvalid, setA11yInvalid] = React.useState('');
  const [_, setTextareaValue] = React.useState(defaultValueText || '');
  const selectFormValidationSent = makeSelectFormValidationSent(formId);
  const formValidationSent = reactRedux.useSelector(selectFormValidationSent);
  React.useEffect(() => {
    if (formValidationSent) setA11yInvalid(doA11yValidation(_, field, true));
  }, [formValidationSent]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: className
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "text-area__label"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "text-area__input--wrapper",
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React__default["default"].createElement("textarea", {
    className: "text-area__input",
    type: type,
    id: id,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    "aria-invalid": a11yInvalid,
    onChange: e => {
      setTextareaValue(e.target.value);
      setValue(formId, id, e.target.value);
    },
    onBlur: e => {
      onValidateField(formId, id, e.target.value);
      setShowCharLimit(false);
      setA11yInvalid(doA11yValidation(e.target.value, field, formValidationSent));
    },
    onFocus: () => {
      setShowCharLimit(true);
    }
  }), a11yInvalid == 'true' && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    "aria-hidden": "true",
    role: "presentation",
    width: "16",
    height: "16",
    fill: "none"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    fill: "#333",
    d: "M12.2 3.807a.664.664 0 0 0-.94 0L8 7.06 4.74 3.8a.665.665 0 0 0-.94.94L7.06 8 3.8 11.26a.664.664 0 1 0 .94.94L8 8.94l3.26 3.26a.665.665 0 0 0 .94-.94L8.94 8l3.26-3.26a.668.668 0 0 0 0-.933Z"
  })), a11yInvalid == 'false' && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    "aria-hidden": "true",
    role: "presentation",
    width: "16",
    height: "16",
    fill: "none"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    fill: "#333",
    d: "m2 8 4.418 4.667L14 4.659l-1.246-1.326-6.336 6.692-3.18-3.332L2 8Z"
  }))));
};
Textarea.propTypes = {
  className: PropTypes__default["default"].string,
  field: PropTypes__default["default"].any,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  onValidateField: PropTypes__default["default"].func,
  useDefaultTheme: PropTypes__default["default"].bool,
  errors: PropTypes__default["default"].array
};

const HiddenField = ({
  className,
  id,
  label,
  type,
  defaultValue,
  defaultLanguage,
  placeholder
}) => {
  return /*#__PURE__*/React__default["default"].createElement(Textfield, {
    type: type,
    label: label,
    id: id,
    defaultValue: defaultValue,
    defaultLanguage: defaultLanguage,
    placeholder: placeholder,
    className: className,
    isHidden: true
  });
};
HiddenField.propTypes = {
  className: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object
};

const Dropdown = ({
  className,
  formId,
  id,
  validations,
  defaultValue,
  defaultLanguage,
  label,
  setValue
}) => {
  if (!validations) return null;
  const isRequired = validations && validations.required ? true : false;
  const ddValues = validations && validations.allowedValues && validations.allowedValues.values;
  if (!ddValues || ddValues.length < 1) return null;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "dropdown-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-dropdown"
  }), /*#__PURE__*/React__default["default"].createElement("select", {
    name: id,
    id: id,
    className: `${className ? className : ''} select-dropdown`,
    defaultValue: defaultValue,
    onBlur: e => {
      setValue(formId, id, e.target.value);
    }
  }, ddValues.map((val, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("option", {
      key: `${val[defaultLanguage]}-${idx}`,
      value: val[defaultLanguage],
      className: "option-dropdown"
    }, val[defaultLanguage]);
  })));
};
Dropdown.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  id: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string
};

const CheckboxStyled = styled__default["default"].div.withConfig({
  displayName: "checkbox__CheckboxStyled",
  componentId: "sc-gm2o0r-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});
const Checkbox = ({
  className,
  formId,
  id,
  type,
  label,
  validations,
  defaultValue,
  name,
  defaultLanguage,
  useDefaultTheme
}) => {
  // NF change rules of hooks
  let isDefaultChecked = defaultValue && defaultValue[defaultLanguage];
  const [isChecked, setIsChecked] = React.useState(isDefaultChecked || '');
  const dispatch = reactRedux.useDispatch();
  switch (type) {
    case 'multiple':
      {
        if (!validations) return null;
        const isRequired = validations && validations.required ? true : false;
        const cbValues = validations && validations.allowedValues && validations.allowedValues.values;
        const _handleChange = (label, value) => {
          dispatch(setMultipleCheckboxValue(formId, id, label, value));
        };
        if (!cbValues || cbValues.length < 1) return null;
        return /*#__PURE__*/React__default["default"].createElement(CheckboxStyled, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React__default["default"].createElement(Label, {
          id: id,
          label: label,
          isRequired: isRequired,
          className: "label-checkbox-container"
        }), cbValues.map((val, idx) => {
          return /*#__PURE__*/React__default["default"].createElement("span", {
            key: idx,
            className: "checkbox-wrapper"
          }, /*#__PURE__*/React__default["default"].createElement("input", {
            type: "checkbox",
            id: `checkbox-${idx}`,
            name: `checkbox-${idx}`,
            value: val[defaultLanguage],
            className: `${className ? className : ''} input-checkbox`,
            onChange: e => _handleChange(e.target.value, e.target.checked)
          }), /*#__PURE__*/React__default["default"].createElement("label", {
            className: "label-checkbox",
            id: `checkbox-${idx}`,
            htmlFor: `checkbox-${idx}`
          }, val[defaultLanguage]));
        }));
      }
    case 'single':
      {
        const _handleChange = value => {
          setIsChecked(value);
          dispatch(setSingleCheckboxValue(formId, id, value));
        };
        return /*#__PURE__*/React__default["default"].createElement(CheckboxStyled, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React__default["default"].createElement("span", {
          className: "checkbox-wrapper"
        }, /*#__PURE__*/React__default["default"].createElement("input", {
          type: "checkbox",
          id: id,
          name: `checkbox-${id}`,
          value: name[defaultLanguage],
          checked: isChecked,
          className: `${className ? className : ''} input-checkbox`,
          onChange: e => _handleChange(e.target.checked)
        }), /*#__PURE__*/React__default["default"].createElement(Label, {
          id: id,
          label: label,
          className: "label-checkbox"
        })));
      }
  }
};
Checkbox.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  name: PropTypes__default["default"].object,
  default: PropTypes__default["default"].object
};

const RadioButtonStyled = styled__default["default"].div.withConfig({
  displayName: "radioButton__RadioButtonStyled",
  componentId: "sc-3mey0f-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".radio-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});
const RadioButton = ({
  className,
  formId,
  setValue,
  id,
  type,
  label,
  validations,
  defaultLanguage,
  useDefaultTheme
}) => {
  if (!validations) return null;
  const isRequired = validations && validations.required ? true : false;
  const cbValues = validations && validations.allowedValues && validations.allowedValues.values;
  if (!cbValues || cbValues.length < 1) return null;
  return /*#__PURE__*/React__default["default"].createElement(RadioButtonStyled, {
    className: "radio-container",
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-radio-container"
  }), cbValues.map((val, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("span", {
      key: idx,
      className: "radio-wrapper"
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: type,
      id: val[defaultLanguage],
      name: id,
      value: val[defaultLanguage],
      className: `${className ? className : ''} input-radio`,
      onChange: e => {
        setValue(formId, id, e.target.value);
      }
    }), /*#__PURE__*/React__default["default"].createElement("label", {
      className: "label-radio",
      id: val[defaultLanguage],
      htmlFor: val[defaultLanguage]
    }, val[defaultLanguage]));
  }));
};
RadioButton.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  id: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

//example date string: 2019-01-02T13:05:00 (expects ISO 8601 Datetime format yyyy-mm-ddThh:mm:ss [this is the format returned from Contensis delivery api])
//yyyy > year long, eg. 2019
//yy > year short, eg. 19
//MMMM > month long, eg. January
//MMM > month short, eg. Jan
//MM > month with leading 0, eg. 01
//M > month, eg. 1
//dddd > day long, eg. Monday
//ddd > day short, eg. Mon
//dd > date with leading 0, eg. 02
//d > date, eg. 2
//HH > 24 hour clock hour parameter with leading 0, eg. ...T03:05:00 = 03
//H > 24 hour clock hour parameter, eg. ...T03:05:00 = 3
//hh > 12 hour clock hour parameter with leading 0, eg. ...T16:05:00 = 04
//h > 12 hour clock hour parameter, eg. ...T16:05:00 = 4
//mm > minutes with leading 0, eg. ...T16:05:00 = 05
//m > minutes, eg ...T16:05:00 = 5
//t > abbreviated AM / PM, e.g. A or P
//tt > AM / PM, e.g. AM or PM

const formatDate = (date, format = 'dd MMMM yyyy') => {
  if (!date) return null;
  const dateObj = new Date(date);
  const dateString = date.toString().split('T');
  const dateArr = dateString[0].split('-');
  const year = dateArr[0];
  const month = dateArr[1];
  const day = dateArr[2];
  const dayNameInt = dateObj.getDay();
  const timeArr = dateString[1].split(':');
  const hour = timeArr[0];
  const minute = timeArr[1];

  //convert to abstract strings to avoid character replacement along the chain, eg. Monday would match 'M' month single parameter
  const YEAR = ['&&', '&'];
  const MONTH = ['££££', '£££', '££', '£'];
  const DAY = ['%%%%', '%%%', '%%', '%'];
  const HOUR24 = ['!!', '!'];
  const HOUR12 = ['^^', '^'];
  const MINUTE = ['**', '*'];
  const TF = ['??', '?'];
  let formattedDate = format.replace('yyyy', YEAR[0]).replace('yy', YEAR[1]).replace('y', '') //'y' && 'yyy' not valid
  .replace('MMMM', MONTH[0]).replace('MMM', MONTH[1]).replace('MM', MONTH[2]).replace('M', MONTH[3]).replace('dddd', DAY[0]).replace('ddd', DAY[1]).replace('dd', DAY[2]).replace('d', DAY[3]).replace('HH', HOUR24[0]).replace('H', HOUR24[1]).replace('hh', HOUR12[0]).replace('h', HOUR12[1]).replace('mm', MINUTE[0]).replace('m', MINUTE[1]).replace('tt', TF[0]).replace('t', TF[1]).replace(YEAR[0], year).replace(YEAR[1], year.slice(-2)).replace(MONTH[0], monthsLong[parseInt(month, 10)]).replace(MONTH[1], monthsShort[parseInt(month, 10)]).replace(MONTH[2], month).replace(MONTH[3], parseInt(month, 10)).replace(DAY[0], daysLong[dayNameInt]).replace(DAY[1], daysShort[dayNameInt]).replace(DAY[2], day).replace(DAY[3], parseInt(day, 10)).replace(HOUR24[0], hour).replace(HOUR24[1], parseInt(hour, 10)).replace(HOUR12[0], parseHour(hour)).replace(HOUR12[1], parseInt(parseHour(hour), 10)).replace(MINUTE[0], minute).replace(MINUTE[1], parseInt(minute, 10)).replace(TF[0], parseTF(hour)).replace(TF[1], parseTF(hour).slice(0, -1));
  return formattedDate;
};
const monthsShort = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthsLong = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const daysLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const parseHour = hour => {
  return hour > 12 ? hour - 12 : hour;
};
const parseTF = hour => {
  return hour > 11 ? 'PM' : 'AM';
};

const SingleDate = ({
  className,
  type,
  id,
  label,
  validations,
  setValue,
  formId
}) => {
  const isRequired = validations && validations.required ? true : false;
  const onlyPassedDates = validations && validations.pastDateTime;
  const d = new Date();
  const todaysDate = d.toISOString();
  const _handleChange = (formId, id, value) => {
    const d = new Date(value);
    const isoDate = d.toISOString();
    setValue(formId, id, isoDate);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "date-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-date"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: type,
    id: id,
    name: id,
    className: `${className ? className : ''} input-date`,
    max: onlyPassedDates ? formatDate(todaysDate, 'yyyy-MM-dd') : '',
    onChange: e => _handleChange(formId, id, e.target.value)
  }));
};
SingleDate.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  type: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object
};

const DateRangeStyled = styled__default["default"].div.withConfig({
  displayName: "dateRange__DateRangeStyled",
  componentId: "sc-1so0ar2-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".daterange-wrapper{display:flex;flex-direction:column;input{&:first-child{margin:0 0 8px 0;}}}"]));
});
const DateRange = ({
  className,
  id,
  label,
  validations,
  setDateRangeValues,
  formId,
  useDefaultTheme
}) => {
  const isRequired = validations && validations.required ? true : false;
  const onlyPassedDates = validations && validations.pastDateTime;
  const d = new Date();
  const todaysDate = d.toISOString();
  const [toDate, setToDate] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');
  const _handleDateChange = (dateType, formId, id, value) => {
    _updateDateProps(dateType, value);
    const d = new Date(value);
    const isoDate = d.toISOString();
    setDateRangeValues(formId, id, dateType, isoDate);
  };
  const _updateDateProps = (type, date) => {
    switch (type) {
      case 'from':
        {
          const d = new Date(date);
          const newDate = d.toISOString();
          setFromDate(newDate);
          break;
        }
      case 'to':
        {
          const d = new Date(date);
          const newDate = d.toISOString();
          setToDate(newDate);
          break;
        }
      default:
        return;
    }
  };
  return /*#__PURE__*/React__default["default"].createElement(DateRangeStyled, {
    className: `daterange-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired
  }), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "daterange-wrapper"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: "date-from",
    label: "Date from",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: "date",
    id: "date-from",
    name: id,
    max: onlyPassedDates && !toDate ? formatDate(todaysDate, 'yyyy-MM-dd') : onlyPassedDates && toDate ? formatDate(toDate, 'yyyy-MM-dd') : toDate ? formatDate(toDate, 'yyyy-MM-dd') : '',
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('from', formId, id, e.target.value)
  }), /*#__PURE__*/React__default["default"].createElement(Label, {
    id: "date-to",
    label: "Date to",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    type: "date",
    id: "date-to",
    name: id,
    max: onlyPassedDates ? formatDate(todaysDate, 'yyyy-MM-dd') : '',
    min: formatDate(fromDate, 'yyyy-MM-dd'),
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('to', formId, id, e.target.value)
  })));
};
DateRange.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  setDateRangeValues: PropTypes__default["default"].func,
  type: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  useDefaultTheme: PropTypes__default["default"].bool
};

const EntryPickerStyled = styled__default["default"].div.withConfig({
  displayName: "entryPicker__EntryPickerStyled",
  componentId: "sc-9vev5n-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".radio-wrapper,.checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});
const EntryPicker = ({
  className,
  results,
  id,
  label,
  validations,
  type,
  useDefaultTheme,
  setValue,
  formId
}) => {
  if (!results || results.length > 3) return null;
  const isRequired = validations && validations.required ? true : false;
  let valArr = [];
  const _handleChange = (formId, id, value, isChecked) => {
    if (type === 'checkbox') {
      if (isChecked) {
        valArr.push(value);
      } else if (!isChecked) {
        valArr = valArr.filter(valItem => valItem !== value);
      }
      setValue(formId, id, valArr);
    } else {
      setValue(formId, id, value);
    }
  };
  return /*#__PURE__*/React__default["default"].createElement(EntryPickerStyled, {
    className: `${type}-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: `label-${type}-container`
  }), results.map((res, idx) => {
    return /*#__PURE__*/React__default["default"].createElement("span", {
      key: idx,
      className: `${type}-wrapper`
    }, /*#__PURE__*/React__default["default"].createElement("input", {
      type: type,
      id: res.entryTitle,
      value: res.entryTitle,
      name: id,
      className: `${className ? className : ''} input-${type}`,
      onChange: e => _handleChange(formId, id, e.target.value, e.target.checked)
    }), /*#__PURE__*/React__default["default"].createElement(Label, {
      id: res.entryTitle,
      label: res.entryTitle,
      className: `label-${type}`
    }));
  }));
};
EntryPicker.propTypes = {
  className: PropTypes__default["default"].string,
  results: PropTypes__default["default"].array,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  validations: PropTypes__default["default"].object,
  type: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool,
  setValue: PropTypes__default["default"].func,
  formId: PropTypes__default["default"].string
};

var dist = {exports: {}};

(function (module, exports) {
!function (t, e) {
  module.exports = e() ;
}("undefined" != typeof self ? self : _commonjsHelpers.commonjsGlobal, function () {
  return function (t) {
    var e = {};
    function n(r) {
      if (e[r]) return e[r].exports;
      var i = e[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }
    return n.m = t, n.c = e, n.d = function (t, e, r) {
      n.o(t, e) || Object.defineProperty(t, e, {
        configurable: !1,
        enumerable: !0,
        get: r
      });
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 2);
  }([function (t, e) {
    var n;
    n = function () {
      return this;
    }();
    try {
      n = n || Function("return this")() || (0, eval)("this");
    } catch (t) {
      "object" == typeof window && (n = window);
    }
    t.exports = n;
  }, function (t, e, n) {

    t.exports = u;
    var r = n(3),
      i = n(4),
      o = Array.prototype;
    function u(t) {
      if (!(this instanceof u)) return new u(t);
      var e,
        n = i(t.className).split(/\s+/);
      for (this._elem = t, this.length = 0, e = 0; e < n.length; e += 1) n[e] && o.push.call(this, n[e]);
    }
    u.prototype.add = function () {
      var t, e;
      for (e = 0; e < arguments.length; e += 1) t = "" + arguments[e], r(this, t) >= 0 || o.push.call(this, t);
      return this._elem.className = this.toString(), this;
    }, u.prototype.remove = function () {
      var t, e, n;
      for (n = 0; n < arguments.length; n += 1) e = "" + arguments[n], (t = r(this, e)) < 0 || o.splice.call(this, t, 1);
      return this._elem.className = this.toString(), this;
    }, u.prototype.contains = function (t) {
      return r(this, t += "") >= 0;
    }, u.prototype.toggle = function (t, e) {
      return t += "", !0 === e ? this.add(t) : !1 === e ? this.remove(t) : this[this.contains(t) ? "remove" : "add"](t);
    }, u.prototype.toString = function () {
      return o.join.call(this, " ");
    };
  }, function (t, e, n) {

    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
        return typeof t;
      } : function (t) {
        return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
      },
      i = function () {
        function t(t, e) {
          for (var n = 0; n < e.length; n++) {
            var r = e[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r);
          }
        }
        return function (e, n, r) {
          return n && t(e.prototype, n), r && t(e, r), e;
        };
      }(),
      o = E(n(1)),
      u = E(n(5)),
      s = E(n(6)),
      a = E(n(7)),
      c = E(n(8)),
      f = E(n(9)),
      l = E(n(10)),
      h = E(n(12)),
      p = E(n(14)),
      d = E(n(15)),
      g = E(n(17)),
      y = E(n(18)),
      v = E(n(19)),
      m = E(n(31)),
      b = E(n(32)),
      w = E(n(35));
    function E(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }
    t.exports = function () {
      function t(e) {
        var n = this;
        if (function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), e = e || {}, this.config = (0, b.default)(e), this.input = (0, d.default)(this.config.input), this.list = (0, d.default)(this.config.list), this.cachedOpts = this.currentOpts = (0, d.default)(this.config.options, !0, this.list), this.isOpen = !1, this.currentOption = null, this.selected = [], this.groups = [], this.isHovering = !1, this.autoFilter = this.config.autoFilter, this.optionsWithEventHandlers = new Set(), this.optionsWithKeyEventHandlers = new Set(), this.config.groups) {
          var r = (0, d.default)(this.config.groups, !0, this.list);
          this.groups = r.map(function (t) {
            return {
              element: t,
              options: n.cachedOpts.filter(function (e) {
                return t.contains(e);
              })
            };
          });
        }
        if (!this.input || !this.list) throw new Error("Unable to find required elements (list/input)");
        (0, v.default)(this.input, this.list, this.cachedOpts), this.config.useLiveRegion && (this.liveRegion = new s.default({
          ariaLive: "assertive"
        })), this.initEvents();
      }
      return i(t, [{
        key: "initEvents",
        value: function () {
          var t = this;
          (0, u.default)(this), this.optionsWithKeyEventHandlers.has(this.input) || (this.input.addEventListener("click", function () {
            t.openList().goTo(t.getOptIndex() || 0);
          }), this.input.addEventListener("blur", function () {
            t.isHovering || t.closeList();
          }), this.input.addEventListener("focus", function () {
            t.selected.length && (t.input.value = t.selected.length >= 2 ? "" : t.config.selectionValue(t.selected)), t.input.select();
          }), document.addEventListener("click", function (e) {
            !(0, p.default)(e.target, [t.input, t.list], !0) && t.isOpen && t.closeList();
          })), this.optionEvents(), this.initKeys();
        }
      }, {
        key: "getOptIndex",
        value: function () {
          return this.currentOption && this.currentOpts.indexOf(this.currentOption);
        }
      }, {
        key: "optionEvents",
        value: function () {
          var t = this;
          this.cachedOpts.forEach(function (e) {
            t.optionsWithEventHandlers.has(e.id) || t.selected.includes(e) || (e.addEventListener("click", function () {
              t.goTo(t.currentOpts.indexOf(e)).select();
            }), e.addEventListener("mouseover", function () {
              var n = t.currentOption;
              n && (0, o.default)(n).remove(t.config.activeClass), (0, o.default)(e).add(t.config.activeClass), t.isHovering = !0;
            }), e.addEventListener("mouseout", function () {
              (0, o.default)(e).remove(t.config.activeClass), t.isHovering = !1;
            }), t.optionsWithEventHandlers.add(e.id));
          });
        }
      }, {
        key: "openList",
        value: function () {
          (0, o.default)(this.list).add(this.config.openClass), this.input.setAttribute("aria-expanded", "true"), this.isOpen || this.announceCount(), this.isOpen = !0, this.emit("list:open");
          var t = (0, f.default)(this.list);
          if (!t.visible) {
            var e = "bottom" === t.position ? 0 - (window.innerHeight - (this.input.clientHeight + this.list.clientHeight)) : 0;
            (0, a.default)({
              element: this.input,
              offset: e,
              bezier: [.19, 1, .22, 1],
              duration: 100
            });
          }
          return this;
        }
      }, {
        key: "closeList",
        value: function (t, e) {
          return (0, o.default)(this.list).remove(this.config.openClass), this.input.setAttribute("aria-expanded", "false"), this.isOpen = !1, t && this.input.focus(), !this.multiselect && this.selected.length && (this.input.value = this.config.selectionValue(this.selected)), e && this.input.select(), this.emit("list:close"), this;
        }
      }, {
        key: "initKeys",
        value: function () {
          var t = this;
          if (!this.optionsWithKeyEventHandlers.has(this.input)) {
            this.optionsWithKeyEventHandlers.add(this.input), h.default.down(this.input, [{
              keys: ["up", "down"],
              callback: function (e, n) {
                if (t.isOpen) return -1 === t.currentOpts.indexOf(t.currentOption) ? t.goTo(0, !0) : t.goTo("down" === n ? "next" : "prev", !0);
                var r = t.selected.length ? t.currentOpts.indexOf(t.selected[t.selected.length - 1]) : 0;
                t.goTo(r, !0).openList();
              },
              preventDefault: !0
            }, {
              keys: ["enter"],
              callback: function (e) {
                t.isOpen && (e.preventDefault(), e.stopPropagation(), t.select());
              }
            }, {
              keys: ["escape"],
              callback: function (e) {
                t.isOpen && (e.stopPropagation(), t.closeList(!0, !0));
              }
            }, {
              keys: ["backspace"],
              callback: function () {
                t.selected.length >= 2 && (t.input.value = "");
              }
            }]);
            var e = [9, 13, 27, 16];
            h.default.up(this.input, function (n) {
              if (t.autoFilter) {
                var r = t.config.filter,
                  i = t.cachedInputValue;
                e.indexOf(n.which) > -1 || !r || (t.freshSelection ? (t.clearFilters(), i && i.trim() !== t.input.value.trim() && (t.filter().openList(), t.freshSelection = !1)) : t.filter().openList(), (0, y.default)(t.list, t.currentOpts, t.config.noResultsText));
              }
            });
          }
        }
      }, {
        key: "clearFilters",
        value: function () {
          return this.cachedOpts.forEach(function (t) {
            return t.style.display = "";
          }), this.groups.forEach(function (t) {
            return t.element.style.display = "";
          }), this.currentOpts = this.cachedOpts, this;
        }
      }, {
        key: "filter",
        value: function (t) {
          var e = this,
            n = this.config.filter,
            r = this.currentOpts;
          return this.currentOpts = "function" == typeof n ? n(this.input.value.trim(), this.cachedOpts) : l.default[n](this.input.value.trim(), this.cachedOpts), this.currentOpts = this.currentOpts || [], this.updateOpts(), r.every(function (t) {
            return e.currentOpts.indexOf(t) > -1;
          }) || t || this.announceCount(), this;
        }
      }, {
        key: "announceCount",
        value: function () {
          var t = this.config.announcement && this.config.announcement.count;
          return t && this.liveRegion && this.liveRegion.announce(t(this.currentOpts.length), 500), this;
        }
      }, {
        key: "updateOpts",
        value: function () {
          var t = this,
            e = this.config.optionValue;
          return this.cachedOpts.forEach(function (n) {
            n.style.display = -1 === t.currentOpts.indexOf(n) ? "none" : "", n.innerHTML = "string" == typeof e ? (0, m.default)(n, t.input, e) : e(n);
          }), this.updateGroups(), this;
        }
      }, {
        key: "updateGroups",
        value: function () {
          return this.groups.forEach(function (t) {
            var e = t.options.filter(function (t) {
              return "" === t.style.display;
            });
            t.element.style.display = e.length ? "" : "none";
          }), this;
        }
      }, {
        key: "select",
        value: function () {
          var t = this,
            e = this.currentOption;
          if (e) {
            !this.config.multiselect && this.selected.length && (0, o.default)(this.selected[0]).remove(this.config.selectedClass);
            var n = this.selected.indexOf(e),
              r = n > -1;
            return this.config.multiselect ? r ? this.selected.splice(n, 1) : this.selected.push(e) : this.selected = this.config.allowEmpty && r ? [] : [e], this.cachedOpts.forEach(function (e) {
              e.setAttribute("aria-selected", t.selected.indexOf(e) > -1 ? "true" : "false");
            }), r ? (e.classList.remove(this.config.selectedClass), this.emit("deselection", {
              text: this.input.value,
              option: e
            })) : (e.classList.add(this.config.selectedClass), this.emit("selection", {
              text: this.input.value,
              option: e
            })), this.freshSelection = !0, this.input.value = this.selected.length ? this.config.selectionValue(this.selected) : "", this.cachedInputValue = this.input.value, this.filter(!0).clearFilters(), this.config.multiselect || (this.closeList(), this.input.select()), this;
          }
        }
      }, {
        key: "reset",
        value: function () {
          var t = this;
          return this.clearFilters(), this.input.value = "", this.updateOpts(), this.input.removeAttribute("aria-activedescendant"), this.input.removeAttribute("data-active-option"), this.currentOption = null, this.selected = [], this.cachedOpts.forEach(function (e) {
            (0, o.default)(e).remove(t.config.selectedClass), (0, o.default)(e).remove(t.config.activeClass), e.setAttribute("aria-selected", "false");
          }), this;
        }
      }, {
        key: "goTo",
        value: function (t, e) {
          var n = this;
          if ("string" == typeof t) {
            var r = this.getOptIndex();
            return this.goTo("next" === t ? r + 1 : r - 1, e);
          }
          var i = this.currentOpts[t],
            o = !1;
          if (!this.currentOpts[t]) return 0 === this.getOptIndex() && (this.list.scrollTop = 0), this;
          if (this.groups.length) {
            var u = (0, g.default)(this.groups, i);
            o = u && u !== this.currentGroup, this.currentGroup = u;
          }
          return this.currentOption = i, this.pseudoFocus(o), this.currentOpts.forEach(function (t) {
            t.classList.contains(n.config.activeClass) && !(0, c.default)(n.list, t) && (0, a.default)(t);
          }), this;
        }
      }, {
        key: "pseudoFocus",
        value: function (t) {
          var e = this.currentOption,
            n = this.config.activeClass,
            r = this.input.getAttribute("data-active-option"),
            i = r && document.getElementById(r);
          return i && n && (0, o.default)(i).remove(n), e && (this.input.setAttribute("data-active-option", e.id), n && (0, o.default)(e).add(n), this.liveRegion && (0, w.default)(e, this.config, this.liveRegion.announce.bind(this.liveRegion), t, this.currentGroup && this.currentGroup.element), this.input.setAttribute("aria-activedescendant", e.id), this.currentOption = e, this.emit("change")), this;
        }
      }, {
        key: "setOptions",
        value: function (t) {
          return "object" === (void 0 === t ? "undefined" : r(t)) && this.config.list.append(t), this.cachedOpts.push(t), -1 === this.currentOpts.indexOf(t) && this.currentOpts.push(t), this;
        }
      }, {
        key: "setCurrentOptions",
        value: function () {
          return this.currentOption = this.currentOpts[0], this;
        }
      }, {
        key: "updateSelectedOptions",
        value: function () {
          var t = this,
            e = document.getElementById(this.config.list.id),
            n = this.selected;
          for (this.emptyDropdownList(); e.hasChildNodes();) e.removeChild(e.firstChild);
          return n.length > 0 && n.forEach(function (e) {
            t.setOptions(e);
          }), this;
        }
      }, {
        key: "emptyDropdownList",
        value: function () {
          return this.currentOpts = [], this.cachedOpts = [], this.optionsWithEventHandlers.clear(), this;
        }
      }, {
        key: "setNoResultFound",
        value: function () {
          (0, y.default)(this.list, this.currentOpts, this.config.noResultsText);
        }
      }]), t;
    }();
  }, function (t, e) {
    t.exports = function (t, e) {
      if (t.indexOf) return t.indexOf(e);
      for (var n = 0; n < t.length; ++n) if (t[n] === e) return n;
      return -1;
    };
  }, function (t, e) {
    (e = t.exports = function (t) {
      return t.replace(/^\s*|\s*$/g, "");
    }).left = function (t) {
      return t.replace(/^\s*/, "");
    }, e.right = function (t) {
      return t.replace(/\s*$/, "");
    };
  }, function (t, e, n) {
    function r(t) {
      if (t) return function (t) {
        for (var e in r.prototype) t[e] = r.prototype[e];
        return t;
      }(t);
    }
    t.exports = r, r.prototype.on = r.prototype.addEventListener = function (t, e) {
      return this._callbacks = this._callbacks || {}, (this._callbacks["$" + t] = this._callbacks["$" + t] || []).push(e), this;
    }, r.prototype.once = function (t, e) {
      function n() {
        this.off(t, n), e.apply(this, arguments);
      }
      return n.fn = e, this.on(t, n), this;
    }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (t, e) {
      if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
      var n,
        r = this._callbacks["$" + t];
      if (!r) return this;
      if (1 == arguments.length) return delete this._callbacks["$" + t], this;
      for (var i = 0; i < r.length; i++) if ((n = r[i]) === e || n.fn === e) {
        r.splice(i, 1);
        break;
      }
      return this;
    }, r.prototype.emit = function (t) {
      this._callbacks = this._callbacks || {};
      var e = [].slice.call(arguments, 1),
        n = this._callbacks["$" + t];
      if (n) for (var r = 0, i = (n = n.slice(0)).length; r < i; ++r) n[r].apply(this, e);
      return this;
    }, r.prototype.listeners = function (t) {
      return this._callbacks = this._callbacks || {}, this._callbacks["$" + t] || [];
    }, r.prototype.hasListeners = function (t) {
      return !!this.listeners(t).length;
    };
  }, function (t, e, n) {

    function r(t) {
      this.region = document.createElement("div"), this.options = t || {}, this.configure(), document.body.appendChild(this.region);
    }
    r.prototype.configure = function () {
      var t = this.options,
        e = this.region;
      e.setAttribute("aria-live", t.ariaLive || "polite"), e.setAttribute("role", t.role || "log"), e.setAttribute("aria-relevant", t.ariaRelevant || "additions"), e.setAttribute("aria-atomic", t.ariaAtomic || "false"), this.region.style.position = "absolute", this.region.style.width = "1px", this.region.style.height = "1px", this.region.style.marginTop = "-1px", this.region.style.clip = "rect(1px, 1px, 1px, 1px)", this.region.style.overflow = "hidden";
    }, r.prototype.announce = function (t, e) {
      var n = document.createElement("div");
      n.innerHTML = t, this.region.appendChild(n), (e || void 0 === e) && setTimeout(function () {
        this.region.removeChild(n);
      }.bind(this), e || 7e3);
    }, t.exports = r;
  }, function (t, e, n) {
    var r;
    r = function () {
      return function (t) {
        function e(r) {
          if (n[r]) return n[r].exports;
          var i = n[r] = {
            i: r,
            l: !1,
            exports: {}
          };
          return t[r].call(i.exports, i, i.exports, e), i.l = !0, i.exports;
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
          return t;
        }, e.d = function (t, n, r) {
          e.o(t, n) || Object.defineProperty(t, n, {
            configurable: !1,
            enumerable: !0,
            get: r
          });
        }, e.n = function (t) {
          var n = t && t.__esModule ? function () {
            return t.default;
          } : function () {
            return t;
          };
          return e.d(n, "a", n), n;
        }, e.o = function (t, e) {
          return Object.prototype.hasOwnProperty.call(t, e);
        }, e.p = "", e(e.s = 1);
      }([function (t, e, n) {

        function r(t) {
          return t && t.__esModule ? t : {
            default: t
          };
        }
        function i() {}
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var o = r(n(4)),
          u = r(n(7)),
          s = n(2),
          a = r(n(3)),
          c = [.19, 1, .22, 1];
        e.default = function (t) {
          var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 100,
            n = 0,
            r = void 0,
            f = void 0;
          if ((0, s.isElement)(t)) r = o.default.apply(void 0, c), f = i;else {
            if (!(0, s.isObject)(t)) throw new TypeError("The first argument must be HTMLElement or Object.");
            if (!(0, s.isElement)(t.element)) throw new TypeError("`element` must be HTMLElement.");
            n = (0, s.isNumeric)(t.offset) ? t.offset : 0, r = (0, s.isArray)(t.bezier) && 4 === t.bezier.length ? o.default.apply(void 0, function (t) {
              if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++) n[e] = t[e];
                return n;
              }
              return Array.from(t);
            }(t.bezier)) : o.default.apply(void 0, c), e = t.duration, f = (0, s.isFunction)(t.then) ? t.then : i, t = t.element;
          }
          (!(0, s.isNumeric)(e) || e < 0) && (e = 100);
          var l = (0, a.default)(t),
            h = l.scrollTop,
            p = l.offsetTop,
            d = null,
            g = ("BODY" === l.nodeName ? t.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || document.body.scrollTop) - p : t.offsetTop - p) - h + n;
          (0, u.default)(function t(n) {
            null === d && (d = n);
            var i = n - d,
              o = r(i / e) * g;
            l.scrollTop = Math.round(h + o), i < e ? (0, u.default)(t) : f();
          });
        };
      }, function (t, e, n) {

        var r = function (t) {
          return t && t.__esModule ? t : {
            default: t
          };
        }(n(0));
        t.exports = r.default;
      }, function (t, e, n) {

        function r(t) {
          return Object.prototype.toString.call(t);
        }
        function i(t) {
          return !isNaN(parseFloat(t)) && isFinite(t);
        }
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
          return typeof t;
        } : function (t) {
          return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
        };
        e.isObject = function (t) {
          return "[object Object]" === r(t);
        }, e.isArray = function (t) {
          return null != t && "[object Array]" === r(t);
        }, e.isNumeric = i, e.isPositive = function (t) {
          return i(t) && t >= 0;
        }, e.isFunction = function (t) {
          return null != t && "[object Function]" === r(t);
        }, e.isElement = function (t) {
          return "object" === o(window.HTMLElement) ? t instanceof window.HTMLElement : !!t && "object" === (void 0 === t ? "undefined" : o(t)) && null !== t && 1 === t.nodeType && "string" == typeof t.nodeName;
        };
      }, function (t, e, n) {

        function r(t, e) {
          return window.getComputedStyle(t, null).getPropertyValue(e);
        }
        function i(t) {
          if (1 === t.nodeType) return o.test(function (t) {
            return r(t, "overflow") + r(t, "overflow-y");
          }(t)) && t.scrollHeight > t.clientHeight;
        }
        Object.defineProperty(e, "__esModule", {
          value: !0
        });
        var o = /(auto|scroll)/;
        e.default = function (t) {
          for (var e = function t(e) {
              var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [],
                r = e.parentNode;
              return null === r || "HTML" === r.nodeName ? n : t(r, n.concat(r));
            }(t), n = document.body, r = 0, o = e.length; r < o; r++) if (i(e[r])) {
            n = e[r];
            break;
          }
          return n;
        };
      }, function (t, e) {
        function n(t, e) {
          return 1 - 3 * e + 3 * t;
        }
        function r(t, e) {
          return 3 * e - 6 * t;
        }
        function i(t) {
          return 3 * t;
        }
        function o(t, e, o) {
          return ((n(e, o) * t + r(e, o)) * t + i(e)) * t;
        }
        function u(t, e, o) {
          return 3 * n(e, o) * t * t + 2 * r(e, o) * t + i(e);
        }
        function s(t, e, n, r, i) {
          var u,
            s,
            a = 0;
          do {
            (u = o(s = e + (n - e) / 2, r, i) - t) > 0 ? n = s : e = s;
          } while (Math.abs(u) > f && ++a < l);
          return s;
        }
        function a(t, e, n, r) {
          for (var i = 0; i < c; ++i) {
            var s = u(e, n, r);
            if (0 === s) return e;
            e -= (o(e, n, r) - t) / s;
          }
          return e;
        }
        var c = 4,
          f = 1e-7,
          l = 10,
          h = 11,
          p = 1 / (h - 1),
          d = "function" == typeof Float32Array;
        t.exports = function (t, e, n, r) {
          function i(e) {
            for (var r = 0, i = 1, o = h - 1; i !== o && c[i] <= e; ++i) r += p;
            var f = r + (e - c[--i]) / (c[i + 1] - c[i]) * p,
              l = u(f, t, n);
            return l >= .001 ? a(e, f, t, n) : 0 === l ? f : s(e, r, r + p, t, n);
          }
          if (!(0 <= t && t <= 1 && 0 <= n && n <= 1)) throw new Error("bezier x values must be in [0, 1] range");
          var c = d ? new Float32Array(h) : new Array(h);
          if (t !== e || n !== r) for (var f = 0; f < h; ++f) c[f] = o(f * p, t, n);
          return function (u) {
            return t === e && n === r ? u : 0 === u ? 0 : 1 === u ? 1 : o(i(u), e, r);
          };
        };
      }, function (t, e, n) {
        (function (e) {
          (function () {
            var n, r, i, o, u, s;
            "undefined" != typeof performance && null !== performance && performance.now ? t.exports = function () {
              return performance.now();
            } : void 0 !== e && null !== e && e.hrtime ? (t.exports = function () {
              return (n() - u) / 1e6;
            }, r = e.hrtime, o = (n = function () {
              var t;
              return 1e9 * (t = r())[0] + t[1];
            })(), s = 1e9 * e.uptime(), u = o - s) : Date.now ? (t.exports = function () {
              return Date.now() - i;
            }, i = Date.now()) : (t.exports = function () {
              return new Date().getTime() - i;
            }, i = new Date().getTime());
          }).call(this);
        }).call(e, n(6));
      }, function (t, e) {
        function n() {
          throw new Error("setTimeout has not been defined");
        }
        function r() {
          throw new Error("clearTimeout has not been defined");
        }
        function i(t) {
          if (c === setTimeout) return setTimeout(t, 0);
          if ((c === n || !c) && setTimeout) return c = setTimeout, setTimeout(t, 0);
          try {
            return c(t, 0);
          } catch (e) {
            try {
              return c.call(null, t, 0);
            } catch (e) {
              return c.call(this, t, 0);
            }
          }
        }
        function o() {
          d && h && (d = !1, h.length ? p = h.concat(p) : g = -1, p.length && u());
        }
        function u() {
          if (!d) {
            var t = i(o);
            d = !0;
            for (var e = p.length; e;) {
              for (h = p, p = []; ++g < e;) h && h[g].run();
              g = -1, e = p.length;
            }
            h = null, d = !1, function (t) {
              if (f === clearTimeout) return clearTimeout(t);
              if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t);
              try {
                f(t);
              } catch (e) {
                try {
                  return f.call(null, t);
                } catch (e) {
                  return f.call(this, t);
                }
              }
            }(t);
          }
        }
        function s(t, e) {
          this.fun = t, this.array = e;
        }
        function a() {}
        var c,
          f,
          l = t.exports = {};
        !function () {
          try {
            c = "function" == typeof setTimeout ? setTimeout : n;
          } catch (t) {
            c = n;
          }
          try {
            f = "function" == typeof clearTimeout ? clearTimeout : r;
          } catch (t) {
            f = r;
          }
        }();
        var h,
          p = [],
          d = !1,
          g = -1;
        l.nextTick = function (t) {
          var e = new Array(arguments.length - 1);
          if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
          p.push(new s(t, e)), 1 !== p.length || d || i(u);
        }, s.prototype.run = function () {
          this.fun.apply(null, this.array);
        }, l.title = "browser", l.browser = !0, l.env = {}, l.argv = [], l.version = "", l.versions = {}, l.on = a, l.addListener = a, l.once = a, l.off = a, l.removeListener = a, l.removeAllListeners = a, l.emit = a, l.binding = function (t) {
          throw new Error("process.binding is not supported");
        }, l.cwd = function () {
          return "/";
        }, l.chdir = function (t) {
          throw new Error("process.chdir is not supported");
        }, l.umask = function () {
          return 0;
        };
      }, function (t, e, n) {
        (function (e) {
          for (var r = n(5), i = "undefined" == typeof window ? e : window, o = ["moz", "webkit"], u = "AnimationFrame", s = i["request" + u], a = i["cancel" + u] || i["cancelRequest" + u], c = 0; !s && c < o.length; c++) s = i[o[c] + "Request" + u], a = i[o[c] + "Cancel" + u] || i[o[c] + "CancelRequest" + u];
          if (!s || !a) {
            var f = 0,
              l = 0,
              h = [];
            s = function (t) {
              if (0 === h.length) {
                var e = r(),
                  n = Math.max(0, 1e3 / 60 - (e - f));
                f = n + e, setTimeout(function () {
                  var t = h.slice(0);
                  h.length = 0;
                  for (var e = 0; e < t.length; e++) if (!t[e].cancelled) try {
                    t[e].callback(f);
                  } catch (t) {
                    setTimeout(function () {
                      throw t;
                    }, 0);
                  }
                }, Math.round(n));
              }
              return h.push({
                handle: ++l,
                callback: t,
                cancelled: !1
              }), l;
            }, a = function (t) {
              for (var e = 0; e < h.length; e++) h[e].handle === t && (h[e].cancelled = !0);
            };
          }
          t.exports = function (t) {
            return s.call(i, t);
          }, t.exports.cancel = function () {
            a.apply(i, arguments);
          }, t.exports.polyfill = function () {
            i.requestAnimationFrame = s, i.cancelAnimationFrame = a;
          };
        }).call(e, n(8));
      }, function (t, e) {
        var n;
        n = function () {
          return this;
        }();
        try {
          n = n || Function("return this")() || (0, eval)("this");
        } catch (t) {
          "object" == typeof window && (n = window);
        }
        t.exports = n;
      }]);
    }, t.exports = r();
  }, function (t, e, n) {

    t.exports = function (t, e) {
      var n = t.clientHeight,
        r = e.clientHeight,
        i = t.scrollTop,
        o = e.offsetTop;
      return !(i > o) && !(i + n - r < o);
    };
  }, function (t, e, n) {

    t.exports = function (t) {
      var e = window.innerHeight,
        n = t.getBoundingClientRect(),
        r = n.top < 0,
        i = n.bottom > e,
        o = !r && !i,
        u = {
          visible: o
        };
      return o || (u.position = r ? "top" : "bottom"), u;
    };
  }, function (t, e, n) {

    var r,
      i = n(11),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    t.exports = {
      contains: function (t, e) {
        return e.filter(function (e) {
          return (0, o.default)(e).toLowerCase().indexOf(t.toLowerCase()) > -1;
        });
      },
      equals: function (t, e) {
        return e.filter(function (e) {
          return (0, o.default)(e).toLowerCase() === t.toLowerCase();
        });
      },
      "starts-with": function (t, e) {
        return e.filter(function (e) {
          return 0 === (0, o.default)(e).toLowerCase().indexOf(t.toLowerCase());
        });
      }
    };
  }, function (t, e, n) {

    t.exports = function (t) {
      return t.getAttribute("data-value") || t.innerText;
    };
  }, function (t, e, n) {

    var r,
      i = n(13),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    e.attach = function (t, e, n) {
      if ("function" == typeof n) return e.addEventListener(t, n);
      n && n.length && e.addEventListener(t, function (t) {
        var e = o.default[t.which];
        n.forEach(function (n) {
          n.keys.indexOf(e) > -1 && (n.preventDefault && t.preventDefault(), n.callback(t, e));
        });
      });
    }, e.up = function (t, n) {
      return e.attach("keyup", t, n);
    }, e.down = function (t, n) {
      return e.attach("keydown", t, n);
    }, e.press = function (t, n) {
      return e.attach("keypress", t, n);
    };
  }, function (t, e, n) {

    t.exports = {
      8: "backspace",
      9: "tab",
      13: "enter",
      27: "escape",
      32: "space",
      37: "left",
      38: "up",
      39: "right",
      40: "down"
    };
  }, function (t, e, n) {

    t.exports = function (t, e, n) {
      if (e = e.length ? e : [e], n && e.indexOf(t) > -1) return !0;
      for (var r = t.parentNode; r && "HTML" !== r.tagName;) {
        if (e.indexOf(r) > -1) return !0;
        r = r.parentNode;
      }
      return !1;
    };
  }, function (t, e, n) {

    var r,
      i = n(16),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    t.exports = function (t, e, n) {
      return n = n || document, "string" == typeof t ? e ? o.default.all(t, n) : (0, o.default)(t, n) : t;
    };
  }, function (t, e, n) {

    (t.exports = function (t, e) {
      return (e = e || document).querySelector(t);
    }).all = function (t, e) {
      return e = e || document, Array.prototype.slice.call(e.querySelectorAll(t));
    };
  }, function (t, e, n) {

    t.exports = function (t, e) {
      var n = t.filter(function (t) {
        return t.options.indexOf(e) > -1;
      });
      return n.length && n[0];
    };
  }, function (t, e, n) {

    var r,
      i = n(1),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    t.exports = function (t, e, n) {
      var r = t.querySelector(".combobo-no-results");
      !n || e.length || r ? r && e.length && t.removeChild(r) : (r = document.createElement("div"), (0, o.default)(r).add("combobo-no-results"), r.innerHTML = n, t.appendChild(r));
    };
  }, function (t, e, n) {

    var r,
      i = n(20),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    t.exports = function (t, e, n) {
      e.id = e.id || (0, o.default)(), t.setAttribute("role", "combobox"), e.setAttribute("role", "listbox"), t.setAttribute("aria-controls", e.id), t.setAttribute("aria-autocomplete", "list"), t.setAttribute("aria-expanded", "false"), n.forEach(function (t) {
        t.setAttribute("role", "option"), t.id = t.id || (0, o.default)();
      });
    };
  }, function (t, e, n) {

    var r,
      i = n(21),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    t.exports = function t(e) {
      e = e || 8;
      var n = (0, o.default)(e);
      if (document.getElementById(n)) return t(e);
      return n;
    };
  }, function (t, e, n) {
    (function (r) {
      var i = n(26);
      function o(t) {
        i("string" == typeof t, "the list of characters must be a string!");
        var e = r.byteLength(t);
        return function (n) {
          i("number" == typeof (n = n || 10) && n >= 0, "the length of the random string must be a number!");
          for (var r = "", o = 0; o < n; o++) r += t[Math.floor(e * Math.random())];
          return r;
        };
      }
      (e = t.exports = o("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")).base62 = e, e.base36 = o("abcdefghijklmnopqrstuvwxyz0123456789"), e.base10 = o("0123456789"), e.create = o;
    }).call(e, n(22).Buffer);
  }, function (t, e, n) {

    (function (t) {
      var r = n(23),
        i = n(24),
        o = n(25);
      function u() {
        return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function s(t, e) {
        if (u() < e) throw new RangeError("Invalid typed array length");
        return a.TYPED_ARRAY_SUPPORT ? (t = new Uint8Array(e)).__proto__ = a.prototype : (null === t && (t = new a(e)), t.length = e), t;
      }
      function a(t, e, n) {
        if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a)) return new a(t, e, n);
        if ("number" == typeof t) {
          if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
          return l(this, t);
        }
        return c(this, t, e, n);
      }
      function c(t, e, n, r) {
        if ("number" == typeof e) throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer ? function (t, e, n, r) {
          if (e.byteLength, n < 0 || e.byteLength < n) throw new RangeError("'offset' is out of bounds");
          if (e.byteLength < n + (r || 0)) throw new RangeError("'length' is out of bounds");
          e = void 0 === n && void 0 === r ? new Uint8Array(e) : void 0 === r ? new Uint8Array(e, n) : new Uint8Array(e, n, r);
          a.TYPED_ARRAY_SUPPORT ? (t = e).__proto__ = a.prototype : t = h(t, e);
          return t;
        }(t, e, n, r) : "string" == typeof e ? function (t, e, n) {
          "string" == typeof n && "" !== n || (n = "utf8");
          if (!a.isEncoding(n)) throw new TypeError('"encoding" must be a valid string encoding');
          var r = 0 | d(e, n),
            i = (t = s(t, r)).write(e, n);
          i !== r && (t = t.slice(0, i));
          return t;
        }(t, e, n) : function (t, e) {
          if (a.isBuffer(e)) {
            var n = 0 | p(e.length);
            return 0 === (t = s(t, n)).length ? t : (e.copy(t, 0, 0, n), t);
          }
          if (e) {
            if ("undefined" != typeof ArrayBuffer && e.buffer instanceof ArrayBuffer || "length" in e) return "number" != typeof e.length || (r = e.length) != r ? s(t, 0) : h(t, e);
            if ("Buffer" === e.type && o(e.data)) return h(t, e.data);
          }
          var r;
          throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
        }(t, e);
      }
      function f(t) {
        if ("number" != typeof t) throw new TypeError('"size" argument must be a number');
        if (t < 0) throw new RangeError('"size" argument must not be negative');
      }
      function l(t, e) {
        if (f(e), t = s(t, e < 0 ? 0 : 0 | p(e)), !a.TYPED_ARRAY_SUPPORT) for (var n = 0; n < e; ++n) t[n] = 0;
        return t;
      }
      function h(t, e) {
        var n = e.length < 0 ? 0 : 0 | p(e.length);
        t = s(t, n);
        for (var r = 0; r < n; r += 1) t[r] = 255 & e[r];
        return t;
      }
      function p(t) {
        if (t >= u()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + u().toString(16) + " bytes");
        return 0 | t;
      }
      function d(t, e) {
        if (a.isBuffer(t)) return t.length;
        if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)) return t.byteLength;
        "string" != typeof t && (t = "" + t);
        var n = t.length;
        if (0 === n) return 0;
        for (var r = !1;;) switch (e) {
          case "ascii":
          case "latin1":
          case "binary":
            return n;
          case "utf8":
          case "utf-8":
          case void 0:
            return N(t).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return 2 * n;
          case "hex":
            return n >>> 1;
          case "base64":
            return F(t).length;
          default:
            if (r) return N(t).length;
            e = ("" + e).toLowerCase(), r = !0;
        }
      }
      function g(t, e, n) {
        var r = t[e];
        t[e] = t[n], t[n] = r;
      }
      function y(t, e, n, r, i) {
        if (0 === t.length) return -1;
        if ("string" == typeof n ? (r = n, n = 0) : n > 2147483647 ? n = 2147483647 : n < -2147483648 && (n = -2147483648), n = +n, isNaN(n) && (n = i ? 0 : t.length - 1), n < 0 && (n = t.length + n), n >= t.length) {
          if (i) return -1;
          n = t.length - 1;
        } else if (n < 0) {
          if (!i) return -1;
          n = 0;
        }
        if ("string" == typeof e && (e = a.from(e, r)), a.isBuffer(e)) return 0 === e.length ? -1 : v(t, e, n, r, i);
        if ("number" == typeof e) return e &= 255, a.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? i ? Uint8Array.prototype.indexOf.call(t, e, n) : Uint8Array.prototype.lastIndexOf.call(t, e, n) : v(t, [e], n, r, i);
        throw new TypeError("val must be string, number or Buffer");
      }
      function v(t, e, n, r, i) {
        var o,
          u = 1,
          s = t.length,
          a = e.length;
        if (void 0 !== r && ("ucs2" === (r = String(r).toLowerCase()) || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)) {
          if (t.length < 2 || e.length < 2) return -1;
          u = 2, s /= 2, a /= 2, n /= 2;
        }
        function c(t, e) {
          return 1 === u ? t[e] : t.readUInt16BE(e * u);
        }
        if (i) {
          var f = -1;
          for (o = n; o < s; o++) if (c(t, o) === c(e, -1 === f ? 0 : o - f)) {
            if (-1 === f && (f = o), o - f + 1 === a) return f * u;
          } else -1 !== f && (o -= o - f), f = -1;
        } else for (n + a > s && (n = s - a), o = n; o >= 0; o--) {
          for (var l = !0, h = 0; h < a; h++) if (c(t, o + h) !== c(e, h)) {
            l = !1;
            break;
          }
          if (l) return o;
        }
        return -1;
      }
      function m(t, e, n, r) {
        n = Number(n) || 0;
        var i = t.length - n;
        r ? (r = Number(r)) > i && (r = i) : r = i;
        var o = e.length;
        if (o % 2 != 0) throw new TypeError("Invalid hex string");
        r > o / 2 && (r = o / 2);
        for (var u = 0; u < r; ++u) {
          var s = parseInt(e.substr(2 * u, 2), 16);
          if (isNaN(s)) return u;
          t[n + u] = s;
        }
        return u;
      }
      function b(t, e, n, r) {
        return z(N(e, t.length - n), t, n, r);
      }
      function w(t, e, n, r) {
        return z(function (t) {
          for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n));
          return e;
        }(e), t, n, r);
      }
      function E(t, e, n, r) {
        return w(t, e, n, r);
      }
      function O(t, e, n, r) {
        return z(F(e), t, n, r);
      }
      function A(t, e, n, r) {
        return z(function (t, e) {
          for (var n, r, i, o = [], u = 0; u < t.length && !((e -= 2) < 0); ++u) n = t.charCodeAt(u), r = n >> 8, i = n % 256, o.push(i), o.push(r);
          return o;
        }(e, t.length - n), t, n, r);
      }
      function x(t, e, n) {
        return 0 === e && n === t.length ? r.fromByteArray(t) : r.fromByteArray(t.slice(e, n));
      }
      function T(t, e, n) {
        n = Math.min(t.length, n);
        for (var r = [], i = e; i < n;) {
          var o,
            u,
            s,
            a,
            c = t[i],
            f = null,
            l = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
          if (i + l <= n) switch (l) {
            case 1:
              c < 128 && (f = c);
              break;
            case 2:
              128 == (192 & (o = t[i + 1])) && (a = (31 & c) << 6 | 63 & o) > 127 && (f = a);
              break;
            case 3:
              o = t[i + 1], u = t[i + 2], 128 == (192 & o) && 128 == (192 & u) && (a = (15 & c) << 12 | (63 & o) << 6 | 63 & u) > 2047 && (a < 55296 || a > 57343) && (f = a);
              break;
            case 4:
              o = t[i + 1], u = t[i + 2], s = t[i + 3], 128 == (192 & o) && 128 == (192 & u) && 128 == (192 & s) && (a = (15 & c) << 18 | (63 & o) << 12 | (63 & u) << 6 | 63 & s) > 65535 && a < 1114112 && (f = a);
          }
          null === f ? (f = 65533, l = 1) : f > 65535 && (f -= 65536, r.push(f >>> 10 & 1023 | 55296), f = 56320 | 1023 & f), r.push(f), i += l;
        }
        return function (t) {
          var e = t.length;
          if (e <= _) return String.fromCharCode.apply(String, t);
          var n = "",
            r = 0;
          for (; r < e;) n += String.fromCharCode.apply(String, t.slice(r, r += _));
          return n;
        }(r);
      }
      e.Buffer = a, e.SlowBuffer = function (t) {
        +t != t && (t = 0);
        return a.alloc(+t);
      }, e.INSPECT_MAX_BYTES = 50, a.TYPED_ARRAY_SUPPORT = void 0 !== t.TYPED_ARRAY_SUPPORT ? t.TYPED_ARRAY_SUPPORT : function () {
        try {
          var t = new Uint8Array(1);
          return t.__proto__ = {
            __proto__: Uint8Array.prototype,
            foo: function () {
              return 42;
            }
          }, 42 === t.foo() && "function" == typeof t.subarray && 0 === t.subarray(1, 1).byteLength;
        } catch (t) {
          return !1;
        }
      }(), e.kMaxLength = u(), a.poolSize = 8192, a._augment = function (t) {
        return t.__proto__ = a.prototype, t;
      }, a.from = function (t, e, n) {
        return c(null, t, e, n);
      }, a.TYPED_ARRAY_SUPPORT && (a.prototype.__proto__ = Uint8Array.prototype, a.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && a[Symbol.species] === a && Object.defineProperty(a, Symbol.species, {
        value: null,
        configurable: !0
      })), a.alloc = function (t, e, n) {
        return function (t, e, n, r) {
          return f(e), e <= 0 ? s(t, e) : void 0 !== n ? "string" == typeof r ? s(t, e).fill(n, r) : s(t, e).fill(n) : s(t, e);
        }(null, t, e, n);
      }, a.allocUnsafe = function (t) {
        return l(null, t);
      }, a.allocUnsafeSlow = function (t) {
        return l(null, t);
      }, a.isBuffer = function (t) {
        return !(null == t || !t._isBuffer);
      }, a.compare = function (t, e) {
        if (!a.isBuffer(t) || !a.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
        if (t === e) return 0;
        for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i) if (t[i] !== e[i]) {
          n = t[i], r = e[i];
          break;
        }
        return n < r ? -1 : r < n ? 1 : 0;
      }, a.isEncoding = function (t) {
        switch (String(t).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return !0;
          default:
            return !1;
        }
      }, a.concat = function (t, e) {
        if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
        if (0 === t.length) return a.alloc(0);
        var n;
        if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length;
        var r = a.allocUnsafe(e),
          i = 0;
        for (n = 0; n < t.length; ++n) {
          var u = t[n];
          if (!a.isBuffer(u)) throw new TypeError('"list" argument must be an Array of Buffers');
          u.copy(r, i), i += u.length;
        }
        return r;
      }, a.byteLength = d, a.prototype._isBuffer = !0, a.prototype.swap16 = function () {
        var t = this.length;
        if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
        for (var e = 0; e < t; e += 2) g(this, e, e + 1);
        return this;
      }, a.prototype.swap32 = function () {
        var t = this.length;
        if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
        for (var e = 0; e < t; e += 4) g(this, e, e + 3), g(this, e + 1, e + 2);
        return this;
      }, a.prototype.swap64 = function () {
        var t = this.length;
        if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
        for (var e = 0; e < t; e += 8) g(this, e, e + 7), g(this, e + 1, e + 6), g(this, e + 2, e + 5), g(this, e + 3, e + 4);
        return this;
      }, a.prototype.toString = function () {
        var t = 0 | this.length;
        return 0 === t ? "" : 0 === arguments.length ? T(this, 0, t) : function (t, e, n) {
          var r = !1;
          if ((void 0 === e || e < 0) && (e = 0), e > this.length) return "";
          if ((void 0 === n || n > this.length) && (n = this.length), n <= 0) return "";
          if ((n >>>= 0) <= (e >>>= 0)) return "";
          for (t || (t = "utf8");;) switch (t) {
            case "hex":
              return k(this, e, n);
            case "utf8":
            case "utf-8":
              return T(this, e, n);
            case "ascii":
              return S(this, e, n);
            case "latin1":
            case "binary":
              return R(this, e, n);
            case "base64":
              return x(this, e, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return P(this, e, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + t);
              t = (t + "").toLowerCase(), r = !0;
          }
        }.apply(this, arguments);
      }, a.prototype.equals = function (t) {
        if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        return this === t || 0 === a.compare(this, t);
      }, a.prototype.inspect = function () {
        var t = "",
          n = e.INSPECT_MAX_BYTES;
        return this.length > 0 && (t = this.toString("hex", 0, n).match(/.{2}/g).join(" "), this.length > n && (t += " ... ")), "<Buffer " + t + ">";
      }, a.prototype.compare = function (t, e, n, r, i) {
        if (!a.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
        if (void 0 === e && (e = 0), void 0 === n && (n = t ? t.length : 0), void 0 === r && (r = 0), void 0 === i && (i = this.length), e < 0 || n > t.length || r < 0 || i > this.length) throw new RangeError("out of range index");
        if (r >= i && e >= n) return 0;
        if (r >= i) return -1;
        if (e >= n) return 1;
        if (e >>>= 0, n >>>= 0, r >>>= 0, i >>>= 0, this === t) return 0;
        for (var o = i - r, u = n - e, s = Math.min(o, u), c = this.slice(r, i), f = t.slice(e, n), l = 0; l < s; ++l) if (c[l] !== f[l]) {
          o = c[l], u = f[l];
          break;
        }
        return o < u ? -1 : u < o ? 1 : 0;
      }, a.prototype.includes = function (t, e, n) {
        return -1 !== this.indexOf(t, e, n);
      }, a.prototype.indexOf = function (t, e, n) {
        return y(this, t, e, n, !0);
      }, a.prototype.lastIndexOf = function (t, e, n) {
        return y(this, t, e, n, !1);
      }, a.prototype.write = function (t, e, n, r) {
        if (void 0 === e) r = "utf8", n = this.length, e = 0;else if (void 0 === n && "string" == typeof e) r = e, n = this.length, e = 0;else {
          if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
          e |= 0, isFinite(n) ? (n |= 0, void 0 === r && (r = "utf8")) : (r = n, n = void 0);
        }
        var i = this.length - e;
        if ((void 0 === n || n > i) && (n = i), t.length > 0 && (n < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
        r || (r = "utf8");
        for (var o = !1;;) switch (r) {
          case "hex":
            return m(this, t, e, n);
          case "utf8":
          case "utf-8":
            return b(this, t, e, n);
          case "ascii":
            return w(this, t, e, n);
          case "latin1":
          case "binary":
            return E(this, t, e, n);
          case "base64":
            return O(this, t, e, n);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return A(this, t, e, n);
          default:
            if (o) throw new TypeError("Unknown encoding: " + r);
            r = ("" + r).toLowerCase(), o = !0;
        }
      }, a.prototype.toJSON = function () {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      var _ = 4096;
      function S(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var i = e; i < n; ++i) r += String.fromCharCode(127 & t[i]);
        return r;
      }
      function R(t, e, n) {
        var r = "";
        n = Math.min(t.length, n);
        for (var i = e; i < n; ++i) r += String.fromCharCode(t[i]);
        return r;
      }
      function k(t, e, n) {
        var r = t.length;
        (!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r);
        for (var i = "", o = e; o < n; ++o) i += Y(t[o]);
        return i;
      }
      function P(t, e, n) {
        for (var r = t.slice(e, n), i = "", o = 0; o < r.length; o += 2) i += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return i;
      }
      function L(t, e, n) {
        if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
        if (t + e > n) throw new RangeError("Trying to access beyond buffer length");
      }
      function B(t, e, n, r, i, o) {
        if (!a.isBuffer(t)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (e > i || e < o) throw new RangeError('"value" argument is out of bounds');
        if (n + r > t.length) throw new RangeError("Index out of range");
      }
      function C(t, e, n, r) {
        e < 0 && (e = 65535 + e + 1);
        for (var i = 0, o = Math.min(t.length - n, 2); i < o; ++i) t[n + i] = (e & 255 << 8 * (r ? i : 1 - i)) >>> 8 * (r ? i : 1 - i);
      }
      function j(t, e, n, r) {
        e < 0 && (e = 4294967295 + e + 1);
        for (var i = 0, o = Math.min(t.length - n, 4); i < o; ++i) t[n + i] = e >>> 8 * (r ? i : 3 - i) & 255;
      }
      function M(t, e, n, r, i, o) {
        if (n + r > t.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function U(t, e, n, r, o) {
        return o || M(t, 0, n, 4), i.write(t, e, n, r, 23, 4), n + 4;
      }
      function D(t, e, n, r, o) {
        return o || M(t, 0, n, 8), i.write(t, e, n, r, 52, 8), n + 8;
      }
      a.prototype.slice = function (t, e) {
        var n,
          r = this.length;
        if (t = ~~t, e = void 0 === e ? r : ~~e, t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r), e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r), e < t && (e = t), a.TYPED_ARRAY_SUPPORT) (n = this.subarray(t, e)).__proto__ = a.prototype;else {
          var i = e - t;
          n = new a(i, void 0);
          for (var o = 0; o < i; ++o) n[o] = this[o + t];
        }
        return n;
      }, a.prototype.readUIntLE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
        return r;
      }, a.prototype.readUIntBE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = this[t + --e], i = 1; e > 0 && (i *= 256);) r += this[t + --e] * i;
        return r;
      }, a.prototype.readUInt8 = function (t, e) {
        return e || L(t, 1, this.length), this[t];
      }, a.prototype.readUInt16LE = function (t, e) {
        return e || L(t, 2, this.length), this[t] | this[t + 1] << 8;
      }, a.prototype.readUInt16BE = function (t, e) {
        return e || L(t, 2, this.length), this[t] << 8 | this[t + 1];
      }, a.prototype.readUInt32LE = function (t, e) {
        return e || L(t, 4, this.length), (this[t] | this[t + 1] << 8 | this[t + 2] << 16) + 16777216 * this[t + 3];
      }, a.prototype.readUInt32BE = function (t, e) {
        return e || L(t, 4, this.length), 16777216 * this[t] + (this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3]);
      }, a.prototype.readIntLE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = this[t], i = 1, o = 0; ++o < e && (i *= 256);) r += this[t + o] * i;
        return r >= (i *= 128) && (r -= Math.pow(2, 8 * e)), r;
      }, a.prototype.readIntBE = function (t, e, n) {
        t |= 0, e |= 0, n || L(t, e, this.length);
        for (var r = e, i = 1, o = this[t + --r]; r > 0 && (i *= 256);) o += this[t + --r] * i;
        return o >= (i *= 128) && (o -= Math.pow(2, 8 * e)), o;
      }, a.prototype.readInt8 = function (t, e) {
        return e || L(t, 1, this.length), 128 & this[t] ? -1 * (255 - this[t] + 1) : this[t];
      }, a.prototype.readInt16LE = function (t, e) {
        e || L(t, 2, this.length);
        var n = this[t] | this[t + 1] << 8;
        return 32768 & n ? 4294901760 | n : n;
      }, a.prototype.readInt16BE = function (t, e) {
        e || L(t, 2, this.length);
        var n = this[t + 1] | this[t] << 8;
        return 32768 & n ? 4294901760 | n : n;
      }, a.prototype.readInt32LE = function (t, e) {
        return e || L(t, 4, this.length), this[t] | this[t + 1] << 8 | this[t + 2] << 16 | this[t + 3] << 24;
      }, a.prototype.readInt32BE = function (t, e) {
        return e || L(t, 4, this.length), this[t] << 24 | this[t + 1] << 16 | this[t + 2] << 8 | this[t + 3];
      }, a.prototype.readFloatLE = function (t, e) {
        return e || L(t, 4, this.length), i.read(this, t, !0, 23, 4);
      }, a.prototype.readFloatBE = function (t, e) {
        return e || L(t, 4, this.length), i.read(this, t, !1, 23, 4);
      }, a.prototype.readDoubleLE = function (t, e) {
        return e || L(t, 8, this.length), i.read(this, t, !0, 52, 8);
      }, a.prototype.readDoubleBE = function (t, e) {
        return e || L(t, 8, this.length), i.read(this, t, !1, 52, 8);
      }, a.prototype.writeUIntLE = function (t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var i = 1,
          o = 0;
        for (this[e] = 255 & t; ++o < n && (i *= 256);) this[e + o] = t / i & 255;
        return e + n;
      }, a.prototype.writeUIntBE = function (t, e, n, r) {
        (t = +t, e |= 0, n |= 0, r) || B(this, t, e, n, Math.pow(2, 8 * n) - 1, 0);
        var i = n - 1,
          o = 1;
        for (this[e + i] = 255 & t; --i >= 0 && (o *= 256);) this[e + i] = t / o & 255;
        return e + n;
      }, a.prototype.writeUInt8 = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 1, 255, 0), a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), this[e] = 255 & t, e + 1;
      }, a.prototype.writeUInt16LE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : C(this, t, e, !0), e + 2;
      }, a.prototype.writeUInt16BE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 2, 65535, 0), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : C(this, t, e, !1), e + 2;
      }, a.prototype.writeUInt32LE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[e + 3] = t >>> 24, this[e + 2] = t >>> 16, this[e + 1] = t >>> 8, this[e] = 255 & t) : j(this, t, e, !0), e + 4;
      }, a.prototype.writeUInt32BE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 4, 4294967295, 0), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4;
      }, a.prototype.writeIntLE = function (t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var i = Math.pow(2, 8 * n - 1);
          B(this, t, e, n, i - 1, -i);
        }
        var o = 0,
          u = 1,
          s = 0;
        for (this[e] = 255 & t; ++o < n && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + o - 1] && (s = 1), this[e + o] = (t / u >> 0) - s & 255;
        return e + n;
      }, a.prototype.writeIntBE = function (t, e, n, r) {
        if (t = +t, e |= 0, !r) {
          var i = Math.pow(2, 8 * n - 1);
          B(this, t, e, n, i - 1, -i);
        }
        var o = n - 1,
          u = 1,
          s = 0;
        for (this[e + o] = 255 & t; --o >= 0 && (u *= 256);) t < 0 && 0 === s && 0 !== this[e + o + 1] && (s = 1), this[e + o] = (t / u >> 0) - s & 255;
        return e + n;
      }, a.prototype.writeInt8 = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 1, 127, -128), a.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)), t < 0 && (t = 255 + t + 1), this[e] = 255 & t, e + 1;
      }, a.prototype.writeInt16LE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8) : C(this, t, e, !0), e + 2;
      }, a.prototype.writeInt16BE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 2, 32767, -32768), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 8, this[e + 1] = 255 & t) : C(this, t, e, !1), e + 2;
      }, a.prototype.writeInt32LE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 4, 2147483647, -2147483648), a.TYPED_ARRAY_SUPPORT ? (this[e] = 255 & t, this[e + 1] = t >>> 8, this[e + 2] = t >>> 16, this[e + 3] = t >>> 24) : j(this, t, e, !0), e + 4;
      }, a.prototype.writeInt32BE = function (t, e, n) {
        return t = +t, e |= 0, n || B(this, t, e, 4, 2147483647, -2147483648), t < 0 && (t = 4294967295 + t + 1), a.TYPED_ARRAY_SUPPORT ? (this[e] = t >>> 24, this[e + 1] = t >>> 16, this[e + 2] = t >>> 8, this[e + 3] = 255 & t) : j(this, t, e, !1), e + 4;
      }, a.prototype.writeFloatLE = function (t, e, n) {
        return U(this, t, e, !0, n);
      }, a.prototype.writeFloatBE = function (t, e, n) {
        return U(this, t, e, !1, n);
      }, a.prototype.writeDoubleLE = function (t, e, n) {
        return D(this, t, e, !0, n);
      }, a.prototype.writeDoubleBE = function (t, e, n) {
        return D(this, t, e, !1, n);
      }, a.prototype.copy = function (t, e, n, r) {
        if (n || (n = 0), r || 0 === r || (r = this.length), e >= t.length && (e = t.length), e || (e = 0), r > 0 && r < n && (r = n), r === n) return 0;
        if (0 === t.length || 0 === this.length) return 0;
        if (e < 0) throw new RangeError("targetStart out of bounds");
        if (n < 0 || n >= this.length) throw new RangeError("sourceStart out of bounds");
        if (r < 0) throw new RangeError("sourceEnd out of bounds");
        r > this.length && (r = this.length), t.length - e < r - n && (r = t.length - e + n);
        var i,
          o = r - n;
        if (this === t && n < e && e < r) for (i = o - 1; i >= 0; --i) t[i + e] = this[i + n];else if (o < 1e3 || !a.TYPED_ARRAY_SUPPORT) for (i = 0; i < o; ++i) t[i + e] = this[i + n];else Uint8Array.prototype.set.call(t, this.subarray(n, n + o), e);
        return o;
      }, a.prototype.fill = function (t, e, n, r) {
        if ("string" == typeof t) {
          if ("string" == typeof e ? (r = e, e = 0, n = this.length) : "string" == typeof n && (r = n, n = this.length), 1 === t.length) {
            var i = t.charCodeAt(0);
            i < 256 && (t = i);
          }
          if (void 0 !== r && "string" != typeof r) throw new TypeError("encoding must be a string");
          if ("string" == typeof r && !a.isEncoding(r)) throw new TypeError("Unknown encoding: " + r);
        } else "number" == typeof t && (t &= 255);
        if (e < 0 || this.length < e || this.length < n) throw new RangeError("Out of range index");
        if (n <= e) return this;
        var o;
        if (e >>>= 0, n = void 0 === n ? this.length : n >>> 0, t || (t = 0), "number" == typeof t) for (o = e; o < n; ++o) this[o] = t;else {
          var u = a.isBuffer(t) ? t : N(new a(t, r).toString()),
            s = u.length;
          for (o = 0; o < n - e; ++o) this[o + e] = u[o % s];
        }
        return this;
      };
      var I = /[^+\/0-9A-Za-z-_]/g;
      function Y(t) {
        return t < 16 ? "0" + t.toString(16) : t.toString(16);
      }
      function N(t, e) {
        var n;
        e = e || 1 / 0;
        for (var r = t.length, i = null, o = [], u = 0; u < r; ++u) {
          if ((n = t.charCodeAt(u)) > 55295 && n < 57344) {
            if (!i) {
              if (n > 56319) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (u + 1 === r) {
                (e -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (e -= 3) > -1 && o.push(239, 191, 189), i = n;
              continue;
            }
            n = 65536 + (i - 55296 << 10 | n - 56320);
          } else i && (e -= 3) > -1 && o.push(239, 191, 189);
          if (i = null, n < 128) {
            if ((e -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((e -= 2) < 0) break;
            o.push(n >> 6 | 192, 63 & n | 128);
          } else if (n < 65536) {
            if ((e -= 3) < 0) break;
            o.push(n >> 12 | 224, n >> 6 & 63 | 128, 63 & n | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((e -= 4) < 0) break;
            o.push(n >> 18 | 240, n >> 12 & 63 | 128, n >> 6 & 63 | 128, 63 & n | 128);
          }
        }
        return o;
      }
      function F(t) {
        return r.toByteArray(function (t) {
          if ((t = function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
          }(t).replace(I, "")).length < 2) return "";
          for (; t.length % 4 != 0;) t += "=";
          return t;
        }(t));
      }
      function z(t, e, n, r) {
        for (var i = 0; i < r && !(i + n >= e.length || i >= t.length); ++i) e[i + n] = t[i];
        return i;
      }
    }).call(e, n(0));
  }, function (t, e, n) {

    e.byteLength = function (t) {
      return 3 * t.length / 4 - c(t);
    }, e.toByteArray = function (t) {
      var e,
        n,
        r,
        u,
        s,
        a = t.length;
      u = c(t), s = new o(3 * a / 4 - u), n = u > 0 ? a - 4 : a;
      var f = 0;
      for (e = 0; e < n; e += 4) r = i[t.charCodeAt(e)] << 18 | i[t.charCodeAt(e + 1)] << 12 | i[t.charCodeAt(e + 2)] << 6 | i[t.charCodeAt(e + 3)], s[f++] = r >> 16 & 255, s[f++] = r >> 8 & 255, s[f++] = 255 & r;
      2 === u ? (r = i[t.charCodeAt(e)] << 2 | i[t.charCodeAt(e + 1)] >> 4, s[f++] = 255 & r) : 1 === u && (r = i[t.charCodeAt(e)] << 10 | i[t.charCodeAt(e + 1)] << 4 | i[t.charCodeAt(e + 2)] >> 2, s[f++] = r >> 8 & 255, s[f++] = 255 & r);
      return s;
    }, e.fromByteArray = function (t) {
      for (var e, n = t.length, i = n % 3, o = "", u = [], s = 0, a = n - i; s < a; s += 16383) u.push(f(t, s, s + 16383 > a ? a : s + 16383));
      1 === i ? (e = t[n - 1], o += r[e >> 2], o += r[e << 4 & 63], o += "==") : 2 === i && (e = (t[n - 2] << 8) + t[n - 1], o += r[e >> 10], o += r[e >> 4 & 63], o += r[e << 2 & 63], o += "=");
      return u.push(o), u.join("");
    };
    for (var r = [], i = [], o = "undefined" != typeof Uint8Array ? Uint8Array : Array, u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", s = 0, a = u.length; s < a; ++s) r[s] = u[s], i[u.charCodeAt(s)] = s;
    function c(t) {
      var e = t.length;
      if (e % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
      return "=" === t[e - 2] ? 2 : "=" === t[e - 1] ? 1 : 0;
    }
    function f(t, e, n) {
      for (var i, o, u = [], s = e; s < n; s += 3) i = (t[s] << 16 & 16711680) + (t[s + 1] << 8 & 65280) + (255 & t[s + 2]), u.push(r[(o = i) >> 18 & 63] + r[o >> 12 & 63] + r[o >> 6 & 63] + r[63 & o]);
      return u.join("");
    }
    i["-".charCodeAt(0)] = 62, i["_".charCodeAt(0)] = 63;
  }, function (t, e) {
    e.read = function (t, e, n, r, i) {
      var o,
        u,
        s = 8 * i - r - 1,
        a = (1 << s) - 1,
        c = a >> 1,
        f = -7,
        l = n ? i - 1 : 0,
        h = n ? -1 : 1,
        p = t[e + l];
      for (l += h, o = p & (1 << -f) - 1, p >>= -f, f += s; f > 0; o = 256 * o + t[e + l], l += h, f -= 8);
      for (u = o & (1 << -f) - 1, o >>= -f, f += r; f > 0; u = 256 * u + t[e + l], l += h, f -= 8);
      if (0 === o) o = 1 - c;else {
        if (o === a) return u ? NaN : 1 / 0 * (p ? -1 : 1);
        u += Math.pow(2, r), o -= c;
      }
      return (p ? -1 : 1) * u * Math.pow(2, o - r);
    }, e.write = function (t, e, n, r, i, o) {
      var u,
        s,
        a,
        c = 8 * o - i - 1,
        f = (1 << c) - 1,
        l = f >> 1,
        h = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
        p = r ? 0 : o - 1,
        d = r ? 1 : -1,
        g = e < 0 || 0 === e && 1 / e < 0 ? 1 : 0;
      for (e = Math.abs(e), isNaN(e) || e === 1 / 0 ? (s = isNaN(e) ? 1 : 0, u = f) : (u = Math.floor(Math.log(e) / Math.LN2), e * (a = Math.pow(2, -u)) < 1 && (u--, a *= 2), (e += u + l >= 1 ? h / a : h * Math.pow(2, 1 - l)) * a >= 2 && (u++, a /= 2), u + l >= f ? (s = 0, u = f) : u + l >= 1 ? (s = (e * a - 1) * Math.pow(2, i), u += l) : (s = e * Math.pow(2, l - 1) * Math.pow(2, i), u = 0)); i >= 8; t[n + p] = 255 & s, p += d, s /= 256, i -= 8);
      for (u = u << i | s, c += i; c > 0; t[n + p] = 255 & u, p += d, u /= 256, c -= 8);
      t[n + p - d] |= 128 * g;
    };
  }, function (t, e) {
    var n = {}.toString;
    t.exports = Array.isArray || function (t) {
      return "[object Array]" == n.call(t);
    };
  }, function (t, e, n) {

    (function (e) {
      function r(t, e) {
        if (t === e) return 0;
        for (var n = t.length, r = e.length, i = 0, o = Math.min(n, r); i < o; ++i) if (t[i] !== e[i]) {
          n = t[i], r = e[i];
          break;
        }
        return n < r ? -1 : r < n ? 1 : 0;
      }
      function i(t) {
        return e.Buffer && "function" == typeof e.Buffer.isBuffer ? e.Buffer.isBuffer(t) : !(null == t || !t._isBuffer);
      }
      var o = n(27),
        u = Object.prototype.hasOwnProperty,
        s = Array.prototype.slice,
        a = "foo" === function () {}.name;
      function c(t) {
        return Object.prototype.toString.call(t);
      }
      function f(t) {
        return !i(t) && "function" == typeof e.ArrayBuffer && ("function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(t) : !!t && (t instanceof DataView || !!(t.buffer && t.buffer instanceof ArrayBuffer)));
      }
      var l = t.exports = v,
        h = /\s*function\s+([^\(\s]*)\s*/;
      function p(t) {
        if (o.isFunction(t)) {
          if (a) return t.name;
          var e = t.toString().match(h);
          return e && e[1];
        }
      }
      function d(t, e) {
        return "string" == typeof t ? t.length < e ? t : t.slice(0, e) : t;
      }
      function g(t) {
        if (a || !o.isFunction(t)) return o.inspect(t);
        var e = p(t);
        return "[Function" + (e ? ": " + e : "") + "]";
      }
      function y(t, e, n, r, i) {
        throw new l.AssertionError({
          message: n,
          actual: t,
          expected: e,
          operator: r,
          stackStartFunction: i
        });
      }
      function v(t, e) {
        t || y(t, !0, e, "==", l.ok);
      }
      function m(t, e, n, u) {
        if (t === e) return !0;
        if (i(t) && i(e)) return 0 === r(t, e);
        if (o.isDate(t) && o.isDate(e)) return t.getTime() === e.getTime();
        if (o.isRegExp(t) && o.isRegExp(e)) return t.source === e.source && t.global === e.global && t.multiline === e.multiline && t.lastIndex === e.lastIndex && t.ignoreCase === e.ignoreCase;
        if (null !== t && "object" == typeof t || null !== e && "object" == typeof e) {
          if (f(t) && f(e) && c(t) === c(e) && !(t instanceof Float32Array || t instanceof Float64Array)) return 0 === r(new Uint8Array(t.buffer), new Uint8Array(e.buffer));
          if (i(t) !== i(e)) return !1;
          var a = (u = u || {
            actual: [],
            expected: []
          }).actual.indexOf(t);
          return -1 !== a && a === u.expected.indexOf(e) || (u.actual.push(t), u.expected.push(e), function (t, e, n, r) {
            if (null === t || void 0 === t || null === e || void 0 === e) return !1;
            if (o.isPrimitive(t) || o.isPrimitive(e)) return t === e;
            if (n && Object.getPrototypeOf(t) !== Object.getPrototypeOf(e)) return !1;
            var i = b(t),
              u = b(e);
            if (i && !u || !i && u) return !1;
            if (i) return t = s.call(t), e = s.call(e), m(t, e, n);
            var a,
              c,
              f = O(t),
              l = O(e);
            if (f.length !== l.length) return !1;
            for (f.sort(), l.sort(), c = f.length - 1; c >= 0; c--) if (f[c] !== l[c]) return !1;
            for (c = f.length - 1; c >= 0; c--) if (a = f[c], !m(t[a], e[a], n, r)) return !1;
            return !0;
          }(t, e, n, u));
        }
        return n ? t === e : t == e;
      }
      function b(t) {
        return "[object Arguments]" == Object.prototype.toString.call(t);
      }
      function w(t, e) {
        if (!t || !e) return !1;
        if ("[object RegExp]" == Object.prototype.toString.call(e)) return e.test(t);
        try {
          if (t instanceof e) return !0;
        } catch (t) {}
        return !Error.isPrototypeOf(e) && !0 === e.call({}, t);
      }
      function E(t, e, n, r) {
        var i;
        if ("function" != typeof e) throw new TypeError('"block" argument must be a function');
        "string" == typeof n && (r = n, n = null), i = function (t) {
          var e;
          try {
            t();
          } catch (t) {
            e = t;
          }
          return e;
        }(e), r = (n && n.name ? " (" + n.name + ")." : ".") + (r ? " " + r : "."), t && !i && y(i, n, "Missing expected exception" + r);
        var u = "string" == typeof r,
          s = !t && o.isError(i),
          a = !t && i && !n;
        if ((s && u && w(i, n) || a) && y(i, n, "Got unwanted exception" + r), t && i && n && !w(i, n) || !t && i) throw i;
      }
      l.AssertionError = function (t) {
        var e;
        this.name = "AssertionError", this.actual = t.actual, this.expected = t.expected, this.operator = t.operator, t.message ? (this.message = t.message, this.generatedMessage = !1) : (this.message = d(g((e = this).actual), 128) + " " + e.operator + " " + d(g(e.expected), 128), this.generatedMessage = !0);
        var n = t.stackStartFunction || y;
        if (Error.captureStackTrace) Error.captureStackTrace(this, n);else {
          var r = new Error();
          if (r.stack) {
            var i = r.stack,
              o = p(n),
              u = i.indexOf("\n" + o);
            if (u >= 0) {
              var s = i.indexOf("\n", u + 1);
              i = i.substring(s + 1);
            }
            this.stack = i;
          }
        }
      }, o.inherits(l.AssertionError, Error), l.fail = y, l.ok = v, l.equal = function (t, e, n) {
        t != e && y(t, e, n, "==", l.equal);
      }, l.notEqual = function (t, e, n) {
        t == e && y(t, e, n, "!=", l.notEqual);
      }, l.deepEqual = function (t, e, n) {
        m(t, e, !1) || y(t, e, n, "deepEqual", l.deepEqual);
      }, l.deepStrictEqual = function (t, e, n) {
        m(t, e, !0) || y(t, e, n, "deepStrictEqual", l.deepStrictEqual);
      }, l.notDeepEqual = function (t, e, n) {
        m(t, e, !1) && y(t, e, n, "notDeepEqual", l.notDeepEqual);
      }, l.notDeepStrictEqual = function t(e, n, r) {
        m(e, n, !0) && y(e, n, r, "notDeepStrictEqual", t);
      }, l.strictEqual = function (t, e, n) {
        t !== e && y(t, e, n, "===", l.strictEqual);
      }, l.notStrictEqual = function (t, e, n) {
        t === e && y(t, e, n, "!==", l.notStrictEqual);
      }, l.throws = function (t, e, n) {
        E(!0, t, e, n);
      }, l.doesNotThrow = function (t, e, n) {
        E(!1, t, e, n);
      }, l.ifError = function (t) {
        if (t) throw t;
      };
      var O = Object.keys || function (t) {
        var e = [];
        for (var n in t) u.call(t, n) && e.push(n);
        return e;
      };
    }).call(e, n(0));
  }, function (t, e, n) {
    (function (t, r) {
      var i = /%[sdj%]/g;
      e.format = function (t) {
        if (!v(t)) {
          for (var e = [], n = 0; n < arguments.length; n++) e.push(s(arguments[n]));
          return e.join(" ");
        }
        n = 1;
        for (var r = arguments, o = r.length, u = String(t).replace(i, function (t) {
            if ("%%" === t) return "%";
            if (n >= o) return t;
            switch (t) {
              case "%s":
                return String(r[n++]);
              case "%d":
                return Number(r[n++]);
              case "%j":
                try {
                  return JSON.stringify(r[n++]);
                } catch (t) {
                  return "[Circular]";
                }
              default:
                return t;
            }
          }), a = r[n]; n < o; a = r[++n]) g(a) || !w(a) ? u += " " + a : u += " " + s(a);
        return u;
      }, e.deprecate = function (n, i) {
        if (m(t.process)) return function () {
          return e.deprecate(n, i).apply(this, arguments);
        };
        if (!0 === r.noDeprecation) return n;
        var o = !1;
        return function () {
          if (!o) {
            if (r.throwDeprecation) throw new Error(i);
            r.traceDeprecation ? console.trace(i) : console.error(i), o = !0;
          }
          return n.apply(this, arguments);
        };
      };
      var o,
        u = {};
      function s(t, n) {
        var r = {
          seen: [],
          stylize: c
        };
        return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), d(n) ? r.showHidden = n : n && e._extend(r, n), m(r.showHidden) && (r.showHidden = !1), m(r.depth) && (r.depth = 2), m(r.colors) && (r.colors = !1), m(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = a), f(r, t, r.depth);
      }
      function a(t, e) {
        var n = s.styles[e];
        return n ? "[" + s.colors[n][0] + "m" + t + "[" + s.colors[n][1] + "m" : t;
      }
      function c(t, e) {
        return t;
      }
      function f(t, n, r) {
        if (t.customInspect && n && A(n.inspect) && n.inspect !== e.inspect && (!n.constructor || n.constructor.prototype !== n)) {
          var i = n.inspect(r, t);
          return v(i) || (i = f(t, i, r)), i;
        }
        var o = function (t, e) {
          if (m(e)) return t.stylize("undefined", "undefined");
          if (v(e)) {
            var n = "'" + JSON.stringify(e).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
            return t.stylize(n, "string");
          }
          if (y(e)) return t.stylize("" + e, "number");
          if (d(e)) return t.stylize("" + e, "boolean");
          if (g(e)) return t.stylize("null", "null");
        }(t, n);
        if (o) return o;
        var u = Object.keys(n),
          s = function (t) {
            var e = {};
            return t.forEach(function (t, n) {
              e[t] = !0;
            }), e;
          }(u);
        if (t.showHidden && (u = Object.getOwnPropertyNames(n)), O(n) && (u.indexOf("message") >= 0 || u.indexOf("description") >= 0)) return l(n);
        if (0 === u.length) {
          if (A(n)) {
            var a = n.name ? ": " + n.name : "";
            return t.stylize("[Function" + a + "]", "special");
          }
          if (b(n)) return t.stylize(RegExp.prototype.toString.call(n), "regexp");
          if (E(n)) return t.stylize(Date.prototype.toString.call(n), "date");
          if (O(n)) return l(n);
        }
        var c,
          w = "",
          x = !1,
          T = ["{", "}"];
        (p(n) && (x = !0, T = ["[", "]"]), A(n)) && (w = " [Function" + (n.name ? ": " + n.name : "") + "]");
        return b(n) && (w = " " + RegExp.prototype.toString.call(n)), E(n) && (w = " " + Date.prototype.toUTCString.call(n)), O(n) && (w = " " + l(n)), 0 !== u.length || x && 0 != n.length ? r < 0 ? b(n) ? t.stylize(RegExp.prototype.toString.call(n), "regexp") : t.stylize("[Object]", "special") : (t.seen.push(n), c = x ? function (t, e, n, r, i) {
          for (var o = [], u = 0, s = e.length; u < s; ++u) S(e, String(u)) ? o.push(h(t, e, n, r, String(u), !0)) : o.push("");
          return i.forEach(function (i) {
            i.match(/^\d+$/) || o.push(h(t, e, n, r, i, !0));
          }), o;
        }(t, n, r, s, u) : u.map(function (e) {
          return h(t, n, r, s, e, x);
        }), t.seen.pop(), function (t, e, n) {
          if (t.reduce(function (t, e) {
            return e.indexOf("\n") >= 0 && 0, t + e.replace(/\u001b\[\d\d?m/g, "").length + 1;
          }, 0) > 60) return n[0] + ("" === e ? "" : e + "\n ") + " " + t.join(",\n  ") + " " + n[1];
          return n[0] + e + " " + t.join(", ") + " " + n[1];
        }(c, w, T)) : T[0] + w + T[1];
      }
      function l(t) {
        return "[" + Error.prototype.toString.call(t) + "]";
      }
      function h(t, e, n, r, i, o) {
        var u, s, a;
        if ((a = Object.getOwnPropertyDescriptor(e, i) || {
          value: e[i]
        }).get ? s = a.set ? t.stylize("[Getter/Setter]", "special") : t.stylize("[Getter]", "special") : a.set && (s = t.stylize("[Setter]", "special")), S(r, i) || (u = "[" + i + "]"), s || (t.seen.indexOf(a.value) < 0 ? (s = g(n) ? f(t, a.value, null) : f(t, a.value, n - 1)).indexOf("\n") > -1 && (s = o ? s.split("\n").map(function (t) {
          return "  " + t;
        }).join("\n").substr(2) : "\n" + s.split("\n").map(function (t) {
          return "   " + t;
        }).join("\n")) : s = t.stylize("[Circular]", "special")), m(u)) {
          if (o && i.match(/^\d+$/)) return s;
          (u = JSON.stringify("" + i)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (u = u.substr(1, u.length - 2), u = t.stylize(u, "name")) : (u = u.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), u = t.stylize(u, "string"));
        }
        return u + ": " + s;
      }
      function p(t) {
        return Array.isArray(t);
      }
      function d(t) {
        return "boolean" == typeof t;
      }
      function g(t) {
        return null === t;
      }
      function y(t) {
        return "number" == typeof t;
      }
      function v(t) {
        return "string" == typeof t;
      }
      function m(t) {
        return void 0 === t;
      }
      function b(t) {
        return w(t) && "[object RegExp]" === x(t);
      }
      function w(t) {
        return "object" == typeof t && null !== t;
      }
      function E(t) {
        return w(t) && "[object Date]" === x(t);
      }
      function O(t) {
        return w(t) && ("[object Error]" === x(t) || t instanceof Error);
      }
      function A(t) {
        return "function" == typeof t;
      }
      function x(t) {
        return Object.prototype.toString.call(t);
      }
      function T(t) {
        return t < 10 ? "0" + t.toString(10) : t.toString(10);
      }
      e.debuglog = function (t) {
        if (m(o) && (o = Object({
          NODE_ENV: "production"
        }).NODE_DEBUG || ""), t = t.toUpperCase(), !u[t]) if (new RegExp("\\b" + t + "\\b", "i").test(o)) {
          var n = r.pid;
          u[t] = function () {
            var r = e.format.apply(e, arguments);
            console.error("%s %d: %s", t, n, r);
          };
        } else u[t] = function () {};
        return u[t];
      }, e.inspect = s, s.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
      }, s.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        regexp: "red"
      }, e.isArray = p, e.isBoolean = d, e.isNull = g, e.isNullOrUndefined = function (t) {
        return null == t;
      }, e.isNumber = y, e.isString = v, e.isSymbol = function (t) {
        return "symbol" == typeof t;
      }, e.isUndefined = m, e.isRegExp = b, e.isObject = w, e.isDate = E, e.isError = O, e.isFunction = A, e.isPrimitive = function (t) {
        return null === t || "boolean" == typeof t || "number" == typeof t || "string" == typeof t || "symbol" == typeof t || void 0 === t;
      }, e.isBuffer = n(29);
      var _ = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      function S(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      e.log = function () {
        var t, n;
        console.log("%s - %s", (t = new Date(), n = [T(t.getHours()), T(t.getMinutes()), T(t.getSeconds())].join(":"), [t.getDate(), _[t.getMonth()], n].join(" ")), e.format.apply(e, arguments));
      }, e.inherits = n(30), e._extend = function (t, e) {
        if (!e || !w(e)) return t;
        for (var n = Object.keys(e), r = n.length; r--;) t[n[r]] = e[n[r]];
        return t;
      };
    }).call(e, n(0), n(28));
  }, function (t, e) {
    var n,
      r,
      i = t.exports = {};
    function o() {
      throw new Error("setTimeout has not been defined");
    }
    function u() {
      throw new Error("clearTimeout has not been defined");
    }
    function s(t) {
      if (n === setTimeout) return setTimeout(t, 0);
      if ((n === o || !n) && setTimeout) return n = setTimeout, setTimeout(t, 0);
      try {
        return n(t, 0);
      } catch (e) {
        try {
          return n.call(null, t, 0);
        } catch (e) {
          return n.call(this, t, 0);
        }
      }
    }
    !function () {
      try {
        n = "function" == typeof setTimeout ? setTimeout : o;
      } catch (t) {
        n = o;
      }
      try {
        r = "function" == typeof clearTimeout ? clearTimeout : u;
      } catch (t) {
        r = u;
      }
    }();
    var a,
      c = [],
      f = !1,
      l = -1;
    function h() {
      f && a && (f = !1, a.length ? c = a.concat(c) : l = -1, c.length && p());
    }
    function p() {
      if (!f) {
        var t = s(h);
        f = !0;
        for (var e = c.length; e;) {
          for (a = c, c = []; ++l < e;) a && a[l].run();
          l = -1, e = c.length;
        }
        a = null, f = !1, function (t) {
          if (r === clearTimeout) return clearTimeout(t);
          if ((r === u || !r) && clearTimeout) return r = clearTimeout, clearTimeout(t);
          try {
            r(t);
          } catch (e) {
            try {
              return r.call(null, t);
            } catch (e) {
              return r.call(this, t);
            }
          }
        }(t);
      }
    }
    function d(t, e) {
      this.fun = t, this.array = e;
    }
    function g() {}
    i.nextTick = function (t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      c.push(new d(t, e)), 1 !== c.length || f || s(p);
    }, d.prototype.run = function () {
      this.fun.apply(null, this.array);
    }, i.title = "browser", i.browser = !0, i.env = {}, i.argv = [], i.version = "", i.versions = {}, i.on = g, i.addListener = g, i.once = g, i.off = g, i.removeListener = g, i.removeAllListeners = g, i.emit = g, i.prependListener = g, i.prependOnceListener = g, i.listeners = function (t) {
      return [];
    }, i.binding = function (t) {
      throw new Error("process.binding is not supported");
    }, i.cwd = function () {
      return "/";
    }, i.chdir = function (t) {
      throw new Error("process.chdir is not supported");
    }, i.umask = function () {
      return 0;
    };
  }, function (t, e) {
    t.exports = function (t) {
      return t && "object" == typeof t && "function" == typeof t.copy && "function" == typeof t.fill && "function" == typeof t.readUInt8;
    };
  }, function (t, e) {
    "function" == typeof Object.create ? t.exports = function (t, e) {
      t.super_ = e, t.prototype = Object.create(e.prototype, {
        constructor: {
          value: t,
          enumerable: !1,
          writable: !0,
          configurable: !0
        }
      });
    } : t.exports = function (t, e) {
      t.super_ = e;
      var n = function () {};
      n.prototype = e.prototype, t.prototype = new n(), t.prototype.constructor = t;
    };
  }, function (t, e, n) {

    t.exports = function (t, e, n) {
      var r = e.value,
        i = t.innerText,
        o = i.toLowerCase().indexOf(r.toLowerCase()),
        u = r.length;
      return r && o >= 0 ? i.substring(0, o) + '<span class="' + n + '">' + i.substr(o, u) + "</span>" + i.substring(o + u) : i;
    };
  }, function (t, e, n) {

    var r,
      i = n(33),
      o = (r = i) && r.__esModule ? r : {
        default: r
      };
    var u = {
      input: ".combobox",
      list: ".listbox",
      options: ".option",
      groups: null,
      openClass: "open",
      activeClass: "active",
      selectedClass: "selected",
      useLiveRegion: !0,
      allowEmpty: !0,
      multiselect: !1,
      noResultsText: null,
      selectionValue: function (t) {
        return t.map(function (t) {
          return t.innerText.trim();
        }).join(" - ");
      },
      optionValue: function (t) {
        return t.innerHTML;
      },
      announcement: {
        count: function (t) {
          return t + " options available";
        },
        selected: "Selected."
      },
      filter: "contains",
      autoFilter: !0
    };
    t.exports = function (t) {
      var e = {},
        n = {};
      return t.announcement = t.announcement || {}, (0, o.default)(n, u.announcement, t.announcement), (0, o.default)(e, u, t), e.announcement = n, e;
    };
  }, function (t, e, n) {

    var r = n(34);
    function i(t, e) {
      for (var n in e) o(e, n) && (t[n] = e[n]);
    }
    function o(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }
    t.exports = function (t) {
      r(t) || (t = {});
      for (var e = arguments.length, n = 1; n < e; n++) {
        var o = arguments[n];
        r(o) && i(t, o);
      }
      return t;
    };
  }, function (t, e, n) {

    t.exports = function (t) {
      return void 0 !== t && null !== t && ("object" == typeof t || "function" == typeof t);
    };
  }, function (t, e, n) {

    t.exports = function (t, e, n, r, i) {
      var o = "true" === t.getAttribute("aria-selected"),
        u = e.announcement.selected,
        s = t.innerText;
      s = r && e.announcement && e.announcement.groupChange ? e.announcement.groupChange(i) + " " + s : s, n(s = o && u ? s + " " + u : s, 500);
    };
  }]);
});
}(dist));

var Combobo = /*@__PURE__*/_commonjsHelpers.getDefaultExportFromCjs(dist.exports);

const countries = [{
  "name": "Afghanistan",
  "code": "AF",
  "flag": "🇦🇫"
}, {
  "name": "Egypt",
  "code": "EG",
  "flag": "🇪🇬"
}, {
  "name": "Åland Islands",
  "code": "AX",
  "flag": "🇦🇽"
}, {
  "name": "Albania",
  "code": "AL",
  "flag": "🇦🇱"
}, {
  "name": "Algeria",
  "code": "DZ",
  "flag": "🇩🇿"
}, {
  "name": "American Samoa",
  "code": "AS",
  "flag": "🇦🇸"
}, {
  "name": "Andorra",
  "code": "AD",
  "flag": "🇦🇩"
}, {
  "name": "Angola",
  "code": "AO",
  "flag": "🇦🇴"
}, {
  "name": "Anguilla",
  "code": "AI",
  "flag": "🇦🇮"
}, {
  "name": "Antarctica",
  "code": "AQ",
  "flag": "🇦🇶"
}, {
  "name": "Antigua and Barbuda",
  "code": "AG",
  "flag": "🇦🇬"
}, {
  "name": "Equatorial Guinea",
  "code": "GQ",
  "flag": "🇬🇶"
}, {
  "name": "Argentina",
  "code": "AR",
  "flag": "🇦🇷"
}, {
  "name": "Armenia",
  "code": "AM",
  "flag": "🇦🇲"
}, {
  "name": "Aruba",
  "code": "AW",
  "flag": "🇦🇼"
}, {
  "name": "Azerbaijan",
  "code": "AZ",
  "flag": "🇦🇿"
}, {
  "name": "Ethiopia",
  "code": "ET",
  "flag": "🇪🇹"
}, {
  "name": "Australia",
  "code": "AU",
  "flag": "🇦🇺"
}, {
  "name": "Bahamas",
  "code": "BS",
  "flag": "🇧🇸"
}, {
  "name": "Bahrain",
  "code": "BH",
  "flag": "🇧🇭"
}, {
  "name": "Bangladesh",
  "code": "BD",
  "flag": "🇧🇩"
}, {
  "name": "Barbados",
  "code": "BB",
  "flag": "🇧🇧"
}, {
  "name": "Belarus",
  "code": "BY",
  "flag": "🇧🇾"
}, {
  "name": "Belgium",
  "code": "BE",
  "flag": "🇧🇪"
}, {
  "name": "Belize",
  "code": "BZ",
  "flag": "🇧🇿"
}, {
  "name": "Benin",
  "code": "BJ",
  "flag": "🇧🇯"
}, {
  "name": "Bermuda",
  "code": "BM",
  "flag": "🇧🇲"
}, {
  "name": "Bhutan",
  "code": "BT",
  "flag": "🇧🇹"
}, {
  "name": "Bolivia",
  "flag": "🇧🇴"
}, {
  "name": "Bosnia and Herzegovina",
  "code": "BA",
  "flag": "🇧🇦"
}, {
  "name": "Botswana",
  "code": "BW",
  "flag": "🇧🇼"
}, {
  "name": "Bouvet Island",
  "code": "BV",
  "flag": "🇧🇻"
}, {
  "name": "Brazil",
  "code": "BR",
  "flag": "🇧🇷"
}, {
  "name": "British Indian Ocean Territory",
  "code": "IO",
  "flag": "🇮🇴"
}, {
  "name": "Brunei",
  "code": "BN",
  "flag": "🇧🇳"
}, {
  "name": "Bulgaria",
  "code": "BG",
  "flag": "🇧🇬"
}, {
  "name": "Burkina Faso",
  "code": "BF",
  "flag": "🇧🇫"
}, {
  "name": "Burundi",
  "code": "BI",
  "flag": "🇧🇮"
}, {
  "name": "Chile",
  "code": "CL",
  "flag": "🇨🇱"
}, {
  "name": "China",
  "code": "CN",
  "flag": "🇨🇳"
}, {
  "name": "Cook Islands",
  "code": "CK",
  "flag": "🇨🇰"
}, {
  "name": "Costa Rica",
  "code": "CR",
  "flag": "🇨🇷"
}, {
  "name": "Curacao",
  "code": "CW",
  "flag": "🇨🇼"
}, {
  "name": "Denmark",
  "code": "DK",
  "flag": "🇩🇰"
}, {
  "name": "Democratic Republic of the Congo",
  "code": "CD",
  "flag": "🇨🇩"
}, {
  "name": "Germany",
  "code": "DE",
  "flag": "🇩🇪"
}, {
  "name": "Dominica",
  "code": "DM",
  "flag": "🇩🇲"
}, {
  "name": "Dominican Republic",
  "code": "DO",
  "flag": "🇩🇴"
}, {
  "name": "Djibouti",
  "code": "DJ",
  "flag": "🇩🇯"
}, {
  "name": "Ecuador",
  "code": "EC",
  "flag": "🇪🇨"
}, {
  "name": "El Salvador",
  "code": "SV",
  "flag": "🇸🇻"
}, {
  "name": "Ivory Coast",
  "code": "CI",
  "flag": "🇨🇮"
}, {
  "name": "Eritrea",
  "code": "ER",
  "flag": "🇪🇷"
}, {
  "name": "Estonia",
  "code": "EE",
  "flag": "🇪🇪"
}, {
  "name": "Eswatini",
  "code": "SZ",
  "flag": "🇸🇿"
}, {
  "name": "Falkland Islands",
  "code": "FK",
  "flag": "🇫🇰"
}, {
  "name": "Faroe Islands",
  "code": "FO",
  "flag": "🇫🇴"
}, {
  "name": "Fiji",
  "code": "FJ",
  "flag": "🇫🇯"
}, {
  "name": "Finland",
  "code": "FI",
  "flag": "🇫🇮"
}, {
  "name": "Federated States of Micronesia",
  "code": "FM",
  "flag": "🇫🇲"
}, {
  "name": "France",
  "code": "FR",
  "flag": "🇫🇷"
}, {
  "name": "French Guiana",
  "code": "GF",
  "flag": "🇬🇫"
}, {
  "name": "French Polynesia",
  "code": "PF",
  "flag": "🇵🇫"
}, {
  "name": "French Southern and Antarctic Lands",
  "code": "TF",
  "flag": "🇹🇫"
}, {
  "name": "Principality of Monaco",
  "code": "MC",
  "flag": "🇲🇨"
}, {
  "name": "Gabon",
  "code": "GA",
  "flag": "🇬🇦"
}, {
  "name": "Gambia",
  "code": "GM",
  "flag": "🇬🇲"
}, {
  "name": "Georgia",
  "code": "GE",
  "flag": "🇬🇪"
}, {
  "name": "Ghana",
  "code": "GH",
  "flag": "🇬🇭"
}, {
  "name": "Gibraltar",
  "code": "GI",
  "flag": "🇬🇮"
}, {
  "name": "Grenada",
  "code": "GD",
  "flag": "🇬🇩"
}, {
  "name": "Greece",
  "code": "GR",
  "flag": "🇬🇷"
}, {
  "name": "Greenland",
  "code": "GL",
  "flag": "🇬🇱"
}, {
  "name": "Guadeloupe",
  "code": "GP",
  "flag": "🇬🇵"
}, {
  "name": "Guam",
  "code": "GU",
  "flag": "🇬🇺"
}, {
  "name": "Guatemala",
  "code": "GT",
  "flag": "🇬🇹"
}, {
  "name": "Guernsey",
  "code": "GG",
  "flag": "🇬🇬"
}, {
  "name": "Guinea",
  "code": "GN",
  "flag": "🇬🇳"
}, {
  "name": "Guinea-Bissau",
  "code": "GW",
  "flag": "🇬🇼"
}, {
  "name": "Guyana",
  "code": "GY",
  "flag": "🇬🇾"
}, {
  "name": "Haiti",
  "code": "HT",
  "flag": "🇭🇹"
}, {
  "name": "Heard Island and McDonald Islands",
  "code": "HM",
  "flag": "🇭🇲"
}, {
  "name": "Honduras",
  "code": "HN",
  "flag": "🇭🇳"
}, {
  "name": "Hong Kong",
  "code": "HK",
  "flag": "🇭🇰"
}, {
  "name": "India",
  "code": "IN",
  "flag": "🇮🇳"
}, {
  "name": "Indonesia",
  "code": "ID",
  "flag": "🇮🇩"
}, {
  "name": "Isle of Man",
  "code": "IM",
  "flag": "🇮🇲"
}, {
  "name": "Iraq",
  "code": "IQ",
  "flag": "🇮🇶"
}, {
  "name": "Iran",
  "code": "IR",
  "flag": "🇮🇷"
}, {
  "name": "Ireland",
  "code": "IE",
  "flag": "🇮🇪"
}, {
  "name": "Iceland",
  "code": "IS",
  "flag": "🇮🇸"
}, {
  "name": "Israel",
  "code": "IL",
  "flag": "🇮🇱"
}, {
  "name": "Italy",
  "code": "IT",
  "flag": "🇮🇹"
}, {
  "name": "Jamaica",
  "code": "JM",
  "flag": "🇯🇲"
}, {
  "name": "Japan",
  "code": "JP",
  "flag": "🇯🇵"
}, {
  "name": "Yemen",
  "code": "YE",
  "flag": "🇾🇪"
}, {
  "name": "Jersey",
  "code": "JE",
  "flag": "🇯🇪"
}, {
  "name": "Jordan",
  "code": "JO",
  "flag": "🇯🇴"
}, {
  "name": "British Virgin Islands",
  "code": "VG",
  "flag": "🇻🇬"
}, {
  "name": "Virgin Islands",
  "code": "VI",
  "flag": "🇻🇮"
}, {
  "name": "Cayman Islands",
  "code": "KY",
  "flag": "🇰🇾"
}, {
  "name": "Cambodia",
  "code": "KH",
  "flag": "🇰🇭"
}, {
  "name": "Cameroon",
  "code": "CM",
  "flag": "🇨🇲"
}, {
  "name": "Canada",
  "code": "CA",
  "flag": "🇨🇦"
}, {
  "name": "Cape Verde",
  "code": "CV",
  "flag": "🇨🇻"
}, {
  "name": "Caribbean Netherlands",
  "code": "BQ",
  "flag": "🇧🇶"
}, {
  "name": "Kazakhstan",
  "code": "KZ",
  "flag": "🇰🇿"
}, {
  "name": "Qatar",
  "code": "QA",
  "flag": "🇶🇦"
}, {
  "name": "Kenya",
  "code": "KE",
  "flag": "🇰🇪"
}, {
  "name": "Kyrgyzstan",
  "code": "KG",
  "flag": "🇰🇬"
}, {
  "name": "Kiribati",
  "code": "KI",
  "flag": "🇰🇮"
}, {
  "name": "United States Minor Outlying Islands",
  "code": "UM",
  "flag": "🇺🇲"
}, {
  "name": "Cocos (Keeling) Islands",
  "code": "CC",
  "flag": "🇨🇨"
}, {
  "name": "Colombia",
  "code": "CO",
  "flag": "🇨🇴"
}, {
  "name": "Comoros",
  "code": "KM",
  "flag": "🇰🇲"
}, {
  "name": "Kosovo",
  "code": "XK",
  "flag": "🇽🇰"
}, {
  "name": "Croatia",
  "code": "HR",
  "flag": "🇭🇷"
}, {
  "name": "Cuba",
  "code": "CU",
  "flag": "🇨🇺"
}, {
  "name": "Kuwait",
  "code": "KW",
  "flag": "🇰🇼"
}, {
  "name": "Laos",
  "code": "LA",
  "flag": "🇱🇦"
}, {
  "name": "Lesotho",
  "code": "LS",
  "flag": "🇱🇸"
}, {
  "name": "Latvia",
  "code": "LV",
  "flag": "🇱🇻"
}, {
  "name": "Lebanon",
  "code": "LB",
  "flag": "🇱🇧"
}, {
  "name": "Liberia",
  "code": "LR",
  "flag": "🇱🇷"
}, {
  "name": "Libya",
  "code": "LY",
  "flag": "🇱🇾"
}, {
  "name": "Liechtenstein",
  "code": "LI",
  "flag": "🇱🇮"
}, {
  "name": "Lithuania",
  "code": "LT",
  "flag": "🇱🇹"
}, {
  "name": "Luxembourg",
  "code": "LU",
  "flag": "🇱🇺"
}, {
  "name": "Macao",
  "code": "MO",
  "flag": "🇲🇴"
}, {
  "name": "Madagascar",
  "code": "MG",
  "flag": "🇲🇬"
}, {
  "name": "Malawi",
  "code": "MW",
  "flag": "🇲🇼"
}, {
  "name": "Malaysia",
  "code": "MY",
  "flag": "🇲🇾"
}, {
  "name": "Maldives",
  "code": "MV",
  "flag": "🇲🇻"
}, {
  "name": "Mali",
  "code": "ML",
  "flag": "🇲🇱"
}, {
  "name": "Malta",
  "code": "MT",
  "flag": "🇲🇹"
}, {
  "name": "Morocco",
  "code": "MA",
  "flag": "🇲🇦"
}, {
  "name": "Marshall Islands",
  "code": "MH",
  "flag": "🇲🇭"
}, {
  "name": "Martinique",
  "code": "MQ",
  "flag": "🇲🇶"
}, {
  "name": "Mauritania",
  "code": "MR",
  "flag": "🇲🇷"
}, {
  "name": "Mauritius",
  "code": "MU",
  "flag": "🇲🇺"
}, {
  "name": "Mayotte",
  "code": "YT",
  "flag": "🇾🇹"
}, {
  "name": "Mexico",
  "code": "MX",
  "flag": "🇲🇽"
}, {
  "name": "Moldova",
  "code": "MD",
  "flag": "🇲🇩"
}, {
  "name": "Mongolia",
  "code": "MN",
  "flag": "🇲🇳"
}, {
  "name": "Montenegro",
  "code": "ME",
  "flag": "🇲🇪"
}, {
  "name": "Montserrat",
  "code": "MS",
  "flag": "🇲🇸"
}, {
  "name": "Mozambique",
  "code": "MZ",
  "flag": "🇲🇿"
}, {
  "name": "Myanmar",
  "code": "MM",
  "flag": "🇲🇲"
}, {
  "name": "Namibia",
  "code": "NA",
  "flag": "🇳🇦"
}, {
  "name": "Nauru",
  "code": "NR",
  "flag": "🇳🇷"
}, {
  "name": "Nepal",
  "code": "NP",
  "flag": "🇳🇵"
}, {
  "name": "New Caledonia",
  "code": "NC",
  "flag": "🇳🇨"
}, {
  "name": "New Zealand",
  "code": "NZ",
  "flag": "🇳🇿"
}, {
  "name": "Nicaragua",
  "code": "NI",
  "flag": "🇳🇮"
}, {
  "name": "Netherlands",
  "code": "NL",
  "flag": "🇳🇱"
}, {
  "name": "Niger",
  "code": "NE",
  "flag": "🇳🇪"
}, {
  "name": "Nigeria",
  "code": "NG",
  "flag": "🇳🇬"
}, {
  "name": "Niue",
  "code": "NU",
  "flag": "🇳🇺"
}, {
  "name": "North Korea",
  "code": "KP",
  "flag": "🇰🇵"
}, {
  "name": "Northern Mariana Islands",
  "code": "MP",
  "flag": "🇲🇵"
}, {
  "name": "North Macedonia",
  "code": "MK",
  "flag": "🇲🇰"
}, {
  "name": "Norfolk Island",
  "code": "NF",
  "flag": "🇳🇫"
}, {
  "name": "Norway",
  "code": "NO",
  "flag": "🇳🇴"
}, {
  "name": "Oman",
  "code": "OM",
  "flag": "🇴🇲"
}, {
  "name": "Austria",
  "code": "AT",
  "flag": "🇦🇹"
}, {
  "name": "East Timor",
  "code": "TL",
  "flag": "🇹🇱"
}, {
  "name": "Pakistan",
  "code": "PK",
  "flag": "🇵🇰"
}, {
  "name": "Palestine",
  "code": "PS",
  "flag": "🇵🇸"
}, {
  "name": "Palau",
  "code": "PW",
  "flag": "🇵🇼"
}, {
  "name": "Panama",
  "code": "PA",
  "flag": "🇵🇦"
}, {
  "name": "Papua New Guinea",
  "code": "PG",
  "flag": "🇵🇬"
}, {
  "name": "Paraguay",
  "code": "PY",
  "flag": "🇵🇾"
}, {
  "name": "Peru",
  "code": "PE",
  "flag": "🇵🇪"
}, {
  "name": "Philippines",
  "code": "PH",
  "flag": "🇵🇭"
}, {
  "name": "Pitcairn Islands",
  "code": "PN",
  "flag": "🇵🇳"
}, {
  "name": "Poland",
  "code": "PL",
  "flag": "🇵🇱"
}, {
  "name": "Portugal",
  "code": "PT",
  "flag": "🇵🇹"
}, {
  "name": "Puerto Rico",
  "code": "PR",
  "flag": "🇵🇷"
}, {
  "name": "Republic of the Congo",
  "code": "CG",
  "flag": "🇨🇬"
}, {
  "name": "Reunion",
  "code": "RE",
  "flag": "🇷🇪"
}, {
  "name": "Rwanda",
  "code": "RW",
  "flag": "🇷🇼"
}, {
  "name": "Romania",
  "code": "RO",
  "flag": "🇷🇴"
}, {
  "name": "Russia",
  "code": "RU",
  "flag": "🇷🇺"
}, {
  "name": "Saint Martin",
  "code": "MF",
  "flag": "🇲🇫"
}, {
  "name": "Solomon Islands",
  "code": "SB",
  "flag": "🇸🇧"
}, {
  "name": "Zambia",
  "code": "ZM",
  "flag": "🇿🇲"
}, {
  "name": "Samoa",
  "code": "WS",
  "flag": "🇼🇸"
}, {
  "name": "San Marino",
  "code": "SM",
  "flag": "🇸🇲"
}, {
  "name": "Saint Barthelemy",
  "code": "BL",
  "flag": "🇧🇱"
}, {
  "name": "Sao Tome and Principe",
  "code": "ST",
  "flag": "🇸🇹"
}, {
  "name": "Saudi Arabia",
  "code": "SA",
  "flag": "🇸🇦"
}, {
  "name": "Sweden",
  "code": "SE",
  "flag": "🇸🇪"
}, {
  "name": "Switzerland",
  "code": "CH",
  "flag": "🇨🇭"
}, {
  "name": "Senegal",
  "code": "SN",
  "flag": "🇸🇳"
}, {
  "name": "Serbia",
  "code": "RS",
  "flag": "🇷🇸"
}, {
  "name": "Seychelles",
  "code": "SC",
  "flag": "🇸🇨"
}, {
  "name": "Sierra Leone",
  "code": "SL",
  "flag": "🇸🇱"
}, {
  "name": "Zimbabwe",
  "code": "ZW",
  "flag": "🇿🇼"
}, {
  "name": "Singapore",
  "code": "SG",
  "flag": "🇸🇬"
}, {
  "name": "Sint Maarten",
  "code": "SX",
  "flag": "🇸🇽"
}, {
  "name": "Slovakia",
  "code": "SK",
  "flag": "🇸🇰"
}, {
  "name": "Slovenia",
  "code": "SI",
  "flag": "🇸🇮"
}, {
  "name": "Somalia",
  "code": "SO",
  "flag": "🇸🇴"
}, {
  "name": "Spain",
  "code": "ES",
  "flag": "🇪🇸"
}, {
  "name": "Sri Lanka",
  "code": "LK",
  "flag": "🇱🇰"
}, {
  "name": "Saint Helena, Ascension and Tristan da Cunha",
  "code": "SH",
  "flag": "🇸🇭"
}, {
  "name": "Saint Kitts and Nevis",
  "code": "KN",
  "flag": "🇰🇳"
}, {
  "name": "Saint Lucia",
  "code": "LC",
  "flag": "🇱🇨"
}, {
  "name": "Saint Pierre and Miquelon",
  "code": "PM",
  "flag": "🇵🇲"
}, {
  "name": "Saint Vincent and the Grenadines",
  "code": "VC",
  "flag": "🇻🇨"
}, {
  "name": "South Africa",
  "code": "ZA",
  "flag": "🇿🇦"
}, {
  "name": "Sudan",
  "code": "SD",
  "flag": "🇸🇩"
}, {
  "name": "South Georgia and South Sandwich Islands",
  "code": "GS",
  "flag": "🇬🇸"
}, {
  "name": "South Korea",
  "code": "KR",
  "flag": "🇰🇷"
}, {
  "name": "South Sudan",
  "code": "SS",
  "flag": "🇸🇸"
}, {
  "name": "Suriname",
  "code": "SR",
  "flag": "🇸🇷"
}, {
  "name": "Svalbard",
  "code": "SJ",
  "flag": "🇸🇯"
}, {
  "name": "Syria",
  "code": "SY",
  "flag": "🇸🇾"
}, {
  "name": "Tajikistan",
  "code": "TJ",
  "flag": "🇹🇯"
}, {
  "name": "Taiwan",
  "code": "TW",
  "flag": "🇹🇼"
}, {
  "name": "Tanzania",
  "code": "TZ",
  "flag": "🇹🇿"
}, {
  "name": "Thailand",
  "code": "TH",
  "flag": "🇹🇭"
}, {
  "name": "Togo",
  "code": "TG",
  "flag": "🇹🇬"
}, {
  "name": "Tokelau",
  "code": "TK",
  "flag": "🇹🇰"
}, {
  "name": "Tonga",
  "code": "TO",
  "flag": "🇹🇴"
}, {
  "name": "Trinidad and Tobago",
  "code": "TT",
  "flag": "🇹🇹"
}, {
  "name": "Chad",
  "code": "TD",
  "flag": "🇹🇩"
}, {
  "name": "Czechia",
  "code": "CZ",
  "flag": "🇨🇿"
}, {
  "name": "Tunisia",
  "code": "TN",
  "flag": "🇹🇳"
}, {
  "name": "Turkey",
  "code": "TR",
  "flag": "🇹🇷"
}, {
  "name": "Turkmenistan",
  "code": "TM",
  "flag": "🇹🇲"
}, {
  "name": "Turks and Caicos Islands",
  "code": "TC",
  "flag": "🇹🇨"
}, {
  "name": "Tuvalu",
  "code": "TV",
  "flag": "🇹🇻"
}, {
  "name": "Uganda",
  "code": "UG",
  "flag": "🇺🇬"
}, {
  "name": "Ukraine",
  "code": "UA",
  "flag": "🇺🇦"
}, {
  "name": "Hungary",
  "code": "HU",
  "flag": "🇭🇺"
}, {
  "name": "Uruguay",
  "code": "UY",
  "flag": "🇺🇾"
}, {
  "name": "Uzbekistan",
  "code": "UZ",
  "flag": "🇺🇿"
}, {
  "name": "Vanuatu",
  "code": "VU",
  "flag": "🇻🇺"
}, {
  "name": "Vatican City",
  "code": "VA",
  "flag": "🇻🇦"
}, {
  "name": "Venezuela",
  "code": "VE",
  "flag": "🇻🇪"
}, {
  "name": "United Arab Emirates",
  "code": "AE",
  "flag": "🇦🇪"
}, {
  "name": "United States of America",
  "code": "US",
  "flag": "🇺🇸"
}, {
  "name": "United Kingdom",
  "code": "GB",
  "flag": "🇬🇧"
}, {
  "name": "Vietnam",
  "code": "VN",
  "flag": "🇻🇳"
}, {
  "name": "Wallis and Futuna",
  "code": "WF",
  "flag": "🇼🇫"
}, {
  "name": "Christmas Island",
  "code": "CX",
  "flag": "🇨🇽"
}, {
  "name": "Western Sahara",
  "code": "EH",
  "flag": "🇪🇭"
}, {
  "name": "Central African Republic",
  "code": "CF",
  "flag": "🇨🇫"
}, {
  "name": "Cyprus",
  "code": "CY",
  "flag": "🇨🇾"
}];

const CountrySelect = ({
  formId,
  id,
  label,
  field,
  validations,
  defaultValue = '',
  placeholder
}) => {
  const elInputRef = React.useRef(null);
  const [country, setCountry] = React.useState(defaultValue);
  const selectFormValidationSent = makeSelectFormValidationSent(formId);
  const formValidationSent = reactRedux.useSelector(selectFormValidationSent);
  const [a11yInvalid, setA11yInvalid] = React.useState('');
  const isRequired = validations && validations.required ? true : false;
  React.useEffect(() => {
    if (formValidationSent) setA11yInvalid(doA11yValidation(country, field, true));
  }, [formValidationSent]);
  const dispatch = reactRedux.useDispatch();
  const doUpdate = value => {
    setCountry(value);
    dispatch(setValue(formId, id, value));
    setA11yInvalid(doA11yValidation(value, field, formValidationSent));
  };
  const onKeyDown = evt => {
    if (evt.key === 'Enter') {
      doUpdate(evt.target.value);
    }
  };
  React.useEffect(() => {
    if (elInputRef !== null && elInputRef !== void 0 && elInputRef.current) {
      var _elInputRef$current;
      const combo = new Combobo({
        input: elInputRef === null || elInputRef === void 0 ? void 0 : elInputRef.current,
        list: '.input__countries .input__listbox',
        noResultsText: 'No countries found.',
        onSelect: value => {
          doUpdate(value);
        },
        onKeyDown: evt => {
          if (evt.key === 'Escape') combo.close();
        }
      });
      elInputRef === null || elInputRef === void 0 ? void 0 : (_elInputRef$current = elInputRef.current) === null || _elInputRef$current === void 0 ? void 0 : _elInputRef$current.addEventListener('keydown', onKeyDown);
      return () => {
        var _elInputRef$current2;
        elInputRef === null || elInputRef === void 0 ? void 0 : (_elInputRef$current2 = elInputRef.current) === null || _elInputRef$current2 === void 0 ? void 0 : _elInputRef$current2.removeEventListener('keydown', onKeyDown);
        if (combo && typeof combo.destroy === 'function') combo.destroy();
      };
    }
  }, []);
  React.useEffect(() => {
    if (defaultValue) {
      setCountry(defaultValue);
      dispatch(setValue(formId, id, defaultValue));
    }
  }, [defaultValue]);
  return /*#__PURE__*/React__default["default"].createElement(CountrySelectStyled, {
    className: "input__countries"
  }, /*#__PURE__*/React__default["default"].createElement("label", {
    className: "input__label",
    htmlFor: "country-searchable-select"
  }, label, isRequired ? /*#__PURE__*/React__default["default"].createElement("span", {
    className: "label__required"
  }, "(required)") : /*#__PURE__*/React__default["default"].createElement("span", {
    className: "label__optional"
  }, "(optional)")), /*#__PURE__*/React__default["default"].createElement("div", {
    className: "input__wrapper"
  }, /*#__PURE__*/React__default["default"].createElement("input", {
    type: "text",
    placeholder: placeholder,
    className: "input",
    id: "country-searchable-select",
    ref: elInputRef,
    "aria-invalid": a11yInvalid,
    defaultValue: defaultValue
  }), a11yInvalid == 'true' && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    "aria-hidden": "true",
    role: "presentation",
    width: "16",
    height: "16",
    fill: "none"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    fill: "#333",
    d: "M12.2 3.807a.664.664 0 0 0-.94 0L8 7.06 4.74 3.8a.665.665 0 0 0-.94.94L7.06 8 3.8 11.26a.664.664 0 1 0 .94.94L8 8.94l3.26 3.26a.665.665 0 0 0 .94-.94L8.94 8l3.26-3.26a.668.668 0 0 0 0-.933Z"
  })), a11yInvalid == 'false' && /*#__PURE__*/React__default["default"].createElement("svg", {
    className: "svg",
    xmlns: "http://www.w3.org/2000/svg",
    focusable: "false",
    "aria-hidden": "true",
    role: "presentation",
    width: "16",
    height: "16",
    fill: "none"
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    fill: "#333",
    d: "m2 8 4.418 4.667L14 4.659l-1.246-1.326-6.336 6.692-3.18-3.332L2 8Z"
  })), /*#__PURE__*/React__default["default"].createElement("ul", {
    className: "input__listbox",
    "aria-labelledby": "List of countries"
  }, countries.map((country, i) => /*#__PURE__*/React__default["default"].createElement("li", {
    key: `${country.code}-${i}`,
    className: "option",
    onClick: () => doUpdate(country.name),
    "aria-labelledby": country.name
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    role: "presentation",
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React__default["default"].createElement("span", null, country.name, ' ', /*#__PURE__*/React__default["default"].createElement("span", {
    "aria-hidden": "true"
  }, country.flag))))))));
};
const CountrySelectStyled = styled__default["default"].div.withConfig({
  displayName: "country__CountrySelectStyled",
  componentId: "sc-93yqgk-0"
})(["", ";"], () => {
  return styled.css(["display:flex;flex-direction:column;--semantic-type-1:#01010c;--semantic-background-1:#fff;--semantic-active-background-1:#efefef;--semantic-border-1:#949494;.input__label{margin-bottom:4px;}.input__wrapper{position:relative;}.input__listbox{display:none;position:absolute;top:40px;left:0;width:100%;padding:8px;background:var(--semantic-background-1);z-index:99;text-align:left;overflow-y:auto;border:1px solid var(--semantic-border-1);max-height:400px;}.input__listbox.open{display:block;}.input__listbox .option{padding:8px;cursor:default;display:flex;align-items:center;border:none;width:100%;}.input__listbox .option.selected{color:var(--semantic-type-1);background-color:var(--semantic-active-background-1);}.input__listbox .option.active{color:var(--semantic-type-1);background-color:var(--semantic-active-background-1);}"]);
});

const FormComposer = ({
  fields,
  formData,
  formId,
  setValue,
  setDateRangeValues,
  onValidateField,
  defaultLanguage,
  errors,
  useDefaultTheme,
  entries
}) => {
  if (!fields || fields.length < 1) return null;
  return fields.map((field, idx) => {
    if (!field) return null;
    switch (field.type) {
      case 'number':
      case 'textfield':
        {
          return /*#__PURE__*/React__default["default"].createElement(Textfield, {
            key: `${field.id}-${idx}`,
            field: field,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            onValidateField: onValidateField,
            defaultLanguage: defaultLanguage,
            defaultValue: formData && formData[field.id] || field.default,
            placeholder: field.editor,
            errors: errors,
            useDefaultTheme: useDefaultTheme
          });
        }
      case 'textarea':
        {
          return /*#__PURE__*/React__default["default"].createElement(Textarea, {
            key: `${field.id}-${idx}`,
            field: field,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor,
            onValidateField: onValidateField,
            useDefaultTheme: useDefaultTheme,
            errors: errors
          });
        }
      case 'dropdown':
        {
          return /*#__PURE__*/React__default["default"].createElement(Dropdown, {
            key: `${field.id}-${idx}`,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            formId: formId,
            setValue: setValue,
            useDefaultTheme: useDefaultTheme
          });
        }
      case 'checkbox':
        {
          return /*#__PURE__*/React__default["default"].createElement(Checkbox, {
            key: `${field.id}-${idx}`,
            id: field.id,
            name: field.name,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            setValue: setValue,
            formId: formId,
            defaultValue: formData && formData[field.id] || field.default,
            type: field.dataType === 'boolean' ? 'single' : 'multiple',
            useDefaultTheme: useDefaultTheme
          });
        }
      case 'radio':
        {
          return /*#__PURE__*/React__default["default"].createElement(RadioButton, {
            key: `${field.id}-${idx}`,
            id: field.id,
            type: field.type,
            formId: formId,
            setValue: setValue,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            useDefaultTheme: useDefaultTheme
          });
        }
      case 'entryPicker':
        {
          const type = field.dataType === 'objectArray' ? 'checkbox' : 'radio';
          const results = entries && entries[field.id] && entries[field.id].items;
          return /*#__PURE__*/React__default["default"].createElement(EntryPicker, {
            key: `${field.id}-${idx}`,
            type: type,
            results: results,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            useDefaultTheme: useDefaultTheme,
            setValue: setValue,
            onValidateField: onValidateField,
            formId: formId
          });
        }
      case 'date':
        {
          return /*#__PURE__*/React__default["default"].createElement(SingleDate, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            formId: formId,
            setValue: setValue,
            useDefaultTheme: useDefaultTheme
          });
        }
      case 'dateRange':
        {
          return /*#__PURE__*/React__default["default"].createElement(DateRange, {
            key: `${field.id}-${idx}`,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            formId: formId,
            setDateRangeValues: setDateRangeValues,
            useDefaultTheme: useDefaultTheme
          });
        }
      case 'hidden':
        {
          return /*#__PURE__*/React__default["default"].createElement(HiddenField, {
            key: `${field.id}-${idx}`,
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor
          });
        }
      case 'country':
        {
          var _field$default, _field$editor, _field$editor$propert, _field$editor$propert2;
          return /*#__PURE__*/React__default["default"].createElement(CountrySelect, {
            key: `${field.id}-${idx}`,
            formId: formId,
            field: field,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            validations: field.validations,
            defaultValue: formData && formData[field.id] || (field === null || field === void 0 ? void 0 : (_field$default = field.default) === null || _field$default === void 0 ? void 0 : _field$default[defaultLanguage]),
            placeholder: field === null || field === void 0 ? void 0 : (_field$editor = field.editor) === null || _field$editor === void 0 ? void 0 : (_field$editor$propert = _field$editor.properties) === null || _field$editor$propert === void 0 ? void 0 : (_field$editor$propert2 = _field$editor$propert.placeholderText) === null || _field$editor$propert2 === void 0 ? void 0 : _field$editor$propert2[defaultLanguage]
          });
        }
      case 'title':
        {
          return /*#__PURE__*/React__default["default"].createElement("span", {
            className: "form__title",
            "data-form": "title",
            style: {
              display: 'block'
            }
          }, field.name && field.name[defaultLanguage]);
        }
    }
  });
};
FormComposer.propTypes = {
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  onValidateField: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool
};

const Loader = ({
  className,
  color = '#fff',
  width = 20,
  height = 20
}) => {
  return /*#__PURE__*/React__default["default"].createElement("svg", {
    className: className,
    width: `${width}px`,
    height: `${height}px`,
    viewBox: "0 0 100 100",
    preserveAspectRatio: "xMidYMid"
  }, /*#__PURE__*/React__default["default"].createElement("circle", {
    cx: "50",
    cy: "50",
    fill: "none",
    stroke: color,
    strokeWidth: "10",
    r: "35",
    strokeDasharray: "164.93361431346415 56.97787143782138",
    style: {
      animationPlayState: 'running',
      animationDelay: '0s'
    },
    transform: "rotate(311.547 50 50)"
  }, /*#__PURE__*/React__default["default"].createElement("animateTransform", {
    attributeName: "transform",
    type: "rotate",
    repeatCount: "indefinite",
    dur: "1s",
    values: "0 50 50;360 50 50",
    keyTimes: "0;1",
    style: {
      animationPlayState: 'running',
      animationDelay: '0s'
    }
  })));
};

var ButtonStyled = styled__default["default"].button.withConfig({
  displayName: "buttonstyled",
  componentId: "sc-1uekf3o-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:inline-flex;align-items:center;justify-content:center;cursor:pointer;margin:16px 0 0 0;padding:8px 16px;border-radius:3px;border:1px solid ", ";font-family:inherit;transition:opacity 200ms ease;&:disabled{opacity:0.7;cursor:not-allowed;border-color:", ";background:", ";color:", ";svg{margin-left:4px;circle{stroke:", ";}}}&:hover{opacity:0.7;}"], theme.colors.border, theme.colors.light_grey_light, theme.colors.light_grey_light, theme.colors.light_grey_dark, theme.colors.light_grey_dark));
});

const Button = ({
  className,
  type = 'button',
  text,
  action,
  loading,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ButtonStyled, {
    className: className,
    type: type,
    onClick: () => action(),
    disabled: loading,
    useDefaultTheme: useDefaultTheme
  }, text, loading && /*#__PURE__*/React__default["default"].createElement(Loader, {
    height: 18,
    width: 18
  }));
};
Button.propTypes = {
  className: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  text: PropTypes__default["default"].string,
  action: PropTypes__default["default"].func,
  loading: PropTypes__default["default"].bool,
  useDefaultTheme: PropTypes__default["default"].bool
};

var CalloutStyled = styled__default["default"].div.withConfig({
  displayName: "calloutstyled",
  componentId: "sc-k461qh-0"
})(["", ";"], ({
  theme
}) => {
  return styled.css(["background:#F1F6FD;box-shadow:inset 4px 0 0 ", ";border-radius:0 8px 8px 0;padding:16px 24px;margin-top:8px;span{font-weight:400;font-size:14px;line-height:24px;}"], theme.colors.red_darker);
});

const Callout = ({
  className,
  text
}) => {
  return /*#__PURE__*/React__default["default"].createElement(CalloutStyled, {
    className: className
  }, /*#__PURE__*/React__default["default"].createElement("span", null, text));
};
Callout.propTypes = {
  className: PropTypes__default["default"].string,
  text: PropTypes__default["default"].string
};

const Form = ({
  className,
  formId,
  useDefaultTheme = true,
  onCustomSubmit
}) => {
  const dispatch = reactRedux.useDispatch();
  const _setFormId = formId => dispatch(setFormId(formId));
  const _setValue = (formId, id, value) => dispatch(setValue(formId, id, value));
  const _setDateRangeValues = (formId, id, dateType, value) => dispatch(setDateRangeValues(formId, id, dateType, value));
  const _onValidateField = (formId, id, value) => dispatch(onValidateField(formId, id, value));
  const _doTogglePageForward = (formId, pageIndex) => dispatch(doTogglePageForward(formId, pageIndex));
  const _doTogglePageBack = (formId, pageIndex) => dispatch(doTogglePageBack(formId, pageIndex));
  const _onSubmit = formId => dispatch(onSubmit(formId));
  React.useEffect(() => {
    if (formId) _setFormId(formId);
  }, [formId]);
  const selectFormFields = makeSelectPagedFields(formId);
  const selectFormStatus = makeSelectFormStatus(formId);
  const selectPagingInfo = makeSelectPagingInfo(formId);
  const selectDefaultLang = makeSelectDefaultLang(formId);
  const selectFormSettings = makeSelectFormSettings(formId);
  const selectFormFieldErrors = makeSelectFormFieldErrors(formId);
  const selectFormEntries = makeSelectFormEntries(formId);
  const selectFormPostData = makeSelectFormPostData(formId);
  const status = reactRedux.useSelector(selectFormStatus);
  const fields = reactRedux.useSelector(selectFormFields);
  const pagingInfo = reactRedux.useSelector(selectPagingInfo);
  const defaultLanguage = reactRedux.useSelector(selectDefaultLang);
  const settings = reactRedux.useSelector(selectFormSettings);
  const errors = reactRedux.useSelector(selectFormFieldErrors);
  const entries = reactRedux.useSelector(selectFormEntries);
  const formData = reactRedux.useSelector(selectFormPostData);
  const currentGroup = pagingInfo === null || pagingInfo === void 0 ? void 0 : pagingInfo.currentPageId;
  if (pagingInfo && pagingInfo.pageCount > 1) {
    const isLastPage = pagingInfo.pageCount == pagingInfo.pageIndex + 1;
    return /*#__PURE__*/React__default["default"].createElement(ThemeProvider, {
      theme: defaultTheme
    }, /*#__PURE__*/React__default["default"].createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, !(status !== null && status !== void 0 && status.hasSuccess) && !(status !== null && status !== void 0 && status.isLoading) && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormComposer, {
      fields: fields,
      formData: formData,
      formId: formId,
      setValue: _setValue,
      onValidateField: _onValidateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      pagingInfo: pagingInfo,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setDateRangeValues: _setDateRangeValues
    }), pagingInfo.pageIndex > 0 && /*#__PURE__*/React__default["default"].createElement(Button, {
      className: "form__btn--prev",
      type: "button",
      text: "Go Back",
      action: () => _doTogglePageBack(formId, pagingInfo.pageIndex - 1),
      useDefaultTheme: useDefaultTheme
    }), !isLastPage && /*#__PURE__*/React__default["default"].createElement(Button, {
      className: "form__btn--next",
      type: "button",
      text: "Next",
      action: () => _doTogglePageForward(formId, pagingInfo.pageIndex + 1),
      useDefaultTheme: useDefaultTheme
    }), isLastPage && /*#__PURE__*/React__default["default"].createElement(Button, {
      className: "form__btn--submit",
      text: (settings === null || settings === void 0 ? void 0 : settings.submitButtonText) || "Submit",
      type: "button",
      loading: status === null || status === void 0 ? void 0 : status.isSubmitting,
      action: () => {
        _onSubmit(formId);
        if (onCustomSubmit) onCustomSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), (status === null || status === void 0 ? void 0 : status.isLoading) && !(status !== null && status !== void 0 && status.hasSuccess) && /*#__PURE__*/React__default["default"].createElement(Loader, {
      className: "loading",
      height: 24,
      width: 24,
      color: "#333"
    }), (status === null || status === void 0 ? void 0 : status.hasSuccess) && (status === null || status === void 0 ? void 0 : status.messages.success) && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.messages.success), (errors === null || errors === void 0 ? void 0 : errors.length) >= 1 && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "form__errors",
      role: "alert"
    }, errors === null || errors === void 0 ? void 0 : errors.map(({
      message,
      groupId
    }, i) => {
      if (currentGroup === groupId) {
        return /*#__PURE__*/React__default["default"].createElement(Callout, {
          className: "form__error",
          text: message,
          key: i
        });
      }
    }))));
  } else {
    return /*#__PURE__*/React__default["default"].createElement(ThemeProvider, {
      theme: defaultTheme
    }, /*#__PURE__*/React__default["default"].createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, !(status !== null && status !== void 0 && status.hasSuccess) && !(status !== null && status !== void 0 && status.isLoading) && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FormComposer, {
      fields: fields,
      formId: formId,
      setValue: _setValue,
      setDateRangeValues: _setDateRangeValues,
      onValidateField: _onValidateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      useDefaultTheme: useDefaultTheme,
      entries: entries
    }), /*#__PURE__*/React__default["default"].createElement(Button, {
      className: "form__btn--submit",
      loading: status === null || status === void 0 ? void 0 : status.isSubmitting,
      text: (settings === null || settings === void 0 ? void 0 : settings.submitButtonText) || "Submit",
      type: "button",
      action: () => {
        _onSubmit(formId);
        if (onCustomSubmit) onCustomSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), (status === null || status === void 0 ? void 0 : status.isLoading) && !(status !== null && status !== void 0 && status.hasSuccess) && /*#__PURE__*/React__default["default"].createElement(Loader, {
      className: "loading",
      height: 24,
      width: 24,
      color: "#333"
    }), (status === null || status === void 0 ? void 0 : status.hasSuccess) && (status === null || status === void 0 ? void 0 : status.messages.success) && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.messages.success), (errors === null || errors === void 0 ? void 0 : errors.length) >= 1 && /*#__PURE__*/React__default["default"].createElement("div", {
      className: "form__errors",
      role: "alert"
    }, errors === null || errors === void 0 ? void 0 : errors.map(({
      message
    }, i) => {
      return /*#__PURE__*/React__default["default"].createElement(Callout, {
        className: "form__error",
        text: message,
        key: i
      });
    }))));
  }
};
Form.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool,
  onCustomSubmit: PropTypes__default["default"].func
};

exports.Form = Form;
exports.actions = actions;
exports.reducer = reducer;
exports.sagas = sagas;
exports.selectors = selectors;
//# sourceMappingURL=forms.js.map
