/**
 * Version Switcher — Injects a banner indicating the current version
 * (accessible or inaccessible) and provides a link to switch.
 */
(function () {
  const path = window.location.pathname;
  const isAccessible = path.includes('/accessible');
  const isInaccessible = path.includes('/inaccessible');

  if (!isAccessible && !isInaccessible) return;

  const otherPath = isAccessible
    ? path.replace('/accessible', '/inaccessible')
    : path.replace('/inaccessible', '/accessible');

  const banner = document.createElement('div');
  banner.className = isAccessible
    ? 'version-banner version-banner--accessible'
    : 'version-banner version-banner--inaccessible';
  banner.setAttribute('role', 'status');

  const versionLabel = isAccessible ? 'Accessible Version' : 'Inaccessible Version';

  banner.innerHTML = `
    <span class="version-banner-indicator">
      <span class="version-banner-dot" aria-hidden="true"></span>
      ${versionLabel}
    </span>
    <a href="${otherPath}">Switch to ${isAccessible ? 'Inaccessible' : 'Accessible'} Version</a>
  `;

  document.body.insertBefore(banner, document.body.firstChild);
})();
