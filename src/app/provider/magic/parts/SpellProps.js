import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {

  // Only return an entry, if the currently selected
  // element is a start event.

  // if (is(element, 'bpmn:StartEvent')) {
  //   group.entries.push(entryFactory.textField(translate, {
  //     id : 'spell',
  //     description : '',
  //     label : 'Spell',
  //     modelProperty : 'spell'
  //   }));
  // }
  group.entries.push(entryFactory.textField(translate, {
    id : 'pipeline',
    description : '',
    label : 'pipeline',
    modelProperty : 'pipeline'
  }));

  group.entries.push(entryFactory.textField(translate, {
    id : 'implementation',
    description : '',
    label : 'implementation',
    modelProperty : 'implementation'
  }));
}
