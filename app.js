const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
	const { top, left, bottom, right } = el.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	return partiallyVisible
		? ((top > 0 && top < innerHeight) ||
				(bottom > 0 && bottom < innerHeight)) &&
				((left > 0 && left < innerWidth) ||
					(right > 0 && right < innerWidth))
		: top >= 0 &&
				left >= 0 &&
				bottom <= innerHeight &&
				right <= innerWidth;
};

// const debounce = (method, delay) => {
//     clearTimeout(method._tId);
//     method._tId= setTimeout(function(){
//         method();
//     }, delay);
// }

const typingAnimation = () => {
	// array with texts to type in typewriter

	let dataText = ["Amar Mujagić."];

	// type one text in the typwriter
	// keeps calling itself until the text is finished
	function typeWriter(text, i, fnCallback) {
		// chekc if text isn't finished yet
		if (i < text.length) {
			// add next character to the element with the animation...
			document.querySelector("#typing-animation").innerHTML =
				text.substring(0, i + 1) +
				'<span aria-hidden="true" class="typing-span"></span>';

			// wait for a while and call this function again for next character
			setTimeout(function () {
				typeWriter(text, i + 1, fnCallback);
			}, 100);
		}
		// text finished, call callback if there is a callback function
		else if (typeof fnCallback == "function") {
			// call callback after timeout
			setTimeout(fnCallback, 700);
		}
	}
	// start a typewriter animation for a text in the dataText array
	const startTextAnimation = (i) => {
		if (typeof dataText[i] == "undefined") {
			setTimeout(function () {
				startTextAnimation(0);
			}, 20000);
		}
		// check if dataText[i] exists
		if (i < dataText[i].length) {
			// text exists! start typewriter animation
			typeWriter(dataText[i], 0, () => {
				// after callback (and whole text has been animated), start next text
				if (dataText.length !== i + 1) {
					startTextAnimation(i + 1);
				}
			});
		}
	};
	// start the text animation
	startTextAnimation(0);
};

// const handleScroll = () => {
//     if (
//         elementIsVisibleInViewport(
//             document.querySelector("#typing-animation")
//         )
//     ) {
//         typingAnimation();
//     }
// }

window.addEventListener("DOMContentLoaded", (_) => {
	typingAnimation();

    // addEventListener("scroll", (_) => {
    //     debounce(handleScroll, 200);
    // });

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
		if (
			window.matchMedia &&
			window.matchMedia("(prefers-color-scheme: dark)")
				.matches
		) {
			setTheme("dark", true);
		} else {
			setTheme("light", true);
		}
	};

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
		"change",
		(event) => {
			if (event.matches) {
				setTheme("dark");
			} else {
				setTheme("light");
			}
		}
	);

	const toggleTheme = () => {
		const root = document.documentElement;
		const newTheme = root.className === "dark" ? "light" : "dark";

		setTheme(newTheme);
	};

	checkUsersSystemThemePreference();
	document.getElementById("switch-theme-button").addEventListener(
		"click",
		toggleTheme
	);
	document.getElementById("switch-theme-button-small").addEventListener(
		"click",
		toggleTheme
	);

	let apiPrefix = "https://api.github.com";

	let projectContainer =
		document.getElementsByClassName("projects-container");
	let ssProjectContainer = document.getElementsByClassName(
		"ss-projects-container"
	);

	async function getProjects() {
		const res = await fetch(apiPrefix + "/users/amarell/repos", {
			method: "GET",
			headers: {
				Accept: "application/vnd.github.v3+json",
			},
		});

		const data = await res.json();

		for (let i = 0; i < data.length; i++) {
			if (data[i].name == "amarell") {
				continue;
			}
			let project = document.createElement("div");
			let ssProject = document.createElement("div");

			project.className = "project";
			ssProject.className = "ss-project";

			let folderIcon = document.createElement("i");
			let ssFolderIcon = document.createElement("i");
			folderIcon.className = "fas fa-folder-open";
			ssFolderIcon.className = "fas fa-folder-open";

			folderIcon.onclick = function visitLink() {
				window.location = data[i].html_url;
			};

			ssFolderIcon.onclick = function visitLink() {
				window.location = data[i].html_url;
			};

			let projectTitle = document.createElement("h2");
			projectTitle.innerHTML = data[i].name;

			let ssProjectTitle = document.createElement("h2");
			ssProjectTitle.innerHTML = data[i].name;

			let projectDescription = document.createElement("p");
			projectDescription.innerHTML = data[i].description
				? '<i class="fas fa-chevron-right"></i>' +
				  "  " +
				  data[i].description
				: "Currently without description";

			let ssProjectDescription = document.createElement("p");
			ssProjectDescription.innerHTML = data[i].description
				? '<i class="fas fa-chevron-right"></i>' +
				  "  " +
				  data[i].description
				: "Currently without description";

			project.appendChild(folderIcon);
			project.appendChild(projectTitle);
			project.appendChild(projectDescription);

			ssProject.appendChild(ssFolderIcon);
			ssProject.appendChild(ssProjectTitle);
			ssProject.appendChild(ssProjectDescription);

			projectContainer[0].appendChild(project);
			ssProjectContainer[0].appendChild(ssProject);
		}
	}

	getProjects();
});
