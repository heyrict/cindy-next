function hash(s: string) {
  let chr: number;
  let hash: number = 0;
  if (s.length === 0) return hash;
  for (var i = 0; i < s.length; i++) {
    chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const norm_tabs = (s: string) => {
  const _createID = (text: string, nmspc: string) =>
    'tab-' + (nmspc ? nmspc + '-' : '') + hash(text);

  function _build_tabs_navtabs(
    tab_titles: string[],
    tab_contents: string[],
    namespace: string,
  ) {
    let returns = `
<ul class="nav nav-tabs"${namespace ? " id='tabs-" + namespace + "'" : ''}>`;

    tab_titles.forEach((_, i) => {
      const newId = _createID(tab_contents[i], namespace);
      returns += `
<li${i == 0 ? " class='active'" : ''} id="nav${newId}">
  <a data-toggle="tab" data-target="#${newId}">
    ${tab_titles[i]}
  </a>
</li>`;
    });

    returns += '</ul>';
    return returns;
  }

  function _build_tabs_contents(
    tab_titles: string[],
    tab_contents: string[],
    namespace: string,
  ) {
    let returns = "<div class='tab-content'>";

    tab_titles.forEach((_, i) => {
      returns += `
<div id="${_createID(tab_contents[i], namespace)}"
  ${i == 0 ? "class='tab-pane active'" : "class='tab-pane'"}>
  ${tab_contents[i]}
</div>`;
    });

    returns += '</div>';
    return returns;
  }

  function _build_tabs() {
    let res,
      tab_titles: Array<string> = [],
      tab_contents: Array<string> = [];

    let namespace = arguments[1],
      text = arguments[2],
      regex = /<!--tab *([^>]*?)-->([\s\S]*?)<!--endtab-->/g;

    while ((res = regex.exec(text))) {
      tab_titles.push(res[1] ? res[1] : 'tab');
      tab_contents.push(res[2]);
    }

    return (
      _build_tabs_navtabs(tab_titles, tab_contents, namespace) +
      _build_tabs_contents(tab_titles, tab_contents, namespace)
    );
  }

  return s.replace(
    /<!--tabs ?([^>]*?)-->([\s\S]*?)<!--endtabs-->/g,
    _build_tabs,
  );
};

export const changeTabularTab = (id: string) => {
  const tabEl = document.getElementById(id);
  const navtabEl = document.getElementById(`nav${id}`);
  if (!tabEl || !navtabEl) return;

  const tabContents = tabEl.parentElement;
  const navtabContents = navtabEl.parentElement;
  if (!tabContents || !navtabContents) return;

  Array.from(tabContents.children).forEach(child => {
    if (child.id === id) {
      child.setAttribute('class', 'tab-pane active');
    } else {
      child.setAttribute('class', 'tab-pane');
    }
  });
  Array.from(navtabContents.children).forEach(child => {
    if (child.id === `nav${id}`) {
      child.setAttribute('class', 'active');
    } else {
      child.removeAttribute('class');
    }
  });
};

export default norm_tabs;
