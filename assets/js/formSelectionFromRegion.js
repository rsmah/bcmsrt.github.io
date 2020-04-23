
const projectIntakeLinks = {
  "British Columbia": "https://ubc.ca1.qualtrics.com/jfe/form/SV_3xGkE7b7CZAQ7bv",
  "Alberta": {
    "University of Calgary": "https://forms.gle/8FJAudDJCc5ykp8T8",
    "University of Alberta": "https://forms.gle/oidh4tF8DjJSyUvT9",
  },
  "Saskatchewan": "https://forms.gle/1BdDNJ1yvtARHjXy7",
  "Manitoba": "https://forms.gle/YHNS7nBbmw7zwgzT7",
}

const supportRequestLinks = {
  "British Columbia": "https://ubc.ca1.qualtrics.com/jfe/form/SV_d0S6s4oMgcPyrsh",
  "Alberta": {
    "University of Calgary": "https://forms.gle/rSicscLajkj6eW6t9",
    "University of Alberta": "https://forms.gle/SBewv2FePvWap2568",
  },
  "Saskatchewan": "https://forms.gle/YCDgbuDBNEDwEay66",
  "Manitoba": "https://forms.gle/R1k9vQQnJZuJRSJW8",
}

const volunteerIntakeLinks = {
  "British Columbia": "https://forms.gle/HuHVxpsCuT1jLLvi8",
  "Alberta": {
    "University of Calgary": "https://forms.gle/PivQmrQQPF8XG7DV8",
    "University of Alberta": "https://forms.gle/jcT5hoUPhYQETwha8",
  },
  "Saskatchewan": "https://forms.gle/MhzH9fMQVg4SW7nm7",
  "Manitoba": "https://forms.gle/CbYqpDYQvonF7VqQ9",
}

const mapElem = document.getElementById("province-map")
const provinceSelectionElem = document.getElementById("province-selection")
const missingProvinceElem = document.getElementById("missing-province")
const provinceElem = missingProvinceElem.querySelector("#province")
const selectTitleElem = document.getElementById("select-title")

const selectionType = document.currentScript.getAttribute("selection")
const links = selectionType === "project" ? projectIntakeLinks : selectionType === "support" ? supportRequestLinks : volunteerIntakeLinks

function handleRegionClick(region) {
  if (links[region] === undefined) {
    provinceElem.textContent = region
    missingProvinceElem.style.display = 'block'
  } else {
    missingProvinceElem.style.display = 'none'
    if (typeof(links[region]) === "string") {
      window.open(links[region], "_blank")
    } else {
      mapElem.style.display = 'none'
      provinceSelectionElem.style.display = 'flex'
      selectTitleElem.innerText = `Select Your University in ${region}`
      Object.entries(links[region]).forEach(university => {
        const uniLinkElem = document.createElement('a')
        const uniTextElem = document.createElement('p')
        uniLinkElem.appendChild(uniTextElem)
        uniLinkElem.setAttribute("href", university[1])
        uniLinkElem.setAttribute("target", "_blank")
        uniTextElem.innerText = university[0]
        provinceSelectionElem.appendChild(uniLinkElem)
      })
    }
  }
}

jQuery(document).ready(function () {
  jQuery('#vmap').vectorMap({
    map: 'canada_en',
    backgroundColor: 'white',
    color: '#297699',
    hoverColor: '#999999',
    enableZoom: false,
    showTooltip: screen.width > 900 ? true : false,
    onRegionClick: (element, code, region) => handleRegionClick(region),
  });
});