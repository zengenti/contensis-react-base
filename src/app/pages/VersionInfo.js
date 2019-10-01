import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import styled from 'styled-components';
import packagejson from '../../../package.json';
import {
  selectCommitRef,
  selectVersionStatus,
  selectBuildNumber,
} from '~/core/redux/selectors/version.js';
import { selectCurrentProject } from '~/core/redux/selectors/routing.js';

const StyledTable = styled.table`
  font-family: 'Fira Sans', 'Source Sans Pro', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.5rem;
  border-bottom: 4px solid #8892bf;
  border-collapse: separate;
  margin: 0 auto;
  width: 80%;
  th {
    text-align: left;
    background-color: #c4c9df;
    border-bottom: #8892bf 2px solid;
    border-bottom-color: #8892bf;
    border-top: 20px solid #fff;
  }
  td {
    border-bottom: 1px solid #eee;
  }
  td,
  th {
    padding: 0.5rem 0.75rem;
    vertical-align: top;
  }
  .left {
    width: 25%;
  }
  tr th {
    border-right: hidden;
    border-spacing: 0 15px;
  }
  .green {
    background-color: #9c9;
    border-bottom: 1px solid #696;
  }
  .red {
    background-color: #c99;
    border-bottom: 1px solid #966;
  }
`;

const VersionInfo = ({ project, version }) => {
  const config = {
    DELIVERY_API_CONFIG /* global DELIVERY_API_CONFIG */,
    DISABLE_SSR_REDUX /* global DISABLE_SSR_REDUX*/,
    SERVERS /* global SERVERS */,
    PROJECTS /* global PROJECTS */,
    PROXY_DELIVERY_API /* global PROXY_DELIVERY_API */,
    PUBLIC_URI /* global PUBLIC_URI */,
    REVERSE_PROXY_PATHS /* global REVERSE_PROXY_PATHS */,
    VERSION /* global VERSION */,
  };
  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <td colSpan={2}>
              <h1>Version Information</h1>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={2}>Package detail</th>
          </tr>
          <tr>
            <td className="left">Name</td>
            <td>{packagejson.name}</td>
          </tr>
          <tr>
            <td className="left">Version</td>
            <td>{packagejson.version}</td>
          </tr>
          <tr>
            <th colSpan={2}>Version info (state)</th>
          </tr>
          <tr>
            <td>Build number: </td>
            <td>{version.buildNumber}</td>
          </tr>
          <tr>
            <td>Commit ref: </td>
            <td>{version.commitRef}</td>
          </tr>
          <tr>
            <td>Project</td>
            <td className={project == 'unknown' ? 'red' : ''}>{project}</td>
          </tr>
          <tr>
            <td>Contensis version status: </td>
            <td
              className={
                version.contensisVersionStatus == 'published' ? 'green' : 'red'
              }
            >
              {version.contensisVersionStatus}
            </td>
          </tr>
          <tr>
            <th colSpan={2}>Build configuration</th>
          </tr>
          <tr>
            <td>Environment</td>
            <td>{config.SERVERS.alias}</td>
          </tr>
          <tr>
            <td>Public uri</td>
            <td>{config.PUBLIC_URI}</td>
          </tr>
          <tr>
            <td>Servers</td>
            <td>
              <div>web: {config.SERVERS.web}</div>
              <div>cms: {config.SERVERS.cms}</div>
              <div>iis: {config.SERVERS.iis}</div>
              <div>internal vip: {config.SERVERS.internalVip}</div>
            </td>
          </tr>
          <tr>
            <td>Reverse proxy paths</td>
            <td>
              {Object.entries(config.REVERSE_PROXY_PATHS).map(
                ([, path], key) => (
                  <span key={key}>[ {path} ] </span>
                )
              )}
            </td>
          </tr>
          <tr>
            <td>Projects</td>
            <td>
              {Object.entries(config.PROJECTS).map(([, project], key) => (
                <div key={key}>
                  [ {project.id}: {project.publicUri} ({project.homeEntry}) ]
                </div>
              ))}
            </td>
          </tr>
          <tr>
            <td>Disable SSR inline-redux</td>
            <td>{config.DISABLE_SSR_REDUX.toString()}</td>
          </tr>
          <tr>
            <td>Proxy Delivery API requests</td>
            <td className={config.PROXY_DELIVERY_API ? 'green' : 'red'}>
              {config.PROXY_DELIVERY_API.toString()}
            </td>
          </tr>
        </tbody>
      </StyledTable>
    </>
  );
};

VersionInfo.propTypes = {
  project: PropTypes.string,
  version: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    project: selectCurrentProject(state),
    version: {
      buildNumber: selectBuildNumber(state),
      commitRef: selectCommitRef(state),
      contensisVersionStatus: selectVersionStatus(state),
    },
  };
};

export default hot(module)(connect(mapStateToProps)(VersionInfo));
