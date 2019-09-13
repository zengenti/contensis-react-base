import { Op, Query } from 'contensis-delivery-api';
import {
  getCurrentKeyword,
  getCourseLevels,
  getSubjectAreas,
  getStartMonths,
  getDistanceLearning,
  getJointHonors,
  getStudyModes,
  getClearingFilter,
} from '~/core/redux/selectors/search';
import {
  Facets,
  ContentTypes,
  FacetSearchFields,
} from '~/core/redux/types/search';
import { selectVersionStatus } from '~/core/redux/selectors/version';

function fixFreeTextForElastic(s) {
  let illegalChars = ['>', '<'];
  let encodedChars = [
    '+',
    '-',
    '=',
    '&',
    '|',
    '!',
    '(',
    ')',
    '{',
    '}',
    '[',
    ']',
    '^',
    '"',
    '~',
    '*',
    '?',
    ':',
    '\\',
    '/',
  ];

  let illegalRegEx = new RegExp(illegalChars.map(c => '\\' + c).join('|'), 'g');
  let encodedRegEx = new RegExp(encodedChars.map(c => '\\' + c).join('|'), 'g');

  s = s.replace(illegalRegEx, '');
  s = s.replace(encodedRegEx, ''); // (m) => '\\\\' + m);
  return s;
}

function getAllContentTypes() {
  let contentTypeList = [];
  Object.keys(ContentTypes)
    .map(key => ContentTypes[key])
    .forEach(value => {
      if (Array.isArray(value)) {
        value.forEach(subValue => {
          contentTypeList.push(subValue);
        });
      } else {
        contentTypeList.push(value);
      }
    });
  return contentTypeList;
}

function getContentTypeExpression(facet) {
  if (facet === Facets.all) {
    const allContentTypes = getAllContentTypes();
    return [
      Op.or(
        Op.in('sys.contentTypeId', ...allContentTypes),
        Op.equalTo('sys.dataFormat', 'webpage')
      ),
    ];
  }
  const contenTypeForFacet = ContentTypes[facet];
  if (Array.isArray(contenTypeForFacet)) {
    // log.info(contenTypeForFacet);
    return [Op.in('sys.contentTypeId', ...contenTypeForFacet)];
  } else {
    return [Op.equalTo('sys.contentTypeId', contenTypeForFacet)];
  }
}
function getSearchPromoContentTypeExpression() {
  return [Op.equalTo('sys.contentTypeId', 'searchPromo')];
}

function getTermExpressions(searchTerm, facet) {
  if (searchTerm) {
    return [getTermExpression(searchTerm, 1, facet)];
  } else {
    return [];
  }
}

function getCourseExpressions(state, facet) {
  if (facet == Facets.courses) {
    return getCourseLevelExpression(state, 1);
  } else {
    return [];
  }
}
function getCourseLevelExpression(state) {
  // debugger;
  let levels = getCourseLevels(state).toJS();
  levels = levels
    .filter(level => level.selected == true)
    .map(level => {
      return level.key;
    });
  if (levels.length > 0) {
    // have to handle 2 different content types
    return [Op.or(Op.in('level', ...levels), Op.in('courseLevel', ...levels))];
  }
  // debugger;
  return [];
}
function getSearchPromoTermExpressions(searchTerm) {
  return [Op.contains('keyword', searchTerm)];
}
function getTermExpression(term, weight, facet) {
  term = fixFreeTextForElastic(term);
  if (facet === Facets.all || facet === Facets.staffProfiles) {
    return Op.or(
      Op.freeText('entryTitle', term).weight(weight * 20),
      Op.freeText('searchContent', term).weight(weight),
      Op.freeText('searchData.searchContent', term).weight(weight),
      Op.freeText('introduction', term).weight(weight),
      Op.freeText('researchActivity', term).weight(weight),
      Op.freeText('teachingActivity', term).weight(weight)
    );
  } else {
    return Op.or(
      Op.freeText('entryTitle', term).weight(weight * 20),
      Op.freeText('searchContent', term).weight(weight),
      Op.freeText('searchData.searchContent', term).weight(weight)
    );
  }
}
function getSubjectAreaExpressions(state, facet) {
  if (facet == Facets.courses) {
    let subjects = getSubjectAreas(state).toJS();
    subjects = subjects
      .filter(subject => subject.selected == true)
      .map(subject => {
        return subject.key;
      });
    if (subjects.length > 0) {
      // have to handle 2 different content types
      return [
        Op.or(
          Op.in('subjectAreas', ...subjects),
          Op.in('courseSubjects', ...subjects)
        ),
      ];
    }
  }
  return [];
}
function getStartDateExpressions(state, facet) {
  if (facet == Facets.courses) {
    let startDates = getStartMonths(state).toJS();
    startDates = startDates
      .filter(date => date.selected == true)
      .map(date => {
        return date.key;
      });
    if (startDates.length > 0) {
      // have to handle 2 different content types
      return [
        Op.or(
          Op.in('startDate', ...startDates),
          Op.in('courseStartDate', ...startDates)
        ),
      ];
    }
  }
  return [];
}
function getStudyModeExpression(state, facet) {
  if (facet == Facets.courses) {
    let studyModes = getStudyModes(state).toJS();
    studyModes = studyModes
      .filter(sm => sm.selected == true)
      .map(sm => {
        return sm.key;
      });
    if (studyModes.length > 0) {
      // Need to think about the new Course one. We dont have a taxonomy of studymode. We just have text based items.
      return [
        Op.or(
          Op.in('studyMode', ...studyModes),
          Op.in('studyModeFilters', ...studyModes)
        ),
      ];
    }
  }
  return [];
}
function getDistanceLearningExpression(state, facet) {
  if (facet == Facets.courses) {
    let distanceLearning = getDistanceLearning(state);
    if (distanceLearning) {
      // have to handle 2 different content types
      return [
        Op.or(
          Op.in('pageRenderControls.hasDistanceLearning', distanceLearning),
          Op.in('courseHasDistanceLearning', distanceLearning)
        ),
      ];
    }
  }
  return [];
}
function getJointHonoursExpression(state, facet) {
  if (facet == Facets.courses) {
    let jointHonours = getJointHonors(state);
    if (jointHonours) {
      // have to handle 2 different content types
      return [
        Op.or(
          Op.in('pageRenderControls.hasJointHonors', jointHonours),
          Op.in('courseHasJointHonours', jointHonours)
        ),
      ];
    }
  }
  return [];
}
function getClearingExpression(state, facet) {
  if (facet == Facets.courses) {
    let isClearing = getClearingFilter(state);
    if (isClearing) {
      // have to handle 2 different content types
      return [Op.or(Op.in('inClearing', isClearing))];
    }
  }
  return [];
}
function getStaffProfilesExpression(facet) {
  if (facet === Facets.all || facet === Facets.staffProfiles) {
    return [
      Op.or(
        Op.and(
          Op.exists('profileURL', true),
          Op.not(Op.equalTo('profileURL', '')),
          Op.not(Op.equalTo('profileURL', null))
        ),
        Op.exists('profileURL', false)
      ),
    ];
  }
  return [];
}

