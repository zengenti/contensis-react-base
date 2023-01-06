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
const SET_CHECKBOX_VALUE = `${ACTION_PREFIX}SET_CHECKBOX_VALUE`;

const initialSettings = {
  recaptcha: {
    siteKey: null
  }
};
const initialStatus = {
  isLoading: true,
  isSubmitting: false,
  hasSuccess: false,
  successMessage: null,
  hasError: false
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
        state[formId].data = value;
        return;
      }

    case SET_CHECKBOX_VALUE:
      {
        const {
          formId,
          id,
          value,
          isChecked
        } = action || {};
        let values = state[formId].data[id] || [];
        if (isChecked) state[formId].data[id] = { ...values,
          value
        };else state[formId].data[id] = values.filter(v => v !== value);
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
        return;
      }

    case SET_SUCCESS_MESSAGE:
      {
        const {
          formId,
          message
        } = action || {};
        state[formId].status.successMessage = message;
        return;
      }

    case SUBMIT_FORM_ERROR:
      {
        const {
          formId
        } = action || {};
        state[formId].status.hasError = true;
        state[formId].status.isSubmitting = false;
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
const makeSelectPagedFields = formId => reselect.createSelector([selectForms], form => {
  if (form[formId]) {
    const pagingInfo = form[formId].pagingInfo;
    const fields = form[formId].fields;
    if ((fields === null || fields === void 0 ? void 0 : fields.length) > 0 && pagingInfo.pageCount > 1) return fields.filter(f => f.groupId == pagingInfo.currentPageId);else return fields;
  }
});
const makeSelectFormStatus = formId => reselect.createSelector(selectForms, form => {
  var _form$formId;

  return (_form$formId = form[formId]) === null || _form$formId === void 0 ? void 0 : _form$formId.status;
});
const makeSelectPagingInfo = formId => reselect.createSelector(selectForms, form => {
  var _form$formId2;

  return (_form$formId2 = form[formId]) === null || _form$formId2 === void 0 ? void 0 : _form$formId2.pagingInfo;
});
const makeSelectFormSettings = formId => reselect.createSelector(selectForms, form => {
  var _form$formId3;

  return (_form$formId3 = form[formId]) === null || _form$formId3 === void 0 ? void 0 : _form$formId3.settings;
});
const makeSelectFormFieldErrors = formId => reselect.createSelector(selectForms, form => {
  var _form$formId4;

  return (_form$formId4 = form[formId]) === null || _form$formId4 === void 0 ? void 0 : _form$formId4.fieldErrors;
});
const makeSelectFormEntries = formId => reselect.createSelector(selectForms, form => {
  var _form$formId5;

  return (_form$formId5 = form[formId]) === null || _form$formId5 === void 0 ? void 0 : _form$formId5.entries;
});
const makeSelectFormPostData = formId => reselect.createSelector(selectForms, form => {
  var _form$formId6;

  return (_form$formId6 = form[formId]) === null || _form$formId6 === void 0 ? void 0 : _form$formId6.data;
});
const makeSelectIsLoading = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId;

  return (_forms$formId = forms[formId]) === null || _forms$formId === void 0 ? void 0 : _forms$formId.status.isLoading;
});
const makeSelectIsSubmitting = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId2;

  return (_forms$formId2 = forms[formId]) === null || _forms$formId2 === void 0 ? void 0 : _forms$formId2.status.isSubmitting;
});
const makeSelectHasSuccess = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId3;

  return (_forms$formId3 = forms[formId]) === null || _forms$formId3 === void 0 ? void 0 : _forms$formId3.status.hasSuccess;
});
const makeSelectHasError = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId4;

  return (_forms$formId4 = forms[formId]) === null || _forms$formId4 === void 0 ? void 0 : _forms$formId4.status.hasError;
});
const makeSelectFormFields = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId5;

  return (_forms$formId5 = forms[formId]) === null || _forms$formId5 === void 0 ? void 0 : _forms$formId5.fields;
});
const makeSelectDefaultLang = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId6;

  return (_forms$formId6 = forms[formId]) === null || _forms$formId6 === void 0 ? void 0 : _forms$formId6.defaultLanguage;
});
const makeSelectFormSuccessMessage = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId7;

  return (_forms$formId7 = forms[formId]) === null || _forms$formId7 === void 0 ? void 0 : _forms$formId7.status.successMessage;
});
const makeSelectFormGroup$1 = formId => reselect.createSelector(selectForms, forms => {
  var _forms$formId8;

  return (_forms$formId8 = forms[formId]) === null || _forms$formId8 === void 0 ? void 0 : _forms$formId8.groups;
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
  makeSelectFormGroup: makeSelectFormGroup$1,
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
  }) // eslint-disable-next-line no-console
  .catch(error => console.log('error', error));
};

