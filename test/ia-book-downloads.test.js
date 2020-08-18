import {
  html,
  fixture,
  expect,
  oneEvent,
} from '@open-wc/testing';
import sinon from 'sinon';
import { IABookDownloads } from '../src/ia-book-downloads.js';

customElements.define('ia-book-downloads', IABookDownloads);

const container = (downloads = []) => (
  html`<ia-book-downloads .downloads=${downloads}></ia-book-downloads>`
);

const downloads = [{
  type: 'Encrypted Adobe PDF',
  url: '#',
}, {
  type: 'Encrypted Adobe ePub',
  url: '#',
  note: 'ePub files are smaller in size, but may contain errors.',
}];

describe('<ia-book-downloads>', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('sets default properties', async () => {
    const el = await fixture(container(downloads));

    expect(el.downloads).to.equal(downloads);
    expect(el.expiration).to.equal(0);
  });

  it('renders a download button', async () => {
    const el = await fixture(container(downloads));
    const button = el.shadowRoot.querySelector('li .button');

    expect(button).to.exist;
    expect(button.innerText).to.include(downloads[0].type);
  });

  it('renders an optional download note', async () => {
    const el = await fixture(container(downloads));
    const note = el.shadowRoot.querySelectorAll('li')[1].querySelector('p');

    expect(note).to.exist;
    expect(note.innerText).to.include(downloads[1].note);
  });

  it('emits a custom event to close the menu', async () => {
    const el = await fixture(container(downloads));

    setTimeout(() => (
      el.unsetSelectedMenuOption(new Event('click'))
    ));
    const response = await oneEvent(el, 'menuTypeSelected');

    expect(response).to.exist;
  });

  it('closes the menu when close element clicked', async () => {
    IABookDownloads.prototype.unsetSelectedMenuOption = sinon.fake();

    const el = await fixture(container(downloads));

    el.shadowRoot.querySelector('.close').click();
    expect(el.unsetSelectedMenuOption.callCount).to.equal(1);
  });

  it('uses a singular noun when one download given', async () => {
    const el = await fixture(container([downloads[0]]));
    const formatsCount = await fixture(el.formatsCount);

    expect(formatsCount.innerHTML).to.include('1 format');
  });

  it('renders an expiration message when expiration is nonzero', async () => {
    const el = await fixture(container(downloads));

    el.expiration = 10;
    await el.updateComplete;
    const h2 = el.shadowRoot.querySelector('h2');

    expect(h2).to.exist;
    expect(h2.innerText).to.include('10');
  });

  it('does not render a formats count when no downloads present', async () => {
    const el = await fixture(container());

    expect(el.shadowRoot.querySelector('header p')).not.to.exist;
  });
});
