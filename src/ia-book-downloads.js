import { html, LitElement } from 'lit-element';
import bookDownloadsCSS from './styles/ia-book-downloads.js';

export class IABookDownloads extends LitElement {
  static get styles() {
    return bookDownloadsCSS;
  }

  static get properties() {
    return {
      downloads: { type: Array },
      expiration: { type: Number },
    };
  }

  constructor() {
    super();
    this.downloads = [];
    this.expiration = 0;
  }

  unsetSelectedMenuOption(e) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('menuTypeSelected', {
      bubbles: true,
      composed: true,
      detail: {
        id: 'downloads',
      },
    }));
  }

  get formatsCount() {
    const count = this.downloads.length;
    return count ? html`<p>${count} format${count > 1 ? 's' : ''}</p>` : html``;
  }

  get loanExpiryMessage() {
    return this.expiration
      ? html`<h2>These files will expire in ${this.expiration} days.</h2>`
      : html``;
  }

  renderDownloadOptions() {
    return this.downloads.map(option => (
      html`
        <li>
          <a class="button" href="${option.url}">Get ${option.type}</a>
          ${option.note ? html`<p>${option.note}</p>` : html``}
        </li>
      `
    ));
  }

  render() {
    return html`
      <header>
        <div>
          <h3>Downloadable files</h3>
          ${this.formatsCount}
        </div>
        <a href="#" class="close" @click=${this.unsetSelectedMenuOption}><ia-icon icon="collapseSidebar"></ia-icon></a>
      </header>
      ${this.loanExpiryMessage}
      <ul>${this.renderDownloadOptions()}</ul>
      <p>To access downloaded books, you need Adobe-compliant software on your device. The Internet Archive will administer this loan, but Adobe may also collect some information.</p>
      <a class="button external" href="https://www.adobe.com/solutions/ebook/digital-editions/download.html" rel="noopener noreferrer" target="_blank">Install Adobe Digital Editions</a>
    `;
  }
}
