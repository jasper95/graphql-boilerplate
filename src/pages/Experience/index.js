import React from 'react';
import flowRight from 'lodash/flowRight';
import { withAuth } from 'apollo/auth';
import DateCell from 'components/DateCell';
import ProfilePage, { profilePropsKeys, dataFormatter } from 'components/Profile/ProfilePage';
import withBasePage from 'lib/hocs/basePage';
import pick from 'lodash/pick';
import { generateQueryById } from 'apollo/query';
import gql from 'graphql-tag';


function Experience(props) {
  const { onDelete, onEdit } = props;
  return (
    <ProfilePage
      columns={getColumns()}
      pageIcon="work"
      pageName="Experience"
      {...pick(props, profilePropsKeys)}
    />
  );

  function getColumns() {
    return [
      {
        accessor: 'position',
        title: 'Position',
      },
      {
        accessor: 'company',
        title: 'Company',
      },
      {
        type: 'component',
        title: 'Dates',
        component: DateCell,
      },
      {
        type: 'actions',
        actions: [
          {
            icon: 'edit',
            label: 'Edit',
            onClick: onEdit,
          },
          {
            icon: 'delete',
            label: 'Delete',
            onClick: onDelete,
          },
        ],
      },
    ];
  }
}

const fields = ['id', 'position', 'start_date', 'end_date', 'company'];

const EXPERIENCE_QUERY = gql`
  query GetExperience($user_id: uuid) {
    experience(where: {user_id: {_eq: $user_id }}) {
      id
      position
      start_date
      end_date
      company
    }
  }
`;

const basePageProps = {
  // getListRequestData,
  node: 'experience',
  dialogPath: 'Experience',
  pageName: 'Experience',
  dataFormatter,
  listQuery: EXPERIENCE_QUERY,
  detailsQuery: generateQueryById({
    node: 'experience',
    keys: fields,
  }),
};

export default flowRight(
  withAuth(),
  withBasePage(basePageProps),
)(Experience);
