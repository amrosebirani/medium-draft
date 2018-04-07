import React from 'react';
import { Entity } from 'draft-js';
import { createPlugin } from 'draft-extend';

const ENTITY_TYPE = 'image';
const BLOCK_TYPE = 'atomic';

export default createPlugin({
  htmlToBlock: (nodeName, node) => {
    if (nodeName === 'figure') {
      return BLOCK_TYPE;
    }
  },
  // htmlToEntity: (nodeName, node) => {
  //   if (nodeName === 'img') {
  //     return Entity.create(ENTITY_TYPE, ...)
  //   }
  // },
  blockRendererFn: (block) => {
    if (block.getType() === 'atomic' && block.length > 0 && Entity.get(block.getEntityAt(0)).getType() === ENTITY_TYPE) {
      return {
        component: ({ block }) => {
          const { src } = Entity.get(block.getEntityAt(0)).getData();
          return <img src={src} role="presentation" />;
        },
        editable: false,
      };
    }
  },
  blockToHTML: {
    'atomic': {
      start: '<figure>',
      end: '</figure>',
    },
  },
  entityToHTML: (entity, originalText) => {
    if (entity.type === ENTITY_TYPE) {
      return `<img src="${entity.data.src}" />`;
    }
  },
});
