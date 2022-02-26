console.log("Hello connected")

let apiPrefix = "https://api.github.com"

let projectContainer = document.getElementsByClassName("projects-container")


async function getProjects() {
    const res = await fetch(apiPrefix + "/users/amarell/repos", {
        method:"GET",
        headers:{
            "Accept" : "application/vnd.github.v3+json"
        }
    })

    const data = await res.json();

    console.log(data);
    console.log(data.length)



    for(let i = 0; i<data.length; i++) {
        console.log(data[i])
        if(data[i].name == "amarell") { continue; }
        let project = document.createElement("div")

        project.className = "project"

        let folderIcon = document.createElement("i")
        folderIcon.className = "fas fa-folder-open"

        folderIcon.onclick = function visitLink() {
            window.location = data[i].html_url;
        }
    
        let projectTitle = document.createElement("h2");
        projectTitle.innerHTML = data[i].name;

        let projectDescription = document.createElement("p");
        projectDescription.innerHTML =  data[i].description ? 
                                        '<i class="fas fa-chevron-right"></i>' + "  " + data[i].description : 
                                        "Currently without description"

        project.appendChild(folderIcon)
        project.appendChild(projectTitle);
        project.appendChild(projectDescription);

        projectContainer[0].appendChild(project)
        
    }
}

getProjects();
