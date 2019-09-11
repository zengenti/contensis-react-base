const SEARCH_PREFIX = '@SEARCH/';
export const SET_KEYWORD = `${SEARCH_PREFIX}SET_KEYWORD`;
export const SET_ENTRIES = `${SEARCH_PREFIX}SET_ENTRIES`;
export const SET_FACET = `${SEARCH_PREFIX}SET_FACET`;
export const CHANGE_PAGE = `${SEARCH_PREFIX}CHANGE_PAGE`;
export const TOGGLE_LEVEL = `${SEARCH_PREFIX}TOGGLE_LEVEL`;
export const TOGGLE_STUDY_MODE = `${SEARCH_PREFIX}TOGGLE_STUDY_MODE`;
export const TOGGLE_SEARCH_FILTER = `${SEARCH_PREFIX}TOGGLE_SEARCH_FILTER`;
export const TOGGLE_TAXONOMY_SELECTION_LIST = `${SEARCH_PREFIX}TOGGLE_TAXONOMY_SELECTION_LIST`;
export const EXECUTE_SEARCH = `${SEARCH_PREFIX}EXECUTE_SEARCH`;
export const SET_SINGLE_FACET_MODE = `${SEARCH_PREFIX}SET_SINGLE_FACET_MODE`;

export const Facets = {
  all: 'all',
  courses: 'courses',
  news: 'news', // todo: this is going to change
  // research: 'research',
  staffProfiles: 'staffProfiles',
  studentProfiles: 'studentProfiles',
};

export const ContentTypes = {
  courses: ['course'],
  news: ['events', 'news'],
  research: 'researchRefSearch',
  staffProfiles: 'staffProfiles',
  studentProfiles: 'studentProfiles',
};

export const FacetNames = {
  [Facets.all]: 'All',
  [Facets.courses]: 'Courses',
  [Facets.news]: 'News & Events',
  // [Facets.research]: 'Research',
  [Facets.staffProfiles]: 'Staff Profiles',
  [Facets.studentProfiles]: 'Student Profiles',
};

export const FacetSearchFields = {
  [Facets.all]: [],
  [Facets.courses]: [
    'title',
    'sys.slug',
    'seo',
    'seo.metaDescription',
    'level',
    'searchData',
    'courseLevel',
    'description',
    'entryTitle',
    'sys.contentTypeId',
    'url',
    'thumbnail',
    'asset',
    'uri',
    'sys.uri',
  ],
  [Facets.news]: [
    'sys.slug',
    'description',
    'entryTitle',
    'sys.contentTypeId',
    'thumbnail',
    'asset',
    'uri',
    'sys.uri',
    'publishDate',
    'date',
    'from',
    'searchData',
    'url',
  ],
  [Facets.research]: [
    'sys.slug',
    'entryTitle',
    'description',
    'sys.contentTypeId',
    'searchData',
    'url',
  ],
  [Facets.staffProfiles]: [
    'title',
    'sys.slug',
    'entryTitle',
    'imageLink',
    'institute',
    'department',
    'college',
    'profileUrl',
    'phoneNumber',
    'email',
    'jobTitle',
    'sys.contentTypeId',
  ],
  [Facets.studentProfiles]: [
    'title',
    'sys.slug',
    'entryTitle',
    'firstName',
    'surname',
    'description',
    'sys.contentTypeId',
    'searchData',
    'url',
  ],
};

