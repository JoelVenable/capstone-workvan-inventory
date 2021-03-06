import React, { useContext } from 'react';
import { Popup, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';

export function KickbackButton({ id }) {
  const { edit, showConfirm } = useContext(Context);

  function handleClick() {
    showConfirm({
      title: 'Return this painting to artist to edit?', // REQUIRED.  The title of the message requesting delete confirmation
      text: "You won't be able to see this painting again until they resubmit.", // The inner content of text to be displayed
      confirmAction: () => {
        edit.painting({ isSubmitted: false }, id);
      }, // Function called when action is confirmed
      confirmBtnColor: 'blue', // String value.  Accepts color of confirmation button.
      btnIcon: 'undo', // String value or null.  Icon inside the confirmation button
      btnText: 'Yes', // string value.  Defaults to "yes"
    });
  }
  return (
    <Popup
      content="Return painting to artist for corrections"
      trigger={(
        <Button icon color="violet">
          <Icon name="undo" onClick={handleClick} />
        </Button>
)}
    />
  );
}

KickbackButton.propTypes = {
  id: PropTypes.number.isRequired,
};
