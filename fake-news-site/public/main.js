const columnOne = document.querySelectorAll('.col-md-6.jasgrid').item(0);
const columnTwo = document.querySelectorAll('.col-md-6.jasgrid').item(1);
let whatCol = 0;
function addArticleToHtml(html) {
    const newElement = htmlToElement(html);
    (whatCol++ % 2 == 0 ? columnOne : columnTwo).appendChild(newElement);
}


/**
 * @param {String} HTML representing a single element
 * @return {Element}
 */
function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

const generators = [
    new SladderFakeNews(),
    new KlimaFakeNews(),
    new PolitikFakeNews(),
    new verdensPolitikFakeNews(),
    new CoronaFakeNews(),
    new SportFakeNews(),
];

const randomGen = () => generators[~~(Math.random() * generators.length)];

function generateArticles(n = 20) {
    for(let i = 0; i < n; i++) {
        const gen = randomGen();
        const headline = gen.genererHeadline();
        const tag = gen.tag || 'Nyhed';
        addArticleToHtml(generateHTML(headline, tag));
    }
}

document.addEventListener('DOMContentLoaded', () => { generateArticles() });
window.addEventListener('scroll', () => {
    if (elementInViewport()) {
        generateArticles(2);
    }
});

const tagColors = ['#795cb8', '#5c8fb8', '#b05cb8', '#b85c5c', '#b8a75c', '#5CB85C'];
const tagsToColor = {};
function getTagColor(tag) {
  if(tagsToColor[tag]) return tagsToColor[tag];
  // tagsToColor[tag] = tagColors[~~(Math.random() * tagColors.length)];
  tagsToColor[tag] = tagColors.pop();
  return tagsToColor[tag];
}

function generateHTML(headline, tag) {
    return `<div class="box-item">
    <div class="box-post">
      <span class="label" style="background-color: ${getTagColor(tag)}">
        <a href="#" rel="tag">${tag}</a>
      </span>
      <h1 class="post-title">
        <a href="#">
          ${headline}
        </a>
      </h1>
      <span class="meta">
        <span
          ><i class="glyphicon glyphicon-comment"></i>
          <a>${Math.floor(Math.random() * 100) || 'No'} Comments</a></span
        >
        <span
          ><i class="glyphicon glyphicon-time"></i> ${taskDate((Math.random() * 537903632573) + 1076799600000)}</span
        >
      </span>
    </div>
    <img
      src="https://loremflickr.com/560/340/all?x=${~~(Math.random() * 100000)}"
      alt="${headline}"
      class=""
    />
  </div>`
}

function taskDate(dateMilli) {
    var d = (new Date(dateMilli) + '').split(' ');
    d[2] = d[2] + ',';

    return [d[1], d[2], d[3]].join(' ');
}

const checkElm = document.getElementById('checker');
function elementInViewport(el = checkElm) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight) &&
        left < (window.pageXOffset + window.innerWidth) &&
        (top + height) > window.pageYOffset &&
        (left + width) > window.pageXOffset
    );
}