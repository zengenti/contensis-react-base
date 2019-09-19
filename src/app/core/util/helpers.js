import { Levels } from '~/core/redux/types/search';
export default class ProjectHelper {
  static currencyFormat(val) {
    const formatter = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 0,
    });
    return formatter.format(val);
  }

  static camelize(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
      })
      .replace(/\s+/g, '');
  }

  static ltrim(stringToTrim) {
    return stringToTrim.replace(/^\s+/, '');
  }
  static trim(s, c) {
    if (c === ']') c = '\\]';
    if (c === '\\') c = '\\\\';
    return s.replace(new RegExp('^[' + c + ']+|[' + c + ']+$', 'g'), '');
  }
  static resolveRelativeUrl(url) {
    // return 'https://www.brunel.ac.uk/' + url;
    // return 'https://www.brunel.ac.uk/' + this.trim(url, '/');
    return this.trim(url, '.aspx');
  }
  static ArrayToSentence(arr, connector = 'and') {
    return arr.length > 1
      ? arr.slice(0, -1).join(', ') + ' ' + connector + ' ' + arr.slice(-1)
      : arr.toString();
  }
  static GetComposerContent(composer, fieldName) {
    if (composer) {
      let composerField = composer
        .filter(c => c.type === fieldName)
        .map(c => {
          return c.value;
        });
      return composerField;
    }
    return null;
  }
  // type tabContent, Pill,
  static GetTabMessages(defaultMessages, course, tabName, above) {
    // Get a list of Default Mesages that match the type we require.
    const Messages = [];
    defaultMessages.forEach(message => {
      message.messageContent.forEach(mc => {
        if (
          mc.type == 'tabContent' &&
          mc.value.tab == tabName &&
          mc.value.positionAbove === above
        ) {
          const item = {
            conditions: message.renderConditions,
            content: mc.value.message,
          };
          Messages.push(item);
        }
      });
    });
    return this.GetMessagesMatchingCourse(Messages, course);
  }

  static GetPillItems(defaultMessages, course) {
    // Get a list of Default Mesages that match the type we require.
    const Messages = [];
    defaultMessages.forEach(message => {
      message.messageContent.forEach(mc => {
        if (mc.type == 'pill') {
          const item = {
            conditions: message.renderConditions,
            content: {
              title: mc.value.title,
              link: mc.value.link,
            },
          };
          Messages.push(item);
        }
      });
    });
    return this.GetMessagesMatchingCourse(Messages, course);
  }

  static GetPillItemsImutable(defaultMessages, course) {
    // Get a list of Default Mesages that match the type we require.
    const Messages = [];
    defaultMessages.forEach(message => {
      message.messageContent.forEach(mc => {
        if (mc.type == 'pill') {
          const item = {
            conditions: message.renderConditions,
            content: {
              title: mc.value.title,
              link: mc.value.link,
            },
          };
          Messages.push(item);
        }
      });
    });
    return this.GetMessagesMatchingCourseImmutable(Messages, course);
  }
  static GetMessagesMatchingCourseImmutable(messages, course) {
    if (messages.length > 0) {
      const returnMessages = [];
      messages.forEach(message => {
        if (this.MatchesConditions(message, course)) {
          returnMessages.push(message.content);
        }
      });
      return returnMessages;
    }
    return [];
  }
  static GetSidebarLinks(defaultMessages, course) {
    // Get a list of Default Mesages that match the type we require.
    const Messages = [];
    defaultMessages.forEach(message => {
      message.messageContent.forEach(mc => {
        if (mc.type == 'sidebarLink') {
          const item = {
            conditions: message.renderConditions,
            priority: message.orderingPriority,
            content: {
              title: mc.value.title,
              link: mc.value.link,
              style: mc.value.style,
              forwardQueryString: mc.value.forwardQueryString,
            },
          };
          Messages.push(item);
        }
      });
    });
    Messages.sort((a, b) => a.priority - b.priority);
    return this.GetMessagesMatchingCourse(Messages, course);
  }

  static GetGlanceBarMessages(defaultMessages, course) {
    // Get a list of Default Mesages that match the type we require.
    const Messages = [];
    defaultMessages.forEach(message => {
      message.messageContent.forEach(mc => {
        if (mc.type == 'glanceBar') {
          const item = {
            conditions: message.renderConditions,
            content: {
              title: mc.value.title,
              text: mc.value.text,
              icon: mc.value.icon,
              itemToOverride: mc.value.itemToOverride,
            },
          };
          Messages.push(item);
        }
      });
    });
    return this.GetMessagesMatchingCourse(Messages, course);
  }

  static GetAdditionalLinks(course) {
    // Get a list of Default Mesages that match the type we require.
    const Messages = [];
    if (course.applicationLinks) {
      course.applicationLinks.map(appLinks => {
        switch (appLinks.type) {
          case 'pgLinks':
            Messages.push({
              type: appLinks.type,
              title: appLinks.value.title,
              link: appLinks.value.linkURL,
            });
            break;
          case 'partTimeLinks':
            Messages.push({
              type: appLinks.type,
              title: 'Apply part-time',
              link: appLinks.value,
            });
            break;
        }
      });
    }
    if (course.subjectAreas) {
      course.subjectAreas.map(sa => {
        Messages.push({
          type: 'subjectArea',
          title: `Subject area: ` + sa.name,
          link: `/` + sa.name.replace(/ /g, '-').toLowerCase(),
        });
      });
    }
    return Messages;
  }
  static GetMessagesMatchingCourse(messages, course) {
    if (messages.length > 0) {
      const returnMessages = [];
      messages.forEach(message => {
        if (this.MatchesConditions(message, course)) {
          returnMessages.push(message.content);
        }
      });
      return returnMessages;
    }
    return [];
  }

  static MatchesConditions(message, course) {
    let evaluations = [];
    let finalEval = [];
    // Each Message HAs multiple Conditions
    message.conditions.forEach(codition => {
      let subEvaluations = codition.conditions.map(conditionItem => {
        switch (conditionItem.type) {
          case 'level': {
            const matchingLevels = conditionItem.value.filter(
              // We Asume a course Must have a Level!
              conditionItem => conditionItem.key === course.level[0].key
            );
            return matchingLevels.length > 0;
          }
          case 'college': {
            //Do any of the assigned colleges match our course college
            const matchingCollege = conditionItem.value.some(
              r => course.college.key === r.key
            );
            return matchingCollege;
          }
          case 'department': {
            //Do any of the assigned colleges match our course college
            const matchingDept = conditionItem.value.some(
              r => course.department.key === r.key
            );
            return matchingDept;
          }
          case 'subjectAreas': {
            const matchingSubj = conditionItem.value.some(r =>
              course.subjectAreas.some(s => s.key === r.key)
            );
            return matchingSubj;
          }
          case 'placement': {
            //Do any of the assigned colleges match our course college
            let matchingPlacement = false;
            if (codition.includeExclude == true) {
              matchingPlacement = course.placement
                ? conditionItem.value.key === course.placement.key
                : false;
            } else {
              matchingPlacement = course.placement
                ? conditionItem.value.key !== course.placement.key
                : false;
            }
            return matchingPlacement;
          }
          case 'inClearing': {
            if (codition.includeExclude == true) {
              return conditionItem.value == course.inClearing;
            } else {
              return conditionItem.value != course.inClearing;
            }
          }
          case 'hasMPhilOptionPhD': {
            if (codition.includeExclude == true) {
              return (
                conditionItem.value ==
                course.pageRenderControls.phdHasMPhilOption
              );
            } else {
              return (
                conditionItem.value !=
                course.pageRenderControls.phdHasMPhilOption
              );
            }
          }
          case 'hasAnnualFee': {
            if (codition.includeExclude == true) {
              return (
                conditionItem.value == course.pageRenderControls.hasAnnualFee
              );
            } else {
              return (
                conditionItem.value != course.pageRenderControls.hasAnnualFee
              );
            }
          }
          case 'preMastersCourse': {
            return (
              conditionItem.value == course.pageRenderControls.preMastersCourse
            );
          }
          case 'feeNotesBelowIsNull': {
            if (!course.tuitionFees) {
              return false;
            } else {
              return (
                conditionItem.value !=
                course.tuitionFees.some(tf => tf.feeNote !== null)
              );
            }
          }
          case 'hasDistanceLearning': {
            if (codition.includeExclude == true) {
              return (
                conditionItem.value ==
                course.pageRenderControls.hasDistanceLearning
              );
            } else {
              return (
                conditionItem.value !=
                course.pageRenderControls.hasDistanceLearning
              );
            }
          }
          case 'directEntry': {
            if (codition.includeExclude == true) {
              return (
                conditionItem.value == course.pageRenderControls.directEntry
              );
            } else {
              return (
                conditionItem.value != course.pageRenderControls.directEntry
              );
            }
          }
          case 'courses': {
            if (conditionItem.value != null) {
              if (codition.includeExclude == true) {
                return conditionItem.value.sys.id === course.sys.id;
              } else {
                return conditionItem.value.sys.id !== course.sys.id;
              }
            }
            return false;
          }
          default:
            return false;
        }
      });
      evaluations = evaluations.concat(subEvaluations);
      const anyNegative = evaluations.filter(evaluation => evaluation == false);
      const anyPositive = evaluations.filter(evaluation => evaluation == true);
      //If conditional opeerator is TRUE then all conditions must match.
      if (codition.conditionalOperator === true) {
        if (anyNegative.length > 0) {
          finalEval.push(false);
        }
        finalEval.push(true);
      }
      //If conditional operator is FALSE then we only need at least 1 matching condition.
      if (codition.consitionalOperator === false) {
        if (anyPositive.length > 0) {
          finalEval.push(true);
        }
        finalEval.push(false);
      }
    });
    const anyNegative = finalEval.filter(evaluation => evaluation == false);
    if (anyNegative.length > 0) {
      return false;
    }
    return true;
  }

  static keyPress(event, action) {
    var code = event.keyCode || event.which;
    if (code === 13) {
      action;
    }
  }
  static YearTitleChecker(year) {
    //We can add any other year values based on what Brunel ask
    if (year === 100) {
      return 'Distance Learning';
    }
    return `Year ` + year;
  }
  static SortGroupedByType(typedGroup) {
    let modules = [];
    typedGroup.Compulsory
      ? modules.push({
          title: 'Compulsory',
          modules: typedGroup.Compulsory.map(mod => {
            return {
              modules: mod.module,
              studyMode: mod.studyMode,
            };
          }),
        })
      : {};
    typedGroup.Optional
      ? modules.push({
          title: 'Optional',
          modules: typedGroup.Optional.map(mod => {
            return {
              modules: mod.module,
              studyMode: mod.studyMode,
            };
          }),
        })
      : {};
    typedGroup.Typical
      ? modules.push({
          title: 'Typical',
          modules: typedGroup.Typical.map(mod => {
            return {
              modules: mod.module,
              studyMode: mod.studyMode,
            };
          }),
        })
      : {};
    return modules;
  }
  static GroupedModules(modules) {
    const modArr = new Array();
    let groupedModules = ProjectHelper.GroupBy(modules, m => m.year);
    groupedModules.forEach(groupItem => {
      let modTypes = ProjectHelper.Group(groupItem, 'type');
      modArr.push({
        year: ProjectHelper.YearTitleChecker(groupItem[0].year),
        GroupedByType: ProjectHelper.SortGroupedByType(modTypes),
      });
    });
    return modArr;
  }
  static Group(arr, property) {
    return arr.reduce(function(memo, x) {
      if (!memo[x[property]]) {
        memo[x[property]] = [];
      }
      memo[x[property]].push(x);
      return memo;
    }, {});
  }
  static GroupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      if (!map.has(key)) {
        map.set(key, [item]);
      } else {
        map.get(key).push(item);
      }
    });
    return map;
  }
  static ReturnScript() {
    if (typeof window == 'undefined') {
      return null;
    }
    let script = document.createElement('script');
    script.innerHTML =
      "(function (d) {'use strict';var widgetScript = d.createElement('script'); widgetScript.id = 'unistats-widget-script';widgetScript.src = '//widget.unistats.ac.uk/js/unistats.widget.js';var scriptTags = d.getElementsByTagName('script')[0];if (d.getElementById('unistats-widget-script')) { return; }scriptTags.parentNode.insertBefore(widgetScript, scriptTags);}(document));";
    document.body.appendChild(script);
  }
  static ReturnPlacementMessage(levels, placement, subjectInfo) {
    let placementLink = undefined;
    const message = [];
    if (subjectInfo != undefined) {
      if (levels.filter(sl => sl.name === 'Undergraduate').length > 0) {
        placementLink = subjectInfo.placementPageUg;
      }
      if (levels.filter(sl => sl.name === 'Postgraduate').length > 0) {
        placementLink = subjectInfo.placementPagePg;
      }
      message.push(
        '<p>' +
          'This course has a ' +
          placement.name +
          ' option. </span>' +
          'Find out more about <a href="' +
          placementLink +
          '">work placements available</a>' +
          '.' +
          '</p>'
      );
    }
    return message;
  }
  static GetStudyModeType(studyMode) {
    if (studyMode.includes('compressed')) {
      return 'compressed-sandwich';
    } else if (studyMode.includes('thick')) {
      return 'thick-sandwich';
    } else if (studyMode.includes('thin')) {
      return 'thin-sandwich';
    } else if (studyMode.includes('full')) {
      return 'full-time';
    } else if (studyMode.includes('part')) {
      return 'part-time';
    }
  }
  static CalculateCourseFees(
    course,
    fee,
    override,
    overrideInt,
    distanceLearning
  ) {
    let extraFees = [];
    if (fee.feeType.includes('Distance Learning')) {
      if (override && fee.feeType === 'Distance Learning UK / EU') {
        extraFees.push(`${ProjectHelper.currencyFormat(override)} part-time`);
      } else if (
        overrideInt &&
        fee.feeType === 'Distance Learning International'
      ) {
        extraFees.push(
          `${ProjectHelper.currencyFormat(overrideInt)} part-time`
        );
      }
    } else {
      const partTimeOnly = /(^part-time$)|(^part-time\sthin-sandwich$)/;
      if (
        course &&
        course.level &&
        course.level.filter(sl => sl.name === 'Undergraduate').length > 0
      ) {
        let ptFee = Math.floor((fee.fee * 0.75) / 5) * 5;
        if (override && fee.feeType === 'UG UK / EU') {
          extraFees.push(`${ProjectHelper.currencyFormat(override)} part-time`);
        } else if (overrideInt && fee.feeType === 'UG International') {
          extraFees.push(
            `${ProjectHelper.currencyFormat(overrideInt)} part-time`
          );
        } else if (
          course.courseStudyMode.some(item => partTimeOnly.test(item.mode))
        ) {
          extraFees.push(ProjectHelper.currencyFormat(ptFee) + ` part-time`);
        }
        if (
          course.placement &&
          course.placement.name !== 'none' &&
          course.pageRenderControls.hidePlacementFee !== true
        ) {
          extraFees.push(`£1,000 placement year`);
        }
        if (fee.feeType.includes('UK')) {
          if (course.title.includes('MMath')) {
            extraFees.push(`£6,330 final year`);
          }
          if (course.title.includes('MEng')) {
            extraFees.push(`£6,330 final year`);
          }
        }
        if (distanceLearning) {
          extraFees.push(
            ProjectHelper.currencyFormat(distanceLearning) +
              ` distance learning`
          );
        }
      } else if (
        course &&
        course.level &&
        course.level.filter(sl => sl.name === 'Postgraduate').length > 0
      ) {
        let ptFee = Math.floor(fee.fee / 2);
        if (override && fee.feeType === 'PG UK / EU') {
          extraFees.push(`${ProjectHelper.currencyFormat(override)} part-time`);
        } else if (overrideInt && fee.feeType === 'PG International') {
          extraFees.push(
            `${ProjectHelper.currencyFormat(overrideInt)} part-time`
          );
        } else if (
          course.courseStudyMode.some(item => partTimeOnly.test(item.mode))
        ) {
          extraFees.push(ProjectHelper.currencyFormat(ptFee) + ` part-time`);
        }

        if (distanceLearning) {
          extraFees.push(
            ProjectHelper.currencyFormat(distanceLearning) +
              ` distance learning`
          );
        }
      }
    }
    return extraFees;
  }
  static FilterCountryRequirementMessages(entries, courseGrade) {
    const Messages = [];
    if (!courseGrade) {
      return [];
    }
    if (entries.size === 0) {
      return [];
    }
    entries.map(entry => {
      entry.get('entryEquivalents').map(entryEquivalent => {
        if (
          entryEquivalent.getIn(['requirement', 'title'], null) === courseGrade
        ) {
          Messages.push({
            title: entry.get('title'),
            equivalent: entryEquivalent.get('equivalent'),
          });
        }
      });
    });
    return Messages;
  }

  static showChildren(e) {
    e.preventDefault;

    let children = document.getElementById(e);
    if (children.style.display == 'block') {
      children.style.display = 'none';
    } else {
      children.style.display = 'block';
    }
  }
}
export function action(type, payload = {}) {
  return { type, ...payload };
}

