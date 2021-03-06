import React from 'react';
import flowRight from 'lodash/flowRight';
import { withAuth } from 'apollo/auth';
import withBasePage from 'lib/hocs/basePage';
import pick from 'lodash/pick';
import { capitalizeCell, formatDate } from 'components/DataTable/CellFormatter';
import ProfilePage, { profilePropsKeys } from 'components/Profile/ProfilePage';
import gql from 'graphql-tag';

function Applications(props) {
  return (
    <ProfilePage
      columns={getColumns()}
      pageIcon="work"
      pageName="My Applications"
      readOnly
      {...pick(props, profilePropsKeys)}
    />
  );

  function getColumns() {
    return [
      {
        accessor: 'job_name',
        title: 'Job',
      },
      {
        accessor: 'company_name',
        title: 'Company',
      },
      {
        type: 'function',
        title: 'Date Applied',
        fn: formatDate('application_date', 'MMMM DD, YYYY'),
      },
      {
        type: 'function',
        title: 'Status',
        fn: capitalizeCell('status'),
      },
    ];
  }
}

const APPLICATION_QUERY = gql`
  query getApplication($user_id: uuid) {
    application(where: {id: {_eq: $user_id}}) {
      id
      status
      company {
        name
      }
      job {
        name
      }
    }
  }
`;

const basePageProps = {
  node: 'application',
  dataPropKey: 'applications',
  dialogProps: {
    fullWidth: true,
    maxWidth: 'lg',
  },
  listQuery: APPLICATION_QUERY,
  pageName: 'My Applications',
};


export default flowRight(
  withAuth(),
  withBasePage(basePageProps),
)(Applications);