function getDefaultExpressions(versionStatus) {
  return [
    Op.equalTo('sys.versionStatus', versionStatus),
    Op.or(
      Op.and(
        Op.exists('sys.metadata.includeInSearch', true),
        Op.equalTo('sys.metadata.includeInSearch', true)
      ),
      Op.exists('sys.metadata.includeInSearch', false)
    ),
  ];
}
export function getSearchPromoQuery(state) {
  const searchTerm = getCurrentKeyword(state);
  const versionStatus = selectVersionStatus(state);
  const expressions = [
    ...getDefaultExpressions(versionStatus),
    ...getSearchPromoContentTypeExpression(),
    ...getSearchPromoTermExpressions(searchTerm),
  ];

  const query = new Query(...expressions);
  query.pageIndex = 0;

  return query;
}

export function getSearchQuery(state, facet, pageIndex) {
  const searchTerm = getCurrentKeyword(state);
  const versionStatus = selectVersionStatus(state);
  let expressions = [
    ...getDefaultExpressions(versionStatus),
    ...getContentTypeExpression(facet),
    ...getTermExpressions(searchTerm, facet),
    ...getCourseExpressions(state, facet),
    ...getSubjectAreaExpressions(state, facet),
    ...getStartDateExpressions(state, facet),
    ...getDistanceLearningExpression(state, facet),
    ...getJointHonoursExpression(state, facet),
    ...getClearingExpression(state, facet),
    ...getStudyModeExpression(state, facet),
    ...getStaffProfilesExpression(facet),
    // ...getFilterExpressions(search)
  ];
  // Need to add study mode not sure about where data comes from...

  // let test = getCourseExpressions(state, facet);

  /* eslint-disable no-console */
  // console.log(test);
  /* eslint-enable no-console */

  const query = new Query(...expressions);
  query.pageIndex = pageIndex || 0;
  query.fields = internalGetSearchFacetFields(facet);
  query.pageSize = 10;
  return query;
}
function internalGetSearchFacetFields(facet) {
  if (facet == Facets.all) {
    // Bring fields together
    let fieldList = [];
    fieldList = Object.keys(Facets).map(key => {
      return key;
    });
    let fullReturnFieldList = [];
    fieldList.forEach(key => {
      fullReturnFieldList = [...fullReturnFieldList, ...FacetSearchFields[key]];
    });
    const dedupedFieldList = [...new Set(fullReturnFieldList)];
    return dedupedFieldList;
  }
  // debugger;
  return FacetSearchFields[facet];
}

function getSearchEntryInternationalEquivilentContentTypeExpression() {
  return [
    Op.equalTo('sys.contentTypeId', 'courseInternationalEntryEquivalent'),
  ];
}

function getEntryRequirementsCountryExpression(country) {
  return [Op.equalTo('country', country)];
}

export function getEntryEquivilents(country, versionStatus) {
  let expressions = [
    ...getDefaultExpressions(versionStatus),
    ...getSearchEntryInternationalEquivilentContentTypeExpression(),
    ...getEntryRequirementsCountryExpression(country),
  ];

  const query = new Query(...expressions);
  query.pageIndex = 0;
  return query;
}
