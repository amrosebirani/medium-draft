import PropTypes from 'prop-types';
import React from 'react';

import { addNewCodeBlock } from '../../model';

export default class CodeButton extends React.Component {

  static propTypes = {
    setEditorState: PropTypes.func,
    getEditorState: PropTypes.func,
    close: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }


  /*
  This is an example of how an image button can be added
  on the side control. This Button handles the image addition locally
  by creating an object url. You can override this method to upload
  images to your server first, then get the image url in return and then
  add to the editor.
  */
  onChange() {
    // e.preventDefault();
      // console.log(this.props.getEditorState());
      // eslint-disable-next-line no-undef
    this.props.setEditorState(addNewCodeBlock(
      this.props.getEditorState(),
      {
        language: 'javascript',
      }
    ));
    this.props.close();
  }

  render() {
    return (
      <button
        className="md-sb-button md-sb-img-button"
        type="button"
        onClick={this.onChange}
        title="Add a Code Block"
      >
        <i className="fa fa-code" />
      </button>
    );
  }
}
