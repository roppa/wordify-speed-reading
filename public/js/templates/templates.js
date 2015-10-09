var app = app || {};

app.templates = {};

app.templates.wordifyTemplate = '<div class="words"></div>\
  <div class="player"></div>\
  <button class="start">Start</button>\
  <button class="stop">Stop</button>';

app.templates.inputViewTemplate = '\
  <div id="message"></div>\
  <div class="formrow">\
    <label for="url">Url</label>\
    <input type="url" id="url" required />\
  </div>\
  <p>Or</p>\
  <div class="formrow">\
    <label for="copy">Text</label>\
    <textarea name="copy" id="copy" placeholder="Paste text"></textarea>\
  </div>\
  <div class="formrow"><button>Add text</button></div>';

app.templates.listViewTemplate = '<ul></ul>';

app.templates.configTemplate = '<h2>Config</h2> \
  <div class="settings"> \
  <p> \
  <label for="wpm"><%= wpm %> <abbr title="Words per minute">wpm</abbr></label> \
  <input id="wpm" type="range" min="50" value="<%= wpm %>" max="800"> \
  </p><p> \
  <label for="wordSize">Length (<%= wordSize %>)</label> \
  <input id="wordSize" type="range" min="1" value="<%= wordSize %>" max="6"> \
  </p><p> \
  <label for="fontSize">Font size (<%= fontSize %>)</label> \
  <input id="fontSize" type="range" min="1" value="<%= fontSize %>" max="4.5" step="0.5"> \
  </p> \
  </div>';