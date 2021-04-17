let style;
let importcode;
let code;

export default {
  goosemodHandlers: {
    onImport: async () => {

      style = document.createElement("style")


      code = `
/* Discord Townhall - https://ptb.discord.com/channels/169256939211980800/677241858765881345/832411647900647454 */
:root {
    --background-primary: #c9a787;
    --background-secondary-alt: #b5875b;
    --background-tertiary: #a47146;
    --channeltextarea-background: #dbc4b0;
    --text-muted: #572f1b;
    --header-secondary: #682e1b;
    --channels-default: #463225;
    --interactive-muted: #a47146;
    --background-secondary: #c29871;
    --interactive-normal: #53321e;
    --text-normal: #463225;
    --header-primary: #f7ede6;
    --background-accent: #dbc4b0;
    --text-link: #572f1b;
    --background-floating: #c9a787;
}
.pointerEvents-2zdfdO {fill: #f9d7ab}
.circleIconButton-1QV--U {color: var(--channels-default)}
`


      importcode = document.createTextNode(code)
      style.appendChild(importcode)
      document.head.appendChild(style)
},
    onRemove: async () => {
      style.remove();
    },
  },
};
