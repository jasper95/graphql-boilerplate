import React, { useContext } from 'react';
import { withRouter } from 'react-router';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import FontIcon from 'react-md/lib/FontIcons/FontIcon';
import Button from 'react-md/lib/Buttons/Button';
import ImageLoader from 'react-image';
import flowRight from 'lodash/flowRight';
import AuthContext from 'apollo/AuthContext';
import history from 'lib/history';

function MenuItem(props) {
  const {
    icon, label, link, active,
  } = props;
  return (
    <ListItem
      onClick={() => history.push(link)}
      className="profileNavCard_menu_item"
      active={active}
      primaryText={label}
      rightIcon={<FontIcon children={icon} />}
    />
  );
}

const ROLE_NAV = {
  USER: [
    {
      icon: 'work',
      label: 'Work Experience',
      link: '/profile/experiences',
    },
    {
      icon: 'school',
      label: 'Education',
      link: '/profile/education',
    },
    {
      icon: 'account_box',
      label: 'Skills',
      link: '/profile/skills',
    },
    {
      icon: 'account_box',
      label: 'About Me',
      link: '/profile/about-me',
    },
    {
      icon: 'insert_drive_file',
      label: 'Applications',
      link: '/profile/applications',
    },
  ],
  ADMIN: [
    {
      icon: 'work',
      label: 'Manage Jobs',
      link: '/admin/jobs',
    },
    {
      icon: 'supervisor_account',
      label: 'Manage Applications',
      link: '/admin/applications',
    },
  ],
};

function ProfileNavigation(props) {
  const { location, avatarLink, profileLink } = props;
  const { data: user, loading: authIsLoading } = useContext(AuthContext);
  if (authIsLoading) {
    return (<div>Loading...</div>);
  }
  if (!user) {
    return null;
  }
  const displayName = [
    user.first_name,
    user.last_name,
    user.company && user.company.name,
  ].filter(Boolean).join(' ');
  const navItems = ROLE_NAV[user.role || 'USER'];
  return (
    <div className="profileNavCard">
      <div className="profileNavCard_header">
        <div className="avatar profileNavCard_header_avatar">
          <div className="avatar_container">
            <div className="avatar_circle">
              <ImageLoader
                key={avatarLink}
                src={[avatarLink, '/static/img/default-avatar.png']}
              />
            </div>
            <div className="avatar_edit">
              <Button
                className="iBttn iBttn-primary"
                onClick={handleEditAvatar}
                icon
                children="edit"
              />
            </div>
          </div>
        </div>

        <div className="profileNavCard_header_greeting">
          <h5>
            Welcome back,
            {' '}
            {displayName}
          </h5>

          <a href={profileLink}>
            Preview Profile
          </a>
        </div>

      </div>
      <div className="profileNavCard_content">
        <List className="profileNavCard_menu">
          {navItems.map(({ icon, label, link }) => (
            <MenuItem
              active={location.pathname.includes(link)}
              icon={icon}
              label={label}
              link={link}
              key={link}
            />
          ))}
        </List>
      </div>
    </div>
  );

  function handleEditAvatar() {
    // const { dispatch, isAdmin } = props;
    // const payload = isAdmin ? {
    //   node: 'company',
    //   id: user.company_id,
    // } : {
    //   node: 'user',
    //   id: user.id,
    // };
    // dispatch(ShowDialog({
    //   path: 'Upload',
    //   props: {
    //     title: 'Upload Avatar',
    //     onValid: (data) => {
    //       dispatch(Upload({
    //         data: {
    //           ...data,
    //           ...payload,
    //           type: 'avatar',
    //         },
    //         callback: ({ updated_date }) => {
    //           if (isAdmin) {
    //             const { company } = user;
    //             dispatch(SetUserAuth({ ...user, company: { ...company, updated_date } }));
    //           } else {
    //             dispatch(SetUserAuth({ ...user, updated_date }));
    //           }
    //         },
    //       }));
    //     },
    //   },
    // }));
  }
}

export default flowRight(
  withRouter,
)(ProfileNavigation);
