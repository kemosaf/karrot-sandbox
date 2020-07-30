const Discord = require("discord.js");

const client = new Discord.Client();

client.on("ready", () => {
  console.log(`Bot is ready`);
  client.user.setActivity(
    `karrot test#1169
`,
    { type: "WATCHING" }
  );

  //getting ready for checking

  let botOffline = false;
  let botNotOffline;

  const karrotID = "704052458757816360";
  setInterval(() => {
    client.users.fetch(karrotID).then(myUser => {
      const channel = client.channels.cache.get("734916466771755079");
      const statusEmbed1 = new Discord.MessageEmbed();
      if (myUser.presence.status === "offline") {
        statusEmbed1.setColor(`BLACK`);
      }
      if (myUser.presence.status === "online") statusEmbed1.setColor(`GREEN`);
      if (myUser.presence.status === "idle") statusEmbed1.setColor(`YELLOW`);
      if (myUser.presence.status === "dnd") statusEmbed1.setColor(`RED`);
      statusEmbed1.setThumbnail(myUser.avatarURL());
      statusEmbed1.setTitle(`${myUser.username}'s Status Check`);
      statusEmbed1.setDescription(
        `This is an automatic status check. That occurs every 30 seconds.`
      );
      statusEmbed1.addField(
        `${myUser.username}'s status`,
        myUser.presence.status
      );
      statusEmbed1.addField(
        `Color Code`,
        `:green_square: = Online :red_square: = Do Not Disturb  :yellow_square: = Idle  :black_large_square: = Invisible`
      );
      channel.send(statusEmbed1);
    });
  }, 30000);

  //part 2

  setInterval(() => {
    client.users.fetch(karrotID).then(myUser => {
      const channelF = client.channels.cache.get("734610771857899620");
      if (myUser.presence.status === "offline") {
        const statusEmbed2 = new Discord.MessageEmbed()
          .setColor(`RED`)
          .setTitle(`${myUser.username} Has Unexpectedly Went Offline!`)
          .setDescription(
            `I have detected that ${
              myUser.username
            } went offline, I am currently trying to deploy backup Heroku code.`
          )
          .setFooter(`This message auto updates every 3 seconds`);

        channelF.fetch({ limit: 100 }).then(messages => {
          channelF.bulkDelete(100);
        });

        channelF.send(statusEmbed2);
        client.users.cache.get("549268263289487431").send(statusEmbed2);
      } else {
        const statusEmbed3 = new Discord.MessageEmbed()
          .setColor(`GREEN`)
          .setTitle(`${myUser.username} is Good to Go!`)
          .setDescription(
            `I have detected that ${
              myUser.username
            } is all good to go and is not offline! I will not be performing any unnecessary actions like deploying a back up version.`
          )
          .setFooter(`This message auto updates every 3 seconds`);
        channelF.fetch({ limit: 100 }).then(messages => {
          channelF.bulkDelete(100);
        });
        channelF.send(statusEmbed3);
      }
    });
  }, 3000);
});

client.on("message", async message => {});

client.login("NzM0NTYyMzUyMzcxOTkwNTcw.XxTgjQ.ZWwoYeuYbmzDo4No7N2eQjwUQ5E");
