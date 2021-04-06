let msghndlr;
let chnl;
let i = 0;
import { commands, internalMessage } from "@goosemod/patcher";
import { sendMessage } from "@goosemod/patcher";
export default {
  goosemodHandlers: {
    onImport: () => {

      msghndlr = goosemod.webpackModules.findByProps("sendMessage"); // Get the webpackModule to send messages

      function sendMsg(text) {  //function to send text easily
        chnl =
          goosemod.webpackModules.findByProps("getChannelId").getChannelId() +
          "";
        msghndlr.sendMessage(chnl, { content: text });
      }
      function mockText(input) { // stackoverflow copypasta to make mock text (http://stackoverflow.com/questions/43192205/ddg#43192355)
        for (i = 0; i < input.length; i += 2) {
          input =
            input.substr(0, i) + input[i].toUpperCase() + input.substr(i + 1);
        }
        return input;
      }

      commands.add(
        "mock",
        "MoCk",
        (args) => sendMsg(mockText(args["message"][0]["text"])),
        [{ name: "message", type: 3, required: true }]
      );
    },

    onRemove: () => {
      commands.remove("mock");
    },
  },
};
