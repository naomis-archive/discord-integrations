import fetch from "node-fetch";
import { GlobalConfigInt } from "../interfaces/GlobalConfigInt";
import { errorHandler } from "./errorHandler";

export const sendTestEmbed = async (
  CONFIG: GlobalConfigInt,
  url: string,
  name: string
): Promise<boolean> => {
  try {
    const embed = {
      title: "Hello World!",
      description: `This embed confirms that the ${name} webhook is valid!`,
      color: 0x8b4283,
      footer: {
        text: `Version: ${process.env.npm_package_version}`,
      },
    };
    const test = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: "This is a test.",
        embeds: [embed],
      }),
    });

    return test.status === 204;
  } catch (err) {
    errorHandler(CONFIG, "send test embed", err);
    return false;
  }
};