export const SubjectAreas = [
  { title: 'Aerospace Engineering', key: '0/2/24/918/1179', selected: false },
  { title: 'Anthropology', key: '0/2/24/918/930', selected: false },
  { title: 'Biomedical Sciences	', key: '0/2/24/918/1180', selected: false },
  { title: 'Business School	', key: '0/2/24/918/1182', selected: false },
  { title: 'Chemical Engineering', key: '0/2/24/918/2344', selected: false },
  { title: 'Civil Engineering	', key: '0/2/24/918/941', selected: false },
  {
    title: 'Communication and Media Studies',
    key: '0/2/24/918/940',
    selected: false,
  },
  { title: 'Computer Science	', key: '0/2/24/918/1181', selected: false },
  { title: 'Creative Writing	', key: '0/2/24/918/949', selected: false },
  { title: 'Design', key: '0/2/24/918/951', selected: false },
  { title: 'Digital Media', key: '0/2/24/918/942', selected: false },
  { title: 'Economics and Finance', key: '0/2/24/918/922', selected: false },
  { title: 'Education', key: '0/2/24/918/1183', selected: false },
  {
    title: 'Electronic and Computer Engineering	',
    key: '0/2/24/918/1161',
    selected: false,
  },
  { title: 'English', key: '0/2/24/918/1185', selected: false },
  { title: 'Environmental Sciences	', key: '0/2/24/918/1191', selected: false },
  { title: 'Film Studies	', key: '0/2/24/918/1184', selected: false },
  {
    title: 'Flood and Coastal Engineering	',
    key: '0/2/24/918/1274',
    selected: false,
  },
  { title: 'Foundation Programmes	', key: '0/2/24/918/1196', selected: false },
  { title: 'Games Design	', key: '0/2/24/918/954', selected: false },
  { title: 'Global Challenges	', key: '0/2/24/918/2006', selected: false },
  { title: 'Journalism', key: '0/2/24/918/960', selected: false },
  { title: 'Law', key: '0/2/24/918/961', selected: false },
  { title: 'Life Sciences	', key: '0/2/24/918/1678', selected: false },
  { title: 'Mathematics', key: '0/2/24/918/923', selected: false },
  { title: 'Mechanical Engineering', key: '0/2/24/918/926', selected: false },
  { title: 'Music', key: '0/2/24/918/944', selected: false },
  { title: 'Occupational Therapy	', key: '0/2/24/918/1197', selected: false },
  { title: 'Physician Associate	', key: '0/2/24/918/1139', selected: false },
  { title: 'Physiotherapy', key: '0/2/24/918/1137', selected: false },
  { title: 'Politics and History	', key: '0/2/24/918/959', selected: false },
  { title: 'Psychology', key: '0/2/24/918/965', selected: false },
  {
    title: 'Public Health and Health Promotion	',
    key: '0/2/24/918/934',
    selected: false,
  },
  { title: 'Social Work	', key: '0/2/24/918/1188', selected: false },
  { title: 'Sociology', key: '0/2/24/918/931', selected: false },
  {
    title: 'Specialist Community Public Health Nursing	',
    key: '0/2/24/918/1138',
    selected: false,
  },
  {
    title: 'Sport, Health and Exercise Sciences	',
    key: '0/2/24/918/1198',
    selected: false,
  },
  { title: 'Theatre', key: '0/2/24/918/966', selected: false },
];

export const Levels = [
  {
    title: 'Foundation',
    key: '0/2/24/28/870',
    selected: false,
    basePath: '/study/undergraduate',
  },
  {
    title: 'Undergraduate',
    key: '0/2/24/28/43',
    selected: false,
    basePath: '/study/undergraduate',
  },
  {
    title: 'Pre-Masters',
    key: '0/2/24/28/871',
    selected: false,
    basePath: '/study/postgraduate',
  },
  {
    title: 'Postgraduate',
    key: '0/2/24/28/44',
    selected: false,
    basePath: '/study/postgraduate',
  },
  {
    title: 'PhD & Research',
    key: '0/2/24/28/872',
    selected: false,
    basePath: '/study/postgraduate',
  },
];

export const StartMonths = [
  { title: 'January', key: '0/2/24/919/1190', selected: false },
  { title: 'May', key: '0/2/24/919/1192', selected: false },
  { title: 'August', key: '0/2/24/919/1193', selected: false },
  { title: 'September', key: '0/2/24/919/920', selected: false },
  { title: 'October', key: '0/2/24/919/1208', selected: false },
  { title: 'November', key: '0/2/24/919/972', selected: false },
];

export const StudyModes = [
  { title: 'Full-time', key: '0/2/24/834/837', selected: false },
  { title: 'Full-time and placement', key: '0/2/24/834/838', selected: false },
  { title: 'Part-time', key: '0/2/24/834/836', selected: false },
];
