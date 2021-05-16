import setColor from './setColor';

if (!document.getElementById('fraudModuleID')) {
  const aditems = document.getElementsByClassName('aditem-main--bottom');

  // making request to the backend server and attach the score to the fraud-tag
  for (const aditem of aditems) {
    const matches = aditem.parentElement.innerHTML.match(/[0-9]{9,}/);
    const id = matches[0];
    if (id !== 0 || id !== undefined || (id !== null && aditems)) {
      fetch(`http://localhost:4200/api/ads/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.ad !== undefined) {
            const score = Math.round(data.ad.fraud_score);

            const fraudModule = document.createElement('p');
            fraudModule.className = 'text-module-end fraud-module';
            fraudModule.id = 'fraudModuleID';

            const fraudTag = document.createElement('span');
            fraudTag.className = 'simpletag tag-small fraud-tag';
            fraudTag.setAttribute('fraud-tag', score);
            fraudTag.innerHTML = `Scam: ${score}%`;

            setColor(score, fraudTag, 'tag');

            fraudModule.appendChild(fraudTag);
            aditem.appendChild(fraudModule);
          }
        });
    }
  }
}
