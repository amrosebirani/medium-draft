import React from 'react';
import { convertToHTML } from 'draft-convert';
import { Inline, Block, Entity } from './util/constants';

export const styleToHTML = (style) => {
  switch (style) {
    case Inline.ITALIC:
      return <em className={`md-inline-${style.toLowerCase()}`} />;
    case Inline.BOLD:
      return <strong className={`md-inline-${style.toLowerCase()}`} />;
    case Inline.STRIKETHROUGH:
      return <strike className={`md-inline-${style.toLowerCase()}`} />;
    case Inline.UNDERLINE:
      return <u className={`md-inline-${style.toLowerCase()}`} />;
    case Inline.HIGHLIGHT:
      return <span className={`md-inline-${style.toLowerCase()}`} />;
    case Inline.CODE:
      return <code className={`md-inline-${style.toLowerCase()}`} />;
    default:
      return null;
  }
};

export const blockToHTML = (block) => {
  const blockType = block.type;
  const data = block.data;
  let textAlignment = 'left';
  if (data.textAlignment) {
    textAlignment = data.textAlignment;
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
  switch (blockType) {
    case Block.H1:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h1 className={`md-block-${blockType.toLowerCase()} `} />;
    case Block.H2:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h2 className={`md-block-${blockType.toLowerCase()}`} />;
    case Block.H3:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h3 className={`md-block-${blockType.toLowerCase()} ${alignmentClass}`} />;
    case Block.H4:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h4 className={`md-block-${blockType.toLowerCase()}`} />;
    case Block.H5:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h5 className={`md-block-${blockType.toLowerCase()}`} />;
    case Block.H6:
      // eslint-disable-next-line jsx-a11y/heading-has-content
      return <h6 className={`md-block-${blockType.toLowerCase()}`} />;
    case Block.BLOCKQUOTE_CAPTION:
    case Block.CAPTION:
      return {
        start: `<p class="md-block-${blockType.toLowerCase()} ${alignmentClass}"><caption>`,
        end: '</caption></p>',
      };
    case Block.IMAGE: {
      const imgData = block.data;
      const text = block.text;
      const extraClass = (text.length > 0 ? ' md-block-image-has-caption' : '');
      return {
        start: `<figure class="md-block-image${extraClass}"><img src="${imgData.src}" alt="${block.text}" /><figcaption className="md-block-image-caption">`,
        end: '</figcaption></figure>',
      };
    }
    case Block.ATOMIC:
      return {
        start: `<figure class="md-block-${blockType.toLowerCase()}">`,
        end: '</figure>',
      };
    case Block.CODE:
      return {
        start: '<pre>',
        end: '</pre>',
      };
    case Block.TODO: {
      const checked = block.data.checked || false;
      let inp = '';
      let containerClass = '';
      if (checked) {
        inp = '<input type=checkbox disabled checked="checked" />';
        containerClass = 'md-block-todo-checked';
      } else {
        inp = '<input type=checkbox disabled />';
        containerClass = 'md-block-todo-unchecked';
      }
      return {
        start: `<div class="md-block-${blockType.toLowerCase()} ${containerClass}">${inp}<p>`,
        end: '</p></div>',
      };
    }
    case Block.BREAK:
      return <hr className={`md-block-${blockType.toLowerCase()}`} />;
    case Block.BLOCKQUOTE:
      return <blockquote className={`md-block-${blockType.toLowerCase()} ${alignmentClass}`} />;
    case Block.OL:
      return {
        element: <li />,
        nest: <ol className={`md-block-${blockType.toLowerCase()}`} />,
      };
    case Block.UL:
      return {
        element: <li />,
        nest: <ul className={`md-block-${blockType.toLowerCase()}`} />,
      };
    case Block.UNSTYLED:
      if (block.text.length < 1) {
        return <p className={`md-block-${blockType.toLowerCase()} ${alignmentClass}`}><br /></p>;
      }
      return <p className={`md-block-${blockType.toLowerCase()} ${alignmentClass}`} />;
    default: return null;
  }
};


export const entityToHTML = (entity, originalText) => {
  if (entity.type === Entity.LINK) {
    return (
      <a
        className="md-inline-link"
        href={entity.data.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {originalText}
      </a>
    );
  }
  if (entity.type === 'image' || entity.type === 'draft-js-video-plugin-video') {
    if (entity.data.width && entity.data.alignment) {
      if (entity.data.alignment === 'default') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative; width:${entity.data.width}%; " ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
      if (entity.data.alignment === 'center') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative; width:${entity.data.width}%;  margin-left: auto; margin-right: auto; display: block;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
      if (entity.data.alignment === 'left') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative; width:${entity.data.width}%; float: left;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
      if (entity.data.alignment === 'right') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative; width:${entity.data.width}%; float: right;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
    }
    if (entity.data.alignment) {
      if (entity.data.alignment === 'default') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
      if (entity.data.alignment === 'center') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative;margin-left: auto; margin-right: auto; display: block;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
      if (entity.data.alignment === 'left') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative;float: left;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
      if (entity.data.alignment === 'right') {
        return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative;float: right;" ${entity.type === 'image' ? '' : 'controls'}/>`;
      }
    }
    if (entity.data.width) {
      return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" style="position: relative; width:${entity.data.width}%; " ${entity.type === 'image' ? '' : 'controls'}/>`;
    }
    return `<${entity.type === 'image' ? 'img' : 'video'} src="${entity.data.src}" ${entity.type === 'image' ? '' : 'controls'} />`;
  }
  return originalText;
};

export const options = {
  styleToHTML,
  blockToHTML,
  entityToHTML,
};

export const setRenderOptions = (htmlOptions = options) => convertToHTML(htmlOptions);


export default (contentState, htmlOptions = options) => convertToHTML(htmlOptions)(contentState);
