window.addEventListener('DOMContentLoaded', (_) => {
    const setTheme = (theme, first = false) => {
        const root = document.documentElement;

		const fontAwesomeIconOff = "fa-moon";
		const fontAwesomeIconOn = "fa-sun";

		if (window.innerWidth > 790) {
			const icon = document.getElementById("light-icon");
			if (first) {
				icon.className =
					theme === "light"
						? `fas ${fontAwesomeIconOff}`
						: `fas ${fontAwesomeIconOn}`;
			} else {
				icon.className = icon.className.replace(
					theme === "light"
						? fontAwesomeIconOn
						: fontAwesomeIconOff,
					theme === "light"
						? fontAwesomeIconOff
						: fontAwesomeIconOn
				);
			}
		} else {
			const icon =
				document.getElementById("light-icon-small");
			if (first) {
				icon.className =
					theme === "light"
						? `fas ${fontAwesomeIconOff}`
						: `fas ${fontAwesomeIconOn}`;
			}
			icon.className = icon.className.replace(
				newTheme === "light"
					? fontAwesomeIconOn
					: fontAwesomeIconOff,
				newTheme === "light"
					? fontAwesomeIconOff
					: fontAwesomeIconOn
			);
		}

        root.className = theme;
    };

    const checkUsersSystemThemePreference = () => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme("dark", true)
        }  else {
            setTheme("light", true)
        }
    }

    const toggleTheme = () => {
        const root = document.documentElement;
        const newTheme = root.className === 'dark' ? 'light' : 'dark';

        setTheme(newTheme);
    }

    checkUsersSystemThemePreference();
    document.getElementById("switch-theme-button").addEventListener("click", toggleTheme);
    document.getElementById("switch-theme-button-small").addEventListener("click", toggleTheme);

    let apiPrefix = "https://api.github.com"

    let projectContainer = document.getElementsByClassName("projects-container")
    let ssProjectContainer = document.getElementsByClassName("ss-projects-container")

    async function getProjects() {
        const res = await fetch(apiPrefix + "/users/amarell/repos", {
            method:"GET",
            headers:{
                "Accept" : "application/vnd.github.v3+json"
            }
        })

        const data = await res.json();

        for(let i = 0; i<data.length; i++) {
            if(data[i].name == "amarell") { continue; }
            let project = document.createElement("div")
            let ssProject = document.createElement("div")

            project.className = "project"
            ssProject.className = "ss-project"
        
            let folderIcon = document.createElement("i")
            let ssFolderIcon = document.createElement("i");
            folderIcon.className = "fas fa-folder-open"
            ssFolderIcon.className = "fas fa-folder-open"

            folderIcon.onclick = function visitLink() {
                window.location = data[i].html_url;
            }

            ssFolderIcon.onclick = function visitLink() {
                window.location = data[i].html_url;
            }


        
            let projectTitle = document.createElement("h2");
            projectTitle.innerHTML = data[i].name;

            let ssProjectTitle = document.createElement("h2");
            ssProjectTitle.innerHTML = data[i].name;

            let projectDescription = document.createElement("p");
            projectDescription.innerHTML =  data[i].description ? 
                                            '<i class="fas fa-chevron-right"></i>' + "  " + data[i].description : 
                                            "Currently without description"

            let ssProjectDescription = document.createElement("p");
            ssProjectDescription.innerHTML = data[i].description ? 
                                            '<i class="fas fa-chevron-right"></i>' + "  " + data[i].description : 
                                            "Currently without description"


            project.appendChild(folderIcon);
            project.appendChild(projectTitle);
            project.appendChild(projectDescription);

            ssProject.appendChild(ssFolderIcon)
            ssProject.appendChild(ssProjectTitle)
            ssProject.appendChild(ssProjectDescription)
            
            projectContainer[0].appendChild(project);
            ssProjectContainer[0].appendChild(ssProject)
        }
        console.log(projectContainer)
    }

    getProjects();

});

