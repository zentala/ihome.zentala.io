# SmartHome Blog Project Documentation

## Overview

This blog details my journey of transforming a 50m² apartment into a smart home using Bone.IO, a Polish smart home system. It covers the features implemented, preparations for integrating smart home technologies, and insights gained throughout the process. The aim is to guide others on their smart home adventures, discussing various topics from interior design projects, electrical choices, to selecting controllers, designing modern interiors, IoT design, components used, and considerations for apartment design, including recommended materials and their summaries.

## Project Name Suggestions

- Smart Home by Paul Zentala
- Paul's Smart Apartment Insights
- The Zentala SmartFlat Journey
- Intelligent Living by Zentala
- Zentala's Home Automation Hub

Consider "SmartFlat" or similar terms if you prefer a name that suggests a more apartment-focused perspective.

## Technologies Used

Since the project transitioned from Jekyll to Hugo, here's an updated list of technologies:

https://getdoks.org/docs/start-here/getting-started/

| Category      | Technology                                                                                                                             |
|---------------|----------------------------------------------------------------------------------------------------------------------------------------|
| Environment   | \!\[GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white) \!\[EditorConfig](https://img.shields.io/badge/-EditorConfig-FEFEFE?logo=editorconfig&logoColor=black) \!\[gitignore.io](https://img.shields.io/badge/-gitignore.io-204ECF?logo=gitignoredotio&logoColor=white) |
| Front-end     | \!\[Hugo](https://img.shields.io/badge/-Hugo-FF4088?logo=hugo&logoColor=white) \!\[Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?logo=bootstrap&logoColor=white) \!\[CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) |
| DevOps        | \!\[GitHub Pages](https://img.shields.io/badge/-GitHubPages-222222?logo=githubpages&logoColor=white) \!\[SonarCloud](https://img.shields.io/badge/-SonarCloud-F3702A?logo=sonarcloud&logoColor=white) |
| Marketing     | \!\[Google Analytics](https://img.shields.io/badge/-GoogleAnalytics-4285F4?logo=googleanalytics&logoColor=white) \!\[Google AdSense](https://img.shields.io/badge/-GoogleAdSense-E37400?logo=googleadsense&logoColor=white) |
| IDE           | \!\[Visual Studio Code](https://img.shields.io/badge/-VisualStudioCode-007ACC?logo=visualstudiocode&logoColor=white)                     |

## Setting Up Hugo for the Project

https://getdoks.org/docs/start-here/getting-started/


nie wiem czy trzeba, raczej nie:


1. **Install Hugo**: Make sure Hugo is installed on your machine. If not, download and install it from \[Hugo Releases](https://github.com/gohugoio/hugo/releases). Follow the installation instructions for your operating system.

2. **Clone the Repository**: Clone the `smarthome.zentala.io` project repository from GitHub to your local machine using the following command:

   ```
   git clone https://github.com/zentala/smarthome.zentala.io.git
   ```

3. **Navigate to the Project Directory**:

   ```
   cd smarthome.zentala.io
   ```

4. **Start the Hugo Server**:

   Run the following command to start the Hugo server:

   ```
   hugo server -D
   ```

   The `-D` flag tells Hugo to include content marked as draft. This is useful during the development phase.

5. **Access Your Site**: By default, the Hugo server runs at `http://localhost:1313/`. Open this URL in your browser to view your site.

6. **Create New Posts**: To add new content, use the Hugo command:

   ```
   hugo new posts/<your-post-name>.md
   ```

   Replace `<your-post-name>` with the name of your new post. This command creates a new Markdown file in the `posts` directory, which you can then edit with your content.

7. **Build Your Site**: When you're ready to build your site, run:

   ```
   hugo -D
   ```

   This command generates your static site in the `public` directory, which can then be deployed to GitHub Pages or your hosting service of choice.

## Deployment

To deploy your Hugo site to GitHub Pages, follow the official Hugo documentation on \[Hosting on GitHub](https://gohugo.io/hosting-and-deployment/hosting-on-github/), which provides a step-by-step guide.

# Top Themes
## na te strone
https://doks.netlify.app/ - dokumentacja i blog!
https://doks.netlify.app/ - jw + lang switch ale brzydki
https://themes.gohugo.io/themes/compose/- documentation (moze z blogiem)

## na inna strone
https://zeon.studio/preview?project=hugoplate
https://themes.gohugo.io/themes/hugo-papermod/ - prosta
https://themes.gohugo.io/themes/hugo-theme-stack/ - prosty blog
https://hugo-paper.vercel.app/ - bardzo prosty blog
https://themes.gohugo.io/themes/hugo-theme-hello-friend-ng/ - tutroials list
https://themes.gohugo.io/themes/hugo-theme-nightfall/ - fajny prosty blog
https://gethyas.com/themes/bolt/
## zawodowe:

https://hugo-profile.netlify.app/#experience - fajne web portfolio homepage
https://hugo-theme-gruvbox.schnerring.net/

## to copy:
https://blowfish.page/docs/shortcodes/ - super przyklady shoercodes
