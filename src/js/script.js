import { addVoidForLinks, hamburger, makeAJAXCall } from './utils';
import { slider } from './slider';

const doc = document;

addVoidForLinks(doc.querySelectorAll(`a`));

hamburger(".js-hamburger", ".js-wrapper");

function renderUsers(data) {
  slider(data);
}

makeAJAXCall("https://yeffasol.github.io/event/data/events.json", "GET", renderUsers);

