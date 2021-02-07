import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';


export default function(group, element, translate) {

  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:StartEvent')) {
    group.entries.push(entryFactory.textField(translate, {
      id : 'spell',
      description : 'Apply a black magic spell',
      label : 'Spell',
      modelProperty : 'spell'
    }));
  }
  if (is(element, 'bpmn:Task')) {
    group.entries.push(entryFactory.textField(translate, {
      id : 'call API',
      description : 'call a api from server',
      label : 'API',
      modelProperty : 'API'
    }));
  }
  if (is(element, 'bpmn:SubProcess')) {
    group.entries.push(entryFactory.textField(translate, {
      id : 'call API',
      description : 'call a api from server',
      label : 'API',
      modelProperty : 'API'
    }));
  }
}
