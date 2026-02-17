// Minimal JSON loader: fetches ./content.json and injects into sections by id
(function(){
  function inject(id, html){
    var el = document.getElementById(id);
    if(!el) return;
    // Allow simple HTML in JSON content
    el.innerHTML = html;
  }
  function setText(id, text){
    var el = document.getElementById(id);
    if(!el) return;
    el.textContent = text;
  }
  function onReady(fn){
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  onReady(function(){
    fetch('./content.json', { cache: 'no-cache' })
      .then(function(r){ return r.json(); })
      .then(function(data){
        // Header
        if(data.header_title) setText('header_title', data.header_title);
        if(data.header_subtitle) setText('header_subtitle', data.header_subtitle);
        // Sections (HTML allowed)
        if(data.intro) inject('intro_content', data.intro);
        if(data.what_is_murder_mystery) inject('what_is_murder_mystery', data.what_is_murder_mystery);
        if(data.how_to_play) inject('how_to_play', data.how_to_play);
        if(data.structure) inject('structure_content', data.structure);
        if(data.requirements) inject('requirements_content', data.requirements);
        if(data.what_is_humankind) inject('what_is_humankind', data.what_is_humankind);
      })
      .catch(function(err){
        console.warn('Kunne ikke loade content.json. Viser placeholders.', err);
      });
  });
})();
