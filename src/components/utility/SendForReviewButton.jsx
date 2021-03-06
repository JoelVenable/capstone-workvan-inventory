import React, { useContext } from 'react';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';

export function SendForReviewButton({ id }) {
  const { edit, showConfirm } = useContext(Context);

  function handleClick() {
    showConfirm({
      title: 'Send Painting for Employee Review', // REQUIRED.  The title of the message requesting delete confirmation
      text: 'Please confirm; you cannot reverse this action.', // The inner content of text to be displayed
      confirmAction: () => edit.painting({ isSubmitted: true }, id), // Function called when action is confirmed
      confirmBtnColor: 'green', // String value.  Accepts color of confirmation button.
      icon: 'arrow circle right', // String value or null.  Icon next to the title
      btnIcon: 'send', // String value or null.  Icon inside the confirmation button
      btnText: 'Send it!',
    });
  }

  return (
    <Button icon color="green" onClick={handleClick}>
      <Icon name="send" />
    </Button>
  );
}

SendForReviewButton.propTypes = {
  id: PropTypes.number.isRequired,
};
