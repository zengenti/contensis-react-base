//example json for an entry from Contensis delivery api
//this will get passed through a mapper function to bind the entry data to relevant props
export const entry = {
  title: 'Event Title',
};

export const filterGroup = {
  title: 'Filter Group',
  id: '1f5dea3b-5494-4e82-9341-0de26939df78',
  fieldIds: ['fieldId'],
  options: [
    {
      title: 'Option A',
      id: 'f85ddea0-03c8-475c-8237-d4680e048292',

      isSelected: false,
    },
    {
      title: 'Option B',
      id: '45a9298e-20bc-4b8d-8c2c-28bf7b996ed0',

      isSelected: true,
    },
    {
      title: 'Option C',
      id: 'c1f93d8a-cbf1-4b51-bf0b-aaa883889cdf',

      isSelected: false,
    },
    {
      title: 'Option D',
      id: '9764fb04-6ed2-4e53-b506-2f1226d15f1b',

      isSelected: true,
    },
    {
      title: 'Option E',
      id: '9c30caa9-6196-4cc5-9c6a-ed59ff7596a3',

      isSelected: false,
    },
  ],
};
