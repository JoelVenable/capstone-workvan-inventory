import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'semantic-ui-react';
import { Context } from '../../ContextProvider';

export function FilterArtists({
  setArtist,
  showOnlyActive,
  inline,
  selection,
  clearable,
  placeholder,
}) {
  const { artists } = useContext(Context);
  function handleChange(_e, { value: artistId }) {
    setArtist(artistId);
  }
  return (
    <Dropdown
      placeholder={placeholder}
      inline={inline}
      selection={selection}
      clearable={clearable}
      onChange={handleChange}
      options={showOnlyActive ? showActive(artists) : showAll(artists)}
    />
  );
}

function showAll(artists) {
  return artists.map(artist => ({
    value: artist.id,
    text: `${artist.firstName} ${artist.lastName}`,
    iamge: { avatar: true, src: artist.artistImageUrl },
  }));
}

function showActive(artists) {
  return artists
    .filter(artist => artist.paintings.length > 0)
    .map(artist => ({
      value: artist.id,
      text: `${artist.firstName} ${artist.lastName}`,
      iamge: { avatar: true, src: artist.artistImageUrl },
    }));
}

FilterArtists.propTypes = {
  setArtist: PropTypes.func.isRequired,
  showOnlyActive: PropTypes.bool.isRequired,
  inline: PropTypes.bool,
  selection: PropTypes.bool,
  clearable: PropTypes.bool,
  placeholder: PropTypes.string,
};

FilterArtists.defaultProps = {
  inline: false,
  selection: false,
  clearable: true,
  placeholder: 'All artists',
};
