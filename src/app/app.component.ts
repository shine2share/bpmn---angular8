import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider} from './bpmn-js/bpmn-js';
import {CustomPropsProvider} from './props-provider/CustomPropsProvider';
import {CustomPaletteProvider} from "./props-provider/CustomPaletteProvider";
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from './provider/magic'; // 'bpmn-js-properties-panel/lib/provider/camunda';
import magicModdleDescriptor from './descriptors/magic.json';

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

  load(): void {
    const url = '/assets/bpmn/initial.bpmn';
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
    console.log(xml);
  }

}
