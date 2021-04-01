import React from 'react';
import styled from 'styled-components';
import { queryParams } from '~/core/util/navigation';
import LoginContainer from '~/features/login';

const StyledPage = styled.div`
  pre {
    display: inline;
    background: #eee;
    padding: 3px;
  }
`;

const shadowStyle = 'solid 2px #ccc';

const DetailsPanel = styled.div`
  background: #fafafa;
  margin: 2rem;
  padding: 0.05rem 0.5rem;
  border-bottom: ${shadowStyle};
  border-right: ${shadowStyle};

  h1 {
    font-size: 1.2rem;
    background: #eee;
    border-bottom: ${shadowStyle};
    padding: 0.5rem 1rem;
  }
`;

const GroupList = styled.ul`
  line-height: 1.5rem;
`;
const IdLabel = styled.span`
  font-size: 70%;
  font-weight: normal;

  color: #666;
`;

const AccessDeniedPage = () => (
  <StyledPage>
    <h1>Access Denied</h1>
    <p>
      Unfortunately we could not find your account in the right places for us to
      let you in
    </p>
    {queryParams().original_uri && (
      <h3>
        You tried to access the page at: <pre>{queryParams().original_uri}</pre>
      </h3>
    )}
    <LoginContainer>
      {({ user = {} }) => (
        <DetailsPanel>
          <h1>
            Logged in as: {user.name} ({user.username}){' '}
            <IdLabel>[{user.id}]</IdLabel>
          </h1>
          <GroupList>
            {user.groups.map(group => (
              <li key={group.id}>
                {group.name} <IdLabel>[{group.id}]</IdLabel>
              </li>
            ))}
          </GroupList>
        </DetailsPanel>
      )}
    </LoginContainer>
  </StyledPage>
);

export default AccessDeniedPage;
