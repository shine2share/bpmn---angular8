import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Modeler} from './bpmn-js/bpmn-js';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from './provider/magic'; // 'bpmn-js-properties-panel/lib/provider/camunda';
import magicModdleDescriptor from './descriptors/magic.json';
import {saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular - BPMN';
  modeler;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
      ],
      propertiesPanel: {
        parent: '#properties'
      },
      moddleExtensions: {
        magic: magicModdleDescriptor
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  loadFile(): void {
    console.log('loading file from local.');
    (<HTMLInputElement>document.getElementById("txt_localFile")).click();
  }

  async openLocalDiagram(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    if (fileList) {
      const path = (window.URL || (window as any).webkitURL).createObjectURL(fileList[0]);
      this.load(path);
    }
  }

  load(url: string): void {
    this.http.get(url, {
      headers: {observe: 'response'}, responseType: 'text'
    }).subscribe(
      async(x: any) => {
        console.log('Fetched XML, now importing: ', x);
        try {
          const result = await this.modeler.importXML(x);
          console.log('modeler.importXML: ' + result);
        } catch (e) {
          console.log('in catch: ' + e.message);
        }

      },
      this.handleError
    );
  }

  async save() {
    const { xml } = await this.modeler.saveXML();
    const blob = new Blob([xml], {type: 'application/xml'});
    saveAs(blob, 'diagram.bpmn');
  }

}
