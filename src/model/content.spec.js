import { convertToRaw } from 'draft-js';
import MultiDecorator from 'draft-js-plugins-editor/lib/Editor/MultiDecorator';
import createEditorState from './content';
import { Block } from '../util/constants';

import preData from '../../docs/data.json';

describe('createEditorState', () => {
  const es = createEditorState();

  it('creates empty editorState when no argument or null is passed', () => {
    const raw = convertToRaw(es.getCurrentContent());
    expect(raw.blocks).to.be.instanceof(Array);
    expect(raw.blocks[0].type).to.equal(Block.UNSTYLED);
    expect(raw.blocks[0].text).to.equal('');
    expect(raw.blocks[0]).to.include.keys('data', 'key');
  });

  it('adds link decorator by default in MultiDecorator', () => {
    expect(es.getDecorator()).to.be.instanceof(MultiDecorator);
    expect(es.getDecorator().decorators.size).to.equal(1);
  });

  const esContent = createEditorState(preData);

  it('fills data from provided json', () => {
    const blocks = esContent.getCurrentContent().getBlockMap();
    expect(blocks.size).to.be.above(1);

    expect(esContent.getDecorator()).to.be.instanceof(MultiDecorator);
    expect(esContent.getDecorator().decorators.size).to.equal(1);
  });
});