const domains = ['1033edge.com', '11mail.com', '123.com', '123box.net', '123india.com', '123mail.cl', '123qwe.co.uk', '126.com', '150ml.com', '15meg4free.com', '163.com', '1coolplace.com', '1freeemail.com', '1funplace.com', '1internetdrive.com', '1mail.net', '1me.net', '1mum.com', '1musicrow.com', '1netdrive.com', '1nsyncfan.com', '1under.com', '1webave.com', '1webhighway.com', '212.com', '24horas.com', '2911.net', '2bmail.co.uk', '2d2i.com', '2die4.com', '3000.it', '321media.com', '37.com', '3ammagazine.com', '3dmail.com', '3email.com', '3xl.net', '444.net', '4email.com', '4email.net', '4mg.com', '4newyork.com', '4x4man.com', '5iron.com', '5star.com', '88.am', '8848.net', '888.nu', '97rock.com', 'aaamail.zzn.com', 'aamail.net', 'aaronkwok.net', 'abbeyroadlondon.co.uk', 'abcflash.net', 'abdulnour.com', 'aberystwyth.com', 'abolition-now.com', 'about.com', 'academycougars.com', 'acceso.or.cr', 'access4less.net', 'accessgcc.com', 'ace-of-base.com', 'acmecity.com', 'acmemail.net', 'acninc.net', 'adelphia.net', 'adexec.com', 'adfarrow.com', 'adios.net', 'ados.fr', 'advalvas.be', 'aeiou.pt', 'aemail4u.com', 'aeneasmail.com', 'afreeinternet.com', 'africamail.com', 'agoodmail.com', 'ahaa.dk', 'aichi.com', 'aim.com', 'airforce.net', 'airforceemail.com', 'airmail.net', 'airpost.net', 'ajacied.com', 'ak47.hu', 'aknet.kg', 'albawaba.com', 'alex4all.com', 'alexandria.cc', 'algeria.com', 'alhilal.net', 'alibaba.com', 'alice.it', 'aliceadsl.fr', 'alive.cz', 'aliyun.com', 'allmail.net', 'alloymail.com', 'allracing.com', 'allsaintsfan.com', 'alltel.net', 'alskens.dk', 'altavista.com', 'altavista.net', 'altavista.se', 'alternativagratis.com', 'alumnidirector.com', 'alvilag.hu', 'amele.com', 'america.hm', 'ameritech.net', 'amnetsal.com', 'amrer.net', 'amuro.net', 'amuromail.com', 'ananzi.co.za', 'ancestry.com', 'andylau.net', 'anfmail.com', 'angelfan.com', 'angelfire.com', 'animal.net', 'animalhouse.com', 'animalwoman.net', 'anjungcafe.com', 'anote.com', 'another.com', 'anotherwin95.com', 'anti-social.com', 'antisocial.com', 'antongijsen.com', 'antwerpen.com', 'anymoment.com', 'anytimenow.com', 'aol.com', 'aol.it', 'apexmail.com', 'apmail.com', 'apollo.lv', 'approvers.net', 'arabia.com', 'arabtop.net', 'arcademaster.com', 'archaeologist.com', 'arcor.de', 'arcotronics.bg', 'argentina.com', 'aristotle.org', 'army.net', 'arnet.com.ar', 'artlover.com', 'artlover.com.au', 'as-if.com', 'asean-mail.com', 'asheville.com', 'asia-links.com', 'asia.com', 'asiafind.com', 'asianavenue.com', 'asiancityweb.com', 'asiansonly.net', 'asianwired.net', 'asiapoint.net', 'assala.com', 'assamesemail.com', 'astroboymail.com', 'astrolover.com', 'astrosfan.com', 'astrosfan.net', 'asurfer.com', 'athenachu.net', 'atina.cl', 'atl.lv', 'atlanticbb.net', 'atlaswebmail.com', 'atlink.com', 'ato.check.com', 'atozasia.com', 'att.net', 'att.net', 'attbi.com', 'attglobal.net', 'attglobal.net', 'attymail.com', 'au.ru', 'ausi.com', 'austin.rr.com', 'australia.edu', 'australiamail.com', 'austrosearch.net', 'autoescuelanerja.com', 'automotiveauthority.com', 'avh.hu', 'awsom.net', 'axoskate.com', 'ayna.com', 'azimiweb.com', 'bachelorboy.com', 'bachelorgal.com', 'backpackers.com', 'backstreet-boys.com', 'backstreetboysclub.com', 'bagherpour.com', 'bangkok.com', 'bangkok2000.com', 'bannertown.net', 'baptistmail.com', 'baptized.com', 'barcelona.com', 'baseballmail.com', 'basketballmail.com', 'batuta.net', 'baudoinconsulting.com', 'bboy.zzn.com', 'bcpl.net', 'bcvibes.com', 'beeebank.com', 'beenhad.com', 'beep.ru', 'beer.com', 'beethoven.com', 'belice.com', 'belizehome.com', 'bellatlantic.net', 'bellnet.ca', 'bellsouth.net', 'bellsouth.net', 'berkscounty.com', 'berlin.com', 'berlin.de', 'berlinexpo.de', 'bestmail.us', 'bestweb.net', 'bettergolf.net', 'bev.net', 'bharatmail.com', 'bigassweb.com', 'bigblue.net.au', 'bigboab.com', 'bigfoot.com', 'bigfoot.de', 'bigger.com', 'bigmailbox.com', 'bigpond.com', 'bigpond.com.au', 'bigpond.net.au', 'bigramp.com', 'bikemechanics.com', 'bikeracer.com', 'bikeracers.net', 'bikerider.com', 'billsfan.com', 'billsfan.net', 'bimamail.com', 'bimla.net', 'birdowner.net', 'bisons.com', 'bitmail.com', 'bitpage.net', 'bizhosting.com', 'bla-bla.com', 'blackburnmail.com', 'blackplanet.com', 'blacksburg.net', 'blazemail.com', 'blazenet.net', 'bluehyppo.com', 'bluemail.ch', 'bluemail.dk', 'bluesfan.com', 'bluewin.ch', 'blueyonder.co.uk', 'blushmail.com', 'bmlsports.net', 'boardermail.com', 'boatracers.com', 'bol.com.br', 'bolando.com', 'bollywoodz.com', 'bolt.com', 'boltonfans.com', 'bombdiggity.com', 'bonbon.net', 'boom.com', 'bootmail.com', 'bornnaked.com', 'bossofthemoss.com', 'bostonoffice.com', 'bounce.net', 'box.az', 'boxbg.com', 'boxemail.com', 'boxfrog.com', 'boyzoneclub.com', 'bradfordfans.com', 'brasilia.net', 'brazilmail.com.br', 'breathe.com', 'bresnan.net', 'brfree.com.br', 'bright.net', 'britneyclub.com', 'brittonsign.com', 'broadcast.net', 'bt.com', 'btinternet.com', 'btopenworld.co.uk', 'buffymail.com', 'bullsfan.com', 'bullsgame.com', 'bumerang.ro', 'bunko.com', 'buryfans.com', 'business-man.com', 'businessman.net', 'businessweekmail.com', 'busta-rhymes.com', 'busymail.com', 'buyersusa.com', 'bvimailbox.com', 'byteme.com', 'c2i.net', 'c3.hu', 'c4.com', 'cabacabana.com', 'cableone.net', 'caere.it', 'cairomail.com', 'cais.net', 'callnetuk.com', 'callsign.net', 'caltanet.it', 'camidge.com', 'canada-11.com', 'canada.com', 'canadianmail.com', 'canoemail.com', 'canwetalk.com', 'capu.net', 'caramail.com', 'care2.com', 'careerbuildermail.com', 'carioca.net', 'cartestraina.ro', 'casablancaresort.com', 'casino.com', 'catcha.com', 'catholic.org', 'catlover.com', 'catsrule.garfield.com', 'ccnmail.com', 'cd2.com', 'celineclub.com', 'celtic.com', 'centoper.it', 'centralpets.com', 'centrum.cz', 'centrum.sk', 'centurytel.net', 'cfl.rr.com', 'cgac.es', 'chaiyomail.com', 'chance2mail.com', 'chandrasekar.net', 'charm.net', 'charmedmail.com', 'charter.net', 'chat.ru', 'chattown.com', 'chauhanweb.com', 'check.com', 'check1check.com', 'cheerful.com', 'chek.com', 'chello.nl', 'chemist.com', 'chequemail.com', 'cheyenneweb.com', 'chez.com', 'chickmail.com', 'china.net.vg', 'chinalook.com', 'chirk.com', 'chocaholic.com.au', 'christianmail.net', 'churchusa.com', 'cia-agent.com', 'cia.hu', 'ciaoweb.it', 'cicciociccio.com', 'cincinow.net', 'citeweb.net', 'citlink.net', 'city-of-bath.org', 'city-of-birmingham.com', 'city-of-brighton.org', 'city-of-cambridge.com', 'city-of-coventry.com', 'city-of-edinburgh.com', 'city-of-lichfield.com', 'city-of-lincoln.com', 'city-of-liverpool.com', 'city-of-manchester.com', 'city-of-nottingham.com', 'city-of-oxford.com', 'city-of-swansea.com', 'city-of-westminster.com', 'city-of-westminster.net', 'city-of-york.net', 'city2city.com', 'cityofcardiff.net', 'cityoflondon.org', 'claramail.com', 'classicalfan.com', 'classicmail.co.za', 'clerk.com', 'cliffhanger.com', 'close2you.net', 'club-internet.fr', 'club4x4.net', 'clubalfa.com', 'clubbers.net', 'clubducati.com', 'clubhonda.net', 'clubvdo.net', 'cluemail.com', 'cmpmail.com', 'cnnsimail.com', 'codec.ro', 'coder.hu', 'coid.biz', 'coldmail.com', 'collectiblesuperstore.com', 'collegebeat.com', 'collegeclub.com', 'collegemail.com', 'colleges.com', 'columbus.rr.com', 'columbusrr.com', 'columnist.com', 'comcast.net', 'comic.com', 'communityconnect.com', 'comprendemail.com', 'compuserve.com', 'computer-freak.com', 'computermail.net', 'concentric.net', 'conexcol.com', 'conk.com', 'connect4free.net', 'connectbox.com', 'conok.com', 'consultant.com', 'cookiemonster.com', 'cool.br', 'coolgoose.ca', 'coolgoose.com', 'coolkiwi.com', 'coollist.com', 'coolmail.com', 'coolmail.net', 'coolsend.com', 'cooooool.com', 'cooperation.net', 'cooperationtogo.net', 'copacabana.com', 'cornells.com', 'cornerpub.com', 'corporatedirtbag.com', 'correo.terra.com.gt', 'cortinet.com', 'cotas.net', 'counsellor.com', 'countrylover.com', 'covad.net', 'cox.net', 'coxinet.net', 'coxmail.com', 'cpaonline.net', 'cracker.hu', 'crazedanddazed.com', 'crazysexycool.com', 'cristianemail.com', 'critterpost.com', 'croeso.com', 'crosshairs.com', 'crosslink.net', 'crosswinds.net', 'crwmail.com', 'cry4helponline.com', 'cs.com', 'csi.com', 'csinibaba.hu', 'cuemail.com', 'curio-city.com', 'cute-girl.com', 'cuteandcuddly.com', 'cutey.com', 'cww.de', 'cyber-africa.net', 'cyber4all.com', 'cyberbabies.com', 'cybercafemaui.com', 'cyberdude.com', 'cyberforeplay.net', 'cybergal.com', 'cybergrrl.com', 'cyberinbox.com', 'cyberleports.com', 'cybermail.net', 'cybernet.it', 'cyberspace-asia.com', 'cybertrains.org', 'cyclefanz.com', 'cynetcity.com', 'dabsol.net', 'dadacasa.com', 'daha.com', 'dailypioneer.com', 'dallas.theboys.com', 'dangerous-minds.com', 'dansegulvet.com', 'data54.com', 'daum.net', 'davegracey.com', 'dawnsonmail.com', 'dawsonmail.com', 'dazedandconfused.com', 'dbzmail.com', 'dca.net', 'dcemail.com', 'deadlymob.org', 'deal-maker.com', 'dearriba.com', 'death-star.com', 'dejanews.com', 'deliveryman.com', 'deltanet.com', 'deneg.net', 'depechemode.com', 'deseretmail.com', 'desertmail.com', 'desilota.com', 'deskmail.com', 'deskpilot.com', 'destin.com', 'detik.com', 'deutschland-net.com', 'devotedcouples.com', 'dfwatson.com', 'di-ve.com', 'digibel.be', 'diplomats.com', 'direcway.com', 'dirtracer.com', 'discofan.com', 'discovery.com', 'discoverymail.com', 'disinfo.net', 'dmailman.com', 'dmv.com', 'dnsmadeeasy.com', 'doctor.com', 'dog.com', 'doglover.com', 'dogmail.co.uk', 'dogsnob.net', 'doityourself.com', 'doneasy.com', 'donjuan.com', 'dontgotmail.com', 'dontmesswithtexas.com', 'doramail.com', 'dostmail.com', 'dotcom.fr', 'dott.it', 'dplanet.ch', 'dr.com', 'dragoncon.net', 'dragracer.com', 'dropzone.com', 'drotposta.hu', 'dslextreme.com', 'dubaimail.com', 'dublin.com', 'dublin.ie', 'dunlopdriver.com', 'dunloprider.com', 'duno.com', 'dwp.net', 'dygo.com', 'dynamitemail.com', 'e-apollo.lv', 'e-mail.dk', 'e-mail.ru', 'e-mailanywhere.com', 'e-mails.ru', 'e-tapaal.com', 'earthalliance.com', 'earthcam.net', 'earthdome.com', 'earthling.net', 'earthlink.net', 'earthonline.net', 'eastcoast.co.za', 'eastmail.com', 'easy.to', 'easypost.com', 'eatmydirt.com', 'ecardmail.com', 'ecbsolutions.net', 'echina.com', 'ecompare.com', 'edge.net', 'edmail.com', 'ednatx.com', 'edtnmail.com', 'educacao.te.pt', 'educastmail.com', 'ehmail.com', 'eircom.net', 'elsitio.com', 'elvis.com', 'email-london.co.uk', 'email.com', 'email.cz', 'email.ee', 'email.it', 'email.nu', 'email.ro', 'email.ru', 'email.si', 'email.women.com', 'email2me.net', 'emailacc.com', 'emailaccount.com', 'emailchoice.com', 'emailcorner.net', 'emailem.com', 'emailengine.net', 'emailforyou.net', 'emailgroups.net', 'emailpinoy.com', 'emailplanet.com', 'emails.ru', 'emailuser.net', 'emailx.net', 'ematic.com', 'embarqmail.com', 'emumail.com', 'end-war.com', 'enel.net', 'engineer.com', 'england.com', 'england.edu', 'enter.net', 'epatra.com', 'epix.net', 'epost.de', 'eposta.hu', 'eqqu.com', 'eramail.co.za', 'eresmas.com', 'eriga.lv', 'erols.com', 'estranet.it', 'ethos.st', 'etoast.com', 'etrademail.com', 'eudoramail.com', 'europe.com', 'euroseek.com', 'every1.net', 'everyday.com.kh', 'everyone.net', 'examnotes.net', 'excite.co.jp', 'excite.com', 'excite.it', 'execs.com', 'expressasia.com', 'extenda.net', 'extended.com', 'eyou.com', 'ezcybersearch.com', 'ezmail.egine.com', 'ezmail.ru', 'ezrs.com', 'ezy.net', 'f1fans.net', 'facebook.com', 'fan.com', 'fan.theboys.com', 'fansonlymail.com', 'fantasticmail.com', 'farang.net', 'faroweb.com', 'fastem.com', 'fastemail.us', 'fastemailer.com', 'fastermail.com', 'fastimap.com', 'fastmail.fm', 'fastmailbox.net', 'fastmessaging.com', 'fatcock.net', 'fathersrightsne.org', 'fbi-agent.com', 'fbi.hu', 'fcc.net', 'federalcontractors.com', 'felicity.com', 'felicitymail.com', 'femenino.com', 'fetchmail.co.uk', 'fetchmail.com', 'feyenoorder.com', 'ffanet.com', 'fiberia.com', 'fibertel.com.ar', 'filipinolinks.com', 'financemail.net', 'financier.com', 'findmail.com', 'finebody.com', 'finfin.com', 'fire-brigade.com', 'fishburne.org', 'flashcom.net', 'flashemail.com', 'flashmail.com', 'flashmail.net', 'flipcode.com', 'fmail.co.uk', 'fmailbox.com', 'fmgirl.com', 'fmguy.com', 'fnbmail.co.za', 'fnmail.com', 'folkfan.com', 'foodmail.com', 'football.theboys.com', 'footballmail.com', 'for-president.com', 'forfree.at', 'forpresident.com', 'forthnet.gr', 'fortuncity.com', 'fortunecity.com', 'forum.dk', 'foxmail.com', 'free-org.com', 'free.com.pe', 'free.fr', 'freeaccess.nl', 'freeaccount.com', 'freeandsingle.com', 'freedom.usa.com', 'freedomlover.com', 'freegates.be', 'freeghana.com', 'freeler.nl', 'freemail.c3.hu', 'freemail.com.au', 'freemail.com.pk', 'freemail.de', 'freemail.et', 'freemail.gr', 'freemail.hu', 'freemail.it', 'freemail.lt', 'freemail.nl', 'freemail.org.mk', 'freenet.de', 'freenet.kg', 'freeola.com', 'freeola.net', 'freeserve.co.uk', 'freestamp.com', 'freestart.hu', 'freesurf.fr', 'freesurf.nl', 'freeuk.com', 'freeuk.net', 'freeukisp.co.uk', 'freeweb.org', 'freewebemail.com', 'freeyellow.com', 'freezone.co.uk', 'fresnomail.com', 'friends-cafe.com', 'friendsfan.com', 'from-africa.com', 'from-america.com', 'from-argentina.com', 'from-asia.com', 'from-australia.com', 'from-belgium.com', 'from-brazil.com', 'from-canada.com', 'from-china.net', 'from-england.com', 'from-europe.com', 'from-france.net', 'from-germany.net', 'from-holland.com', 'from-israel.com', 'from-italy.net', 'from-japan.net', 'from-korea.com', 'from-mexico.com', 'from-outerspace.com', 'from-russia.com', 'from-spain.net', 'fromalabama.com', 'fromalaska.com', 'fromarizona.com', 'fromarkansas.com', 'fromcalifornia.com', 'fromcolorado.com', 'fromconnecticut.com', 'fromdelaware.com', 'fromflorida.net', 'fromgeorgia.com', 'fromhawaii.net', 'fromidaho.com', 'fromillinois.com', 'fromindiana.com', 'fromiowa.com', 'fromjupiter.com', 'fromkansas.com', 'fromkentucky.com', 'fromlouisiana.com', 'frommaine.net', 'frommaryland.com', 'frommassachusetts.com', 'frommiami.com', 'frommichigan.com', 'fromminnesota.com', 'frommississippi.com', 'frommissouri.com', 'frommontana.com', 'fromnebraska.com', 'fromnevada.com', 'fromnewhampshire.com', 'fromnewjersey.com', 'fromnewmexico.com', 'fromnewyork.net', 'fromnorthcarolina.com', 'fromnorthdakota.com', 'fromohio.com', 'fromoklahoma.com', 'fromoregon.net', 'frompennsylvania.com', 'fromrhodeisland.com', 'fromru.com', 'fromsouthcarolina.com', 'fromsouthdakota.com', 'fromtennessee.com', 'fromtexas.com', 'fromthestates.com', 'fromutah.com', 'fromvermont.com', 'fromvirginia.com', 'fromwashington.com', 'fromwashingtondc.com', 'fromwestvirginia.com', 'fromwisconsin.com', 'fromwyoming.com', 'front.ru', 'frontier.com', 'frontiernet.net', 'frostbyte.uk.net', 'fsmail.net', 'ftml.net', 'fullchannel.net', 'fullmail.com', 'funkfan.com', 'fuorissimo.com', 'furnitureprovider.com', 'fuse.net', 'fut.es', 'fwnb.com', 'fxsmails.com', 'galamb.net', 'galaxy5.com', 'gamebox.net', 'gamegeek.com', 'games.com', 'gamespotmail.com', 'garbage.com', 'gardener.com', 'gateway.net', 'gawab.com', 'gaybrighton.co.uk', 'gaza.net', 'gazeta.pl', 'gazibooks.com', 'gci.net', 'gee-wiz.com', 'geecities.com', 'geek.com', 'geek.hu', 'geeklife.com', 'general-hospital.com', 'geocities.com', 'geologist.com', 'geopia.com', 'gh2000.com', 'ghanamail.com', 'ghostmail.com', 'giantsfan.com', 'giga4u.de', 'gigileung.org', 'givepeaceachance.com', 'glay.org', 'glendale.net', 'globalfree.it', 'globalpagan.com', 'globalsite.com.br', 'globo.com', 'globomail.com', 'gmail.com', 'gmx.at', 'gmx.com', 'gmx.de', 'gmx.fr', 'gmx.li', 'gmx.net', 'gnwmail.com', 'go.com', 'go.ro', 'go.ru', 'go2.com.py', 'go2net.com', 'gocollege.com', 'gocubs.com', 'gofree.co.uk', 'goldenmail.ru', 'goldmail.ru', 'golfemail.com', 'golfmail.be', 'gonavy.net', 'goodstick.com', 'google.com', 'googlemail.com', 'goplay.com', 'gorontalo.net', 'gospelfan.com', 'gothere.uk.com', 'gotmail.com', 'gotomy.com', 'govolsfan.com', 'gportal.hu', 'grabmail.com', 'graffiti.net', 'gramszu.net', 'grapplers.com', 'gratisweb.com', 'grungecafe.com', 'gtemail.net', 'gti.net', 'gtmc.net', 'gua.net', 'guessmail.com', 'guju.net', 'gurlmail.com', 'guy.com', 'guy2.com', 'guyanafriends.com', 'gyorsposta.com', 'gyorsposta.hu', 'hackermail.net', 'hailmail.net', 'hairdresser.net', 'hamptonroads.com', 'handbag.com', 'handleit.com', 'hang-ten.com', 'hanmail.net', 'happemail.com', 'happycounsel.com', 'happypuppy.com', 'hardcorefreak.com', 'hawaii.rr.com', 'hawaiiantel.net', 'headbone.com', 'heartthrob.com', 'heerschap.com', 'heesun.net', 'hehe.com', 'hello.hu', 'hello.net.au', 'hello.to', 'helter-skelter.com', 'hempseed.com', 'herediano.com', 'heremail.com', 'herono1.com', 'hetnet.nl', 'hey.to', 'hhdevel.com', 'highmilton.com', 'highquality.com', 'highveldmail.co.za', 'hiphopfan.com', 'hispavista.com', 'hitthe.net', 'hkg.net', 'hkstarphoto.com', 'hockeymail.com', 'hollywoodkids.com', 'home-email.com', 'home.nl', 'home.no.net', 'home.ro', 'home.se', 'homeart.com', 'homelocator.com', 'homemail.com', 'homestead.com', 'homeworkcentral.com', 'hongkong.com', 'hookup.net', 'hoopsmail.com', 'horrormail.com', 'host-it.com.sg', 'hot-shot.com', 'hot.ee', 'hotbot.com', 'hotbrev.com', 'hotepmail.com', 'hotfire.net', 'hotletter.com', 'hotmail.be', 'hotmail.co.il', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.br', 'hotmail.com.mx', 'hotmail.de', 'hotmail.es', 'hotmail.fr', 'hotmail.it', 'hotmail.kg', 'hotmail.kz', 'hotmail.ru', 'hotpop.com', 'hotpop3.com', 'hotvoice.com', 'housefancom', 'housemail.com', 'hsuchi.net', 'html.tou.com', 'hughes.net', 'hunsa.com', 'hush.com', 'hushmail.com', 'hypernautica.com', 'i-connect.com', 'i-france.com', 'i-mail.com.au', 'i-p.com', 'i-plus.net', 'i.am', 'i12.com', 'iamawoman.com', 'iamwaiting.com', 'iamwasted.com', 'iamyours.com', 'ibm.net', 'icestorm.com', 'icloud.com', 'icmsconsultants.com', 'icq.com', 'icqmail.com', 'icrazy.com', 'id-base.com', 'ididitmyway.com', 'idirect.com', 'iespana.es', 'ifoward.com', 'ig.com.br', 'ignazio.it', 'ignmail.com', 'ihateclowns.com', 'ihwy.com', 'iinet.net.au', 'ijustdontcare.com', 'ilovechocolate.com', 'ilovejesus.com', 'ilovethemovies.com', 'ilovetocollect.net', 'ilse.nl', 'imaginemail.com', 'imail.org', 'imail.ru', 'imailbox.com', 'imel.org', 'imneverwrong.com', 'imposter.co.uk', 'imstressed.com', 'imtoosexy.com', 'in-box.net', 'iname.com', 'inbox.com', 'inbox.net', 'inbox.ru', 'incamail.com', 'incredimail.com', 'indexa.fr', 'india.com', 'indiatimes.com', 'indo-mail.com', 'indocities.com', 'indomail.com', 'indyracers.com', 'info-media.de', 'info66.com', 'infohq.com', 'infomail.es', 'infomart.or.jp', 'infospacemail.com', 'infovia.com.ar', 'inicia.es', 'inmail.sk', 'innocent.com', 'inorbit.com', 'insidebaltimore.net', 'insight.rr.com', 'insurer.com', 'integra.net', 'interaccess.com', 'interburp.com', 'interfree.it', 'interia.pl', 'interlap.com.ar', 'intermail.co.il', 'internet-club.com', 'internet-police.com', 'internetbiz.com', 'internetdrive.com', 'internetegypt.com', 'internetemails.net', 'internetmailing.net', 'internetmci.com', 'investormail.com', 'inwind.it', 'iobox.com', 'iobox.fi', 'iol.it', 'ionet.net', 'iowaemail.com', 'ip3.com', 'iprimus.com.au', 'iqemail.com', 'irangate.net', 'iraqmail.com', 'ireland.com', 'irj.hu', 'isellcars.com', 'islamonline.net', 'isleuthmail.com', 'ismart.net', 'isonfire.com', 'isp9.net', 'itelefonica.com.br', 'itloox.com', 'itmom.com', 'itol.com', 'ivebeenframed.com', 'ivillage.com', 'iwan-fals.com', 'iwmail.com', 'iwon.com', 'izadpanah.com', 'jahoopa.com', 'jakuza.hu', 'japan.com', 'jaydemail.com', 'jazzandjava.com', 'jazzfan.com', 'jazzgame.com', 'jerusalemmail.com', 'jetemail.net', 'jewishmail.com', 'jippii.fi', 'jmail.co.za', 'joinme.com', 'jokes.com', 'jordanmail.com', 'journalist.com', 'jovem.te.pt', 'joymail.com', 'jpopmail.com', 'jubiimail.dk', 'jump.com', 'jumpy.it', 'juniormail.com', 'juno.com', 'justemail.net', 'justicemail.com', 'kaazoo.com', 'kaixo.com', 'kalpoint.com', 'kansascity.com', 'kapoorweb.com', 'karachian.com', 'karachioye.com', 'karbasi.com', 'katamail.com', 'kayafmmail.co.za', 'kbjrmail.com', 'kcks.com', 'keg-party.com', 'keko.com.ar', 'kellychen.com', 'keromail.com', 'keyemail.com', 'kgb.hu', 'khosropour.com', 'kickassmail.com', 'killermail.com', 'kimo.com', 'kinki-kids.com', 'kittymail.com', 'kitznet.at', 'kiwibox.com', 'kiwitown.com', 'kmail.com.au', 'konx.com', 'korea.com', 'kozmail.com', 'krongthip.com', 'krunis.com', 'ksanmail.com', 'ksee24mail.com', 'kube93mail.com', 'kukamail.com', 'kumarweb.com', 'kuwait-mail.com', 'la.com', 'ladymail.cz', 'lagerlouts.com', 'lahoreoye.com', 'lakmail.com', 'lamer.hu', 'land.ru', 'lankamail.com', 'laposte.net', 'latemodels.com', 'latinmail.com', 'latino.com', 'lavabit.com', 'law.com', 'lawyer.com', 'leehom.net', 'legalactions.com', 'legislator.com', 'leonlai.net', 'letsgomets.net', 'letterbox.com', 'levele.com', 'levele.hu', 'lex.bg', 'lexis-nexis-mail.com', 'libero.it', 'liberomail.com', 'lick101.com', 'linkmaster.com', 'linktrader.com', 'linuxfreemail.com', 'linuxmail.org', 'lionsfan.com.au', 'liontrucks.com', 'liquidinformation.net', 'list.ru', 'littleblueroom.com', 'live.be', 'live.ca', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.au', 'live.com.mx', 'live.de', 'live.fr', 'live.it', 'live.nl', 'liverpoolfans.com', 'llandudno.com', 'llangollen.com', 'lmxmail.sk', 'lobbyist.com', 'localbar.com', 'london.com', 'loobie.com', 'looksmart.co.uk', 'looksmart.com', 'looksmart.com.au', 'lopezclub.com', 'louiskoo.com', 'love.com', 'love.cz', 'loveable.com', 'lovelygirl.net', 'lovemail.com', 'lover-boy.com', 'lovergirl.com', 'lovingjesus.com', 'lowandslow.com', 'luso.pt', 'luukku.com', 'lycos.co.uk', 'lycos.com', 'lycos.es', 'lycos.it', 'lycos.ne.jp', 'lycosemail.com', 'lycosmail.com', 'm-a-i-l.com', 'm-hmail.com', 'm4.org', 'mac.com', 'macbox.com', 'macfreak.com', 'machinecandy.com', 'macmail.com', 'madcreations.com', 'madrid.com', 'maffia.hu', 'magicmail.co.za', 'mahmoodweb.com', 'mail-awu.de', 'mail-box.cz', 'mail-center.com', 'mail-central.com', 'mail-page.com', 'mail.austria.com', 'mail.az', 'mail.be', 'mail.bulgaria.com', 'mail.byte.it', 'mail.co.za', 'mail.com', 'mail.ee', 'mail.entrepeneurmag.com', 'mail.freetown.com', 'mail.gr', 'mail.hitthebeach.com', 'mail.kmsp.com', 'mail.md', 'mail.nu', 'mail.org.uk', 'mail.pf', 'mail.pharmacy.com', 'mail.pt', 'mail.r-o-o-t.com', 'mail.ru', 'mail.salu.net', 'mail.sisna.com', 'mail.spaceports.com', 'mail.theboys.com', 'mail.usa.com', 'mail.vasarhely.hu', 'mail15.com', 'mail1st.com', 'mail2007.com', 'mail2aaron.com', 'mail2abby.com', 'mail2abc.com', 'mail2actor.com', 'mail2admiral.com', 'mail2adorable.com', 'mail2adoration.com', 'mail2adore.com', 'mail2adventure.com', 'mail2aeolus.com', 'mail2aether.com', 'mail2affection.com', 'mail2afghanistan.com', 'mail2africa.com', 'mail2agent.com', 'mail2aha.com', 'mail2ahoy.com', 'mail2aim.com', 'mail2air.com', 'mail2airbag.com', 'mail2airforce.com', 'mail2airport.com', 'mail2alabama.com', 'mail2alan.com', 'mail2alaska.com', 'mail2albania.com', 'mail2alcoholic.com', 'mail2alec.com', 'mail2alexa.com', 'mail2algeria.com', 'mail2alicia.com', 'mail2alien.com', 'mail2allan.com', 'mail2allen.com', 'mail2allison.com', 'mail2alpha.com', 'mail2alyssa.com', 'mail2amanda.com', 'mail2amazing.com', 'mail2amber.com', 'mail2america.com', 'mail2american.com', 'mail2andorra.com', 'mail2andrea.com', 'mail2andy.com', 'mail2anesthesiologist.com', 'mail2angela.com', 'mail2angola.com', 'mail2ann.com', 'mail2anna.com', 'mail2anne.com', 'mail2anthony.com', 'mail2anything.com', 'mail2aphrodite.com', 'mail2apollo.com', 'mail2april.com', 'mail2aquarius.com', 'mail2arabia.com', 'mail2arabic.com', 'mail2architect.com', 'mail2ares.com', 'mail2argentina.com', 'mail2aries.com', 'mail2arizona.com', 'mail2arkansas.com', 'mail2armenia.com', 'mail2army.com', 'mail2arnold.com', 'mail2art.com', 'mail2artemus.com', 'mail2arthur.com', 'mail2artist.com', 'mail2ashley.com', 'mail2ask.com', 'mail2astronomer.com', 'mail2athena.com', 'mail2athlete.com', 'mail2atlas.com', 'mail2atom.com', 'mail2attitude.com', 'mail2auction.com', 'mail2aunt.com', 'mail2australia.com', 'mail2austria.com', 'mail2azerbaijan.com', 'mail2baby.com', 'mail2bahamas.com', 'mail2bahrain.com', 'mail2ballerina.com', 'mail2ballplayer.com', 'mail2band.com', 'mail2bangladesh.com', 'mail2bank.com', 'mail2banker.com', 'mail2bankrupt.com', 'mail2baptist.com', 'mail2bar.com', 'mail2barbados.com', 'mail2barbara.com', 'mail2barter.com', 'mail2basketball.com', 'mail2batter.com', 'mail2beach.com', 'mail2beast.com', 'mail2beatles.com', 'mail2beauty.com', 'mail2becky.com', 'mail2beijing.com', 'mail2belgium.com', 'mail2belize.com', 'mail2ben.com', 'mail2bernard.com', 'mail2beth.com', 'mail2betty.com', 'mail2beverly.com', 'mail2beyond.com', 'mail2biker.com', 'mail2bill.com', 'mail2billionaire.com', 'mail2billy.com', 'mail2bio.com', 'mail2biologist.com', 'mail2black.com', 'mail2blackbelt.com', 'mail2blake.com', 'mail2blind.com', 'mail2blonde.com', 'mail2blues.com', 'mail2bob.com', 'mail2bobby.com', 'mail2bolivia.com', 'mail2bombay.com', 'mail2bonn.com', 'mail2bookmark.com', 'mail2boreas.com', 'mail2bosnia.com', 'mail2boston.com', 'mail2botswana.com', 'mail2bradley.com', 'mail2brazil.com', 'mail2breakfast.com', 'mail2brian.com', 'mail2bride.com', 'mail2brittany.com', 'mail2broker.com', 'mail2brook.com', 'mail2bruce.com', 'mail2brunei.com', 'mail2brunette.com', 'mail2brussels.com', 'mail2bryan.com', 'mail2bug.com', 'mail2bulgaria.com', 'mail2business.com', 'mail2buy.com', 'mail2ca.com', 'mail2california.com', 'mail2calvin.com', 'mail2cambodia.com', 'mail2cameroon.com', 'mail2canada.com', 'mail2cancer.com', 'mail2capeverde.com', 'mail2capricorn.com', 'mail2cardinal.com', 'mail2cardiologist.com', 'mail2care.com', 'mail2caroline.com', 'mail2carolyn.com', 'mail2casey.com', 'mail2cat.com', 'mail2caterer.com', 'mail2cathy.com', 'mail2catlover.com', 'mail2catwalk.com', 'mail2cell.com', 'mail2chad.com', 'mail2champaign.com', 'mail2charles.com', 'mail2chef.com', 'mail2chemist.com', 'mail2cherry.com', 'mail2chicago.com', 'mail2chile.com', 'mail2china.com', 'mail2chinese.com', 'mail2chocolate.com', 'mail2christian.com', 'mail2christie.com', 'mail2christmas.com', 'mail2christy.com', 'mail2chuck.com', 'mail2cindy.com', 'mail2clark.com', 'mail2classifieds.com', 'mail2claude.com', 'mail2cliff.com', 'mail2clinic.com', 'mail2clint.com', 'mail2close.com', 'mail2club.com', 'mail2coach.com', 'mail2coastguard.com', 'mail2colin.com', 'mail2college.com', 'mail2colombia.com', 'mail2color.com', 'mail2colorado.com', 'mail2columbia.com', 'mail2comedian.com', 'mail2composer.com', 'mail2computer.com', 'mail2computers.com', 'mail2concert.com', 'mail2congo.com', 'mail2connect.com', 'mail2connecticut.com', 'mail2consultant.com', 'mail2convict.com', 'mail2cook.com', 'mail2cool.com', 'mail2cory.com', 'mail2costarica.com', 'mail2country.com', 'mail2courtney.com', 'mail2cowboy.com', 'mail2cowgirl.com', 'mail2craig.com', 'mail2crave.com', 'mail2crazy.com', 'mail2create.com', 'mail2croatia.com', 'mail2cry.com', 'mail2crystal.com', 'mail2cuba.com', 'mail2culture.com', 'mail2curt.com', 'mail2customs.com', 'mail2cute.com', 'mail2cutey.com', 'mail2cynthia.com', 'mail2cyprus.com', 'mail2czechrepublic.com', 'mail2dad.com', 'mail2dale.com', 'mail2dallas.com', 'mail2dan.com', 'mail2dana.com', 'mail2dance.com', 'mail2dancer.com', 'mail2danielle.com', 'mail2danny.com', 'mail2darlene.com', 'mail2darling.com', 'mail2darren.com', 'mail2daughter.com', 'mail2dave.com', 'mail2dawn.com', 'mail2dc.com', 'mail2dealer.com', 'mail2deanna.com', 'mail2dearest.com', 'mail2debbie.com', 'mail2debby.com', 'mail2deer.com', 'mail2delaware.com', 'mail2delicious.com', 'mail2demeter.com', 'mail2democrat.com', 'mail2denise.com', 'mail2denmark.com', 'mail2dennis.com', 'mail2dentist.com', 'mail2derek.com', 'mail2desert.com', 'mail2devoted.com', 'mail2devotion.com', 'mail2diamond.com', 'mail2diana.com', 'mail2diane.com', 'mail2diehard.com', 'mail2dilemma.com', 'mail2dillon.com', 'mail2dinner.com', 'mail2dinosaur.com', 'mail2dionysos.com', 'mail2diplomat.com', 'mail2director.com', 'mail2dirk.com', 'mail2disco.com', 'mail2dive.com', 'mail2diver.com', 'mail2divorced.com', 'mail2djibouti.com', 'mail2doctor.com', 'mail2doglover.com', 'mail2dominic.com', 'mail2dominica.com', 'mail2dominicanrepublic.com', 'mail2don.com', 'mail2donald.com', 'mail2donna.com', 'mail2doris.com', 'mail2dorothy.com', 'mail2doug.com', 'mail2dough.com', 'mail2douglas.com', 'mail2dow.com', 'mail2downtown.com', 'mail2dream.com', 'mail2dreamer.com', 'mail2dude.com', 'mail2dustin.com', 'mail2dyke.com', 'mail2dylan.com', 'mail2earl.com', 'mail2earth.com', 'mail2eastend.com', 'mail2eat.com', 'mail2economist.com', 'mail2ecuador.com', 'mail2eddie.com', 'mail2edgar.com', 'mail2edwin.com', 'mail2egypt.com', 'mail2electron.com', 'mail2eli.com', 'mail2elizabeth.com', 'mail2ellen.com', 'mail2elliot.com', 'mail2elsalvador.com', 'mail2elvis.com', 'mail2emergency.com', 'mail2emily.com', 'mail2engineer.com', 'mail2english.com', 'mail2environmentalist.com', 'mail2eos.com', 'mail2eric.com', 'mail2erica.com', 'mail2erin.com', 'mail2erinyes.com', 'mail2eris.com', 'mail2eritrea.com', 'mail2ernie.com', 'mail2eros.com', 'mail2estonia.com', 'mail2ethan.com', 'mail2ethiopia.com', 'mail2eu.com', 'mail2europe.com', 'mail2eurus.com', 'mail2eva.com', 'mail2evan.com', 'mail2evelyn.com', 'mail2everything.com', 'mail2exciting.com', 'mail2expert.com', 'mail2fairy.com', 'mail2faith.com', 'mail2fanatic.com', 'mail2fancy.com', 'mail2fantasy.com', 'mail2farm.com', 'mail2farmer.com', 'mail2fashion.com', 'mail2fat.com', 'mail2feeling.com', 'mail2female.com', 'mail2fever.com', 'mail2fighter.com', 'mail2fiji.com', 'mail2filmfestival.com', 'mail2films.com', 'mail2finance.com', 'mail2finland.com', 'mail2fireman.com', 'mail2firm.com', 'mail2fisherman.com', 'mail2flexible.com', 'mail2florence.com', 'mail2florida.com', 'mail2floyd.com', 'mail2fly.com', 'mail2fond.com', 'mail2fondness.com', 'mail2football.com', 'mail2footballfan.com', 'mail2found.com', 'mail2france.com', 'mail2frank.com', 'mail2frankfurt.com', 'mail2franklin.com', 'mail2fred.com', 'mail2freddie.com', 'mail2free.com', 'mail2freedom.com', 'mail2french.com', 'mail2freudian.com', 'mail2friendship.com', 'mail2from.com', 'mail2fun.com', 'mail2gabon.com', 'mail2gabriel.com', 'mail2gail.com', 'mail2galaxy.com', 'mail2gambia.com', 'mail2games.com', 'mail2gary.com', 'mail2gavin.com', 'mail2gemini.com', 'mail2gene.com', 'mail2genes.com', 'mail2geneva.com', 'mail2george.com', 'mail2georgia.com', 'mail2gerald.com', 'mail2german.com', 'mail2germany.com', 'mail2ghana.com', 'mail2gilbert.com', 'mail2gina.com', 'mail2girl.com', 'mail2glen.com', 'mail2gloria.com', 'mail2goddess.com', 'mail2gold.com', 'mail2golfclub.com', 'mail2golfer.com', 'mail2gordon.com', 'mail2government.com', 'mail2grab.com', 'mail2grace.com', 'mail2graham.com', 'mail2grandma.com', 'mail2grandpa.com', 'mail2grant.com', 'mail2greece.com', 'mail2green.com', 'mail2greg.com', 'mail2grenada.com', 'mail2gsm.com', 'mail2guard.com', 'mail2guatemala.com', 'mail2guy.com', 'mail2hades.com', 'mail2haiti.com', 'mail2hal.com', 'mail2handhelds.com', 'mail2hank.com', 'mail2hannah.com', 'mail2harold.com', 'mail2harry.com', 'mail2hawaii.com', 'mail2headhunter.com', 'mail2heal.com', 'mail2heather.com', 'mail2heaven.com', 'mail2hebe.com', 'mail2hecate.com', 'mail2heidi.com', 'mail2helen.com', 'mail2hell.com', 'mail2help.com', 'mail2helpdesk.com', 'mail2henry.com', 'mail2hephaestus.com', 'mail2hera.com', 'mail2hercules.com', 'mail2herman.com', 'mail2hermes.com', 'mail2hespera.com', 'mail2hestia.com', 'mail2highschool.com', 'mail2hindu.com', 'mail2hip.com', 'mail2hiphop.com', 'mail2holland.com', 'mail2holly.com', 'mail2hollywood.com', 'mail2homer.com', 'mail2honduras.com', 'mail2honey.com', 'mail2hongkong.com', 'mail2hope.com', 'mail2horse.com', 'mail2hot.com', 'mail2hotel.com', 'mail2houston.com', 'mail2howard.com', 'mail2hugh.com', 'mail2human.com', 'mail2hungary.com', 'mail2hungry.com', 'mail2hygeia.com', 'mail2hyperspace.com', 'mail2hypnos.com', 'mail2ian.com', 'mail2ice-cream.com', 'mail2iceland.com', 'mail2idaho.com', 'mail2idontknow.com', 'mail2illinois.com', 'mail2imam.com', 'mail2in.com', 'mail2india.com', 'mail2indian.com', 'mail2indiana.com', 'mail2indonesia.com', 'mail2infinity.com', 'mail2intense.com', 'mail2iowa.com', 'mail2iran.com', 'mail2iraq.com', 'mail2ireland.com', 'mail2irene.com', 'mail2iris.com', 'mail2irresistible.com', 'mail2irving.com', 'mail2irwin.com', 'mail2isaac.com', 'mail2israel.com', 'mail2italian.com', 'mail2italy.com', 'mail2jackie.com', 'mail2jacob.com', 'mail2jail.com', 'mail2jaime.com', 'mail2jake.com', 'mail2jamaica.com', 'mail2james.com', 'mail2jamie.com', 'mail2jan.com', 'mail2jane.com', 'mail2janet.com', 'mail2janice.com', 'mail2japan.com', 'mail2japanese.com', 'mail2jasmine.com', 'mail2jason.com', 'mail2java.com', 'mail2jay.com', 'mail2jazz.com', 'mail2jed.com', 'mail2jeffrey.com', 'mail2jennifer.com', 'mail2jenny.com', 'mail2jeremy.com', 'mail2jerry.com', 'mail2jessica.com', 'mail2jessie.com', 'mail2jesus.com', 'mail2jew.com', 'mail2jeweler.com', 'mail2jim.com', 'mail2jimmy.com', 'mail2joan.com', 'mail2joann.com', 'mail2joanna.com', 'mail2jody.com', 'mail2joe.com', 'mail2joel.com', 'mail2joey.com', 'mail2john.com', 'mail2join.com', 'mail2jon.com', 'mail2jonathan.com', 'mail2jones.com', 'mail2jordan.com', 'mail2joseph.com', 'mail2josh.com', 'mail2joy.com', 'mail2juan.com', 'mail2judge.com', 'mail2judy.com', 'mail2juggler.com', 'mail2julian.com', 'mail2julie.com', 'mail2jumbo.com', 'mail2junk.com', 'mail2justin.com', 'mail2justme.com', 'mail2kansas.com', 'mail2karate.com', 'mail2karen.com', 'mail2karl.com', 'mail2karma.com', 'mail2kathleen.com', 'mail2kathy.com', 'mail2katie.com', 'mail2kay.com', 'mail2kazakhstan.com', 'mail2keen.com', 'mail2keith.com', 'mail2kelly.com', 'mail2kelsey.com', 'mail2ken.com', 'mail2kendall.com', 'mail2kennedy.com', 'mail2kenneth.com', 'mail2kenny.com', 'mail2kentucky.com', 'mail2kenya.com', 'mail2kerry.com', 'mail2kevin.com', 'mail2kim.com', 'mail2kimberly.com', 'mail2king.com', 'mail2kirk.com', 'mail2kiss.com', 'mail2kosher.com', 'mail2kristin.com', 'mail2kurt.com', 'mail2kuwait.com', 'mail2kyle.com', 'mail2kyrgyzstan.com', 'mail2la.com', 'mail2lacrosse.com', 'mail2lance.com', 'mail2lao.com', 'mail2larry.com', 'mail2latvia.com', 'mail2laugh.com', 'mail2laura.com', 'mail2lauren.com', 'mail2laurie.com', 'mail2lawrence.com', 'mail2lawyer.com', 'mail2lebanon.com', 'mail2lee.com', 'mail2leo.com', 'mail2leon.com', 'mail2leonard.com', 'mail2leone.com', 'mail2leslie.com', 'mail2letter.com', 'mail2liberia.com', 'mail2libertarian.com', 'mail2libra.com', 'mail2libya.com', 'mail2liechtenstein.com', 'mail2life.com', 'mail2linda.com', 'mail2linux.com', 'mail2lionel.com', 'mail2lipstick.com', 'mail2liquid.com', 'mail2lisa.com', 'mail2lithuania.com', 'mail2litigator.com', 'mail2liz.com', 'mail2lloyd.com', 'mail2lois.com', 'mail2lola.com', 'mail2london.com', 'mail2looking.com', 'mail2lori.com', 'mail2lost.com', 'mail2lou.com', 'mail2louis.com', 'mail2louisiana.com', 'mail2lovable.com', 'mail2love.com', 'mail2lucky.com', 'mail2lucy.com', 'mail2lunch.com', 'mail2lust.com', 'mail2luxembourg.com', 'mail2luxury.com', 'mail2lyle.com', 'mail2lynn.com', 'mail2madagascar.com', 'mail2madison.com', 'mail2madrid.com', 'mail2maggie.com', 'mail2mail4.com', 'mail2maine.com', 'mail2malawi.com', 'mail2malaysia.com', 'mail2maldives.com', 'mail2mali.com', 'mail2malta.com', 'mail2mambo.com', 'mail2man.com', 'mail2mandy.com', 'mail2manhunter.com', 'mail2mankind.com', 'mail2many.com', 'mail2marc.com', 'mail2marcia.com', 'mail2margaret.com', 'mail2margie.com', 'mail2marhaba.com', 'mail2maria.com', 'mail2marilyn.com', 'mail2marines.com', 'mail2mark.com', 'mail2marriage.com', 'mail2married.com', 'mail2marries.com', 'mail2mars.com', 'mail2marsha.com', 'mail2marshallislands.com', 'mail2martha.com', 'mail2martin.com', 'mail2marty.com', 'mail2marvin.com', 'mail2mary.com', 'mail2maryland.com', 'mail2mason.com', 'mail2massachusetts.com', 'mail2matt.com', 'mail2matthew.com', 'mail2maurice.com', 'mail2mauritania.com', 'mail2mauritius.com', 'mail2max.com', 'mail2maxwell.com', 'mail2maybe.com', 'mail2mba.com', 'mail2me4u.com', 'mail2mechanic.com', 'mail2medieval.com', 'mail2megan.com', 'mail2mel.com', 'mail2melanie.com', 'mail2melissa.com', 'mail2melody.com', 'mail2member.com', 'mail2memphis.com', 'mail2methodist.com', 'mail2mexican.com', 'mail2mexico.com', 'mail2mgz.com', 'mail2miami.com', 'mail2michael.com', 'mail2michelle.com', 'mail2michigan.com', 'mail2mike.com', 'mail2milan.com', 'mail2milano.com', 'mail2mildred.com', 'mail2milkyway.com', 'mail2millennium.com', 'mail2millionaire.com', 'mail2milton.com', 'mail2mime.com', 'mail2mindreader.com', 'mail2mini.com', 'mail2minister.com', 'mail2minneapolis.com', 'mail2minnesota.com', 'mail2miracle.com', 'mail2missionary.com', 'mail2mississippi.com', 'mail2missouri.com', 'mail2mitch.com', 'mail2model.com', 'mail2moldova.commail2molly.com', 'mail2mom.com', 'mail2monaco.com', 'mail2money.com', 'mail2mongolia.com', 'mail2monica.com', 'mail2montana.com', 'mail2monty.com', 'mail2moon.com', 'mail2morocco.com', 'mail2morpheus.com', 'mail2mors.com', 'mail2moscow.com', 'mail2moslem.com', 'mail2mouseketeer.com', 'mail2movies.com', 'mail2mozambique.com', 'mail2mp3.com', 'mail2mrright.com', 'mail2msright.com', 'mail2museum.com', 'mail2music.com', 'mail2musician.com', 'mail2muslim.com', 'mail2my.com', 'mail2myboat.com', 'mail2mycar.com', 'mail2mycell.com', 'mail2mygsm.com', 'mail2mylaptop.com', 'mail2mymac.com', 'mail2mypager.com', 'mail2mypalm.com', 'mail2mypc.com', 'mail2myphone.com', 'mail2myplane.com', 'mail2namibia.com', 'mail2nancy.com', 'mail2nasdaq.com', 'mail2nathan.com', 'mail2nauru.com', 'mail2navy.com', 'mail2neal.com', 'mail2nebraska.com', 'mail2ned.com', 'mail2neil.com', 'mail2nelson.com', 'mail2nemesis.com', 'mail2nepal.com', 'mail2netherlands.com', 'mail2network.com', 'mail2nevada.com', 'mail2newhampshire.com', 'mail2newjersey.com', 'mail2newmexico.com', 'mail2newyork.com', 'mail2newzealand.com', 'mail2nicaragua.com', 'mail2nick.com', 'mail2nicole.com', 'mail2niger.com', 'mail2nigeria.com', 'mail2nike.com', 'mail2no.com', 'mail2noah.com', 'mail2noel.com', 'mail2noelle.com', 'mail2normal.com', 'mail2norman.com', 'mail2northamerica.com', 'mail2northcarolina.com', 'mail2northdakota.com', 'mail2northpole.com', 'mail2norway.com', 'mail2notus.com', 'mail2noway.com', 'mail2nowhere.com', 'mail2nuclear.com', 'mail2nun.com', 'mail2ny.com', 'mail2oasis.com', 'mail2oceanographer.com', 'mail2ohio.com', 'mail2ok.com', 'mail2oklahoma.com', 'mail2oliver.com', 'mail2oman.com', 'mail2one.com', 'mail2onfire.com', 'mail2online.com', 'mail2oops.com', 'mail2open.com', 'mail2ophthalmologist.com', 'mail2optometrist.com', 'mail2oregon.com', 'mail2oscars.com', 'mail2oslo.com', 'mail2painter.com', 'mail2pakistan.com', 'mail2palau.com', 'mail2pan.com', 'mail2panama.com', 'mail2paraguay.com', 'mail2paralegal.com', 'mail2paris.com', 'mail2park.com', 'mail2parker.com', 'mail2party.com', 'mail2passion.com', 'mail2pat.com', 'mail2patricia.com', 'mail2patrick.com', 'mail2patty.com', 'mail2paul.com', 'mail2paula.com', 'mail2pay.com', 'mail2peace.com', 'mail2pediatrician.com', 'mail2peggy.com', 'mail2pennsylvania.com', 'mail2perry.com', 'mail2persephone.com', 'mail2persian.com', 'mail2peru.com', 'mail2pete.com', 'mail2peter.com', 'mail2pharmacist.com', 'mail2phil.com', 'mail2philippines.com', 'mail2phoenix.com', 'mail2phonecall.com', 'mail2phyllis.com', 'mail2pickup.com', 'mail2pilot.com', 'mail2pisces.com', 'mail2planet.com', 'mail2platinum.com', 'mail2plato.com', 'mail2pluto.com', 'mail2pm.com', 'mail2podiatrist.com', 'mail2poet.com', 'mail2poland.com', 'mail2policeman.com', 'mail2policewoman.com', 'mail2politician.com', 'mail2pop.com', 'mail2pope.com', 'mail2popular.com', 'mail2portugal.com', 'mail2poseidon.com', 'mail2potatohead.com', 'mail2power.com', 'mail2presbyterian.com', 'mail2president.com', 'mail2priest.com', 'mail2prince.com', 'mail2princess.com', 'mail2producer.com', 'mail2professor.com', 'mail2protect.com', 'mail2psychiatrist.com', 'mail2psycho.com', 'mail2psychologist.com', 'mail2qatar.com', 'mail2queen.com', 'mail2rabbi.com', 'mail2race.com', 'mail2racer.com', 'mail2rachel.com', 'mail2rage.com', 'mail2rainmaker.com', 'mail2ralph.com', 'mail2randy.com', 'mail2rap.com', 'mail2rare.com', 'mail2rave.com', 'mail2ray.com', 'mail2raymond.com', 'mail2realtor.com', 'mail2rebecca.com', 'mail2recruiter.com', 'mail2recycle.com', 'mail2redhead.com', 'mail2reed.com', 'mail2reggie.com', 'mail2register.com', 'mail2rent.com', 'mail2republican.com', 'mail2resort.com', 'mail2rex.com', 'mail2rhodeisland.com', 'mail2rich.com', 'mail2richard.com', 'mail2ricky.com', 'mail2ride.com', 'mail2riley.com', 'mail2rita.com', 'mail2rob.com', 'mail2robert.com', 'mail2roberta.com', 'mail2robin.com', 'mail2rock.com', 'mail2rocker.com', 'mail2rod.com', 'mail2rodney.com', 'mail2romania.com', 'mail2rome.com', 'mail2ron.com', 'mail2ronald.com', 'mail2ronnie.com', 'mail2rose.com', 'mail2rosie.com', 'mail2roy.com', 'mail2rudy.com', 'mail2rugby.com', 'mail2runner.com', 'mail2russell.com', 'mail2russia.com', 'mail2russian.com', 'mail2rusty.com', 'mail2ruth.com', 'mail2rwanda.com', 'mail2ryan.com', 'mail2sa.com', 'mail2sabrina.com', 'mail2safe.com', 'mail2sagittarius.com', 'mail2sail.com', 'mail2sailor.com', 'mail2sal.com', 'mail2salaam.com', 'mail2sam.com', 'mail2samantha.com', 'mail2samoa.com', 'mail2samurai.com', 'mail2sandra.com', 'mail2sandy.com', 'mail2sanfrancisco.com', 'mail2sanmarino.com', 'mail2santa.com', 'mail2sara.com', 'mail2sarah.com', 'mail2sat.com', 'mail2saturn.com', 'mail2saudi.com', 'mail2saudiarabia.com', 'mail2save.com', 'mail2savings.com', 'mail2school.com', 'mail2scientist.com', 'mail2scorpio.com', 'mail2scott.com', 'mail2sean.com', 'mail2search.com', 'mail2seattle.com', 'mail2secretagent.com', 'mail2senate.com', 'mail2senegal.com', 'mail2sensual.com', 'mail2seth.com', 'mail2sevenseas.com', 'mail2sexy.com', 'mail2seychelles.com', 'mail2shane.com', 'mail2sharon.com', 'mail2shawn.com', 'mail2ship.com', 'mail2shirley.com', 'mail2shoot.com', 'mail2shuttle.com', 'mail2sierraleone.com', 'mail2simon.com', 'mail2singapore.com', 'mail2single.com', 'mail2site.com', 'mail2skater.com', 'mail2skier.com', 'mail2sky.com', 'mail2sleek.com', 'mail2slim.com', 'mail2slovakia.com', 'mail2slovenia.com', 'mail2smile.com', 'mail2smith.com', 'mail2smooth.com', 'mail2soccer.com', 'mail2soccerfan.com', 'mail2socialist.com', 'mail2soldier.com', 'mail2somalia.com', 'mail2son.com', 'mail2song.com', 'mail2sos.com', 'mail2sound.com', 'mail2southafrica.com', 'mail2southamerica.com', 'mail2southcarolina.com', 'mail2southdakota.com', 'mail2southkorea.com', 'mail2southpole.com', 'mail2spain.com', 'mail2spanish.com', 'mail2spare.com', 'mail2spectrum.com', 'mail2splash.com', 'mail2sponsor.com', 'mail2sports.com', 'mail2srilanka.com', 'mail2stacy.com', 'mail2stan.com', 'mail2stanley.com', 'mail2star.com', 'mail2state.com', 'mail2stephanie.com', 'mail2steve.com', 'mail2steven.com', 'mail2stewart.com', 'mail2stlouis.com', 'mail2stock.com', 'mail2stockholm.com', 'mail2stockmarket.com', 'mail2storage.com', 'mail2store.com', 'mail2strong.com', 'mail2student.com', 'mail2studio.com', 'mail2studio54.com', 'mail2stuntman.com', 'mail2subscribe.com', 'mail2sudan.com', 'mail2superstar.com', 'mail2surfer.com', 'mail2suriname.com', 'mail2susan.com', 'mail2suzie.com', 'mail2swaziland.com', 'mail2sweden.com', 'mail2sweetheart.com', 'mail2swim.com', 'mail2swimmer.com', 'mail2swiss.com', 'mail2switzerland.com', 'mail2sydney.com', 'mail2sylvia.com', 'mail2syria.com', 'mail2taboo.com', 'mail2taiwan.com', 'mail2tajikistan.com', 'mail2tammy.com', 'mail2tango.com', 'mail2tanya.com', 'mail2tanzania.com', 'mail2tara.com', 'mail2taurus.com', 'mail2taxi.com', 'mail2taxidermist.com', 'mail2taylor.com', 'mail2taz.com', 'mail2teacher.com', 'mail2technician.com', 'mail2ted.com', 'mail2telephone.com', 'mail2teletubbie.com', 'mail2tenderness.com', 'mail2tennessee.com', 'mail2tennis.com', 'mail2tennisfan.com', 'mail2terri.com', 'mail2terry.com', 'mail2test.com', 'mail2texas.com', 'mail2thailand.com', 'mail2therapy.com', 'mail2think.com', 'mail2tickets.com', 'mail2tiffany.com', 'mail2tim.com', 'mail2time.com', 'mail2timothy.com', 'mail2tina.com', 'mail2titanic.com', 'mail2toby.com', 'mail2todd.com', 'mail2togo.com', 'mail2tom.com', 'mail2tommy.com', 'mail2tonga.com', 'mail2tony.com', 'mail2touch.com', 'mail2tourist.com', 'mail2tracey.com', 'mail2tracy.com', 'mail2tramp.com', 'mail2travel.com', 'mail2traveler.com', 'mail2travis.com', 'mail2trekkie.com', 'mail2trex.com', 'mail2triallawyer.com', 'mail2trick.com', 'mail2trillionaire.com', 'mail2troy.com', 'mail2truck.com', 'mail2trump.com', 'mail2try.com', 'mail2tunisia.com', 'mail2turbo.com', 'mail2turkey.com', 'mail2turkmenistan.com', 'mail2tv.com', 'mail2tycoon.com', 'mail2tyler.com', 'mail2u4me.com', 'mail2uae.com', 'mail2uganda.com', 'mail2uk.com', 'mail2ukraine.com', 'mail2uncle.com', 'mail2unsubscribe.com', 'mail2uptown.com', 'mail2uruguay.com', 'mail2usa.com', 'mail2utah.com', 'mail2uzbekistan.com', 'mail2v.com', 'mail2vacation.com', 'mail2valentines.com', 'mail2valerie.com', 'mail2valley.com', 'mail2vamoose.com', 'mail2vanessa.com', 'mail2vanuatu.com', 'mail2venezuela.com', 'mail2venous.com', 'mail2venus.com', 'mail2vermont.com', 'mail2vickie.com', 'mail2victor.com', 'mail2victoria.com', 'mail2vienna.com', 'mail2vietnam.com', 'mail2vince.com', 'mail2virginia.com', 'mail2virgo.com', 'mail2visionary.com', 'mail2vodka.com', 'mail2volleyball.com', 'mail2waiter.com', 'mail2wallstreet.com', 'mail2wally.com', 'mail2walter.com', 'mail2warren.com', 'mail2washington.com', 'mail2wave.com', 'mail2way.com', 'mail2waycool.com', 'mail2wayne.com', 'mail2webmaster.com', 'mail2webtop.com', 'mail2webtv.com', 'mail2weird.com', 'mail2wendell.com', 'mail2wendy.com', 'mail2westend.com', 'mail2westvirginia.com', 'mail2whether.com', 'mail2whip.com', 'mail2white.com', 'mail2whitehouse.com', 'mail2whitney.com', 'mail2why.com', 'mail2wilbur.com', 'mail2wild.com', 'mail2willard.com', 'mail2willie.com', 'mail2wine.com', 'mail2winner.com', 'mail2wired.com', 'mail2wisconsin.com', 'mail2woman.com', 'mail2wonder.com', 'mail2world.com', 'mail2worship.com', 'mail2wow.com', 'mail2www.com', 'mail2wyoming.com', 'mail2xfiles.com', 'mail2xox.com', 'mail2yachtclub.com', 'mail2yahalla.com', 'mail2yemen.com', 'mail2yes.com', 'mail2yugoslavia.com', 'mail2zack.com', 'mail2zambia.com', 'mail2zenith.com', 'mail2zephir.com', 'mail2zeus.com', 'mail2zipper.com', 'mail2zoo.com', 'mail2zoologist.com', 'mail2zurich.com', 'mail3000.com', 'mail333.com', 'mailandftp.com', 'mailandnews.com', 'mailas.com', 'mailasia.com', 'mailbolt.com', 'mailbomb.net', 'mailboom.com', 'mailbox.as', 'mailbox.co.za', 'mailbox.gr', 'mailbox.hu', 'mailbr.com.br', 'mailc.net', 'mailcan.com', 'mailcc.com', 'mailchoose.co', 'mailcity.com', 'mailclub.fr', 'mailclub.net', 'mailexcite.com', 'mailforce.net', 'mailftp.com', 'mailgate.gr', 'mailgenie.net', 'mailhaven.com', 'mailhood.com', 'mailingweb.com', 'mailisent.com', 'mailite.com', 'mailme.dk', 'mailmight.com', 'mailmij.nl', 'mailnew.com', 'mailops.com', 'mailoye.com', 'mailpanda.com', 'mailpost.zzn.com', 'mailpride.com', 'mailpuppy.com', 'mailroom.com', 'mailru.com', 'mailsent.net', 'mailshuttle.com', 'mailstart.com', 'mailstartplus.com', 'mailsurf.com', 'mailtag.com', 'mailto.de', 'mailup.net', 'mailwire.com', 'maktoob.com', 'malayalamtelevision.net', 'manager.de', 'mantrafreenet.com', 'mantramail.com', 'mantraonline.com', 'marchmail.com', 'mariah-carey.ml.org', 'mariahc.com', 'marijuana.nl', 'marketing.lu', 'married-not.com', 'marsattack.com', 'martindalemail.com', 'masrawy.com', 'matmail.com', 'mauimail.com', 'mauritius.com', 'maxleft.com', 'maxmail.co.uk', 'mbox.com.au', 'mchsi.com', 'mciworldcom.net', 'me-mail.hu', 'me.com', 'medical.net.au', 'medione.net', 'medmail.com', 'medscape.com', 'meetingmall.com', 'megago.com', 'megamail.pt', 'megapathdsl.net', 'megapoint.com', 'mehrani.com', 'mehtaweb.com', 'mekhong.com', 'melodymail.com', 'meloo.com', 'members.student.com', 'message.hu', 'messages.to', 'metacrawler.com', 'metalfan.com', 'metta.lk', 'miatadriver.com', 'miesto.sk', 'mighty.co.za', 'miho-nakayama.com', 'mikrotamanet.com', 'millionaireintraining.com', 'milmail.com', 'mindless.com', 'mindspring.com', 'mini-mail.com', 'misery.net', 'mittalweb.com', 'mixmail.com', 'mjfrogmail.com', 'ml1.net', 'mobilbatam.com', 'mochamail.com', 'mohammed.com', 'moldova.cc', 'moldova.com', 'moldovacc.com', 'money.net', 'montevideo.com.uy', 'moonman.com', 'moose-mail.com', 'mortaza.com', 'mosaicfx.com', 'most-wanted.com', 'mostlysunny.com', 'motormania.com', 'movemail.com', 'movieluver.com', 'mp4.it', 'mr-potatohead.com', 'mrpost.com', 'mscold.com', 'msgbox.com', 'msn.com', 'mttestdriver.com', 'mundomail.net', 'munich.com', 'music.com', 'musician.org', 'musicscene.org', 'mybox.it', 'mycabin.com', 'mycampus.com', 'mycity.com', 'mycool.com', 'mydomain.com', 'mydotcomaddress.com', 'myfamily.com', 'mygo.com', 'myiris.com', 'mynamedot.com', 'mynetaddress.com', 'myownemail.com', 'myownfriends.com', 'mypad.com', 'mypersonalemail.com', 'myplace.com', 'myrealbox.com', 'myremarq.com', 'myself.com', 'mystupidjob.com', 'mythirdage.com', 'myway.com', 'myworldmail.com', 'n2.com', 'n2business.com', 'n2mail.com', 'n2software.com', 'nabc.biz', 'nafe.com', 'nagpal.net', 'nakedgreens.com', 'name.com', 'nameplanet.com', 'nandomail.com', 'naplesnews.net', 'naseej.com', 'nate.com', 'nativestar.net', 'nativeweb.net', 'naui.net', 'nauticom.net', 'naver.com', 'navigator.lv', 'navy.org', 'naz.com', 'nchoicemail.com', 'neeva.net', 'nemra1.com', 'nenter.com', 'neo.rr.com', 'nervhq.org', 'net-pager.net', 'net4b.pt', 'net4you.at', 'netbounce.com', 'netbroadcaster.com', 'netby.dk', 'netcenter-vn.net', 'netcom.ca', 'netcom.com', 'netcourrier.com', 'netexecutive.com', 'netexpressway.com', 'netgenie.com', 'netian.com', 'netizen.com.ar', 'netlane.com', 'netlimit.com', 'netmanor.com', 'netmongol.com', 'netnet.com.sg', 'netpiper.com', 'netposta.net', 'netradiomail.com', 'netralink.com', 'netscape.com', 'netscape.net', 'netscapeonline.co.uk', 'netsero.net', 'netspeedway.com', 'netsquare.com', 'netster.com', 'nettaxi.com', 'netzero.com', 'netzero.net', 'neuf.fr', 'newmail.com', 'newmail.net', 'newmail.ru', 'newyork.com', 'nexxmail.com', 'nfmail.com', 'nhmail.com', 'nicebush.com', 'nicegal.com', 'nicholastse.net', 'nicolastse.com', 'nightmail.com', 'nikopage.com', 'nimail.com', 'nirvanafan.com', 'noavar.com', 'norika-fujiwara.com', 'norikomail.com', 'northgates.net', 'nospammail.net', 'ntlworld.com', 'ntscan.com', 'ny.com', 'nyc.com', 'nycmail.com', 'nzoomail.com', 'o-tay.com', 'o2.co.uk', 'oaklandas-fan.com', 'oceanfree.net', 'oddpost.com', 'odmail.com', 'office-email.com', 'officedomain.com', 'offroadwarrior.com', 'oi.com.br', 'oicexchange.com', 'okbank.com', 'okhuman.com', 'okmad.com', 'okmagic.com', 'okname.net', 'okuk.com', 'oldies1041.com', 'oldies104mail.com', 'ole.com', 'olemail.com', 'olg.com', 'olympist.net', 'omaninfo.com', 'onebox.com', 'onenet.com.ar', 'onet.pl', 'oninet.pt', 'online.de', 'online.ie', 'onlinewiz.com', 'onmilwaukee.com', 'onobox.com', 'onvillage.com', 'operafan.com', 'operamail.com', 'optician.com', 'optonline.net', 'optusnet.com.au', 'orange.fr', 'orange.net', 'orbitel.bg', 'orgmail.net', 'osite.com.br', 'oso.com', 'otakumail.com', 'our-computer.com', 'our-office.com', 'our.st', 'ourbrisbane.com', 'ournet.md', 'outel.com', 'outgun.com', 'outlook.com', 'outlook.com.br', 'over-the-rainbow.com', 'ownmail.net', 'ozbytes.net.au', 'ozemail.com.au', 'pacbell.net', 'pacific-re.com', 'packersfan.com', 'pagina.de', 'pagons.org', 'pakistanoye.com', 'palestinemail.com', 'parkjiyoon.com', 'parrot.com', 'parsmail.com', 'partlycloudy.com', 'partynight.at', 'parvazi.com', 'passwordmail.com', 'pathfindermail.com', 'patmedia.net', 'pconnections.net', 'pcpostal.com', 'pcsrock.com', 'peachworld.com', 'pediatrician.com', 'pemail.net', 'penpen.com', 'peoplepc.com', 'peopleweb.com', 'perfectmail.com', 'personal.ro', 'personales.com', 'petml.com', 'pettypool.com', 'pezeshkpour.com', 'phayze.com', 'phreaker.net', 'pickupman.com', 'picusnet.com', 'pigpig.net', 'pinoymail.com', 'pipeline.com', 'piracha.net', 'pisem.net', 'planet-mail.com', 'planet.nl', 'planetaccess.com', 'planetall.com', 'planetarymotion.net', 'planetdirect.com', 'planetearthinter.net', 'planetout.com', 'plasa.com', 'playersodds.com', 'playful.com', 'plusmail.com.br', 'pmail.net', 'pobox.com', 'pobox.hu', 'pobox.sk', 'pochta.ru', 'poczta.fm', 'poetic.com', 'polbox.com', 'policeoffice.com', 'pool-sharks.com', 'poond.com', 'popaccount.com', 'popmail.com', 'popsmail.com', 'popstar.com', 'populus.net', 'portableoffice.com', 'portugalmail.com', 'portugalmail.pt', 'portugalnet.com', 'positive-thinking.com', 'post.com', 'post.cz', 'post.sk', 'posta.net', 'posta.ro', 'postaccesslite.com', 'postafree.com', 'postaweb.com', 'poste.it', 'postinbox.com', 'postino.ch', 'postmark.net', 'postmaster.co.uk', 'postpro.net', 'pousa.com', 'powerfan.com', 'praize.com', 'premiumservice.com', 'presidency.com', 'press.co.jp', 'priest.com', 'primposta.com', 'primposta.hu', 'pro.hu', 'probemail.com', 'prodigy.net', 'prodigy.net.mx', 'progetplus.it', 'programmer.net', 'programozo.hu', 'proinbox.com', 'project2k.com', 'prolaunch.com', 'promessage.com', 'prontomail.com', 'protonmail.com', 'psi.net', 'psv-supporter.com', 'ptd.net', 'public.usa.com', 'publicist.com', 'pulp-fiction.com', 'punkass.com', 'qatarmail.com', 'qis.net', 'qprfans.com', 'qq.com', 'qrio.com', 'quackquack.com', 'quakemail.com', 'qudsmail.com', 'quepasa.com', 'quickwebmail.com', 'quiklinks.com', 'quikmail.com', 'qwest.net', 'qwestoffice.net', 'r-o-o-t.com', 'r7.com', 'raakim.com', 'racedriver.com', 'racefanz.com', 'racingfan.com.au', 'racingmail.com', 'radicalz.com', 'ragingbull.com', 'rambler.ru', 'ranmamail.com', 'rastogi.net', 'ratt-n-roll.com', 'rattle-snake.com', 'ravearena.com', 'ravemail.com', 'razormail.com', 'rccgmail.org', 'rcn.com', 'realemail.net', 'reallyfast.biz', 'realradiomail.com', 'recycler.com', 'rediffmail.com', 'rediffmailpro.com', 'rednecks.com', 'redseven.de', 'redsfans.com', 'reggafan.com', 'registerednurses.com', 'repairman.com', 'reply.hu', 'representative.com', 'rescueteam.com', 'resumemail.com', 'rezai.com', 'richmondhill.com', 'rickymail.com', 'rin.ru', 'riopreto.com.br', 'rn.com', 'roadrunner.com', 'roanokemail.com', 'rock.com', 'rocketmail.com', 'rockfan.com', 'rodrun.com', 'rome.com', 'roosh.com', 'rotfl.com', 'roughnet.com', 'rr.com', 'rrohio.com', 'rsub.com', 'rubyridge.com', 'runbox.com', 'rushpost.com', 'ruttolibero.com', 'rvshop.com', 's-mail.com', 'sabreshockey.com', 'sacbeemail.com', 'safarimail.com', 'safe-mail.net', 'sagra.lu', 'sailormoon.com', 'saintly.com', 'saintmail.net', 'sale-sale-sale.com', 'salehi.net', 'samerica.com', 'samilan.net', 'sammimail.com', 'sanfranmail.com', 'sanook.com', 'sapo.pt', 'sativa.ro.org', 'saudia.com', 'sayhi.net', 'sbcglobal.net', 'scandalmail.com', 'schizo.com', 'schoolemail.com', 'schoolmail.com', 'schoolsucks.com', 'schweiz.org', 'sci.fi', 'science.com.au', 'scientist.com', 'scifianime.com', 'scottishmail.co.uk', 'scubadiving.com', 'seanet.com', 'searchwales.com', 'sebil.com', 'secret-police.com', 'secretservices.net', 'seductive.com', 'seekstoyboy.com', 'seguros.com.br', 'send.hu', 'sendme.cz', 'sent.com', 'sentrismail.com', 'serga.com.ar', 'servemymail.com', 'sesmail.com', 'sexmagnet.com', 'seznam.cz', 'sfr.fr', 'shahweb.net', 'shaniastuff.com', 'sharewaredevelopers.com', 'sharmaweb.com', 'shaw.ca', 'she.com', 'shootmail.com', 'shotgun.hu', 'shuf.com', 'sialkotcity.com', 'sialkotian.com', 'sialkotoye.com', 'sify.com', 'silkroad.net', 'sina.cn', 'sina.com', 'sinamail.com', 'singapore.com', 'singmail.com', 'singnet.com.sg', 'singpost.com', 'skafan.com', 'skim.com', 'skizo.hu', 'sky.com', 'skynet.be', 'slamdunkfan.com', 'slingshot.com', 'slo.net', 'slotter.com', 'smapxsmap.net', 'smileyface.comsmithemail.net', 'smoothmail.com', 'snail-mail.net', 'snail-mail.ney', 'snakemail.com', 'sndt.net', 'sneakemail.com', 'snet.net', 'snip.net', 'sniper.hu', 'snoopymail.com', 'snowboarding.com', 'snowdonia.net', 'socamail.com', 'socceramerica.net', 'soccermail.com', 'soccermomz.com', 'sociologist.com', 'softhome.net', 'sol.dk', 'soldier.hu', 'soon.com', 'soulfoodcookbook.com', 'sp.nl', 'space-bank.com', 'space-man.com', 'space-ship.com', 'space-travel.com', 'space.com', 'spaceart.com', 'spacebank.com', 'spacemart.com', 'spacetowns.com', 'spacewar.com', 'spamex.com', 'spartapiet.com', 'spazmail.com', 'speedemail.net', 'speedpost.net', 'speedrules.com', 'speedrulz.com', 'speedy.com.ar', 'spils.com', 'spinfinder.com', 'sportemail.com', 'sportsmail.com', 'sporttruckdriver.com', 'spray.no', 'spray.se', 'sprintmail.com', 'sprynet.com', 'spymac.com', 'srilankan.net', 'st-davids.net', 'stade.fr', 'stalag13.com', 'stargateradio.com', 'starmail.com', 'starmail.org', 'starmedia.com', 'starplace.com', 'starpower.net', 'starspath.com', 'start.com.au', 'starting-point.com', 'startrekmail.com', 'stealthmail.com', 'stockracer.com', 'stones.com', 'stopdropandroll.com', 'storksite.com', 'stribmail.com', 'strompost.com', 'strongguy.com', 'studentcenter.org', 'subnetwork.com', 'subram.com', 'sudanmail.net', 'suhabi.com', 'suisse.org', 'sukhumvit.net', 'sunpoint.net', 'sunrise-sunset.com', 'sunsgame.com', 'sunumail.sn', 'superdada.com', 'supereva.it', 'supermail.ru', 'surat.com', 'surf3.net', 'surfree.com', 'surfy.net', 'surimail.com', 'survivormail.com', 'swbell.net', 'sweb.cz', 'swiftdesk.com', 'swingeasyhithard.com', 'swingfan.com', 'swipermail.zzn.com', 'swirve.com', 'swissinfo.org', 'swissmail.net', 'switchboardmail.com', 'switzerland.org', 'swva.net', 'sx172.com', 'sympatico.ca', 'syom.com', 'syriamail.com', 't-online.de', 't2mail.com', 'takuyakimura.com', 'talk21.com', 'talkcity.com', 'talktalk.co.uk', 'tamil.com', 'tampabay.rr.com', 'tatanova.com', 'tbwt.com', 'tds.net', 'teamdiscovery.com', 'teamtulsa.net', 'tech4peace.org', 'techemail.com', 'techie.com', 'technisamail.co.za', 'technologist.com', 'techpointer.com', 'techscout.com', 'techseek.com', 'techspot.com', 'teenagedirtbag.com', 'telebot.com', 'telebot.net', 'teleline.es', 'telenet.be', 'telerymd.com', 'teleserve.dynip.com', 'teletu.it', 'telinco.net', 'telkom.net', 'telpage.net', 'telus.net', 'temtulsa.net', 'tenchiclub.com', 'tenderkiss.com', 'tennismail.com', 'terra.cl', 'terra.com', 'terra.com.ar', 'terra.com.br', 'terra.es', 'tfanus.com.er', 'tfz.net', 'thai.com', 'thaimail.com', 'thaimail.net', 'the-african.com', 'the-airforce.com', 'the-aliens.com', 'the-american.com', 'the-animal.com', 'the-army.com', 'the-astronaut.com', 'the-beauty.com', 'the-big-apple.com', 'the-biker.com', 'the-boss.com', 'the-brazilian.com', 'the-canadian.com', 'the-canuck.com', 'the-captain.com', 'the-chinese.com', 'the-country.com', 'the-cowboy.com', 'the-davis-home.com', 'the-dutchman.com', 'the-eagles.com', 'the-englishman.com', 'the-fastest.net', 'the-fool.com', 'the-frenchman.com', 'the-galaxy.net', 'the-genius.com', 'the-gentleman.com', 'the-german.com', 'the-gremlin.com', 'the-hooligan.com', 'the-italian.com', 'the-japanese.com', 'the-lair.com', 'the-madman.com', 'the-mailinglist.com', 'the-marine.com', 'the-master.com', 'the-mexican.com', 'the-ministry.com', 'the-monkey.com', 'the-newsletter.net', 'the-pentagon.com', 'the-police.com', 'the-prayer.com', 'the-professional.com', 'the-quickest.com', 'the-russian.com', 'the-snake.com', 'the-spaceman.com', 'the-stock-market.com', 'the-student.net', 'the-whitehouse.net', 'the-wild-west.com', 'the18th.com', 'thecoolguy.com', 'thecriminals.com', 'thedoghousemail.com', 'thedorm.com', 'theend.hu', 'theglobe.com', 'thegolfcourse.com', 'thegooner.com', 'theheadoffice.com', 'thelanddownunder.com', 'themillionare.net', 'theoffice.net', 'thepokerface.com', 'thepostmaster.net', 'theraces.com', 'theracetrack.com', 'thestreetfighter.com', 'theteebox.com', 'thewatercooler.com', 'thewebpros.co.uk', 'thewizzard.com', 'thewizzkid.com', 'thezhangs.net', 'thirdage.com', 'thisgirl.com', 'thoic.com', 'thundermail.com', 'tidni.com', 'timein.net', 'tin.it', 'tiscali.at', 'tiscali.be', 'tiscali.co.uk', 'tiscali.it', 'tiscali.lu', 'tiscali.se', 'tkcity.com', 'toolsource.com', 'topchat.com', 'topgamers.co.uk', 'topletter.com', 'topmail.com.ar', 'topsurf.com', 'topteam.bg', 'torchmail.com', 'tot.net', 'totalmusic.net', 'toughguy.net', 'tpg.com.au', 'travel.li', 'trialbytrivia.com', 'tritium.net', 'trmailbox.com', 'tropicalstorm.com', 'truckers.com', 'truckerz.com', 'truckracer.com', 'trust-me.com', 'tsamail.co.za', 'ttml.co.in', 'tunisiamail.com', 'turkey.com', 'tvcablenet.be', 'twinstarsmail.com', 'tycoonmail.com', 'typemail.com', 'u2club.com', 'uae.ac', 'uaemail.com', 'ubbi.com', 'ubbi.com.br', 'uboot.com', 'uk2k.com', 'uk2net.com', 'uk7.net', 'uk8.net', 'ukbuilder.com', 'ukcool.com', 'ukdreamcast.com', 'ukmail.org', 'ukmax.com', 'ukr.net', 'uku.co.uk', 'ultapulta.com', 'ultrapostman.com', 'ummah.org', 'umpire.com', 'unbounded.com', 'unforgettable.com', 'uni.de', 'unican.es', 'unihome.com', 'universal.pt', 'uno.ee', 'uno.it', 'unofree.it', 'unomail.com', 'uol.com.ar', 'uol.com.br', 'uol.com.co', 'uol.com.mx', 'uol.com.ve', 'uole.com', 'uole.com.ve', 'uolmail.com', 'uomail.com', 'upf.org', 'ureach.com', 'urgentmail.biz', 'usa.com', 'usa.net', 'usaaccess.net', 'usanetmail.com', 'usermail.com', 'usit.net', 'usma.net', 'usmc.net', 'uswestmail.net', 'uu.net', 'uymail.com', 'uyuyuy.com', 'v-sexi.com', 'vahoo.com', 'varbizmail.com', 'vcmail.com', 'velnet.co.uk', 'velocall.com', 'verizon.net', 'verizonmail.com', 'veryfast.biz', 'veryspeedy.net', 'videotron.ca', 'violinmakers.co.uk', 'vip.gr', 'vipmail.ru', 'virgilio.it', 'virgin.net', 'virginmedia.com', 'virtualactive.com', 'virtualmail.com', 'visitmail.com', 'visitweb.com', 'visto.com', 'visualcities.com', 'vivavelocity.com', 'vivianhsu.net', 'vjmail.com', 'vjtimail.com', 'vlmail.com', 'vnn.vn', 'voila.fr', 'volcanomail.com', 'voo.be', 'vote-democrats.com', 'vote-hillary.com', 'vote-republicans.com', 'vote4gop.org', 'votenet.com', 'vr9.com', 'w3.to', 'wahoye.com', 'wales2000.net', 'wam.co.za', 'wanadoo.co.uk', 'wanadoo.es', 'wanadoo.fr', 'warmmail.com', 'warpmail.net', 'warrior.hu', 'waumail.com', 'wbdet.com', 'wearab.net', 'web-mail.com.ar', 'web-police.com', 'web.de', 'webave.com', 'webcammail.com', 'webcity.ca', 'webdream.com', 'webinbox.com', 'webindia123.com', 'webjump.com', 'webmail.bellsouth.net', 'webmail.co.yu', 'webmail.co.za', 'webmail.hu', 'webmails.com', 'webprogramming.com', 'webstable.net', 'webstation.com', 'websurfer.co.za', 'webtopmail.com', 'weedmail.com', 'weekmail.com', 'weekonline.com', 'wehshee.com', 'welsh-lady.com', 'whale-mail.com', 'whartontx.com', 'wheelweb.com', 'whipmail.com', 'whoever.com', 'whoopymail.com', 'wickedmail.com', 'wideopenwest.com', 'wildmail.com', 'windrivers.net', 'windstream.net', 'wingnutz.com', 'winmail.com.au', 'winning.com', 'witty.com', 'wiz.cc', 'wkbwmail.com', 'woh.rr.com', 'wolf-web.com', 'wombles.com', 'wonder-net.com', 'wongfaye.com', 'wooow.it', 'workmail.com', 'worldemail.com', 'worldmailer.com', 'worldnet.att.net', 'wosaddict.com', 'wouldilie.com', 'wow.com', 'wowgirl.com', 'wowmail.com', 'wowway.com', 'wp.pl', 'wptamail.com', 'wrestlingpages.com', 'wrexham.net', 'writeme.com', 'writemeback.com', 'wrongmail.com', 'wtvhmail.com', 'wwdg.com', 'www.com', 'www2000.net', 'wx88.net', 'wxs.net', 'wyrm.supernews.com', 'x-mail.net', 'x-networks.net', 'x5g.com', 'xmastime.com', 'xmsg.com', 'xoom.com', 'xoommail.com', 'xpressmail.zzn.com', 'xsmail.com', 'xuno.com', 'xzapmail.com', 'ya.ru', 'yada-yada.com', 'yaho.com', 'yahoo.ca', 'yahoo.co.id', 'yahoo.co.in', 'yahoo.co.jp', 'yahoo.co.kr', 'yahoo.co.nz', 'yahoo.co.uk', 'yahoo.com', 'yahoo.com.ar', 'yahoo.com.au', 'yahoo.com.br', 'yahoo.com.cn', 'yahoo.com.hk', 'yahoo.com.is', 'yahoo.com.mx', 'yahoo.com.ph', 'yahoo.com.ru', 'yahoo.com.sg', 'yahoo.de', 'yahoo.dk', 'yahoo.es', 'yahoo.fr', 'yahoo.ie', 'yahoo.in', 'yahoo.it', 'yahoo.jp', 'yahoo.ru', 'yahoo.se', 'yahoofs.com', 'yalla.com', 'yalla.com.lb', 'yalook.com', 'yam.com', 'yandex.com', 'yandex.ru', 'yapost.com', 'yawmail.com', 'yclub.com', 'yebox.com', 'yehaa.com', 'yehey.com', 'yemenmail.com', 'yepmail.net', 'yesbox.net', 'ygm.com', 'yifan.net', 'ymail.com', 'ynnmail.com', 'yogotemail.com', 'yopolis.com', 'youareadork.com', 'youpy.com', 'your-house.com', 'yourinbox.com', 'yourlover.net', 'yourname.ddns.org', 'yourname.freeservers.com', 'yournightmare.com', 'yours.com', 'yourssincerely.com', 'yoursubdomain.findhere.com', 'yoursubdomain.zzn.com', 'yourteacher.net', 'yourwap.com', 'youvegotmail.net', 'yuuhuu.net', 'yyhmail.com', 'zahadum.com', 'zcities.com', 'zdnetmail.com', 'zeeks.com', 'zeepost.nl', 'zensearch.net', 'zhaowei.net', 'zionweb.org', 'zip.net', 'zipido.com', 'ziplink.net', 'ziplip.com', 'zipmail.com', 'zipmail.com.br', 'zipmax.com', 'zmail.ru', 'zoho.com', 'zonnet.nl', 'zoominternet.net', 'zubee.com', 'zuvio.com', 'zuzzurello.com', 'zwallet.com', 'zybermail.com', 'zydecofan.com', 'zzn.com', 'zzom.co.uk'];

