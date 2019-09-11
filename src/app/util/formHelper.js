const submitForm = async (mappedFormData, url) => {
  try {
    if (mappedFormData && url) {
      const requestData = new URLSearchParams(mappedFormData);
      const response = await fetch(url, {
        method: 'post',
        body: requestData,
      });
      if (response) {
        const responseData = await response.json();
        return responseData;
      }
      throw 'could not map form data';
    }
    throw 'no form data';
  } catch (error) {
    throw error;
  }
};

export const submitContactForm = async rawFormData => {
  try {
    if (rawFormData) {
      const mappedFormData = mapContactFormData(rawFormData);
      const url =
        DELIVERY_API_CONFIG.contactFormPostUrl; /* global DELIVERY_API_CONFIG */
      const responseData = await submitForm(mappedFormData, url);
      return responseData;
    }
    throw 'no raw data supplied';
  } catch (error) {
    throw error;
  }
};

export const submitNewsletterSignUpForm = async rawFormData => {
  try {
    if (rawFormData) {
      const mappedFormData = mapNewsletterSignUpFormData(rawFormData);
      const url = `${DELIVERY_API_CONFIG.rootUrl}${
        /* global DELIVERY_API_CONFIG */
        DELIVERY_API_CONFIG.newsletterSignUpFormPostUrl
      }`;
      const responseData = await submitForm(mappedFormData, url);
      return responseData;
    }
    throw 'no form data';
  } catch (error) {
    throw error;
  }
};

export const submitPressForm = async rawFormData => {
  try {
    if (rawFormData) {
      const mappedFormData = mapPressFormData(rawFormData);
      const url = `${DELIVERY_API_CONFIG.rootUrl}${
        /* global DELIVERY_API_CONFIG */
        DELIVERY_API_CONFIG.pressFormPostUrl
      }`;
      const responseData = await submitForm(mappedFormData, url);
      return responseData;
    }
    throw 'no form data';
  } catch (error) {
    throw error;
  }
};

export const submitPricingForm = async rawFormData => {
  try {
    if (rawFormData) {
      const mappedFormData = mapPricingFormData(rawFormData);
      const url = `${DELIVERY_API_CONFIG.rootUrl}${
        /* global DELIVERY_API_CONFIG */
        DELIVERY_API_CONFIG.pricingFormPostUrl
      }`;
      const responseData = await submitForm(mappedFormData, url);
      return responseData;
    }
    throw 'no form data';
  } catch (error) {
    throw error;
  }
};
// function timeout(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

const mapContactFormData = rawData => {
  let formData = new FormData();
  if (rawData) {
    formData.append('ctrl_6-67-f650', rawData.name);
    formData.append('ctrl_3-67-f651', rawData.email);
    formData.append('ctrl_7-67-f655', rawData.reasonForContact);
    formData.append('ctrl_4-67-f653', rawData.subject);
    formData.append('ctrl_2-67-f654', rawData.message);
    let defaultFormData = {
      hdPageRules67: '{ "FormPageRules": "[]" }',
      hdActionUrl67: '/REST/UI/FormsModule/postform/',
      hdValUrl67: 'Please enter a valid URL including http://',
      hdValFileType67: 'Please choose a file of the following type({ 0})',
      hdValIsDuplicate67:
        'This value has already been added, please enter a different value.',
      hdValLessThan67: 'Please enter a value less than { 0 }.',
      hdValMinWords67: 'Please enter at least { 0 } words.',
      hdValMaxWords67: 'Please enter no more than { 0 } words.',
      hdValMinCheckbox67: 'Please select at least { 0 } option.',
      hdPageContent67: '0',
      hdCurrentProject67: '1',
    };
    Object.keys(defaultFormData).forEach(key => {
      formData.append(key, defaultFormData[key]);
    });
  }
  return formData;
};

const mapNewsletterSignUpFormData = rawData => {
  let formData = new FormData();
  if (rawData) {
    formData.append('ctrl_2_first-1599-f15892', rawData.firstName);
    formData.append('ctrl_2_surname-1599-f15893', rawData.lastName);
    formData.append('ctrl_1-1599-f15891', rawData.email);
    formData.append('ctrl_3-1599-f15894', rawData.iAmInterestedIn);
    let defaultFormData = {
      hdPageRules1599: '{ "FormPageRules": "[]" }',
      hdActionUrl1599: '/REST/UI/FormsModule/postform/',
      hdValUrl1599: 'Please enter a valid URL including http://',
      hdValFileType1599: 'Please choose a file of the following type({ 0})',
      hdValIsDuplicate1599:
        'This value has already been added, please enter a different value.',
      hdValLessThan1599: 'Please enter a value less than { 0 }.',
      hdValMinWords1599: 'Please enter at least { 0 } words.',
      hdValMaxWords1599: 'Please enter no more than { 0 } words.',
      hdValMinCheckbox1599: 'Please select at least { 0 } option.',
    };
    Object.keys(defaultFormData).forEach(key => {
      formData.append(key, defaultFormData[key]);
    });
  }
  return formData;
};

const mapPressFormData = rawData => {
  let formData = new FormData();
  if (rawData) {
    formData.append('ctrl_1_first-1597-f15870', rawData.firstName);
    formData.append('ctrl_1_surname-1597-f1587', rawData.lastName);
    formData.append('ctrl_2-1597-f15872', rawData.email);
    formData.append('ctrl_4-1597-f15873', rawData.subject);
    formData.append('ctrl_5-1597-f15874', rawData.message);
    let defaultFormData = {
      hdPageRules1597: '{ "FormPageRules": "[]" }',
      hdActionUrl1597: '/REST/UI/FormsModule/postform/',
      hdValUrl1597: 'Please enter a valid URL including http://',
      hdValFileType1597: 'Please choose a file of the following type({ 0})',
      hdValIsDuplicate1597:
        'This value has already been added, please enter a different value.',
      hdValLessThan1597: 'Please enter a value less than { 0 }.',
      hdValMinWords1597: 'Please enter at least { 0 } words.',
      hdValMaxWords1597: 'Please enter no more than { 0 } words.',
      hdValMinCheckbox1597: 'Please select at least { 0 } option.',
    };
    Object.keys(defaultFormData).forEach(key => {
      formData.append(key, defaultFormData[key]);
    });
  }
  return formData;
};

const mapPricingFormData = rawData => {
  let formData = new FormData();
  if (rawData) {
    formData.append('ctrl_1_first-1586-f15760', rawData.firstName);
    formData.append('ctrl_1_surname-1586-f15761', rawData.lastName);
    formData.append('ctrl_2-1586-f15762', rawData.email);
    formData.append('ctrl_4-1586-f15763', rawData.subject);
    formData.append('ctrl_5-1586-f15764', rawData.message);
    let defaultFormData = {
      hdPageRules1586: '{ "FormPageRules": "[]" }',
      hdActionUrl1586: '/REST/UI/FormsModule/postform/',
      hdValUrl1586: 'Please enter a valid URL including http://',
      hdValFileType1586: 'Please choose a file of the following type({ 0})',
      hdValIsDuplicate1586:
        'This value has already been added, please enter a different value.',
      hdValLessThan1586: 'Please enter a value less than { 0 }.',
      hdValMinWords1586: 'Please enter at least { 0 } words.',
      hdValMaxWords1586: 'Please enter no more than { 0 } words.',
      hdValMinCheckbox1586: 'Please select at least { 0 } option.',
    };
    Object.keys(defaultFormData).forEach(key => {
      formData.append(key, defaultFormData[key]);
    });
  }
  return formData;
};
