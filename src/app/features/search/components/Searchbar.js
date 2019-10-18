import React from 'react';
import PropTypes from 'prop-types';

import { Container } from '../';
import SearchbarStyled, {
  SearchbarSearchPageStyled,
} from '../components.styled/Searchbar.styled';
import { VisuallyHidden, getSVG } from '../';

class Searchbar extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    searchTerm: PropTypes.string,
    submitSearch: PropTypes.func,
    styleType: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  componentDidMount() {
    this.setState({ value: this.props.searchTerm });
  }

  componentDidUpdate(prevProps) {
    if (this.props.searchTerm !== prevProps.searchTerm) {
      this.setState({ value: this.props.searchTerm });
    }
  }

  handleChange(event) {
    this.setState(
      { value: event.target.value },
      () =>
        this.props.submitSearch &&
        this.props.submitSearch(this.state.value, 800)
    );
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.handleSubmit(event);
    }
  }

  handleSubmit(event) {
    if (event) event.preventDefault();
    this.props.submitSearch && this.props.submitSearch(this.state.value, 0);
  }

  render() {
    const { className, styleType } = this.props;
    const StyledComponent =
      styleType == 'searchPage' ? SearchbarSearchPageStyled : SearchbarStyled;
    const svgFill = styleType == 'searchPage' ? '#575757' : '#fff';
    const ContainerComponent = styleType == 'searchPage' ? Container : 'div';

    return (
      <StyledComponent className={className}>
        <ContainerComponent>
          <div className="sbInner">
            <input
              className="sbInput"
              onChange={e => this.handleChange(e)}
              onKeyPress={e => this.handleKeyPress(e)}
              placeholder="Search"
              title="Search"
              type="text"
              value={this.state.value || ''}
            />
            <button className="sbButton" onClick={() => this.handleSubmit()}>
              <VisuallyHidden>Search</VisuallyHidden>
              {getSVG('Search', svgFill, 'sbIcon')}
            </button>
          </div>
        </ContainerComponent>
      </StyledComponent>
    );
  }
}

export default Searchbar;
