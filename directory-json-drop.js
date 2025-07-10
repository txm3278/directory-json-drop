Hooks.once('init', () => {
  if (game.release.generation >= 13)
    Hooks.on('renderAbstractSidebarTab', (app, html) => {
      const directoryList = html.querySelector('.directory-list');
      if (!directoryList) return;
      directoryList.addEventListener('drop', async function (event) {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (!files[0]) return true;
        for (let file of files) {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              try {
                game[app.tabName].documentClass.create(
                  JSON.parse(reader.result)
                );
              } catch (err) {
                console.log(err);
              }
            },
            false
          );
          reader.readAsText(file);
        }
      });
    });
  else {
    Hooks.on('renderSidebarTab', (app, html) => {
      html.find('.directory-list').on('drop', async function (event) {
        event.originalEvent.preventDefault();
        const files = event.originalEvent.dataTransfer.files;
        if (!files[0]) return true;
        for (let file of files) {
          const reader = new FileReader();
          reader.addEventListener(
            'load',
            () => {
              try {
                game[app.tabName].documentClass.create(
                  JSON.parse(reader.result)
                );
              } catch (err) {
                console.log(err);
              }
            },
            false
          );
          reader.readAsText(file);
        }
      });
    });
  }
});
