import { Plugin, Notice } from 'obsidian';

export default class IncybePlugin extends Plugin {
  async onload() {
    console.log('🤖 Loading inCybe plugin...');

    // 1. Add Ribbon Icon
    const ribbonIconEl = this.addRibbonIcon('bot', 'inCybe', (evt: MouseEvent) => {
      new Notice('inCybe: Opening Query Modal...');
      // TODO: Open Ask Modal
    });
    ribbonIconEl.addClass('incybe-ribbon-class');

    // 2. Add 'Ask Incybe' Command
    this.addCommand({
      id: 'ask-incybe',
      name: 'Ask inCybe',
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "i" }],
      callback: () => {
        new Notice('Opening inCybe Ask Modal...');
        // TODO: Render Ask Modal
      }
    });

    // 3. Add 'Search vault semantically' Command
    this.addCommand({
      id: 'search-incybe',
      name: 'Search vault semantically',
      hotkeys: [{ modifiers: ["Mod", "Shift"], key: "f" }],
      callback: () => {
        new Notice('Opening inCybe Search...');
        // TODO: Render Search Modal
      }
    });
  }

  onunload() {
    console.log('🛑 Unloading inCybe plugin...');
  }
}