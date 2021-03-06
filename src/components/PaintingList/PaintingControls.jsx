import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../ContextProvider';
import { EditButton } from '../utility/EditButton';
import { SendForReviewButton } from '../utility/SendForReviewButton';
import { OrderButton } from '../utility/OrderButton';
import { DeactivateButton } from '../utility/DeactivateButton';
import { KickbackButton } from '../utility/KickbackButton';
import { GoLiveButton } from '../utility/GoLiveButton';
import { DeleteButton } from '../utility/DeleteButton';

const style = {
  display: 'flex',
  flexDirection: 'row',
};

export function PaintingControls({ id }) {
  const {
    user, paintings, history, orders, orderItems,
  } = useContext(Context);

  const {
    isSold, isLive, isSubmitted, isPendingSale,
  } = paintings.find(
    item => item.id === id,
  );

  if (user) {
    if (user.userType === 'artist') {
      if (isSold || isLive || isSubmitted || isPendingSale) return null;
      return (
        <div className="table-actionIconContainer">
          <DeleteButton id={id} type="painting" />
          <EditButton id={id} history={history} />
          <SendForReviewButton id={id} />
        </div>
      );
    }

    if (user.userType === 'employee') {
      if (isSold || isPendingSale) {
        //  find all order items containing the painting
        const order = orderItems
          .filter(item => item.paintingId === id)

          //  then make an orders array from values referenced in the orderItems table
          .map(item => orders.find(myOrder => myOrder.id === item.orderId))

          //  then find the order that triggered the current 'isPendingSale' flag.
          .find(item => item.isSubmitted && !item.isCancelled);
        const orderId = order ? order.id : NaN;

        return (
          <div style={style}>
            <OrderButton id={orderId} history={history} />
          </div>
        );
      }
      if (isLive) {
        return (
          <div style={style}>
            <DeactivateButton id={id} />
            <EditButton id={id} history={history} />
          </div>
        );
      }
      if (isSubmitted) {
        return (
          <div style={style}>
            <KickbackButton id={id} />
            <DeleteButton id={id} showText={false} type="painting" />
            <EditButton id={id} history={history} />
            <GoLiveButton id={id} />
          </div>
        );
      }
    }
  }
  return null;
}

PaintingControls.propTypes = {
  id: PropTypes.number.isRequired,
};
