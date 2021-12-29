import { createItem, removeItem } from "@goosemod/settings";

let rpc_data = {};
//let rpc_toggle = false;
let timestamp_toggle = false;
let buttons = [];
let activity;
export default {
  goosemodHandlers: {
    getSettings: () => [rpc_data],
    loadSettings: ( [data] ) => {rpc_data = data},
    onImport: () => {
      function getButtons() {
        buttons = [];
        if (rpc_data.label_one && rpc_data.url_one) {
          buttons = [
            {
              label: rpc_data.label_one,
              url: rpc_data.url_one
            }
          ]
        }
        if ((rpc_data.label_one && rpc_data.url_one) && (rpc_data.label_two && rpc_data.url_two)) {
          buttons.push({ label: rpc_data.label_two, url: rpc_data.label_two });
        }
        return buttons;
      }
      function game() {
        return {
          details: rpc_data.details || "Hello from my status!",
          state: rpc_data.state || "Powered by Discord RP",
          timestamps:
            rpc_data.time || false
              ? {
                start: Date.now(),
              }
              : undefined,
          assets: {
            large_image: rpc_data.large_image || undefined,
            small_image: rpc_data.small_image || undefined,
            large_text: rpc_data.large_text || undefined,
            small_text: rpc_data.small_text || undefined,
          },
          buttons: getButtons(),
        };
      }

      function setStatus(remove) {
        if (remove) {
          activity = undefined
        } else {
          activity = game()
        }
        goosemod.webpackModules
          .findByProps("SET_ACTIVITY").SET_ACTIVITY
          .handler({
            isSocketConnected: () => true,
            socket: {
              id: 100,
              application: {
                id: rpc_data.appid || "733854571738300487",
                name: rpc_data.name || "with a custom Rich Presence",
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
              rpc_data.rpc_toggle = !rpc_data.rpc_toggle
            } else {
              setStatus(true);
              rpc_data.rpc_toggle = !rpc_data.rpc_toggle
            }
          },
          isToggled: () => {
            // Define what state the toggle switch should be in when loading the page.
            return rpc_data.rpc_toggle;
          },
        },
        {
          type: "toggle",
          text: "Show timestamp",
          onToggle: (value) => {
            rpc_data.time = value || false;
            setStatus();
            timestamp_toggle = rpc_data.time || value
          },
          isToggled: () => {
            // Define what state the toggle switch should be in when loading the page.
            return timestamp_toggle;
          },
        },
        {
          type: "text-input",
          text: "Details (top text)",
          initialValue: () => rpc_data.details,
          oninput: (value, elem) => {
            rpc_data.details = value || undefined; setStatus();
          }
        },
        {
          type: "text-input",
          text: "State (bottom text)",
          initialValue: () => { return rpc_data.state || "" },
          oninput: (value, element) => {
            rpc_data.state = value || undefined;
            setStatus();
          }
        },
        {
          type: "text-input",
          text: "App Name",
          initialValue: () => { return rpc_data.name || "" },
          oninput: (value, elem) => {
            rpc_data.name = value || undefined;
            setStatus();
          }
        },
        {
          type: "text-input",
          text: "App ID",
          initialValue: () => rpc_data.appid,
          oninput: (value, elem) => {
            rpc_data.appid = value || undefined;
            setStatus();
          }
        },
        {
          type: 'divider',
        },
        {
          type: "text-input",
          text: "Large Image Name",
          initialValue: () => { return rpc_data.large_image },
          oninput: (value, elem) => { rpc_data.large_image = value || undefined; setStatus() }
        },
        {
          type: "text-input",
          text: "Large Image Text",
          initialValue: () => rpc_data.large_text,
          oninput: (value, elem) => { rpc_data.large_text = value || undefined; setStatus() }
        },
        {
          type: "text-input",
          text: "Small Image Name",
          initialValue: () => rpc_data.small_image,
          oninput: (value, elem) => { rpc_data.small_image = value || undefined; setStatus() }
        },
        {
          type: "text-input",
          text: "Small Image Text",
          initialValue: () => { return rpc_data.small_text },
          oninput: (value, elem) => { rpc_data.small_text = value || undefined; setStatus() }
        },
        {
          type: 'divider',
        },
        {
          type: "text-input",
          text: "Button One Text",
          initialValue: () => { return rpc_data.label_one },
          oninput: (value, i) => { rpc_data.label_one = value || undefined; setStatus() }
        },
        {
          type: "text-input",
          text: "Button One URL",
          initialValue: () => rpc_data.url_one,
          oninput: (value, elem) => { rpc_data.url_one = value || undefined; setStatus() }
        },
        {
          type: "text-input",
          text: "Button Two Text",
          initialValue: () => rpc_data.label_two,
          oninput: (value, elem) => { rpc_data.label_two = value || undefined; setStatus() }
        },
        {
          type: "text-input",
          text: "Button Two URL",
          initialValue: () => rpc_data.url_two,
          oninput: (value, elem) => { rpc_data.url_two = value || undefined; setStatus() }
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