export const getWebPImageUri = uri => {
  let formatedUri = uri;
  if (uri.indexOf('.gif') == -1) {
    if (uri.indexOf('f=') == -1 && uri.indexOf('format=') == -1) {
      if (uri.indexOf('?') > -1) {
        formatedUri = `${uri}&f=webp`;
      } else {
        formatedUri = `${uri}?f=webp`;
      }
    }
    if (
      formatedUri.indexOf('q=') == -1 &&
      formatedUri.indexOf('quality=') == -1
    ) {
      if (formatedUri.indexOf('?') > -1) {
        formatedUri = `${formatedUri}&q=70`;
      } else {
        formatedUri = `${formatedUri}?q=70`;
      }
    }
  }
  return formatedUri;
};

export const resizeImage = (image, height, width) => {
  if (image.asset && image.asset.sys && image.asset.sys.uri) {
    image.asset.sys.uri = resizeImageUri(image.asset.sys.uri, height, width);
  }
};
export const resizeImageUri = (uri, height, width) => {
  let formatedUri = uri;
  let paramDelimeter = '?';
  if (uri.indexOf('?') > -1) {
    paramDelimeter = '&';
  }
  if (width) {
    if (
      formatedUri.indexOf('w=') == -1 &&
      formatedUri.indexOf('width=') == -1
    ) {
      formatedUri = `${formatedUri}${paramDelimeter}w=${width}`;
      paramDelimeter = '&';
    }
  }
  if (height) {
    if (
      formatedUri.indexOf('h=') == -1 &&
      formatedUri.indexOf('height=') == -1
    ) {
      formatedUri = `${formatedUri}${paramDelimeter}h=${height}`;
    }
  }

  return formatedUri;
};

