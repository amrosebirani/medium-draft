import {
  EditorState,
  convertFromRaw,
  CompositeDecorator,
  ContentState,
} from 'draft-js';

import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';

import Link, { findLinkEntities } from '../components/entities/link';


const compositeDecorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: Link,
  },
]);

const defaultDecorators = new MultiDecorator([compositeDecorator]);


const createEditorState = (content = null, decorators = defaultDecorators) => {
  if (content === null) {
    return EditorState.createEmpty(decorators);
  }
  let contentState = null;
  if (typeof content === 'string') {
    contentState = ContentState.createFromText(content);
  } else {
    contentState = convertFromRaw(content);
  }
  return EditorState.createWithContent(contentState, decorators);
};

export default createEditorState;
