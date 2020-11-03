import React from 'react';
import MainLayout from '~/layouts/MainLayout';
import AccountSettings from '~/features/accountSettings/';
import PageMetadata from '~/features/pageMetadata/pageMetadata';

const AccountSettingsPage = () => {
  return (
    <MainLayout headerType="minimal" footerType="minimal">
      <PageMetadata title="Account settings" />
      <AccountSettings />
    </MainLayout>
  );
};

export default AccountSettingsPage;