export function splitTitle(title, text) {
  const titleTrim = title.trim();
  const titleSplit = titleTrim.split(' ');
  // if text is present get penultimate word else get last word
  const titleB =
    text && titleSplit.length >= 3
      ? titleSplit[titleSplit.length - 2]
      : titleSplit.length >= 2
      ? titleSplit[titleSplit.length - 1]
      : null;
  // if text is present get last word
  const titleC =
    text && titleSplit.length >= 3 ? titleSplit[titleSplit.length - 1] : null;

  // remove last word. if text is present also remove penultimate word
  if (titleSplit.length >= 2) {
    if (text && titleSplit.length >= 3) {
      titleSplit.pop();
      titleSplit.pop();
    } else {
      titleSplit.pop();
    }
  }

  const titleA = titleSplit.join(' ') + ' ';

  return {
    a: titleA,
    b: titleB,
    c: titleC,
  };
}

export function getTarget(url) {
  const target =
    url.indexOf('http') > -1 || url.indexOf('www') > -1 ? '_blank' : '_self';
  return target;
}

export function newWindow(url) {
  const target =
    url.indexOf('http') > -1 || url.indexOf('www') > -1 ? true : false;
  return target;
}

export function getEntryRoute(entry) {
  if (entry.sys.contentTypeId === 'course') {
    let entryPath = '';
    Levels.forEach(level => {
      // debugger;
      if (level.key == entry.level[0].key) {
        entryPath = `${level.basePath}/${entry.sys.slug}`;
      }
    });
    return entryPath;
  }
  return '';
}
