import PropTypes from 'prop-types';
import React from 'react';
import { RichUtils } from 'draft-js';

import StyleButton from './stylebutton';


const AlignmentToolbar = (props) => {
  if (props.buttons.length < 1) {
    return null;
  }
  const { editorState } = props;
  const blockType = RichUtils.getCurrentBlockType(editorState);
  return (
    <div className="md-RichEditor-controls md-RichEditor-controls-block">
      {props.buttons.map((type) => {
        const iconLabel = {};
        iconLabel.label = type.label;
        return (
          <StyleButton
            {...iconLabel}
            key={type.style}
            active={type.style === blockType}
            onToggle={props.onToggle}
            style={type.style}
            description={type.description}
            icon={type.icon}
          />
        );
      })}
    </div>
  );
};

AlignmentToolbar.propTypes = {
  buttons: PropTypes.array,
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func,
};

export default AlignmentToolbar;
