import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, text, date } from '@storybook/addon-knobs';

import { formatKnobDate, generateLoremIpsum } from '../';

import Searchbar from '../components/Searchbar';
import SearchLayout from '../components/SearchLayout';
import FeaturedResults from '../components/FeaturedResults';
import ResultCardList from '../components/ResultCardList';
import FacetTabs from '../components/FacetTabs';
import Filters from '../components/Filters';
import Paging from '~/features/paging';

storiesOf('Features', module).add(
  'Search Results',
  () => {
    let featureCardCount = 1;

    let resultsCardCount = number(
      'Results Card Count',
      '12',
      { range: true, min: 0, max: 12, step: 1 },
      'Blog Listing'
    );

    let featureCard = {
      heroImage: {
        asset: {
          sys: {
            uri: text(
              'Feature image path',
              'https://picsum.photos/id/1016/250/250',
              'Feature Card'
            ),
          },
        },
        altText: '',
      },
      title: text('Feature title', generateLoremIpsum(10), 'Feature Card'),
      publishDate: date(
        'Feature date',
        new Date('Jan 01 2019'),
        'Feature Card'
      ),
      excerpt: text('Feature excerpt', generateLoremIpsum(20), 'Feature Card'),
      storyClassification: {
        name: text('Feature tag', 'Category', 'Feature Card'),
      },
    };

    let resultCard = {
      heroImage: {
        asset: {
          sys: {
            uri: text(
              'Result image path',
              'https://picsum.photos/id/1041/160/160',
              'Result Card'
            ),
          },
        },
        altText: '',
      },
      title: text('Result title', generateLoremIpsum(10), 'Result Card'),
      publishDate: date('Result date', new Date('Jan 01 2019'), 'Result Card'),
      excerpt: text('Result excerpt', generateLoremIpsum(25), 'Result Card'),
      storyClassification: {
        name: text('Result tag', 'Category', 'Result Card'),
      },
    };

    const filters = [
      {
        title: 'News',
        isSelected: false,
        value: '',
      },
      {
        title: 'Events',
        isSelected: false,
        value: '',
      },
      {
        title: 'Blogs',
        isSelected: false,
        value: '',
      },
    ];

    let paging = {
      pageIndex: 0,
      pageSize: 12,
      totalCount: 50,
      pageCount: 5,
    };

    let featured = [];
    //format knob date to contensis date format
    featureCard.publishDate = formatKnobDate(featureCard.publishDate);

    for (let i = 0; i < featureCardCount; i++) {
      featured.push(featureCard);
    }

    let results = [];
    //format knob date to contensis date format
    resultCard.publishDate = formatKnobDate(resultCard.publishDate);

    for (let i = 0; i < resultsCardCount; i++) {
      results.push(resultCard);
    }

    let searchTerm = '';

    const tabs = {
      staff: {
        title: 'Staff Portal',
        isActive: true,
      },
      students: {
        title: 'Students Portal',
        isActive: false,
      },
      website: {
        title: 'Website',
        isActive: false,
      },
      warsash: {
        title: 'Warsash',
        isActive: false,
      },
    };

    return (
      <React.Fragment>
        <Searchbar submitSearch={() => {}} styleType="searchPage" />
        <FacetTabs tabs={tabs} updateCurrentFacet={() => {}} />
        <SearchLayout
          main={
            <React.Fragment>
              {featured && featured.length > 0 && (
                <FeaturedResults cards={featured} />
              )}
              <ResultCardList
                cards={results}
                paging={paging}
                searchTerm={searchTerm}
              />
              <Paging paging={paging} />
            </React.Fragment>
          }
          aside={<Filters filter={filters} updateSelectedFilters={() => {}} />}
        />
      </React.Fragment>
    );
  },
  {
    knobs: {
      escapeHTML: false,
    },
  }
);
