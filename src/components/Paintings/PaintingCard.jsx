import React from 'react';
import { Link } from 'react-router-dom';
import {
  Card, Image, Button, Icon,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './painting.css';

export function PaintingCard({
  artist,
  currentPrice,
  id,
  isLive,
  isPendingSale,
  isSold,
  name,
  thumbUrl,
}) {
  return (
    <Card>
      <Image className="painting--card-image" src={thumbUrl} alt={name} />
      <Card.Header className="painting--card-header">{name}</Card.Header>
      <Card.Meta className="painting--card-meta">
        {'By: '}
        {`${artist.firstName} ${artist.lastName}`}
      </Card.Meta>
      <Card.Description className="painting--card-description">
        {showPaintingStatus(isLive, isSold, currentPrice, isPendingSale)}
        <Link to={`/gallery/${id}`}>
          <Button icon labelPosition="right" className="ui button">
          Details
            <Icon name="search" />
          </Button>
        </Link>
      </Card.Description>
    </Card>
  );
}


function showPaintingStatus(isLive, isSold, currentPrice, isPendingSale) {
  if (isPendingSale) return 'Pending Sale';
  if (!isLive && !isSold) return 'Coming soon!';
  if (isLive && !isSold) return `Price: $${currentPrice}`;
  return 'Sold!';
}

PaintingCard.propTypes = {
  artist: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
  }).isRequired,
  currentPrice: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  isLive: PropTypes.bool.isRequired,
  isSold: PropTypes.bool.isRequired,
  isPendingSale: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  thumbUrl: PropTypes.string.isRequired,
};
