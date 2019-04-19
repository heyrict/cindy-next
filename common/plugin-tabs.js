function hash(string) {
  var chr;
  var hash = 0;
  if (string.length === 0) return hash;
  for (var i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}

const norm_tabs = string => {
  var _createID = (text, nmspc) =>
    'tab-' + (nmspc ? nmspc + '-' : '') + hash(text);

  function _build_tabs_navtabs(tab_titles, tab_contents, namespace) {
    var returns = `
<ul class="nav nav-tabs"${namespace ? " id='tabs-" + namespace + "'" : ''}>`;

    for (var i in tab_titles) {
      const newId = _createID(tab_contents[i], namespace);
      returns += `
<li${i == 0 ? " class='active'" : ''} id="nav${newId}">
  <a data-toggle="tab" data-target="#${newId}">
    ${tab_titles[i]}
  </a>
</li>`;
    }

    returns += '</ul>';
    return returns;
  }

  function _build_tabs_contents(tab_titles, tab_contents, namespace) {
    var returns = "<div class='tab-content'>";

    for (var i in tab_titles) {
      returns += `
<div id="${_createID(tab_contents[i], namespace)}"
  ${i == 0 ? "class='tab-pane active'" : "class='tab-pane'"}>
  ${tab_contents[i]}
</div>`;
    }

    returns += '</div>';
    return returns;
  }

  function _build_tabs() {
    var res,
      tab_titles = Array(),
      tab_contents = Array();

    var namespace = arguments[1],
      text = arguments[2],
      returns = text,
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

  return string.replace(
    /<!--tabs ?([^>]*?)-->([\s\S]*?)<!--endtabs-->/g,
    _build_tabs,
  );
};

export const changeTabularTab = id => {
  const tabContents = document.getElementById(id).parentElement;
  const navtabContents = document.getElementById(`nav${id}`).parentElement;
  Array.forEach(tabContents.children, child => {
    if (child.id === id) {
      child.setAttribute('class', 'tab-pane active');
    } else {
      child.setAttribute('class', 'tab-pane');
    }
  });
  Array.forEach(navtabContents.children, child => {
    if (child.id === `nav${id}`) {
      child.setAttribute('class', 'active');
    } else {
      child.removeAttribute('class');
    }
  });
};

export default norm_tabs;
