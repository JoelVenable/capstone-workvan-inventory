import React from 'react';
import { Dropdown, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Consumer } from '../../ContextProvider';

export function ComputerMenu({ user, history }) {
  function handleClick(_e, { link }) {
    history.push(link);
  }
  if (user) {
    const { employee } = user;
    switch (user.userType) {
      case 'employee':
        return (
          <Menu.Menu position="right">

            <Dropdown item floating button text="User Types">
              <Dropdown.Menu>
                {employee.canEditInventory
                  ? (
                    <Dropdown.Item
                      key="key"
                      icon="paint brush"
                      text="Artists"
                      value="value"
                      link="/artists"
                      onClick={handleClick}
                    />
                  ) : null}
                {employee.canEditEmployees
                  ? (
                    <Dropdown.Item
                      key="employees"
                      icon="id card"
                      text="Employees"
                      value="employees"
                      onClick={handleClick}
                      link="/employees"
                    />
                  ) : null}
                {employee.canEditCustomers
                  ? (
                    <Dropdown.Item
                      key="customers"
                      icon="users"
                      text="Customers"
                      onClick={handleClick}
                      value="customers"
                      link="/customers"
                    />
                  ) : null}
                {employee.canEditEmployees
                  ? (
                    <Dropdown.Item
                      key="users"
                      onClick={handleClick}
                      icon="wrench"
                      text="Users"
                      value="users"
                      link="/users"
                    />
                  ) : null}
              </Dropdown.Menu>
            </Dropdown>
            {employee.canEditInventory
              ? (
                <Menu.Item
                  key="paintings"
                  icon="file image"
                  onClick={handleClick}
                  name="Paintings"
                  value="paintings"
                  link="/paintings"
                />
              ) : null}
            {employee.canProcessOrders
              ? (
                <Menu.Item
                  key="orders"
                  onClick={handleClick}
                  icon="box"
                  name="Orders"
                  value="orders"
                  link="/orders"
                />
              ) : null}


            {employee.canDefinePriceAdjustments
              ? (
                <Menu.Item
                  key="priceAdjustments"
                  onClick={handleClick}
                  icon="dollar sign"
                  name="Price Adjustments"
                  value="priceAdjustments"
                  link="/priceAdjustments"
                />
              ) : null}
            <SignOutButton />


          </Menu.Menu>
        );
      case 'customer':
        return (

          <Menu.Menu position="right">
            <Menu.Item
              key="favorites"
              onClick={handleClick}
              icon="paint brush"
              name="Favorite Artists"
              value="artists"
              link="/artists"
            />
            <Menu.Item
              key="account"
              onClick={handleClick}
              icon="edit"
              name="My Account"
              value="account"
              link="/account"
            />
            <Menu.Item
              key="cart"
              onClick={handleClick}
              icon="shopping cart"
              name="My Cart"
              value="cart"
              link="/cart"
            />

            <SignOutButton />
          </Menu.Menu>
        );
      case 'artist':
        return (
          <Menu.Menu position="right">
            <Menu.Item
              key="paintings"
              onClick={handleClick}
              icon="file image"
              name="My Paintings"
              value="paintings"
              link="/paintings"
            />
            <Menu.Item
              key="account"
              onClick={handleClick}
              icon="edit"
              name="My Account"
              value="account"
              link="/account"
            />
            <SignOutButton />

          </Menu.Menu>
        );
    }
  }

  return (
    <>
      <Menu.Menu position="right">
        <Dropdown item icon="shopping cart" />
      </Menu.Menu>
    </>
  );
}

function SignOutButton() {
  return (
    <Consumer>
      {({ logout }) => (
        <Dropdown.Item
          key="signout"
          icon="sign-out"
          text="Sign Out"
          value="signout"
          onClick={logout}
        />
      )
    }
    </Consumer>
  );
}


ComputerMenu.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.oneOf(['employee', 'artist', 'customer']).isRequired,
    employee: PropTypes.shape({
      canEditIventory: PropTypes.bool,
      canDefinePriceAdjustments: PropTypes.bool,
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
/*


Icons:

"file image"  -- Paintings
"paint brush"   -- Artists
"id card" --     Employees
"box"  --  Orders
"users" -- Customers
"wrench"  -- Users
"dollar sign" -- Price Adjustments
 "sign-out"  -- Sign Out

"edit" -- My account


"shopping cart" -- Shopping Cart


Employee options:

Artists
Paintings
Employees
Orders
Customers
Users
Price Adjustments

Sign Out


Artist Options:

My Paintings
My Profile
My Account

Sign Out

Customer Options:
My Cart
---
My Orders
My Account
Favorite Artists

Sign out


*/