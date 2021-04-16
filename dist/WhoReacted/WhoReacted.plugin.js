/**!
 * @name WhoReacted
 * @description Shows the avatars of the users who reacted to a message.
 * @version 1.2.3
 * @author Jaime Filho
 * @authorId 289112759948410881
 * @invite z6Yx9A8VDR
 * @website https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/WhoReacted
 * @source https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/WhoReacted
 * @updateUrl https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/WhoReacted/WhoReacted.plugin.js
 */
/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell");
    var fs = new ActiveXObject("Scripting.FileSystemObject");
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\\BetterDiscord\\plugins");
    var pathSelf = WScript.ScriptFullName;
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins);
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
    }
    WScript.Quit();
@else@*/
const fs=require("fs"),path=require("path"),request=require("request"),electron=require("electron"),config={info:{name:"WhoReacted",description:"Shows the avatars of the users who reacted to a message.",version:"1.2.3",authors:[{name:"Jaime Filho",discord_id:"289112759948410881"}],github:"https://github.com/jaimeadf/BetterDiscordPlugins/tree/release/src/WhoReacted",github_raw:"https://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/release/dist/WhoReacted/WhoReacted.plugin.js"},changelog:[{title:"So many settings",items:["Added settings to let you decide whether you want to hide or show yourself and/or bots in the reactors (Thanks @FichteFoll on GitHub).","Added setting to set the avatars size (Thanks @FichteFoll on GitHub).","Categorized the settings for better organization and easier access."]},{title:"I knew I shouldn't mess with the comparisons",type:"fixed",items:["Fixed setting to not show yourself not working for everyone (Thanks again @FichteFoll on GitHub)."]}]};function buildPlugin(){const[e,t]=global.ZeresPluginLibrary.buildPlugin(config);var s;return(()=>{"use strict";var r={n:e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},d:(e,t)=>{for(var s in t)r.o(t,s)&&!r.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:t[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)},i={};r.d(i,{default:()=>WhoReacted});const o=global.BdApi.React;var n=r.n(o);const a=t,c=e;var l=r.n(c);const{UserStore:h}=a.DiscordModules,d=a.WebpackModules.getByProps("Store","connectStores"),u=a.WebpackModules.getByProps("getReactions","_changeCallbacks"),p=a.WebpackModules.find((e=>"VoiceUserSummaryItem"===function(e){let t,s=e[0],r=1;for(;r<e.length;){const i=e[r],o=e[r+1];if(r+=2,("optionalAccess"===i||"optionalCall"===i)&&null==s)return;"access"===i||"optionalAccess"===i?(t=s,s=o(s)):"call"!==i&&"optionalCall"!==i||(s=o(((...e)=>s.call(t,...e))),t=void 0)}return s}([e,"optionalAccess",e=>e.default,"optionalAccess",e=>e.displayName]))).default;const g=d.connectStores([h,u],(({message:e,emoji:t})=>{return{currentUser:h.getCurrentUser(),users:Object.values((s=u.getReactions(e.getChannelId(),e.id,t),r=()=>({}),null!=s?s:r()))};var s,r}))((function({users:e,currentUser:t,showSelf:s,showBots:r,max:i,size:a,count:c}){const l=(0,o.useMemo)((()=>e.filter((e=>(s||e.id!==t.id)&&(r||!e.bot)))),[e,t,s,r]);return n().createElement(p,{className:`reactors reactors-size-${a}px`,max:i,users:l,renderMoreUsers:function(t,s){return n().createElement("div",{className:`${s} more-reactors`},"+",1+c-i-(e.length-l.length))}})}));function WhoReacted_optionalChain(e){let t,s=e[0],r=1;for(;r<e.length;){const i=e[r],o=e[r+1];if(r+=2,("optionalAccess"===i||"optionalCall"===i)&&null==s)return;"access"===i||"optionalAccess"===i?(t=s,s=o(s)):"call"!==i&&"optionalCall"!==i||(s=o(((...e)=>s.call(t,...e))),t=void 0)}return s}const f=a.WebpackModules.find((e=>"Reactions"===WhoReacted_optionalChain([e,"optionalAccess",e=>e.default,"optionalAccess",e=>e.displayName]))).default,{SettingPanel:m,SettingGroup:x,Textbox:w,Slider:b,Switch:S}=a.Settings;class WhoReacted extends(l()){constructor(){super(),this.defaultSettings={maxUsersShown:6,avatarSize:20,reactionThreshold:10,userThreshold:100,useHighestUserCount:!0,showSelf:!0,showBots:!0}}async onStart(){a.PluginUtilities.addStyle(this.getName(),".reactors:not(:empty){margin-left:6px}.reactors .more-reactors{background-color:var(--background-tertiary);color:var(--text-normal);font-weight:500}.reactors-size-8px .avatarSize-EXG1Is{width:8px !important;height:8px !important}.reactors-size-8px .more-reactors{height:8px;padding-right:3.2px;padding-left:2.4px;font-size:4.8px;line-height:8px;border-radius:4px}.reactors-size-12px .avatarSize-EXG1Is{width:12px !important;height:12px !important}.reactors-size-12px .more-reactors{height:12px;padding-right:4.8px;padding-left:3.6px;font-size:7.2px;line-height:12px;border-radius:6px}.reactors-size-16px .avatarSize-EXG1Is{width:16px !important;height:16px !important}.reactors-size-16px .more-reactors{height:16px;padding-right:6.4px;padding-left:4.8px;font-size:9.6px;line-height:16px;border-radius:8px}.reactors-size-24px .avatarSize-EXG1Is{width:24px !important;height:24px !important}.reactors-size-24px .more-reactors{height:24px;padding-right:9.6px;padding-left:7.2px;font-size:14.4px;line-height:24px;border-radius:12px}.reactors-size-32px .avatarSize-EXG1Is{width:32px !important;height:32px !important}.reactors-size-32px .more-reactors{height:32px;padding-right:12.8px;padding-left:9.6px;font-size:19.2px;line-height:32px;border-radius:16px}\n"),await this.patchReaction()}onStop(){a.PluginUtilities.removeStyle(this.getName()),a.Patcher.unpatchAll()}buildSettingsPanel(){return new m((()=>{this.saveSettings(),this.forceUpdateAllReactions()}),this.buildDisplaySettingsGroup(),this.buildThresholdSettingsGroup(),this.buildFilterSettingsGroup())}buildDisplaySettingsGroup(){return new x("Display settings").append(new w("Max users shown","The maximum number of users shown for each reaction emoji.",this.settings.maxUsersShown,(e=>{if(isNaN(e)||e<1||e>99)return a.Toasts.error("Value must be a number between 1 and 99!");this.settings.maxUsersShown=parseInt(e)}))).append(new b("Avatar size","Sets the size of the user avatars.",8,32,this.settings.avatarSize,(e=>this.settings.avatarSize=e),{defaultValue:this.defaultSettings.avatarSize,markers:[8,12,16,20,24,32],stickToMarkers:!0,units:"px"}))}buildThresholdSettingsGroup(){function renderMarker(e){return 0===e?"Off":e>=1e3?e/1e3+"k":e}return new x("Thresholds").append(new b("Reaction threshold","Hides the reactors when the number of separate reactions is exceeded on a message.",0,20,this.settings.reactionThreshold,(e=>this.settings.reactionThreshold=e),{defaultValue:this.defaultSettings.reactionThreshold,markers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],stickToMarkers:!0,renderMarker})).append(new b("User threshold","Hides the reactors when their count is exceeded on a message.",0,1e4,this.settings.userThreshold,(e=>this.settings.userThreshold=e),{defaultValue:this.defaultSettings.userThreshold,markers:[0,10,20,50,100,500,1e3,2e3,3e3,4e3,5e3,1e4],stickToMarkers:!0,equidistant:!0,renderMarker})).append(new S("Use highest user count","Uses the reaction with most reactors of a message for user threshold.",this.settings.useHighestUserCount,(e=>this.settings.useHighestUserCount=e)))}buildFilterSettingsGroup(){return new x("Filters").append(new S("Show self","Shows yourself within the reactors.",this.settings.showSelf,(e=>this.settings.showSelf=e))).append(new S("Show bots","Shows bots within the reactors.",this.settings.showBots,(e=>this.settings.showBots=e)))}getSettingsPanel(){return this.buildSettingsPanel().getElement()}async patchReaction(){const e=await this.findReaction();a.Patcher.after(e.prototype,"render",((e,t,s)=>{const{message:r,emoji:i,count:o}=e.props;if(!this.canShowReactors(r))return;const a=s.props.children;s.props.children=e=>{const t=a(e),s=t.props.children.props.children,c=s.props.children;return s.props.children=e=>{const t=c(e);return t.props.children.props.children.push(n().createElement(g,{message:r,emoji:i,count:o,max:this.settings.maxUsersShown,showSelf:this.settings.showSelf,showBots:this.settings.showBots,size:this.settings.avatarSize})),t},t}})),this.forceUpdateAllReactions()}canShowReactors({reactions:e}){const{reactionThreshold:t,userThreshold:s,useHighestUserCount:r}=this.settings;if(0!==t&&e.length>t)return!1;if(0!==s){if((r?Math.max(...e.map((e=>e.count))):e.reduce(((e,t)=>e+t.count),0))>s)return!1}return!0}findReaction(){return new Promise((e=>{const t=document.querySelector(a.DiscordSelectors.Reactions.reaction);if(t)return e(this.findReactionReactInstance(t).type);const s=a.Patcher.after(f.prototype,"render",((t,r,i)=>{if(!i)return;const o=i.props.children[0][0];o&&(s(),e(o.type))}))}))}forceUpdateAllReactions(){for(const e of document.querySelectorAll(a.DiscordSelectors.Reactions.reaction))this.findReactionReactInstance(e).stateNode.forceUpdate()}findReactionReactInstance(e){return a.Utilities.findInTree(a.ReactTools.getReactInstance(e),(e=>"Reaction"===WhoReacted_optionalChain([e,"optionalAccess",e=>e.type,"optionalAccess",e=>e.displayName])),{walkable:["return"]})}}s=i.default})(),s}module.exports=global.ZeresPluginLibrary?buildPlugin():class{constructor(){this._config=config}getName(){return config.info.name}getAuthor(){return config.info.authors.map((e=>e.name)).join(", ")}getDescription(){return config.info.description}getVersion(){return config.info.version}load(){global.BdApi.showConfirmationModal("Library plugin is needed",`The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`,{confirmText:"Download",cancelText:"Cancel",onConfirm(){request.get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js",((e,t,s)=>{if(e)return electron.shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");fs.writeFileSync(path.join(global.BdApi.Plugins.folder,"0PluginLibrary.plugin.js"),s)}))}})}start(){}stop(){}};
/*@end@*/