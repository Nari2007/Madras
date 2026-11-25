const madrasConfig = {
  discordUrl: '', // e.g. https://discord.gg/YOUR_INVITE
  connectUrl: '', // e.g. https://cfx.re/join/YOUR_CODE
  connectCommand: '', // e.g. connect YOUR_SERVER_IP:30120
  statusApi: '', // Optional HTTPS endpoint returning {online:true,players:20,maxPlayers:64}; must allow CORS
  memberRoleId: '1575068235869458636',
  staffRoles: [
    { id: '1492383144811430030', label: 'STAFF' },
    { id: '1492380024899113010', label: 'Administrator' }
  ],
  communityProfiles: [
     { username: '𝙉𝙖𝙧𝙞', avatar: 'assets/members/nj.jpg', role: 'admin' },
     { username: '𝙈𝙪𝙩𝙝𝙪𝙠𝙝𝙖𝙡𝙞', avatar: 'assets/members/mk.jpg', role: 'member' },
     { username: ' 𝙈𝙚𝙡𝙫𝙞𝙣 𝙅𝙤𝙣𝙚𝙨', avatar: 'assets/members/melvin.png', role: 'admin' },
     { username: '𝙎𝙩𝙚𝙥𝙝𝙚𝙣 𝙍𝙖𝙟 ', avatar: 'assets/members/irumbu.png', role: 'founder' },
     { username: ' 𝙔𝙖𝙨𝙝', avatar: 'assets/members/yash.png', role: 'member' },
     { username: '𝘼𝙪𝙨𝙩𝙞𝙣 𝙋𝙖𝙧𝙠𝙚𝙧', avatar: 'assets/members/as.png', role: 'member' },
     { username: '𝙍𝙖𝙝𝙪𝙧𝙖𝙢', avatar: 'assets/members/ragu.png', role: 'member' },
     { username: '𝙇𝙪𝙘𝙞𝙛𝙚𝙧 𝙈𝙤𝙧𝙣𝙞𝙣𝙜𝙨𝙩𝙖𝙧', avatar: 'assets/members/lc.png', role: 'member' },
     { username: '𝘼𝙉𝙐 ', avatar: 'assets/members/anu.png', role: 'member' },
     { username: '𝙏𝙝𝙞𝙜𝙞𝙡 𝙋𝙖𝙣𝙙𝙞', avatar: 'assets/members/thigil.png', role: 'member' },
     { username: '𝘼𝙖𝙙𝙝𝙞𝙧𝙖𝙣 ', avatar: 'assets/members/ad.png', role: 'member' },
     { username: '𝙎𝙪𝙢𝙤 ', avatar: 'assets/members/sumo.png', role: 'member' },
     { username: ' 𝙎𝙩𝙚𝙫𝙚 𝙈𝙖𝙧𝙩𝙞𝙣 ', avatar: 'assets/members/stv.png', role: 'member' },
     { username: '𝙍𝙖𝙗𝙤 ', avatar: 'assets/members/rabo.png', role: 'member' },
     { username: '𝙎𝙖𝙡𝙚𝙚𝙢 ', avatar: 'assets/members/s.png', role: 'member' },
     { username: '𝙋𝙚𝙩𝙚𝙧 𝙋𝙖𝙧𝙠𝙚𝙧  ', avatar: 'assets/members/pp.png', role: 'member' },
     { username: ' 𝙏𝙧𝙤𝙮 𝙈𝙖𝙡𝙡𝙪  ', avatar: 'assets/members/tm.png', role: 'member' },
     { username: '𝙔𝙖𝙯𝙝𝙞𝙣𝙞 ', avatar: 'assets/members/y.png', role: 'member' },
     { username: '𝙎𝙤𝙙𝙖𝙥𝙪𝙩𝙩𝙞𝙜𝙖𝙢𝙞𝙣𝙜 ', avatar: 'assets/members/a.png', role: 'member' },
     { username: '𝘼𝙣𝙩𝙤𝙣𝙮', avatar: 'assets/members/anto.png', role: 'member' },
     { username: '𝙈𝙖𝙫𝙚𝙧𝙞𝙘𝙠 𝙅𝙤𝙣𝙚𝙨', avatar: 'assets/members/ant.png', role: 'member' },
  ],
  communityCategories: {
    founder: 'The Orgin',
    admin: 'Discord Admins',
    member: 'Member',
    
  }
};

if (typeof window !== 'undefined') window.MADRAS_CONFIG = madrasConfig;
if (typeof module !== 'undefined' && module.exports) module.exports = madrasConfig;
