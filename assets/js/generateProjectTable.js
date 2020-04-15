import { currentProjects, futureProjects, sustainingProjects } from './projects.js'

// do not edit below unless you know what you're doing
function projectHtml(project, signUp=false) {
  const projElem = document.createElement("div")
  projElem.classList.add("project")
  const projTableContentElem = document.createElement("div")
  projTableContentElem.classList.add("project-table-content")
  const projTableColsElem = document.createElement("a")
  projTableColsElem.classList.add("collapsible")

  const colNames = ["name", "location"]
  const textColumnsElem = document.createElement("div")
  textColumnsElem.classList.add("project-table-cols")
  colNames.forEach(
    (colName, idx) => {
      const projTableColElem = document.createElement("div")
      projTableColElem.classList.add(`pt-col-${idx+1}`)
      const projTableSubHeaderElem = document.createElement("div")
      projTableSubHeaderElem.classList.add("pt-col-sub-header")
      const projTableSubHeaderTitleElem = document.createElement("h1")
      projTableSubHeaderTitleElem.innerText = project[colName]

      projTableSubHeaderElem.appendChild(projTableSubHeaderTitleElem)
      projTableColElem.appendChild(projTableSubHeaderElem)
      textColumnsElem.appendChild(projTableColElem)
    }
  )
  projTableColsElem.appendChild(textColumnsElem)

  // collapsible details bar in project heading
  const collapsibleIndicatorElem = document.createElement("div")
  collapsibleIndicatorElem.classList.add("project-details")
  const detailsTextElem = document.createElement("p")
  detailsTextElem.classList.add("project-details-text")
  detailsTextElem.innerText = "DETAILS"
  const detailsIcon = document.createElement("img")
  detailsIcon.setAttribute("src", "/assets/images/collapsible-icon.png")
  detailsIcon.classList.add("project-details-icon")

  collapsibleIndicatorElem.appendChild(detailsTextElem)
  collapsibleIndicatorElem.appendChild(detailsIcon)
  projTableColsElem.appendChild(collapsibleIndicatorElem)

  // add hr below title
  const hrElem = document.createElement("hr")
  hrElem.style.display = "none"
  projTableColsElem.appendChild(hrElem)

  // add sections in project-info
  const projectInfoElem = document.createElement("div")
  projectInfoElem.classList.add("project-info")
  projectInfoElem.style.display = "none"

  const sections = [
    ["Description:", project.description],
    ["Student Role:", project.studentRole],
    ["Number of Students:", project.numStudents],
    ["Restrictions:", project.restrictions],
    ["Notes:", project.notes],
  ]

  sections.forEach(section => {
    if (section[1] === "" || section[1] === undefined) {
      return
    }
    const sectionElem = document.createElement("section")

    const sectionTitleElem = document.createElement("h1")
    sectionTitleElem.innerText = section[0]
    sectionElem.appendChild(sectionTitleElem)

    let sectionContentElem
    if (typeof section[1] === 'string' || section[1] instanceof String) {
      sectionContentElem = document.createElement("p")
      sectionContentElem.innerText = section[1]
    } else {
      // project-info section contains a bulleted list
      sectionContentElem = document.createElement("div")
      const sectionContentDescriptionElem = document.createElement("p")
      sectionContentDescriptionElem.innerText = section[1].description

      const sectionContentListElem = document.createElement("ul")
      section[1].listItems.forEach(item => {
        const listElem = document.createElement("li")
        listElem.innerHTML = item
        sectionContentListElem.appendChild(listElem)
      })

      sectionContentElem.appendChild(sectionContentDescriptionElem)
      sectionContentElem.appendChild(sectionContentListElem)
    }
    sectionElem.appendChild(sectionContentElem)

    projectInfoElem.appendChild(sectionElem)
  })

  projElem.appendChild(projTableContentElem)
  projTableContentElem.appendChild(projTableColsElem)
  projTableContentElem.appendChild(projectInfoElem)

  // add sign up button if recruiting
  if (signUp) {
    const signUpButtonContainerElem = document.createElement("div")
    signUpButtonContainerElem.classList.add("project-sign-up-btn")
    const signUpButtonElem = document.createElement("input")
    signUpButtonContainerElem.appendChild(signUpButtonElem)
    signUpButtonElem.setAttribute("id", "email-submit-btn")
    signUpButtonElem.setAttribute("type", "button")
    signUpButtonElem.setAttribute("value", "Volunteer")
    signUpButtonElem.setAttribute("onclick", "window.open('/select-region-volunteer', '_self')")
    projectInfoElem.appendChild(signUpButtonContainerElem)
  }

  return projElem
}

const currentProjectsElem = document.getElementById("current-projects-content")
currentProjects.forEach(project => currentProjectsElem.appendChild(projectHtml(project, true)))

const futureProjectsElem = document.getElementById("future-projects-content")
futureProjects.forEach(project => futureProjectsElem.appendChild(projectHtml(project)))

const sustainingProjectsElem = document.getElementById("sustaining-projects-content")
sustainingProjects.forEach(project => sustainingProjectsElem.appendChild(projectHtml(project)))

// Collapsible projects event listeners
const collapsibleElems = Array.from(document.getElementsByClassName("collapsible"))
collapsibleElems.forEach(elem => {
  elem.addEventListener("click", function() {
    const content = this.nextElementSibling
    const detailsIconElem = this.querySelector('.project-details-icon')
    const hrElem = this.querySelector("hr")
    content.style.display = content.style.display == "block" ? "none" : "block"
    detailsIconElem.style.transform = (
      detailsIconElem.style.transform === "rotate(180deg)"
        ? "rotate(0deg)"
        : "rotate(180deg)"
    )
    hrElem.style.display = hrElem.style.display == "block" ? "none" : "block"
  })
})