const validateInput = (field, value) => {
  var _field$validations, _field$validations$re;

  const isRequired = field.validations && field.validations.required;
  const minLength = field.validations && field.validations.minLength;
  const maxLength = field.validations && field.validations.maxLength;
  const hasRegex = field !== null && field !== void 0 && (_field$validations = field.validations) !== null && _field$validations !== void 0 && (_field$validations$re = _field$validations.regex) !== null && _field$validations$re !== void 0 && _field$validations$re.pattern ? true : false;
  const integer = field.dataType === 'integer';
  const decimal = field.dataType === 'decimal';
  const isBusinessEmail = field.id === 'businessEmail';

  if (isRequired && !value) {
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


  if (hasRegex && (value === null || value === void 0 ? void 0 : value.length) > 0) {
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
  const regex = field.validations.regex.pattern;
  const regexPattern = RegExp(regex);
  if (!regexPattern.test(value)) return false;else return true;
};

const isBusinessEmailValid = (field, value) => {
  const domain = value.split('@').pop();
  if (!domains.includes(domain)) return true;else return false;
};

const MakeFieldType = field => {
  var _field$editor, _field$editor$propert;

  if (!field) return null;

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
  } else {
    return 'textfield';
  }
};

const formV2Sagas = [effects.takeEvery(SUBMIT_FORM_SUCCESS, formSuccess), effects.takeEvery(SUBMIT_FORM_FOR_VALIDATION, validateForm), effects.takeEvery(SUBMIT_FORM, submitForm$1), effects.takeEvery(SET_FORM_ID, fetchForm), effects.takeLatest(VALIDATE_FIELD, validateField$1), effects.takeEvery(PAGE_FORWARD, togglePage), effects.takeEvery(PAGE_BACK, togglePage), effects.takeEvery(SET_FORM_DATA, getEntryPickerData), effects.takeLatest(SET_FORM_DATA, setDefaultValueFields)];

function* validateForm(action) {
  const {
    formId
  } = action;
  yield validateAllfields(formId);
  yield effects.put({
    type: SUBMIT_FORM,
    formId
  });
}

function* validateField$1(action) {
  const {
    formId,
    id,
    value
  } = action;
  yield effects.call(validateSingleField, formId, id, value);
}

function* validateGroupfields(formId, groupId) {
  const state = yield effects.select();
  const selectPostData = makeSelectFormPostData(formId);
  const postData = selectPostData(state);
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const groupFields = fields.filter(f => f.groupid == groupId);
  let newErrors = [];
  groupFields.forEach(field => {
    let val = '';

    if (postData[field.id]) {
      val = postData[field.id];
    }

    const err = validateInput(field, val);
    if (err) newErrors.push(err);
  });
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* validateAllfields(formId) {
  const state = yield effects.select();
  const selectPostData = makeSelectFormPostData(formId);
  const postData = selectPostData(state);
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  let newErrors = [];
  fields.forEach(field => {
    let val = '';

    if (postData[field.id]) {
      val = postData[field.id];
    }

    const err = validateInput(field, val);
    if (err) newErrors.push(err);
  });
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* validateSingleField(formId, fieldId, value) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const selectFormFieldErrors = makeSelectFormFieldErrors(formId);
  const errors = selectFormFieldErrors(state);
  const fieldData = fields.find(f => f.id == fieldId);
  const newErrors = []; //loop through current errors to remove any of the item we currently edit

  errors.forEach(error => {
    if (error.fieldId !== fieldId) {
      //push any existing errors to new array
      newErrors.push(error);
    }
  });
  const err = validateInput(fieldData, value);
  if (err) newErrors.push(err);
  yield effects.put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* togglePage(action) {
  const {
    formId,
    pageIndex
  } = action;
  const state = yield effects.select();
  const selectFormGroups = makeSelectFormGroup(formId);
  const formGroups = selectFormGroups(state);

  if (action.type === PAGE_FORWARD) {
    yield validateGroupfields(formId, formGroups[pageIndex].id);
  }

  yield effects.put({
    type: SET_CURRENT_PAGE,
    formId: formId,
    pageId: formGroups[pageIndex].id,
    pageCount: formGroups.length,
    pageIndex: pageIndex
  });
}

function* fetchForm(action) {
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
      return { ...field,
        type: MakeFieldType(field)
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

function* formSuccess(action) {
  const state = yield effects.select();
  const selectFormFields = makeSelectFormFields(action.formId);
  const fields = selectFormFields(state);
  const redirect = fields.find(f => f.id === 'formSettingsRedirect');
  const message = fields.find(f => f.id === 'formSettingsMessage');

  if (redirect !== null && redirect !== void 0 && redirect.default) {
    window.location.href = redirect.default['en-GB'];
  }

  if (message !== null && message !== void 0 && message.default) {
    yield effects.put({
      type: SET_SUCCESS_MESSAGE,
      message: message.default['en-GB'],
      formId: action.formId
    });
  }
}

function* submitForm$1(action) {
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

const submitForm = formId => action(SUBMIT_FORM_FOR_VALIDATION, {
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
const setCheckboxValue = (formId, id, value, isChecked) => action(SET_CHECKBOX_VALUE, {
  formId,
  id,
  value,
  isChecked
});
const setDateRangeValues = (formId, id, dateType, value) => action(SET_DATE_RANGE_VALUES, {
  formId,
  id,
  dateType,
  value
});
const validateField = (formId, id, value) => action(VALIDATE_FIELD, {
  formId,
  id,
  value
});
const togglePageForward = (formId, pageIndex) => action(PAGE_FORWARD, {
  formId,
  pageIndex
});
const togglePageBack = (formId, pageIndex) => action(PAGE_BACK, {
  formId,
  pageIndex
});
const actions = {
  submitForm,
  setFormId,
  setValue,
  setCheckboxValue,
  setDateRangeValues,
  validateField,
  togglePageForward,
  togglePageBack
};

//Brand
const open_teal = '#37BFA7'; //Brand dark

const teal_dark = '#00a889'; //Primary

const accent_blue = '#1853AC';
const panel_blue = '#00304D'; //Neutrals

const base_white = '#FFF';
const empress_gray = '#757575';
const colors = {
  brand: open_teal,
  brandDark: teal_dark,
  primary: accent_blue,
  secondary: panel_blue,
  label: '#333',
  label_optional: '#666',
  border: '#ccc',
  message_link: '#333',
  success: '#118011',
  warning: '#FFB000',
  error: '#C63D54',
  required: '#C63D54',
  neutrals: {
    base_white,
    empress_gray
  }
};

const FormStyled = styled__default["default"].form.withConfig({
  displayName: "Formstyled__FormStyled",
  componentId: "sc-1jn1lk9-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["> div:not(:first-child){margin-top:16px;}padding:0 16px;.success-message{font-size:18px;margin:0;}.visuallyHidden{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}.loading{display:block;margin:24px auto;}label{display:inline-block;.isRequired{color:", ";}}input,textarea,select{display:block;font-family:inherit;background-color:", ";border-radius:3px;border:1px solid ", ";height:40px;padding:8px;margin-top:4px;max-width:320px;width:100%;}textarea{height:200px;resize:none;}"], colors.error, colors.neutrals.base_white, colors.border));
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
  }, label, isRequired && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "isRequired"
  }, "*"), isRequired && /*#__PURE__*/React__default["default"].createElement("span", {
    className: "visuallyHidden"
  }, " (required)"));
};

Label.propTypes = {
  className: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  isRequired: PropTypes__default["default"].bool,
  isHidden: PropTypes__default["default"].bool
};

const CreateMessage = (type, minLength, maxLength, currentLength, defaultLanguage) => {
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

const CharacterLimitStyled = styled__default["default"].div.withConfig({
  displayName: "CharacterLimit__CharacterLimitStyled",
  componentId: "sc-16zngav-0"
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
  }, CreateMessage(type, minLength, maxLength, currentLength, defaultLanguage));
};

CharacterLimit.propTypes = {
  validations: PropTypes__default["default"].object,
  value: PropTypes__default["default"].oneOfType([PropTypes__default["default"].string, PropTypes__default["default"].object]),
  className: PropTypes__default["default"].string,
  defaultLanguage: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool
};

const ErrorMessageStyled = styled__default["default"].div.withConfig({
  displayName: "ErrorMessage__ErrorMessageStyled",
  componentId: "sc-1vewdiu-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:block;margin-top:8px;color:", ";"], theme.colors.error));
});

const ErrorMessage = ({
  className,
  message,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ErrorMessageStyled, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, message);
};

ErrorMessage.propTypes = {
  className: PropTypes__default["default"].string,
  message: PropTypes__default["default"].string.isRequired,
  useDefaultTheme: PropTypes__default["default"].bool
};

const TextfieldStyled = styled__default["default"].div.withConfig({
  displayName: "Textfield__TextfieldStyled",
  componentId: "sc-1a1c03n-0"
})(["", ";"], ({
  isHidden
}) => {
  return styled.css(["display:", ";"], isHidden ? 'none' : 'block');
});

const Textfield = ({
  className,
  formId,
  id,
  label,
  type,
  setValue,
  validateField,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  isHidden,
  errors,
  useDefaultTheme
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue && defaultValue[defaultLanguage] ? defaultValue[defaultLanguage] : defaultValue;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  const _handleBlur = (formId, id, value) => {
    validateField(formId, id, value);
    setShowCharLimit(false);
  };

  const _handleFocus = () => {
    setShowCharLimit(true);
  };

  return /*#__PURE__*/React__default["default"].createElement(TextfieldStyled, {
    className: "textfield-container",
    isHidden: isHidden
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textfield"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("input", {
    className: `${className ? className : ''} input-textfield`,
    type: type,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    id: id,
    name: id,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React__default["default"].createElement(ErrorMessage, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textfield.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
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
  formId,
  id,
  label,
  type,
  setValue,
  validations,
  defaultValue,
  defaultLanguage,
  placeholder,
  validateField,
  useDefaultTheme,
  errors
}) => {
  const [showCharLimit, setShowCharLimit] = React.useState(false);
  const isRequired = validations && validations.required ? true : false;
  const placeholderText = placeholder && placeholder.properties && placeholder.properties.placeholderText && placeholder.properties.placeholderText[defaultLanguage];
  const defaultValueText = defaultValue ? defaultValue[defaultLanguage] : null;

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

  const _handleBlur = (formId, id, value) => {
    validateField(formId, id, value);
    setShowCharLimit(false);
  };

  const _handleFocus = () => {
    setShowCharLimit(true);
  };

  return /*#__PURE__*/React__default["default"].createElement("div", {
    className: "textarea-container"
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textarea"
  }), showCharLimit && /*#__PURE__*/React__default["default"].createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React__default["default"].createElement("textarea", {
    className: `${className ? className : ''} input-textarea`,
    type: type,
    id: id,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React__default["default"].createElement(ErrorMessage, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textarea.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  id: PropTypes__default["default"].string,
  label: PropTypes__default["default"].string,
  type: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultValue: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  placeholder: PropTypes__default["default"].object,
  validateField: PropTypes__default["default"].func,
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

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

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
    onBlur: e => _handleChange(formId, id, e.target.value)
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
  displayName: "Checkbox__CheckboxStyled",
  componentId: "sc-s8ewuf-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css([".checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
});

const Checkbox = ({
  className,
  formId,
  setCheckboxValue,
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

  switch (type) {
    case 'multiple':
      {
        if (!validations) return null;
        const isRequired = validations && validations.required ? true : false;
        const cbValues = validations && validations.allowedValues && validations.allowedValues.values;

        const _handleChange = (value, isChecked) => {
          setCheckboxValue(formId, id, value, isChecked);
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
          }), /*#__PURE__*/React__default["default"].createElement(Label, {
            id: `checkbox-${idx}`,
            label: val[defaultLanguage],
            className: "label-checkbox"
          }));
        }));
      }

    case 'single':
      {
        const _handleChange = isChecked => {
          setIsChecked(isChecked);
          setCheckboxValue(formId, id, isChecked);
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
  setCheckboxValue: PropTypes__default["default"].func,
  validations: PropTypes__default["default"].object,
  defaultLanguage: PropTypes__default["default"].string,
  name: PropTypes__default["default"].object,
  default: PropTypes__default["default"].object
};

const RadioButtonStyled = styled__default["default"].div.withConfig({
  displayName: "RadioButton__RadioButtonStyled",
  componentId: "sc-7y8c21-0"
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

  const _handleChange = (formId, id, value) => {
    setValue(formId, id, value);
  };

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
      onChange: e => _handleChange(formId, id, e.target.value)
    }), /*#__PURE__*/React__default["default"].createElement(Label, {
      id: val[defaultLanguage],
      label: val[defaultLanguage],
      className: "label-radio"
    }));
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
  const minute = timeArr[1]; //convert to abstract strings to avoid character replacement along the chain, eg. Monday would match 'M' month single parameter

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
  displayName: "DateRange__DateRangeStyled",
  componentId: "sc-hnzg32-0"
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
  displayName: "EntryPicker__EntryPickerStyled",
  componentId: "sc-svnu18-0"
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

const FormComposer = ({
  fields,
  formData,
  formId,
  setValue,
  setDateRangeValues,
  validateField,
  defaultLanguage,
  errors,
  useDefaultTheme,
  entries,
  setCheckboxValue
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
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            validateField: validateField,
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
            type: field.type,
            id: field.id,
            label: field.name && field.name[defaultLanguage],
            formId: formId,
            setValue: setValue,
            validations: field.validations,
            defaultLanguage: defaultLanguage,
            defaultValue: field.default,
            placeholder: field.editor,
            validateField: validateField,
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
            useDefaultTheme: useDefaultTheme,
            setCheckboxValue: setCheckboxValue
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
            validateField: validateField,
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
    }
  });
};

FormComposer.propTypes = {
  fields: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formData: PropTypes__default["default"].object,
  entries: PropTypes__default["default"].oneOfType([PropTypes__default["default"].array, PropTypes__default["default"].object]),
  formId: PropTypes__default["default"].string,
  setValue: PropTypes__default["default"].func,
  validateField: PropTypes__default["default"].func,
  setDateRangeValues: PropTypes__default["default"].func,
  defaultLanguage: PropTypes__default["default"].string,
  errors: PropTypes__default["default"].array,
  useDefaultTheme: PropTypes__default["default"].bool,
  setCheckboxValue: PropTypes__default["default"].func
};

const LoadingSpinner = ({
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

const ButtonStyled = styled__default["default"].button.withConfig({
  displayName: "Button__ButtonStyled",
  componentId: "sc-hr2oup-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return styled.css(["", ""], useDefaultTheme && styled.css(["display:inline-flex;align-items:center;justify-content:center;cursor:pointer;margin:16px 0 0 0;padding:8px 16px;border-radius:3px;border:1px solid ", ";font-family:inherit;transition:opacity 200ms ease;&:disabled{opacity:0.7;cursor:not-allowed;border-color:#f0f0f0;background:#f0f0f0;color:#dbdbdb;svg{margin-left:4px;circle{stroke:#dbdbdb;}}}&:hover{opacity:0.7;}"], theme.colors.border));
});

const Button = ({
  className,
  type,
  text,
  action,
  loading,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ButtonStyled, {
    className: `${className ? className : ''} btnSubmit`,
    type: type,
    onClick: () => action(),
    disabled: loading,
    useDefaultTheme: useDefaultTheme
  }, text, loading && /*#__PURE__*/React__default["default"].createElement(LoadingSpinner, {
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

const ThemeContext = /*#__PURE__*/React.createContext();

const ThemeProvider = ({
  children,
  theme
}) => {
  return /*#__PURE__*/React__default["default"].createElement(ThemeContext.Provider, null, /*#__PURE__*/React__default["default"].createElement(styled.ThemeProvider, {
    theme: theme
  }, children));
};

ThemeProvider.propTypes = {
  children: PropTypes__default["default"].oneOfType([PropTypes__default["default"].arrayOf(PropTypes__default["default"].node), PropTypes__default["default"].node]),
  theme: PropTypes__default["default"].object
};

const mediaQueriesNoUnit = {
  s: 470,
  ms: 640,
  m: 768,
  ml: 880,
  l: 1024,
  xl: 1200,
  xxl: 1366,
  wide: 1600
};
const mediaQueries = {
  small: mediaQueriesNoUnit.s + 'px',
  msmall: mediaQueriesNoUnit.ms + 'px',
  medium: mediaQueriesNoUnit.m + 'px',
  mlarge: mediaQueriesNoUnit.ml + 'px',
  large: mediaQueriesNoUnit.l + 'px',
  xlarge: mediaQueriesNoUnit.xl + 'px',
  xxlarge: mediaQueriesNoUnit.xxl + 'px',
  wide: mediaQueriesNoUnit.wide + 'px'
};
const layout = {
  mediaQueries: mediaQueries
};

const fontFamily = {
  Poppins: `'Poppins', Arial, sans-serif`
}; //use html tag name as object key
//use default object key for base styles
//use media query key that corresponds with keys set on mediaQueries object from ./layout to map to relevant screen sizes
//uses a mobile first approach to rules

const typography = {
  default: {
    color: colors.label,
    font_family: fontFamily.Poppins,
    font_style: 'normal',
    font_weight: 400,
    font_size: '18px',
    line_height: 1.75
  }
};
const defaultStyles = typography.default;
const typographyStyles = {
  defaultStyles
}; // function generateTypeStyles(obj) {
//   return Object.keys(obj)
//     .map(mq => {
//       const props = generateProps(obj[mq]);
//       if (mq === 'default') {
//         return `${props.join(' ')}`;
//       } else {
//         return `@media only screen and (min-width:${
//           mediaQueries[mq]
//         }){${props.join('')}}`;
//       }
//     })
//     .join('');
// }
// function generateProps(objMQ) {
//   let props = [];
//   Object.keys(objMQ).map(prop => {
//     props.push(`${prop.split('_').join('-')}: ${objMQ[prop]};`);
//   });
//   return props;
// }

const defaultTheme = {
  layout,
  typographyStyles,
  typography,
  colors
};

const Form = ({
  className,
  formId,
  useDefaultTheme = true,
  customSubmit
}) => {
  const dispatch = reactRedux.useDispatch();

  const _setFormId = formId => {
    dispatch(setFormId(formId));
  };

  const _setValue = (formId, id, value) => {
    dispatch(setValue(formId, id, value));
  };

  const _setCheckboxValue = (formId, id, value, isChecked) => {
    dispatch(setCheckboxValue(formId, id, value, isChecked));
  };

  const _setDateRangeValues = (formId, id, dateType, value) => {
    dispatch(setDateRangeValues(formId, id, dateType, value));
  };

  const _validateField = (formId, id, value) => {
    dispatch(validateField(formId, id, value));
  };

  const _togglePageForward = (formId, pageIndex) => {
    dispatch(togglePageForward(formId, pageIndex));
  };

  const _togglePageBack = (formId, pageIndex) => {
    dispatch(togglePageBack(formId, pageIndex));
  };

  const _submitForm = formId => {
    dispatch(submitForm(formId));
  };

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

  if (pagingInfo && pagingInfo.pageCount > 1) {
    const isLastPage = pagingInfo.pageCount == pagingInfo.pageIndex + 1;
    return /*#__PURE__*/React__default["default"].createElement(ThemeProvider, {
      theme: defaultTheme
    }, /*#__PURE__*/React__default["default"].createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, !(status !== null && status !== void 0 && status.hasSuccess) && !(status !== null && status !== void 0 && status.isLoading) && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, pagingInfo.pageIndex > 0 && /*#__PURE__*/React__default["default"].createElement(Button, {
      type: "button",
      text: "Go Back",
      action: () => _togglePageBack(formId, pagingInfo.pageIndex - 1),
      useDefaultTheme: useDefaultTheme
    }), /*#__PURE__*/React__default["default"].createElement(FormComposer, {
      fields: fields,
      formData: formData,
      formId: formId,
      setValue: _setValue,
      validateField: _validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      pagingInfo: pagingInfo,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setDateRangeValues: _setDateRangeValues,
      setCheckboxValue: _setCheckboxValue
    }), !isLastPage && /*#__PURE__*/React__default["default"].createElement(Button, {
      type: "button",
      text: "Next",
      action: () => _togglePageForward(formId, pagingInfo.pageIndex + 1),
      useDefaultTheme: useDefaultTheme
    }), isLastPage && /*#__PURE__*/React__default["default"].createElement(Button, {
      text: (settings === null || settings === void 0 ? void 0 : settings.submitButtonText) || "Submit",
      type: "button",
      loading: status === null || status === void 0 ? void 0 : status.isLoading,
      action: () => {
        _submitForm(formId);

        if (customSubmit) customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), (status === null || status === void 0 ? void 0 : status.isLoading) && !(status !== null && status !== void 0 && status.hasSuccess) && /*#__PURE__*/React__default["default"].createElement(LoadingSpinner, {
      className: "loading",
      height: 24,
      width: 24,
      color: "#333"
    }), (status === null || status === void 0 ? void 0 : status.hasSuccess) && (status === null || status === void 0 ? void 0 : status.successMessage) && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.successMessage)));
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
      validateField: _validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setCheckboxValue: _setCheckboxValue
    }), /*#__PURE__*/React__default["default"].createElement(Button, {
      loading: status === null || status === void 0 ? void 0 : status.isSubmitting,
      text: (settings === null || settings === void 0 ? void 0 : settings.submitButtonText) || "Submit",
      type: "button",
      action: () => {
        _submitForm(formId);

        if (customSubmit) customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), (status === null || status === void 0 ? void 0 : status.isLoading) && !(status !== null && status !== void 0 && status.hasSuccess) && /*#__PURE__*/React__default["default"].createElement(LoadingSpinner, {
      className: "loading",
      height: 24,
      width: 24,
      color: "#333"
    }), (status === null || status === void 0 ? void 0 : status.hasSuccess) && (status === null || status === void 0 ? void 0 : status.successMessage) && /*#__PURE__*/React__default["default"].createElement("p", {
      className: "success-message"
    }, status.successMessage)));
  }
};

Form.propTypes = {
  className: PropTypes__default["default"].string,
  formId: PropTypes__default["default"].string,
  useDefaultTheme: PropTypes__default["default"].bool,
  customSubmit: PropTypes__default["default"].func
};

exports.actions = actions;
exports["default"] = Form;
exports.reducer = reducer;
exports.sagas = formV2Sagas;
exports.selectors = selectors;
//# sourceMappingURL=forms.js.map
