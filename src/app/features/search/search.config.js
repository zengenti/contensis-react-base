const freeTextWeights = {
  title: 100,
  description: 50,
  keywords: 50,
  content: 10,
};

export default {
  facets: {
    students: {
      title: 'Students Portal',
      isActive: false,
      queryParams: {
        contentTypeIds: [
          'home',
          'content',
          'metadataNewsArticle',
          'metadataEvent',
          'metadataBlogArticle',
          'pdf',
          'word',
        ],
        dataFormats: [],
        fields: ['entryTitle'], //TODO - Implement fields in query
        orderBy: [],
        pageSize: 12,
        weightedSearchFields: [
          { field: 'entryTitle', weight: freeTextWeights.title },
          { field: 'entryDescription', weight: freeTextWeights.description },
          {
            field: 'metaInformation.metaDescription',
            weight: freeTextWeights.description,
          },
          {
            field: 'metaInformation.metaKeywords',
            weight: freeTextWeights.keywords,
          },
          { field: 'searchContent', weight: freeTextWeights.content },
        ],
      },
      filters: {
        contentType: {
          title: 'Filter results by',
          items: [
            {
              title: 'News',
              key: 'metadataNewsArticle',
              type: 'contentTypeId',
            },
            {
              title: 'Events',
              key: 'metadataEvent',
              type: 'contentTypeId',
            },
            {
              title: 'Blogs',
              key: 'metadataBlogArticle',
              type: 'contentTypeId',
            },
            {
              title: 'Web pages',
              key: 'webpage',
              type: 'dataFormat',
            },
            {
              title: 'Documents',
              key: 'pdf,powerPoint,word',
              type: 'contentTypeId',
            },
          ],
        },
      },
    },
    staff: {
      title: 'Staff Portal',
      isActive: true,
      authentication: { isLoginRequired: true, allowedGroups: [98] },
      queryParams: {
        contentTypeIds: [
          'home',
          'content',
          'metadataNewsArticle',
          'metadataEvent',
          'metadataBlogArticle',
          'pdf',
          'word',
        ],
        dataFormats: [],
        orderBy: [],
        pageSize: 12,
        weightedSearchFields: [
          { field: 'entryTitle', weight: freeTextWeights.title },
          { field: 'entryDescription', weight: freeTextWeights.description },
          {
            field: 'metaInformation.metaDescription',
            weight: freeTextWeights.description,
          },
          {
            field: 'metaInformation.metaKeywords',
            weight: freeTextWeights.keywords,
          },
          { field: 'searchContent', weight: freeTextWeights.content },
        ],
      },
      filters: {
        contentType: {
          title: 'Filter results by',
          items: [
            {
              title: 'News',
              key: 'metadataNewsArticle',
              type: 'contentTypeId',
            },
            {
              title: 'Events',
              key: 'metadataEvent',
              type: 'contentTypeId',
            },
            {
              title: 'Blogs',
              key: 'metadataBlogArticle',
              type: 'contentTypeId',
            },
            {
              title: 'Web pages',
              key: 'webpage',
              type: 'dataFormat',
            },
            {
              title: 'Documents',
              key: 'pdf,powerPoint,word',
              type: 'contentTypeId',
            },
            // {
            //   title: 'Awards',
            //   key: 'storyClassification',
            //   value: '0/1209/1212/1336/1355',
            //   type: 'field',
            // },
          ],
        },
      },
    },
    website: {
      title: 'HCC Website',
      isActive: false,
      queryParams: {
        contentTypeIds: [
          'home',
          'metadataNewsArticle',
          'metadataEvent',
          'metadataBlogArticle',
          'pdf',
          'powerPoint',
          'word',
        ],
        dataFormats: ['webpage'],
        orderBy: ['-sys.version.published'],
        pageSize: 12,
        weightedSearchFields: [
          { field: 'entryTitle', weight: freeTextWeights.title },
          { field: 'entryDescription', weight: freeTextWeights.description },
          {
            field: 'metaInformation.metaDescription',
            weight: freeTextWeights.description,
          },
          {
            field: 'metaInformation.metaKeywords',
            weight: freeTextWeights.keywords,
          },
          { field: 'searchContent', weight: freeTextWeights.content },
        ],
      },
      filters: {
        contentType: {
          title: 'Filter results by',
          items: [
            // {
            //   title: 'Research',
            //   key: 'storyClassification',
            //   value: '0/1209/1212/1336/1362',
            //   type: 'field',
            // },
            {
              title: 'News',
              key: 'metadataNewsArticle',
              type: 'contentTypeId',
            },
            {
              title: 'Events',
              key: 'metadataEvent',
              type: 'contentTypeId',
            },
            {
              title: 'Blogs',
              key: 'metadataBlogArticle',
              type: 'contentTypeId',
            },
            {
              title: 'Web pages',
              key: 'webpage',
              type: 'dataFormat',
            },
            {
              title: 'Documents',
              key: 'pdf,powerPoint,word',
              type: 'contentTypeId',
            },
          ],
        },
      },
    },
    warsash: {
      title: 'Warsash',
      isActive: false,
      queryParams: {
        contentTypeIds: [
          'home',
          'metadataNewsArticle',
          'metadataEvent',
          'metadataBlogArticle',
          'pdf',
          'powerPoint',
          'word',
        ],
        dataFormats: ['webpage'],
        orderBy: [],
        pageSize: 12,
        weightedSearchFields: [
          { field: 'entryTitle', weight: freeTextWeights.title },
          { field: 'entryDescription', weight: freeTextWeights.description },
          {
            field: 'metaInformation.metaDescription',
            weight: freeTextWeights.description,
          },
          {
            field: 'metaInformation.metaKeywords',
            weight: freeTextWeights.keywords,
          },
          { field: 'searchContent', weight: freeTextWeights.content },
        ],
      },
    },
  },
};
