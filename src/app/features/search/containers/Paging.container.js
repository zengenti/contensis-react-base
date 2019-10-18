import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toJS } from '~/core/containers/ToJs/ToJs';
import { updatePageIndex } from '../redux/actions';
import { getPaging } from '../redux/selectors';

import { Paging } from '../';

class RenderPaging extends React.Component {
  static propTypes = {
    paging: PropTypes.object,
    updatePageIndex: PropTypes.func,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const { paging, updatePageIndex, location } = this.props;
    return (
      <Paging
        paging={paging}
        updatePageIndex={updatePageIndex}
        location={location}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    paging: getPaging(state),
  };
};

const mapDispatchToProps = {
  updatePageIndex: pageIndex => updatePageIndex(pageIndex),
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(RenderPaging))
);
