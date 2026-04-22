import React from 'react';
import { connect } from 'react-redux';

import mapStateToVersionInfo from '../transformations/state-to-versioninfoprops.mapper';

import { VersionInfoStyledTable } from './VersionInfo.styled';

export interface IVersionInfoProps {
  deliveryApi: {
    rootUrl: string;
    accessToken: string;
    projectId: string;
    livePublishingRootUrl: string;
  };
  devEnv: { [k: string]: string };
  disableSsrRedux: boolean;
  nodeEnv: string;
  packageDetail: any;
  project: string;
  projects;
  proxyDeliveryApi;
  publicUri: string;
  reverseProxyPaths: string[];
  servers: {
    alias: string;
    api: string;
    cms: string;
    web: string;
    iis: string;
    previewIis: string;
    previewWeb: string;
  };
  uris: {
    gitRepo: string;
    commit: string;
    pipeline: string;
  };
  version: {
    buildNumber: string;
    commitRef: string;
    contensisVersionStatus: string;
  };
  zenPackageVersions: string[];
}

const VersionInfo = ({
  deliveryApi,
  devEnv,
  disableSsrRedux,
  nodeEnv,
  packageDetail,
  project,
  projects,
  proxyDeliveryApi,
  publicUri,
  reverseProxyPaths,
  servers,
  uris,
  version,
  zenPackageVersions,
}: IVersionInfoProps) => {
  return (
    <VersionInfoStyledTable>
      <thead>
        <tr>
          <td colSpan={2}>
            <h1>
              <a href="/">Version Information</a>
            </h1>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th colSpan={2}>Package detail</th>
        </tr>
        <tr>
          <td className="left">Name</td>
          <td>{packageDetail.name}</td>
        </tr>
        <tr>
          <td className="left">Version</td>
          <td>{packageDetail.version}</td>
        </tr>
        <tr>
          <th colSpan={2}>Version info (state)</th>
        </tr>
        <tr>
          <td>Git repo url: </td>
          <td>
            <a
              href={packageDetail.repository}
              target="_blank"
              rel="noopener noreferrer"
            >
              {packageDetail.repository}
            </a>
          </td>
        </tr>
        <tr>
          <td>Pipeline: </td>
          <td>
            <a href={uris.pipeline} target="_blank" rel="noopener noreferrer">
              {version.buildNumber}
            </a>
          </td>
        </tr>
        <tr>
          <td>Commit: </td>
          <td>
            <a href={uris.commit} target="_blank" rel="noopener noreferrer">
              {version.commitRef}
            </a>
          </td>
        </tr>
        {/* <tr>
            <td>Last release ref: </td>
            <td></td>
          </tr>
          <tr>
            <td>Number of commits since last release: </td>
            <td></td>
          </tr> */}
        <tr>
          <td>Project</td>
          <td className={project === 'unknown' ? 'red' : ''}>{project}</td>
        </tr>
        <tr>
          <td>Contensis version status: </td>
          <td
            className={
              version.contensisVersionStatus === 'published' ? 'green' : 'red'
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
          <td>{servers.alias}</td>
        </tr>
        <tr>
          <td>Public uri</td>
          <td>{publicUri}</td>
        </tr>
        <tr>
          <td>Zengenti packages</td>
          <td>
            {zenPackageVersions.map(([pkg, ver], idx) => (
              <div key={idx}>
                {pkg}: {ver}
              </div>
            ))}
          </td>
        </tr>
        <tr>
          <td>Servers</td>
          <td className="small">
            <div>web: {servers.web}</div>
            <div>preview: {servers.previewWeb}</div>
            <div>api: {servers.api}</div>
            <div>cms: {servers.cms}</div>
            <div>iis: {servers.iis}</div>
            <div>iis preview: {servers.previewIis}</div>
          </td>
        </tr>
        <tr>
          <td>Reverse proxy paths</td>
          <td>
            {Object.entries(reverseProxyPaths).map(([, path], key) => (
              <span key={key}>[ {path} ] </span>
            ))}
          </td>
        </tr>
        <tr>
          <td>Projects</td>
          <td>
            {Object.entries(
              projects as {
                id: string;
                publicUri: string;
              }[]
            ).map(([, project], key) => (
              <div key={key}>
                [ {project.id}: {project.publicUri} ]
              </div>
            ))}
          </td>
        </tr>
        <tr>
          <td>Delivery API</td>
          <td className="small">
            <ul style={{ margin: 0, padding: 0 }}>
              {Object.entries(deliveryApi).map(
                ([key, value]: [string, any], idx) => {
                  if (typeof value === 'object') return null;
                  return (
                    <li key={idx} style={{ listStyleType: 'none' }}>
                      {key}: <span>{value}</span>
                    </li>
                  );
                }
              )}
            </ul>
          </td>
        </tr>
        <tr>
          <td>Proxy Delivery API requests</td>
          <td className={proxyDeliveryApi ? 'green' : 'red'}>
            {proxyDeliveryApi.toString()}
          </td>
        </tr>
        <tr>
          <td>Disable SSR inline-redux</td>
          <td>{disableSsrRedux.toString()}</td>
        </tr>
        <tr>
          <td>NODE_ENV</td>
          <td className={nodeEnv === 'production' ? 'green' : 'red'}>
            {nodeEnv.toString()}
          </td>
        </tr>
        {devEnv && (
          <tr>
            <td>process.env</td>
            <td>
              {Object.entries(devEnv).map(([k, v], key) => (
                <div key={key}>
                  [ {k}: {v} ]
                </div>
              ))}
            </td>
          </tr>
        )}
      </tbody>
    </VersionInfoStyledTable>
  );
};

export default connect(mapStateToVersionInfo)(VersionInfo);
