import React, { createContext, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled, { css, ThemeProvider as ThemeProvider$1 } from 'styled-components';
import { Map, fromJS, Iterable } from 'immutable';
import { takeEvery, takeLatest, put, call, select, all } from '@redux-saga/core/effects';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';

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

const MakeFieldType = field => {
  if (!field) return null;

  if (field.dataType === 'string' && field.editor && field.editor.id === 'multiline') {
    return 'textarea';
  } else if (field.dataType === 'string' && field.editor && field.editor.id === 'list-dropdown') {
    return 'dropdown';
  } else if (field.editor && field.editor.properties && field.editor.properties.readOnly || field.groupId && field.groupId === 'private') {
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

const initialSettings = {
  recaptcha: {
    siteKey: null
  }
};
const initialFormData = {
  formId: null,
  data: {},
  fields: [],
  entries: [],
  fieldErrors: [],
  groups: [],
  defaultLanguage: null,
  pagingInfo: {
    pageIndex: 0,
    pageCount: 0,
    currentPageId: null
  },
  status: {
    isLoading: false,
    isSubmitting: false,
    hasSuccess: false,
    successMessage: null,
    hasError: false
  }
};
let initialState = Map({
  settings: fromJS(initialSettings)
});
var reducer = ((state = initialState, action) => {
  switch (action.type) {
    case SET_FORM_ID:
      return state.setIn([action.formId], initialFormData);

    case SET_FORM_DATA:
      {
        const fields = action.fields; //const fObj = {};

        fields.map(field => {
          field.type = MakeFieldType(field);
        });
        return state.setIn([fromJS(action.formId), 'fields'], fields).setIn([fromJS(action.formId), 'formId'], action.formId).setIn([fromJS(action.formId), 'groups'], action.groups).setIn([fromJS(action.formId), 'defaultLanguage'], action.defaultLanguage).setIn([fromJS(action.formId), 'status', 'isSubmitting'], false).setIn([fromJS(action.formId), 'status', 'hasSuccess'], false).setIn([fromJS(action.formId), 'status', 'hasError'], false);
      }

    case SET_CURRENT_PAGE:
      return state.setIn([action.formId, 'pagingInfo', 'currentPageId'], action.pageId).setIn([action.formId, 'pagingInfo', 'pageIndex'], action.pageIndex).setIn([action.formId, 'pagingInfo', 'pageCount'], action.pageCount);

    case SET_FIELD_VALUE:
      return state.setIn([action.formId, 'data', action.id], action.value);

    case SET_DEFAULT_FIELD_VALUE:
      return state.setIn([action.formId, 'data'], action.value);

    case SET_CHECKBOX_VALUE:
      {
        const prevState = state.getIn([action.formId, 'data', action.id]);
        let values = prevState ? prevState : [];

        if (action.isChecked) {
          values.push(action.value);
        } else {
          values = values.filter(value => value !== action.value);
        }

        return state.setIn([action.formId, 'data', action.id], values);
      }

    case SET_DATE_RANGE_VALUES:
      return state.setIn([action.formId, 'data', action.id, action.dateType], action.value);

    case SET_FIELD_ERROR:
      return state.setIn([action.formId, 'fieldErrors'], action.value);

    case SET_SUBMITTING_FORM:
      return state.setIn([fromJS(action.formId), 'status', 'isSubmitting'], action.isSubmitting);

    case SUBMIT_FORM_SUCCESS:
      return state.setIn([fromJS(action.formId), 'status', 'hasError'], false).setIn([fromJS(action.formId), 'status', 'isSubmitting'], false).setIn([fromJS(action.formId), 'status', 'hasSuccess'], true);

    case SET_SUCCESS_MESSAGE:
      return state.setIn([fromJS(action.formId), 'status', 'successMessage'], action.message);

    case SUBMIT_FORM_ERROR:
      return state.setIn([fromJS(action.formId), 'status', 'hasError'], true).setIn([fromJS(action.formId), 'status', 'isSubmitting'], false);

    case SET_FORM_ENTRIES:
      {
        const entries = action.entries;
        const eObj = {};
        entries.map(entry => {
          if (!entry) return null;
          eObj[entry.id] = entry.entries;
          return eObj;
        });
        return state.setIn([action.formId, 'entries'], eObj);
      }

    case SET_ERROR:
      return state.setIn([fromJS(action.formId), 'status', 'hasError'], true).setIn([fromJS(action.formId), 'status', 'isSubmitting'], false);

    default:
      return state;
  }
});

const selectForms = state => state.getIn(['forms']);
const makeSelectIsLoading = formId => createSelector(selectForms, forms => forms.getIn([formId, 'status', 'isLoading']));
const makeSelectFormFields = formId => createSelector(selectForms, forms => forms.getIn([formId, 'fields']));
const makeSelectDefaultLang = formId => createSelector(selectForms, forms => forms.getIn([formId, 'defaultLanguage']));
const selectFieldErrors = (state, formId) => {
  return state.getIn(['forms', formId, 'fieldErrors']);
};
const selectPostData = (state, formId) => {
  return state.getIn(['forms', formId, 'data']);
};
const selectFormGroups = (state, formId) => {
  return state.getIn(['forms', formId, 'groups']);
};
const selectPagingInfo = (state, formId) => {
  return state.getIn(['forms', formId, 'pagingInfo']);
};
const selectFormStatus = (state, formId) => {
  return state.getIn(['forms', formId, 'status']);
};
const selectPagedFields = formId => createSelector([selectForms], form => {
  const pagingInfo = form.getIn([formId, 'pagingInfo']);
  const fields = form.getIn([formId, 'fields']);

  if (fields && fields.length > 0 && pagingInfo && pagingInfo.pageCount > 1) {
    return fields.filter(f => f.groupId == pagingInfo.currentPageId);
  }

  return fields;
});
const selectEntries = (state, formId) => {
  return state.getIn(['forms', formId, 'entries']);
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

const validateInput = (field, value) => {
  const isRequired = field.validations && field.validations.required;
  const minLength = field.validations && field.validations.minLength;
  const maxLength = field.validations && field.validations.maxLength;
  const regex = field.validations && field.validations.regex;
  const integer = field.dataType === 'integer';
  const decimal = field.dataType === 'decimal';

  if (isRequired && !value) {
    const errorMessage = isRequired.message ? isRequired.message['en-GB'] : `${field.id} is required`;
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

  if (regex && value.length > 0) {
    //Had to make the string raw, as a string ususually is wrapped as '' and Regex couldnt use the regex patter as the string variant
    const regexPattern = RegExp(regex.pattern.raw);

    if (!regexPattern.test(value)) {
      const errorMessage = regex.message ? regex.message['en-GB'] : `${field.id} is invalid`;
      return {
        fieldId: field.id,
        groupId: field.groupId,
        message: errorMessage
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

const formV2Sagas = [takeEvery(SUBMIT_FORM_SUCCESS, formSuccess), takeEvery(SUBMIT_FORM_FOR_VALIDATION, validateForm), takeEvery(SUBMIT_FORM, submitForm$1), takeEvery(SET_FORM_ID, fetchForm), takeLatest(VALIDATE_FIELD, validateField$1), takeEvery(PAGE_FORWARD, togglePage), takeEvery(PAGE_BACK, togglePage), takeEvery(SET_FORM_DATA, getEntryPickerData), takeLatest(SET_FORM_DATA, setDefaultValueFields)];

function* validateForm(action) {
  const {
    formId
  } = action;
  yield validateAllfields(formId);
  yield put({
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
  yield call(validateSingleField, formId, id, value);
}

function* validateGroupfields(formId, groupId) {
  const state = yield select();
  const postData = selectPostData(state, formId);
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
  yield put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* validateAllfields(formId) {
  const state = yield select();
  const postData = selectPostData(state, formId);
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
  yield put({
    type: SET_FIELD_ERROR,
    formId: formId,
    value: newErrors
  });
}

function* validateSingleField(formId, fieldId, value) {
  const state = yield select();
  const selectFormFields = makeSelectFormFields(formId);
  const fields = selectFormFields(state);
  const fieldData = fields.find(f => f.id == fieldId);
  const errors = selectFieldErrors(state, formId);
  const newErrors = []; //loop through current errors to remove any of the item we currently edit

  errors.forEach(error => {
    if (error.fieldId !== fieldId) {
      //push any existing errors to new array
      newErrors.push(error);
    }
  });
  const err = validateInput(fieldData, value);
  if (err) newErrors.push(err);
  yield put({
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
  const state = yield select();
  const formGroups = selectFormGroups(state, formId);

  if (action.type === PAGE_FORWARD) {
    yield validateGroupfields(formId, formGroups[pageIndex].id);
  }

  yield put({
    type: SET_CURRENT_PAGE,
    formId: formId,
    pageId: formGroups[pageIndex].id,
    pageCount: formGroups.length,
    pageIndex: pageIndex
  });
}

function* fetchForm(action) {
  const formId = action.formId;
  const schema = yield getFormSchema(formId);
  const groups = schema.groups && schema.groups.length > 0 && schema.groups.filter(group => group.id !== 'private');

  if (formId && schema) {
    if (schema.groups && schema.groups.length > 0) {
      yield put({
        type: SET_CURRENT_PAGE,
        formId: formId,
        pageId: groups[0].id,
        pageIndex: 0,
        pageCount: groups.length
      });
    }

    yield put({
      type: SET_FORM_DATA,
      formId: formId,
      fields: schema.fields,
      groups: groups,
      defaultLanguage: schema.defaultLanguage
    });
  }
}

function* formSuccess(action) {
  const state = yield select();
  const selectFormFields = makeSelectFormFields(action.formId);
  const fields = selectFormFields(state);
  const redirect = fields.find(f => f.id === 'formSettingsRedirect');
  const message = fields.find(f => f.id === 'formSettingsMessage');

  if (redirect && redirect.default) {
    window.location.href = redirect.default['en-GB'];
  }

  if (message && message.default) {
    yield put({
      type: SET_SUCCESS_MESSAGE,
      message: message.default['en-GB'],
      formId: action.formId
    });
  }
}

function* submitForm$1(action) {
  const state = yield select();
  const errors = selectFieldErrors(state, action.formId);
  const canSubmit = errors && errors.length == 0;

  if (canSubmit) {
    yield put({
      type: SET_SUBMITTING_FORM,
      isSubmitting: true,
      formId: action.formId
    });
    const forms = yield select(selectForms);
    const rawData = forms.get(action.formId);
    const formObj = {
      contentType: action.formId,
      formPost: rawData.data
    };
    const formResObj = yield postForm(formObj);

    if (formResObj && formResObj.sys && formResObj.sys.id) {
      yield put({
        type: SUBMIT_FORM_SUCCESS,
        formId: action.formId
      });
    } else {
      yield put({
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
  const entryId = yield select(state => state.getIn(['routing', 'entry', 'sys', 'id']));
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
  yield put({
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
    entriesList = yield all(entriesToGet.map(entry => {
      const entriesObj = {
        contentType: entry.validations.allowedContentTypes.contentTypes,
        versionStatus: 'published',
        language: 'en-GB',
        pageSize: '10'
      };
      return call(getEntries, entriesObj, entry.id);
    }));
    yield put({
      type: SET_FORM_ENTRIES,
      formId: formId,
      entries: entriesList
    });
  }
}

const toJS = WrappedComponent => wrappedComponentProps => {
  const KEY = 0;
  const VALUE = 1;
  const propsJS = Object.entries(wrappedComponentProps).reduce((newProps, wrappedComponentProp) => {
    newProps[wrappedComponentProp[KEY]] = Iterable.isIterable(wrappedComponentProp[VALUE]) ? wrappedComponentProp[VALUE].toJS() : wrappedComponentProp[VALUE];
    return newProps;
  }, {});
  return /*#__PURE__*/React.createElement(WrappedComponent, propsJS);
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

const FormStyled = styled.form.withConfig({
  displayName: "Formstyled__FormStyled",
  componentId: "sc-1jn1lk9-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css(["> div:not(:first-child){margin-top:16px;}padding:0 16px;.success-message{font-size:18px;margin:0;}.visuallyHidden{position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;}label{display:inline-block;.isRequired{color:", ";}}input,textarea,select{display:block;font-family:inherit;background-color:", ";border-radius:3px;border:1px solid ", ";height:40px;padding:8px;margin-top:4px;max-width:320px;width:100%;}textarea{height:200px;resize:none;}"], colors.error, colors.neutrals.base_white, colors.border));
});

const Label = ({
  className,
  label,
  id,
  isRequired,
  isHidden
}) => {
  return /*#__PURE__*/React.createElement("label", {
    className: `${className} ${isHidden ? 'visuallyHidden' : ''}`,
    htmlFor: id
  }, label, isRequired && /*#__PURE__*/React.createElement("span", {
    className: "isRequired"
  }, "*"), isRequired && /*#__PURE__*/React.createElement("span", {
    className: "visuallyHidden"
  }, " (required)"));
};

Label.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  isHidden: PropTypes.bool
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

const CharacterLimitStyled = styled.div.withConfig({
  displayName: "CharacterLimit__CharacterLimitStyled",
  componentId: "sc-16zngav-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return css(["display:block;", ""], useDefaultTheme && css(["font-size:14px;color:", ";font-weight:400;line-height:24px;text-align:right;max-width:320px;width:100%;"], theme.colors.neutrals.empress_gray));
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
  return /*#__PURE__*/React.createElement(CharacterLimitStyled, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, CreateMessage(type, minLength, maxLength, currentLength, defaultLanguage));
};

CharacterLimit.propTypes = {
  validations: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  defaultLanguage: PropTypes.string,
  useDefaultTheme: PropTypes.bool
};

const ErrorMessageStyled = styled.div.withConfig({
  displayName: "ErrorMessage__ErrorMessageStyled",
  componentId: "sc-1vewdiu-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css(["display:block;margin-top:8px;color:", ";"], theme.colors.error));
});

const ErrorMessage = ({
  className,
  message,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React.createElement(ErrorMessageStyled, {
    className: className,
    useDefaultTheme: useDefaultTheme
  }, message);
};

ErrorMessage.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string.isRequired,
  useDefaultTheme: PropTypes.bool
};

const TextfieldStyled = styled.div.withConfig({
  displayName: "Textfield__TextfieldStyled",
  componentId: "sc-1a1c03n-0"
})(["", ";"], ({
  isHidden
}) => {
  return css(["display:", ";"], isHidden ? 'none' : 'block');
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
  const [showCharLimit, setShowCharLimit] = useState(false);
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

  return /*#__PURE__*/React.createElement(TextfieldStyled, {
    className: "textfield-container",
    isHidden: isHidden
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textfield"
  }), showCharLimit && /*#__PURE__*/React.createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React.createElement("input", {
    className: `${className ? className : ''} input-textfield`,
    type: type,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    id: id,
    name: id,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React.createElement(ErrorMessage, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textfield.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.func,
  validateField: PropTypes.func,
  validations: PropTypes.object,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultLanguage: PropTypes.string,
  placeholder: PropTypes.object,
  isHidden: PropTypes.bool,
  errors: PropTypes.array,
  useDefaultTheme: PropTypes.bool
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
  const [showCharLimit, setShowCharLimit] = useState(false);
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

  return /*#__PURE__*/React.createElement("div", {
    className: "textarea-container"
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-textarea"
  }), showCharLimit && /*#__PURE__*/React.createElement(CharacterLimit, {
    value: defaultValue,
    validations: validations,
    defaultLanguage: defaultLanguage,
    useDefaultTheme: useDefaultTheme
  }), /*#__PURE__*/React.createElement("textarea", {
    className: `${className ? className : ''} input-textarea`,
    type: type,
    id: id,
    defaultValue: defaultValueText,
    placeholder: placeholderText,
    onChange: e => _handleChange(formId, id, e.target.value),
    onBlur: e => _handleBlur(formId, id, e.target.value),
    onFocus: () => _handleFocus()
  }), errors && errors.length > 0 && errors.some(x => x.fieldId == id) && /*#__PURE__*/React.createElement(ErrorMessage, {
    message: errors.find(x => x.fieldId == id).message,
    useDefaultTheme: useDefaultTheme
  }));
};

Textarea.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  setValue: PropTypes.func,
  validations: PropTypes.object,
  defaultValue: PropTypes.object,
  defaultLanguage: PropTypes.string,
  placeholder: PropTypes.object,
  validateField: PropTypes.func,
  useDefaultTheme: PropTypes.bool,
  errors: PropTypes.array
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
  return /*#__PURE__*/React.createElement(Textfield, {
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
  className: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.object,
  defaultLanguage: PropTypes.string,
  placeholder: PropTypes.object
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
  return /*#__PURE__*/React.createElement("div", {
    className: "dropdown-container"
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-dropdown"
  }), /*#__PURE__*/React.createElement("select", {
    name: id,
    id: id,
    className: `${className ? className : ''} select-dropdown`,
    defaultValue: defaultValue,
    onBlur: e => _handleChange(formId, id, e.target.value)
  }, ddValues.map((val, idx) => {
    return /*#__PURE__*/React.createElement("option", {
      key: `${val[defaultLanguage]}-${idx}`,
      value: val[defaultLanguage],
      className: "option-dropdown"
    }, val[defaultLanguage]);
  })));
};

Dropdown.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  setValue: PropTypes.func,
  id: PropTypes.string,
  validations: PropTypes.object,
  defaultValue: PropTypes.string,
  label: PropTypes.string,
  defaultLanguage: PropTypes.string
};

const CheckboxStyled = styled.div.withConfig({
  displayName: "Checkbox__CheckboxStyled",
  componentId: "s8ewuf-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css([".checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
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
  const [isChecked, setIsChecked] = useState(isDefaultChecked || '');

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
        return /*#__PURE__*/React.createElement(CheckboxStyled, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React.createElement(Label, {
          id: id,
          label: label,
          isRequired: isRequired,
          className: "label-checkbox-container"
        }), cbValues.map((val, idx) => {
          return /*#__PURE__*/React.createElement("span", {
            key: idx,
            className: "checkbox-wrapper"
          }, /*#__PURE__*/React.createElement("input", {
            type: "checkbox",
            id: `checkbox-${idx}`,
            name: `checkbox-${idx}`,
            value: val[defaultLanguage],
            className: `${className ? className : ''} input-checkbox`,
            onChange: e => _handleChange(e.target.value, e.target.checked)
          }), /*#__PURE__*/React.createElement(Label, {
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

        return /*#__PURE__*/React.createElement(CheckboxStyled, {
          className: `checkbox-container`,
          useDefaultTheme: useDefaultTheme
        }, /*#__PURE__*/React.createElement("span", {
          className: "checkbox-wrapper"
        }, /*#__PURE__*/React.createElement("input", {
          type: "checkbox",
          id: id,
          name: `checkbox-${id}`,
          value: name[defaultLanguage],
          checked: isChecked,
          className: `${className ? className : ''} input-checkbox`,
          onChange: e => _handleChange(e.target.checked)
        }), /*#__PURE__*/React.createElement(Label, {
          id: id,
          label: label,
          className: "label-checkbox"
        })));
      }
  }
};

Checkbox.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  setCheckboxValue: PropTypes.func,
  validations: PropTypes.object,
  defaultLanguage: PropTypes.string,
  name: PropTypes.object,
  default: PropTypes.object
};

const RadioButtonStyled = styled.div.withConfig({
  displayName: "RadioButton__RadioButtonStyled",
  componentId: "sc-7y8c21-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css([".radio-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
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
  return /*#__PURE__*/React.createElement(RadioButtonStyled, {
    className: "radio-container",
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-radio-container"
  }), cbValues.map((val, idx) => {
    return /*#__PURE__*/React.createElement("span", {
      key: idx,
      className: "radio-wrapper"
    }, /*#__PURE__*/React.createElement("input", {
      type: type,
      id: val[defaultLanguage],
      name: id,
      value: val[defaultLanguage],
      className: `${className ? className : ''} input-radio`,
      onChange: e => _handleChange(formId, id, e.target.value)
    }), /*#__PURE__*/React.createElement(Label, {
      id: val[defaultLanguage],
      label: val[defaultLanguage],
      className: "label-radio"
    }));
  }));
};

RadioButton.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  setValue: PropTypes.func,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  validations: PropTypes.object,
  defaultLanguage: PropTypes.string,
  useDefaultTheme: PropTypes.bool
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

  return /*#__PURE__*/React.createElement("div", {
    className: "date-container"
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: "label-date"
  }), /*#__PURE__*/React.createElement("input", {
    type: type,
    id: id,
    name: id,
    className: `${className ? className : ''} input-date`,
    max: onlyPassedDates ? formatDate(todaysDate, 'yyyy-MM-dd') : '',
    onChange: e => _handleChange(formId, id, e.target.value)
  }));
};

SingleDate.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  setValue: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  validations: PropTypes.object
};

const DateRangeStyled = styled.div.withConfig({
  displayName: "DateRange__DateRangeStyled",
  componentId: "hnzg32-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css([".daterange-wrapper{display:flex;flex-direction:column;input{&:first-child{margin:0 0 8px 0;}}}"]));
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
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');

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

  return /*#__PURE__*/React.createElement(DateRangeStyled, {
    className: `daterange-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired
  }), /*#__PURE__*/React.createElement("div", {
    className: "daterange-wrapper"
  }, /*#__PURE__*/React.createElement(Label, {
    id: "date-from",
    label: "Date from",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React.createElement("input", {
    type: "date",
    id: "date-from",
    name: id,
    max: onlyPassedDates && !toDate ? formatDate(todaysDate, 'yyyy-MM-dd') : onlyPassedDates && toDate ? formatDate(toDate, 'yyyy-MM-dd') : toDate ? formatDate(toDate, 'yyyy-MM-dd') : '',
    className: `${className ? className : ''} input-daterange`,
    onChange: e => _handleDateChange('from', formId, id, e.target.value)
  }), /*#__PURE__*/React.createElement(Label, {
    id: "date-to",
    label: "Date to",
    isHidden: true,
    className: "label-daterange"
  }), /*#__PURE__*/React.createElement("input", {
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
  className: PropTypes.string,
  formId: PropTypes.string,
  setDateRangeValues: PropTypes.func,
  type: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  validations: PropTypes.object,
  useDefaultTheme: PropTypes.bool
};

const EntryPickerStyled = styled.div.withConfig({
  displayName: "EntryPicker__EntryPickerStyled",
  componentId: "svnu18-0"
})(["", ";"], ({
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css([".radio-wrapper,.checkbox-wrapper{display:flex;flex-wrap:wrap;justify-content:flex-start;align-items:center;input{height:auto;width:auto;margin:0 4px 0 0;}label{display:inline-block;}}"]));
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

  return /*#__PURE__*/React.createElement(EntryPickerStyled, {
    className: `${type}-container`,
    useDefaultTheme: useDefaultTheme
  }, /*#__PURE__*/React.createElement(Label, {
    id: id,
    label: label,
    isRequired: isRequired,
    className: `label-${type}-container`
  }), results.map((res, idx) => {
    return /*#__PURE__*/React.createElement("span", {
      key: idx,
      className: `${type}-wrapper`
    }, /*#__PURE__*/React.createElement("input", {
      type: type,
      id: res.entryTitle,
      value: res.entryTitle,
      name: id,
      className: `${className ? className : ''} input-${type}`,
      onChange: e => _handleChange(formId, id, e.target.value, e.target.checked)
    }), /*#__PURE__*/React.createElement(Label, {
      id: res.entryTitle,
      label: res.entryTitle,
      className: `label-${type}`
    }));
  }));
};

EntryPicker.propTypes = {
  className: PropTypes.string,
  results: PropTypes.array,
  id: PropTypes.string,
  label: PropTypes.string,
  validations: PropTypes.object,
  type: PropTypes.string,
  useDefaultTheme: PropTypes.bool,
  setValue: PropTypes.func,
  formId: PropTypes.string
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
  if (!fields || fields.length < 1) return null; //const arrayOfFields = Object.entries(fields).map(f => f[1]);

  return fields.map((field, idx) => {
    if (!field) return null;

    switch (field.type) {
      case 'number':
      case 'textfield':
        {
          return /*#__PURE__*/React.createElement(Textfield, {
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
          return /*#__PURE__*/React.createElement(Textarea, {
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
          return /*#__PURE__*/React.createElement(Dropdown, {
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
          return /*#__PURE__*/React.createElement(Checkbox, {
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
          return /*#__PURE__*/React.createElement(RadioButton, {
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
          return /*#__PURE__*/React.createElement(EntryPicker, {
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
          return /*#__PURE__*/React.createElement(SingleDate, {
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
          return /*#__PURE__*/React.createElement(DateRange, {
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
          return /*#__PURE__*/React.createElement(HiddenField, {
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
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  formData: PropTypes.object,
  entries: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  formId: PropTypes.string,
  setValue: PropTypes.func,
  validateField: PropTypes.func,
  setDateRangeValues: PropTypes.func,
  defaultLanguage: PropTypes.string,
  errors: PropTypes.array,
  useDefaultTheme: PropTypes.bool,
  setCheckboxValue: PropTypes.func
};

const ButtonStyled = styled.button.withConfig({
  displayName: "Button__ButtonStyled",
  componentId: "hr2oup-0"
})(["", ";"], ({
  theme,
  useDefaultTheme
}) => {
  return css(["", ""], useDefaultTheme && css(["display:inline-block;cursor:pointer;margin:16px 0 0 0;padding:8px 16px;border-radius:3px;border:1px solid ", ";font-family:inherit;transition:opacity 200ms ease;&:hover{opacity:0.7;}"], theme.colors.border));
});

const Button = ({
  className,
  type,
  text,
  action,
  useDefaultTheme
}) => {
  return /*#__PURE__*/React.createElement(ButtonStyled, {
    className: `${className ? className : ''} btnSubmit`,
    type: type,
    onClick: () => action(),
    useDefaultTheme: useDefaultTheme
  }, text);
};
Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func,
  useDefaultTheme: PropTypes.bool
};

const ThemeContext = createContext();

const ThemeProvider = ({
  children,
  theme
}) => {
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, null, /*#__PURE__*/React.createElement(ThemeProvider$1, {
    theme: theme
  }, children));
};

ThemeProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  theme: PropTypes.object
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

const divStyles = {
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'Column'
};
const svgStyles = {
  width: '80px',
  height: '80px'
};
const headingStyles = {
  margin: '0',
  fontSize: '16px'
};
const Loading = () => {
  return /*#__PURE__*/React.createElement("div", {
    style: divStyles
  }, /*#__PURE__*/React.createElement("h3", {
    style: headingStyles
  }, "Loading..."), /*#__PURE__*/React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "lds-spinner",
    preserveAspectRatio: "xMidYMid",
    viewBox: "0 0 100 100",
    style: svgStyles
  }, /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.9166666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(30 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.8333333333333334s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(60 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.75s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(90 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.6666666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(120 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.5833333333333334s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(150 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.5s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(180 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.4166666666666667s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(210 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.3333333333333333s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(240 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.25s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(270 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.16666666666666666s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(300 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "-0.08333333333333333s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  })), /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "12",
    x: "47",
    y: "24",
    fill: "#DE1C8F",
    rx: "9",
    ry: "5",
    transform: "rotate(330 50 50)"
  }, /*#__PURE__*/React.createElement("animate", {
    attributeName: "opacity",
    begin: "0s",
    dur: "1s",
    keyTimes: "0;1",
    repeatCount: "indefinite",
    values: "1;0"
  }))));
};
Loading.propTypes = {};

const Form$1 = ({
  className,
  formId,
  fields,
  formData,
  setFormId,
  setValue,
  validateField,
  defaultLanguage,
  errors,
  pagingInfo,
  togglePageForward,
  togglePageBack,
  submitForm,
  status,
  setDateRangeValues,
  useDefaultTheme,
  entries,
  customSubmit,
  setCheckboxValue
}) => {
  useEffect(() => {
    setFormId(formId);
  }, [formId, setFormId]); // NF change rule of hooks

  if (!formId) return null;
  let formRender;

  if (pagingInfo && pagingInfo.pageCount > 1) {
    const isLastPage = pagingInfo.pageCount == pagingInfo.pageIndex + 1;
    formRender = /*#__PURE__*/React.createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, status && status.isLoading || status && status.isSubmitting && /*#__PURE__*/React.createElement(Loading, {
      className: "loading"
    }), !status || status && !status.isLoading && !status.isSubmitting && !status.hasSuccess && /*#__PURE__*/React.createElement(React.Fragment, null, pagingInfo.pageIndex > 0 && /*#__PURE__*/React.createElement(Button, {
      type: "button",
      text: "Go Back",
      action: () => togglePageBack(formId, pagingInfo.pageIndex - 1),
      useDefaultTheme: useDefaultTheme
    }), /*#__PURE__*/React.createElement(FormComposer, {
      fields: fields,
      formData: formData,
      formId: formId,
      setValue: setValue,
      validateField: validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      pagingInfo: pagingInfo,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setDateRangeValues: setDateRangeValues,
      setCheckboxValue: setCheckboxValue
    }), !isLastPage && /*#__PURE__*/React.createElement(Button, {
      type: "button",
      text: "Next",
      action: () => togglePageForward(formId, pagingInfo.pageIndex + 1),
      useDefaultTheme: useDefaultTheme
    }), isLastPage && /*#__PURE__*/React.createElement(Button, {
      text: "Submit",
      type: "button",
      action: () => {
        submitForm(formId);
        customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), status && status.hasSuccess && status.successMessage && /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, status.successMessage));
  } else {
    formRender = /*#__PURE__*/React.createElement(FormStyled, {
      className: className,
      id: formId,
      useDefaultTheme: useDefaultTheme
    }, status && status.isLoading || status && status.isSubmitting && /*#__PURE__*/React.createElement(Loading, {
      className: "loading"
    }), !status || status && !status.isLoading && !status.isSubmitting && !status.hasSuccess && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormComposer, {
      fields: fields,
      formId: formId,
      setValue: setValue,
      setDateRangeValues: setDateRangeValues,
      validateField: validateField,
      defaultLanguage: defaultLanguage,
      errors: errors,
      useDefaultTheme: useDefaultTheme,
      entries: entries,
      setCheckboxValue: setCheckboxValue
    }), /*#__PURE__*/React.createElement(Button, {
      text: "Submit",
      type: "button",
      action: () => {
        submitForm(formId);
        customSubmit();
      },
      useDefaultTheme: useDefaultTheme
    })), status && status.hasSuccess && status.successMessage && /*#__PURE__*/React.createElement("p", {
      className: "success-message"
    }, status.successMessage));
  }

  return /*#__PURE__*/React.createElement(ThemeProvider, {
    theme: defaultTheme
  }, formRender);
};

Form$1.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  formData: PropTypes.object,
  entries: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  useDefaultTheme: PropTypes.bool,
  setFormId: PropTypes.func,
  setValue: PropTypes.func,
  setDateRangeValues: PropTypes.func,
  validateField: PropTypes.func,
  defaultLanguage: PropTypes.string,
  errors: PropTypes.array,
  pagingInfo: PropTypes.object,
  togglePageForward: PropTypes.func,
  togglePageBack: PropTypes.func,
  submitForm: PropTypes.func,
  customSubmit: PropTypes.func,
  status: PropTypes.object,
  setCheckboxValue: PropTypes.func
};

function action(type, payload = {}) {
  return {
    type,
    ...payload
  };
}

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

const FormContainer = ({
  className,
  formId,
  fields,
  formData,
  setFormId,
  setValue,
  setDateRangeValues,
  validateField,
  defaultLanguage,
  errors,
  pagingInfo,
  togglePageForward,
  togglePageBack,
  submitForm,
  status,
  useDefaultTheme = true,
  entries,
  setCheckboxValue,
  customSubmit
}) => {
  return /*#__PURE__*/React.createElement(Form$1, {
    className: className,
    formId: formId,
    fields: fields,
    setFormId: setFormId,
    setValue: setValue,
    setDateRangeValues: setDateRangeValues,
    validateField: validateField,
    defaultLanguage: defaultLanguage,
    errors: errors,
    pagingInfo: pagingInfo,
    togglePageForward: togglePageForward,
    togglePageBack: togglePageBack,
    submitForm: submitForm,
    status: status,
    useDefaultTheme: useDefaultTheme,
    entries: entries,
    formData: formData,
    setCheckboxValue: setCheckboxValue,
    customSubmit: customSubmit
  });
};

FormContainer.propTypes = {
  className: PropTypes.string,
  formId: PropTypes.string,
  fields: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  formData: PropTypes.object,
  entries: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  setFormId: PropTypes.func,
  setDateRangeValues: PropTypes.func,
  setValue: PropTypes.func,
  useDefaultTheme: PropTypes.bool,
  validateField: PropTypes.func,
  defaultLanguage: PropTypes.string,
  errors: PropTypes.array,
  pagingInfo: PropTypes.object,
  togglePageForward: PropTypes.func,
  togglePageBack: PropTypes.func,
  submitForm: PropTypes.func,
  status: PropTypes.object,
  setCheckboxValue: PropTypes.func,
  customSubmit: PropTypes.func
};

const mapStateToProps = (state, props) => {
  const {
    formId
  } = props;
  const selectFormFields = selectPagedFields(formId);
  const selectIsLoading = makeSelectIsLoading(formId);
  const selectDefaultLang = makeSelectDefaultLang(formId);
  return state => ({
    fields: selectFormFields(state),
    loading: selectIsLoading(state),
    defaultLanguage: selectDefaultLang(state),
    errors: selectFieldErrors(state, formId),
    pagingInfo: selectPagingInfo(state, formId),
    status: selectFormStatus(state, formId),
    entries: selectEntries(state, formId),
    formData: selectPostData(state, formId)
  });
};

const mapDispatchToProps = dispatch => {
  return {
    setFormId: formId => dispatch(setFormId(formId)),
    setValue: (formId, id, value) => dispatch(setValue(formId, id, value)),
    setCheckboxValue: (formId, id, value, isChecked) => dispatch(setCheckboxValue(formId, id, value, isChecked)),
    setDateRangeValues: (formId, id, dateType, value) => dispatch(setDateRangeValues(formId, id, dateType, value)),
    validateField: (formId, id, value) => dispatch(validateField(formId, id, value)),
    togglePageForward: (formId, pageIndex) => dispatch(togglePageForward(formId, pageIndex)),
    togglePageBack: (formId, pageIndex) => dispatch(togglePageBack(formId, pageIndex)),
    submitForm: formId => dispatch(submitForm(formId))
  };
};

var Form = connect(mapStateToProps, mapDispatchToProps)(toJS(FormContainer));

export default Form;
export { reducer, formV2Sagas as sagas };
//# sourceMappingURL=forms.js.map
