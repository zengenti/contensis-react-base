declare const eventsApiConfig: {
    uri: string;
    contentTypeId: string;
    filters: {
        eventTag: string;
        researchEntity: string;
        staffTag: string;
        studentTag: string;
        subject: string;
    };
    sharedFilters: {
        selectedDate: {
            fieldId: string;
            fieldOperator: string;
        };
        futureEventDates: {
            fieldId: string;
            fieldOperator: string;
        };
    };
    linkFields: {
        eventDates: {
            contentTypeId: string;
            sharedFilters: {
                selectedDate: {
                    fieldId: string;
                    fieldOperator: string;
                };
                futureEventDates: {
                    fieldId: string;
                    fieldOperator: string;
                };
            };
        };
    };
};
export default eventsApiConfig;
