import { createItem, removeItem } from "@goosemod/settings";

let stor = {};
let togl = true;
let tstogl = false;
let btns = []
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
          details: stor.details || "Hello",
          state: stor.state || "World",
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

      function setStatus() {
        goosemod.webpackModules
          .findByProps("INVITE_BROWSER")
          .SET_ACTIVITY.handler({
            socket: {
              id: 100,
              application: {
                id: stor.appid || "733854571738300487",
                name: stor.name || "RPC",
              },
              transport: "ipc",
            },
            args: {
              pid: 10,
              activity: game(),
            },
          });
      }

      function removeStatus() {
        goosemod.webpackModules
          .findByProps("INVITE_BROWSER")
          .SET_ACTIVITY.handler({
            socket: {
              id: 100,
              application: {
                id: stor.appid || "733854571738300487",
                name: stor.name || "RPC",
              },
              transport: "ipc",
            },
            args: {
              pid: 10,
              activity: undefined,
            },
          });
      }

      createItem("RPC", [
        "(1.0.0)",
        // field objects
        {
          type: "toggle",
          text: "Enable RPC",
          onToggle: (value) => {
            if (value) {
              setStatus();
              togl = !togl
            } else {
              removeStatus();
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
          type: 'divider',
        },
        {
          type: "custom",
          element: (() => {
            const elm = goosemod.webpackModules.common.React.createElement(
              goosemod.webpackModules.findByDisplayName("TextInput"),
              {
                onBlur: (val) => {
                  stor.large_image = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Large Image Name",
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
                  stor.large_text = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Large Image Text",
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
                  stor.small_image = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Small Image Name",
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
                  stor.small_text = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Small Image Text",
              }
            );
            let e = document.createElement("div");
            goosemod.webpackModules.common.ReactDOM.render(elm, e);
            return e;
          })(),
        },
        {
          type: 'divider',
        },
        {
          type: "custom",
          element: (() => {
            const elm = goosemod.webpackModules.common.React.createElement(
              goosemod.webpackModules.findByDisplayName("TextInput"),
              {
                onBlur: (val) => {
                  stor.label_one = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Button One Text",
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
                  stor.url_one = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Button One URL",
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
                  stor.label_two = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Button Two Text",
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
                  stor.url_two = val.target.value || undefined;
                  setStatus();
                },
                placeholder: "Button Two URL",
              }
            );
            let e = document.createElement("div");
            goosemod.webpackModules.common.ReactDOM.render(elm, e);
            return e;
          })(),
        },
      ]);
    },

    onRemove: () => {
      try {
        removeItem("RPC");
        function removeStatus() {
          goosemod.webpackModules
            .findByProps("INVITE_BROWSER")
            .SET_ACTIVITY.handler({
              socket: {
                id: 100,
                application: {
                  id: stor.appid || "733854571738300487",
                  name: stor.name || "RPC",
                },
                transport: "ipc",
              },
              args: {
                pid: 10,
                activity: undefined,
              },
            });
        }
        removeStatus();
      } catch {
        console.warn(
          `Run goosemod.settings.removeItem("RPC") if the settings page does not disappear. RPC may not disappear.`
        );
      }
    },
  },
};
