const sharedFilters = {
  selectedDate: {
    fieldId: 'eventDateStart.startDateTime',
    fieldOperator: 'between',
  },
  futureEventDates: {
    fieldId: 'eventDateStart.startDateTime',
    fieldOperator: 'greaterThanOrEqualTo',
  },
};

const eventsApiConfig = {
  uri: '/events-api',
  contentTypeId: 'syncedEvent',
  filters: {
    eventTag: 'extranetEventTags.sys.id',
    researchEntity: 'researchEntityTags.sys.id',
    staffTag: 'staffIntranetNewsEventTags.sys.id',
    studentTag: 'studentIntranetNewsEventTags.sys.id',
    subject: 'subjectsTags.sys.id',
  },
  sharedFilters,
  linkFields: {
    eventDates: {
      contentTypeId: 'syncedEventDate',
      sharedFilters,
    },
  },
};

export default eventsApiConfig;
