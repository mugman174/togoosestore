import { createItem, removeItem } from "@goosemod/settings";

let stor = {};
let togl = true;
let tstogl = false;
let btns = [];
let activity;
export default {
  goosemodHandlers: {
    onImport: () => {
      function getButtons() {
        btns = [];
        if (stor.label_one && stor.url_one) {
          btns = [
            {
              label: stor.label_one,
              url: stor.url_one
            }
          ]
        }
        if ((stor.label_one && stor.url_one) && (stor.label_two && stor.url_two)) {
          btns.push({ label: stor.label_two, url: stor.label_two });
        }
        return btns;
      }
      function game() {
        return {
          details: stor.details || "Hello from my status!",
          state: stor.state || "Powered by Discord RP",
          timestamps:
            stor.time || false
              ? {
                start: Date.now(),
              }
              : undefined,
          assets: {
            large_image: stor.large_image || undefined,
            small_image: stor.small_image || undefined,
            large_text: stor.large_text || undefined,
            small_text: stor.small_text || undefined,
          },
          buttons: getButtons(),
        };
      }
      goosemod.webpackModules
        .findByProps("INVITE_BROWSER")
        .SET_ACTIVITY.handler({
          socket: {
            id: 100,
            application: {
              id: "733854571738300487",
              name: "RPC",
            },
            transport: "ipc",
          },
          args: {
            pid: 10,
            activity: game(),
          },
        });

      function setStatus(remove) {
        if (remove) {
          activity = undefined
        } else {
          activity = game()
        }
        goosemod.webpackModules
          .findByProps("INVITE_BROWSER")
          .SET_ACTIVITY.handler({
            socket: {
              id: 100,
              application: {
                id: stor.appid || "733854571738300487",
                name: stor.name || "with a custom Rich Presence",
              },
              transport: "ipc",
            },
            args: {
              pid: 10,
              activity: activity,
            },
          });
      }

      createItem("RPC", [
        "(2.0.0)",
        // field objects
        {
          type: "toggle",
          text: "Enable RPC",
          onToggle: (value) => {
            if (value) {
              setStatus();
              togl = !togl
            } else {
              removeStatus(true);
              togl = !togl
            }
          },
          isToggled: () => {
            // Define what state the toggle switch should be in when loading the page.
            return togl;
          },
        },
        {
          type: "toggle",
          text: "Show timestamp",
          onToggle: (value) => {
            stor.time = value.target.value || false;
            setStatus();
            tstogl = stor.time
          },
          isToggled: () => {
            // Define what state the toggle switch should be in when loading the page.
            return tstogl;
          },
        },
        {
          type: "text-input",
          text: "Details (top text)",
          initialValue: () => stor.details,
          oninput: (value, elem) => {
            stor.details = value || undefined;setStatus();
          }
        },
        {
          type: "text-input",
          text: "State (bottom text)",
          initialValue: () => { return stor.state || "" },
          oninput: (value, element) => {
            stor.state = value || undefined;
            setStatus();
          }
        },
        {
          type: "text-input",
          text: "App Name",
          initialValue: () => { return stor.name || "" },
          oninput: (value, elem) => {
            stor.name = value || undefined;
            setStatus();
          }
        },
        {
          type: "text-input",
          text: "App ID",
          initialValue: () => stor.appid,
          oninput: (value, elem) => {
            stor.appid = value || undefined;
            setStatus();
          }
        },
        {
          type: 'divider',
        },
        {
          type: "text-input",
          text: "Large Image Name",
          initialValue: () => {return stor.large_image},
          oninput: (value, elem) => {stor.large_image = value || undefined;setStatus()}
        },
        {
          type: "text-input",
          text: "Large Image Text",
          initialValue: () => stor.large_text,
          oninput: (value, elem) => {stor.large_text = value || undefined; setStatus()}
        },
        {
          type: "text-input",
          text: "Small Image Name",
          initialValue: () => stor.small_image,
          oninput: (value, elem) => {stor.small_image = value || undefined; setStatus()}
        },
        {
          type: "text-input",
          text: "Small Image Text",
          initialValue: () => {return stor.small_text},
          oninput: (value, elem) => {stor.small_text = value || undefined;setStatus()}
        },
        {
          type: 'divider',
        },
        {
          type: "text-input",
          text: "Button One Text",
          initialValue: () => {return stor.label_one},
          oninput: (value, i) => {stor.label_one = value || undefined;setStatus()}
        },
        {
          type: "text-input",
          text: "Button One URL",
          initialValue: () => stor.url_one,
          oninput: (value, elem) => {stor.url_one = value || undefined; setStatus()}
        },
        {
          type: "text-input",
          text: "Button Two Text",
          initialValue: () => stor.label_two,
          oninput: (value, elem) => {stor.label_two = value || undefined; setStatus()}
        },
        {
          type: "text-input",
          text: "Button Two URL",
          initialValue: () => stor.url_two,
          oninput: (value, elem) => {stor.url_two = value || undefined; setStatus()}
        },
      ]);
    },

    onRemove: () => {
      try {
        removeItem("RPC");
        removeStatus();
      } catch {
        console.warn(
          `Run goosemod.settings.removeItem("RPC") if the settings page does not disappear. RPC may not disappear.`
        );
      }
    },
  },
};
