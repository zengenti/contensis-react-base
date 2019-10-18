import React from 'react';
import PropTypes from 'prop-types';

import FacetTabsStyled from '../components.styled/FacetTabs.styled';
import { Container } from '../';

const FacetTabs = ({ className, tabs, updateCurrentFacet }) => {
  if (!tabs || (tabs && Object.keys(tabs).length <= 1)) return null;
  return (
    <FacetTabsStyled className={className}>
      <Container>
        <ul className="ftList">
          {Object.keys(tabs).map((key, idx) => {
            const tab = tabs[key];
            const tabClassName = tab.isActive ? 'ftItem activeTab' : 'ftItem';
            return (
              <li className={tabClassName} key={idx}>
                {tab.authentication && tab.authentication.isLoginRequired && (
                  <span>[padlock]</span>
                )}
                <button
                  onClick={() => {
                    updateCurrentFacet(key);
                  }}
                  className="ftButton"
                >
                  {tab.title}
                </button>
              </li>
            );
          })}
        </ul>
      </Container>
    </FacetTabsStyled>
  );
};

FacetTabs.propTypes = {
  className: PropTypes.string,
  tabs: PropTypes.object,
  updateCurrentFacet: PropTypes.func,
};

export default FacetTabs;
