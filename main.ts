import {Platform, Plugin, TFile} from "obsidian";
import type { MarkdownView } from 'obsidian';
import {platform} from "os";

export default class HtmlLocalSrcPlugin extends Plugin {
  async onload() {
    this.registerMarkdownPostProcessor((element, ctx) => {

      const targetLinks = Array.from(element.getElementsByTagName("img")).filter(
        (link) =>
          link.src.contains("_media")
      );
      const active_file = this.app.workspace.getActiveFile();
      let active_path = this.app.vault.getResourcePath(active_file)
      active_path = active_path.substring(0, active_path.lastIndexOf("/"));
      //console.log('active_file_path: ' + active_path)
      for (const link of targetLinks) {
        let clean_link = link.src.replace('app://obsidian.md/', '')
        // For iOS
        clean_link = clean_link.replace('capacitor://localhost/', '')
        //console.log('clean_link: ' + clean_link)
        let full_link =  active_path + '/' + clean_link
        //console.log('full_link: ' + full_link)
        link.src = full_link
        if(Platform.isMobile) {
          console.log("Running on mobile platform - setting object fit and height of img")
          link.style.objectFit = "contain"
          link.height = 100
        }
        }
    });
  }
}