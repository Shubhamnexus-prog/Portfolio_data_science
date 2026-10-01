(function () {
  var configElement = document.getElementById('dashboard-data');
  var metricRoot = document.getElementById('dashboard-metrics');
  var scoreRoot = document.getElementById('dashboard-scores');
  var workflowRoot = document.getElementById('dashboard-workflow');

  if (!configElement || !metricRoot || !scoreRoot || !workflowRoot) {
    throw new Error('Project dashboard markup is incomplete.');
  }

  var data = JSON.parse(configElement.textContent);
  document.title = data.title + ' | Project Dashboard';
  document.getElementById('dashboard-title').textContent = data.title;
  document.getElementById('dashboard-description').textContent = data.description;
  document.getElementById('dashboard-takeaway').textContent = data.takeaway;

  data.metrics.forEach(function (metric) {
    var card = document.createElement('article');
    card.className = 'metric-card';
    var value = document.createElement('strong');
    value.className = 'metric-value';
    value.textContent = metric.value;
    var label = document.createElement('span');
    label.className = 'metric-label';
    label.textContent = metric.label;
    card.append(value, label);
    metricRoot.appendChild(card);
  });

  data.scores.forEach(function (score) {
    var row = document.createElement('div');
    var label = document.createElement('div');
    label.className = 'score-label';
    var name = document.createElement('span');
    name.textContent = score.label;
    var value = document.createElement('span');
    value.textContent = score.display;
    label.append(name, value);
    var track = document.createElement('div');
    track.className = 'score-track';
    track.setAttribute('role', 'img');
    track.setAttribute('aria-label', score.label + ': ' + score.display);
    var fill = document.createElement('div');
    fill.className = 'score-fill';
    fill.style.width = Math.max(0, Math.min(100, score.percent)) + '%';
    track.appendChild(fill);
    row.append(label, track);
    scoreRoot.appendChild(row);
  });

  data.workflow.forEach(function (step) {
    var item = document.createElement('li');
    var text = document.createElement('span');
    text.textContent = step;
    item.appendChild(text);
    workflowRoot.appendChild(item);
  });
})();
