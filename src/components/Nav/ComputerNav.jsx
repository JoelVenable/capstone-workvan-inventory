import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { CartMenuItem } from './CartItem';
import { SignInButton } from './SignInButton';
import { SignoutMenuItem } from './SignoutMenuItem';

export function ComputerMenu({ user, history }) {
  // const [activeLink, setactiveLink] = useState(null);
  function handleClick(_e, { value }) {
    // setactiveLink(value);
    history.push(value);
  }
  if (user) {
    const { employee } = user;
    switch (user.userType) {
      case 'employee':
        return (
          <Menu.Menu position="right" size="mini">
            {employee.canEditUsers ? (
              <Menu.Item
                key="users"
                onClick={handleClick}
                icon="wrench"
                name="Users"
                value="/users"
              />
            ) : null}
            {employee.canEditInventory ? (
              <Menu.Item
                key="paintings"
                icon="file image"
                onClick={handleClick}
                name="Paintings"
                value="/paintings"
              />
            ) : null}
            {employee.canProcessOrders ? (
              <Menu.Item
                key="orders"
                onClick={handleClick}
                icon="box"
                name="Orders"
                value="/orders"
              />
            ) : null}

            <SignoutMenuItem />
          </Menu.Menu>
        );
      case 'customer':
        return (
          <Menu.Menu position="right">
            <Menu.Item
              key="favorites"
              onClick={handleClick}
              icon="paint brush"
              name="Artists"
              value="/artists"
            />
            <Menu.Item
              key="account"
              onClick={handleClick}
              icon="edit"
              name="My Account"
              value="/account"
            />
            <CartMenuItem handleClick={handleClick} showText />

            <SignoutMenuItem />
          </Menu.Menu>
        );
      default:
        // 'artist' case
        return (
          <Menu.Menu position="right">
            <Menu.Item
              key="paintings"
              onClick={handleClick}
              icon="file image"
              name="My Paintings"
              value="/paintings"
            />
            <Menu.Item
              key="account"
              onClick={handleClick}
              icon="edit"
              name="My Account"
              value="/account"
            />
            <SignoutMenuItem />
          </Menu.Menu>
        );
    }
  }

  return <SignInButton />;
}

ComputerMenu.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.oneOf(['employee', 'artist', 'customer']).isRequired,
    employee: PropTypes.shape({
      canEditIventory: PropTypes.bool,
      canProcessOrders: PropTypes.bool,
      canEditCustomers: PropTypes.bool,
    }),
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

ComputerMenu.defaultProps = {
  user: null,
};
