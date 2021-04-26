import { createItem, removeItem } from "@goosemod/settings";

let stor = {};
export default {
  goosemodHandlers: {
    onImport: () => {
      function game() {
        return {
          details: stor.details || "Middle Text",
          state: stor.state || "Bottom Text",
          timestamps:
            stor.time || false
              ? {
                  start: Date.now(),
                }
              : undefined,
          assets: {
            large_image: undefined,
            small_image: undefined,
            large_text: undefined || undefined,
            small_text: undefined || undefined,
          },
        };
      }
      goosemod.webpackModules
        .findByProps("INVITE_BROWSER")
        .SET_ACTIVITY.handler({
          socket: {
            id: 100,
            application: {
              id: "733854571738300487",
              name: "Name Of Status - Test",
            },
            transport: "ipc",
          },
          args: {
            pid: 10,
            activity: game(),
          },
        });

      function setStatus() {
        goosemod.webpackModules
          .findByProps("INVITE_BROWSER")
          .SET_ACTIVITY.handler({
            socket: {
              id: 100,
              application: {
                id: stor.appid || "733854571738300487",
                name: stor.name || "Name Of Status - Test",
              },
              transport: "ipc",
            },
            args: {
              pid: 10,
              activity: game(),
            },
          });
      }

      createItem("RPC", [
        "(0.0.1)",
        // field objects
        {
          type: "custom",
          element: (() => {
            const elm = goosemod.webpackModules.common.React.createElement(
              goosemod.webpackModules.findByDisplayName("TextInput"),
              {
                onBlur: (val) => {
                  stor.details = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Details (top text)",
              }
            );
            let e = document.createElement("div");
            goosemod.webpackModules.common.ReactDOM.render(elm, e);
            return e;
          })(),
        },

        {
          type: "custom",

          element: (() => {
            const elm = goosemod.webpackModules.common.React.createElement(
              goosemod.webpackModules.findByDisplayName("TextInput"),
              {
                onBlur: (val) => {
                  stor.state = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "State (bottom text)",
              }
            );
            let e = document.createElement("div");
            goosemod.webpackModules.common.ReactDOM.render(elm, e);
            return e;
          })(),
        },
        {
          type: "custom",
          element: (() => {
            const elm = goosemod.webpackModules.common.React.createElement(
              goosemod.webpackModules.findByDisplayName("TextInput"),
              {
                onBlur: (val) => {
                  stor.name = val.target.value || "";
                  setStatus();
                },
                placeholder: "App Name",
              }
            );
            let e = document.createElement("div");
            goosemod.webpackModules.common.ReactDOM.render(elm, e);
            return e;
          })(),
        },
        {
          type: "custom",
          element: (() => {
            const elm = goosemod.webpackModules.common.React.createElement(
              goosemod.webpackModules.findByDisplayName("TextInput"),
              {
                onBlur: (val) => {
                  stor.appid = val.target.value || "733854571738300487";
                  setStatus();
                },
                placeholder: "App ID",
              }
            );
            let e = document.createElement("div");
            goosemod.webpackModules.common.ReactDOM.render(elm, e);
            return e;
          })(),
        },
        {
          type: "toggle",
          text: "Show timestamp",
          onToggle: (value) => {
            stor.time = value.target.value || false;
            setStatus();
          },
          isToggled: () => {
            // Define what state the toggle switch should be in when loading the page.
            return false;
          },
        },
      ]);
    },

    onRemove: () => {
      try {
        removeItem("RPC");
      } catch {
        console.warn(
          `Run goosemod.settings.removeItem("RPC") if the settings page does not disappear.`
        );
      }
    },
  },
};
