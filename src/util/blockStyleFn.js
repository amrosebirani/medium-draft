import { Block } from './constants';

/*
Get custom classnames for each of the different block types supported.
*/

const BASE_BLOCK_CLASS = 'md-block';

export default (block) => {
  const data = block.getData();
  let textAlignment = 'left';
  if (data.get('textAlignment')) {
    textAlignment = data.get('textAlignment');
  }
  let alignmentClass = 'textleft';
  switch (textAlignment) {
    case 'left':
      alignmentClass = 'textleft';
      break;
    case 'right':
      alignmentClass = 'textright';
      break;
    case 'center':
      alignmentClass = 'textcenter';
      break;
    default:
      break;
  }
  switch (block.getType()) {
    case Block.BLOCKQUOTE:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-quote md-RichEditor-blockquote ${alignmentClass}`;
    case Block.UNSTYLED:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-paragraph ${alignmentClass}`;
    case Block.ATOMIC:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-atomic`;
    case Block.CAPTION:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-caption ${alignmentClass}`;
    case Block.TODO: {
      const checkedClass = data.get('checked') === true ?
        `${BASE_BLOCK_CLASS}-todo-checked` : `${BASE_BLOCK_CLASS}-todo-unchecked`;
      let finalClass = `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-paragraph `;
      finalClass += `${BASE_BLOCK_CLASS}-todo ${checkedClass}`;
      return finalClass;
    }
    case Block.IMAGE:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-image`;
    case Block.BLOCKQUOTE_CAPTION: {
      const cls = `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-quote`;
      return `${cls} md-RichEditor-blockquote ${BASE_BLOCK_CLASS}-quote-caption ${alignmentClass}`;
    }
    case Block.H3:
      return `${BASE_BLOCK_CLASS} ${BASE_BLOCK_CLASS}-header-three ${alignmentClass}`;
    default: return BASE_BLOCK_CLASS;
  }
};
