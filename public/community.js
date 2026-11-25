(()=> {
  const $ = id => document.getElementById(id);
  const cfg = window.MADRAS_CONFIG || {};
  const el = (tag, text, cls) => {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (cls) node.className = cls;
    return node;
  };
  async function request(path, method = 'GET') {
    const response = await fetch(path, {
      method,
      credentials: 'same-origin',
      cache: 'no-store'
    });
    const data = await response.json();
    if (!response.ok) throw Error(data.error || 'Request failed');
    return data;
  }
  function avatar(src) {
    const image = el('img');
    image.src = src;
    image.alt = '';
    image.loading = 'lazy';
    image.referrerPolicy = 'no-referrer';
    image.onerror = () => {
      image.onerror = null;
      image.src = 'assets/logo.png';
    };
    return image;
  }
  function configuredProfile(username) {
    const profiles = Array.isArray(cfg.communityProfiles) ? cfg.communityProfiles : [];
    return profiles.find(profile =>
      typeof profile.username === 'string' &&
      profile.username.toLowerCase() === username.toLowerCase()
    );
  }
  function show(user, canVerify) {
    if (!$('identity')) return;
    $('identity').replaceChildren();
    $('login').hidden = !!user;
    $('logout').hidden = !user;
    $('verify').hidden = !user || user.verified || !canVerify;
    if (!user) {
      $('identity').textContent = 'Sign in with Discord to access your member profile.';
      return;
    }
    const custom = configuredProfile(user.username || user.name);
    const roleLabels = { founder: 'Founder', member: 'Member', admin: 'Admin' };
    const role = custom
      ? roleLabels[custom.role.trim().toLowerCase()] || 'Member'
      : user.isStaff ? 'Admin' : user.isMember || user.verified ? 'Member' : 'Discord member';
    const row = el('div', undefined, 'identity-row');
    const info = el('div');
    row.append(avatar(custom && custom.avatar || user.avatar), info);
    info.append(el('strong', user.username || user.name));
    info.append(el('span', role, 'role-tag'));
    if (user.pending) info.append(el('div', 'Complete Discord screening'));
    else if (!user.verified) info.append(el('div', 'Discord member — verification required'));
    $('identity').append(row);
  }
  async function me() {
    try {
      const data = await request('/api/me');
      show(data.user, data.canVerify);
      if (!data.configured && $('community-message')) {
        $('community-message').textContent = 'Discord integration is awaiting server configuration.';
      }
    } catch (error) {
      if ($('identity')) $('identity').textContent = 'Member service unavailable.';
    }
  }
  function renderConfiguredProfiles(root, profiles) {
    const valid = profiles.every(profile =>
      profile &&
      typeof profile.username === 'string' &&
      profile.username.trim() &&
      typeof profile.avatar === 'string' &&
      profile.avatar.trim() &&
      typeof profile.role === 'string' &&
      ['founder', 'member', 'admin'].includes(profile.role.trim().toLowerCase())
    );
    if (!valid) {
      root.textContent = 'Community profile configuration is invalid. Check config.js.';
      return true;
    }
    root.replaceChildren();
    const categories = cfg.communityCategories || {};
    for (const key of ['founder', 'admin', 'member']) {
      const label = typeof categories[key] === 'string' ? categories[key] : key;
      const members = profiles.filter(profile => profile.role.trim().toLowerCase() === key);
      if (!members.length) continue;
      const group = el('div', undefined, 'staff-group');
      const grid = el('div', undefined, 'staff-grid');
      group.append(el('h3', `${label} · ${members.length}`), grid);
      for (const profile of members) {
        const role = key[0].toUpperCase() + key.slice(1);
        const card = el('div', undefined, 'staff-card');
        card.append(
          avatar(profile.avatar),
          el('strong', profile.username),
          el('span', role, 'role-tag')
        );
        grid.append(card);
      }
      root.append(group);
    }
    return true;
  }
  async function staff() {
    const root = $('staff-list');
    if (!root) return;
    const profiles = cfg.communityProfiles;
    if (Array.isArray(profiles) && profiles.length) {
      renderConfiguredProfiles(root, profiles);
      return;
    }
    try {
      const data = await request('/api/staff');
      root.replaceChildren();
      if (!data.configured || !data.groups.length) {
        root.textContent = 'Add profiles to communityProfiles in config.js to show the member directory.';
        return;
      }
      for (const groupData of data.groups) {
        const group = el('div', undefined, 'staff-group');
        const grid = el('div', undefined, 'staff-grid');
        group.append(el('h3', `${groupData.label} · ${groupData.members.length}`), grid);
        if (!groupData.members.length) grid.append(el('p', 'No staff assigned to this role.'));
        for (const member of groupData.members) {
          const card = el('div', undefined, 'staff-card');
          card.append(
            avatar(member.avatar),
            el('strong', member.name),
            el('span', groupData.label, 'role-tag')
          );
          grid.append(card);
        }
        root.append(group);
      }
    } catch (error) {
      root.textContent = 'Staff directory temporarily unavailable.';
    }
  }
  const messages = {
    setup: 'Discord integration is awaiting configuration.',
    join: 'Join the MADRAS Discord server before verifying.',
    pending: 'Complete the Discord membership screening first.',
    invalid: 'Login expired. Please try again.',
    denied: 'Discord authorization cancelled.',
    error: 'Discord login failed. Please try again.'
  };
  const auth = new URLSearchParams(location.search).get('auth');
  if (messages[auth] && $('community-message')) {
    $('community-message').textContent = messages[auth];
    history.replaceState(null, '', location.pathname + location.hash);
  }
  if ($('verify')) $('verify').onclick = async () => {
    const button = $('verify');
    button.disabled = true;
    try {
      await request('/api/verify', 'POST');
      await me();
      $('community-message').textContent = 'Membership verified successfully.';
    } catch (error) {
      $('community-message').textContent = error.message;
    } finally {
      button.disabled = false;
    }
  };
  if ($('logout')) $('logout').onclick = async () => {
    try {
      await request('/api/logout', 'POST');
      show(null, false);
      $('community-message').textContent = 'Signed out.';
    } catch (error) {
      $('community-message').textContent = error.message;
    }
  };
  me();
  staff();
  setInterval(staff, 60000);
})();
