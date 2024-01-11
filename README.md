# Intelligent Home Portal Project Documentation

## Overview

This blog details my journey of transforming a 50m² apartment into a smart home using Bone.IO, a Polish smart home system. It covers the features implemented, preparations for integrating smart home technologies, and insights gained throughout the process. The aim is to guide others on their smart home adventures, discussing various topics from interior design projects, electrical choices, to selecting controllers, designing modern interiors, IoT design, components used, and considerations for apartment design, including recommended materials and their summaries.

## Technologies Used

Since the project transitioned from Jekyll to Hugo, here's an updated list of technologies:

| Category | Technology |
|---|---|
| Repo Conf | ![EditorConfig](https://img.shields.io/badge/-EditorConfig-FEFEFE?logo=editorconfig&logoColor=black) ![gitignore.io](https://img.shields.io/badge/-gitignore.io-204ECF?logo=gitignoredotio&logoColor=white) |
| Front-end     | ![Hugo](https://img.shields.io/badge/-Hugo-FF4088?logo=hugo&logoColor=white) ![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?logo=bootstrap&logoColor=white) ![SCSS](https://img.shields.io/badge/-SCSS-CC6699?logo=sass&logoColor=white) &nbsp;  |
| DevOps        | ![GitHub Pages](https://img.shields.io/badge/-GitHubPages-222222?logo=githubpages&logoColor=white) ![SonarCloud](https://img.shields.io/badge/-SonarCloud-F3702A?logo=sonarcloud&logoColor=white) |
| Marketing     | ![Google Analytics](https://img.shields.io/badge/-GoogleAnalytics-4285F4?logo=googleanalytics&logoColor=white) ![Google AdSense](https://img.shields.io/badge/-GoogleAdSense-E37400?logo=googleadsense&logoColor=white) |
| IDE | ![Visual Studio Code](https://img.shields.io/badge/-VisualStudioCode-007ACC?logo=visualstudiocode&logoColor=white)                     |

Build with [Hugo](https://gohugo.io/), [Hays](https://gethyas.com/) and [Doks](https://getdoks.org/) theme.

## Local Development

1. **Install Hugo**: Make sure Hugo is installed on your machine. If not, download and install it from [Hugo Releases](https://github.com/gohugoio/hugo/releases). Follow the installation instructions for your operating system.

2. **Clone the Repository**: Clone the `ihome.zentala.io` project repository from GitHub to your local machine using the following command:

   ```
   git clone https://github.com/zentala/ihome.zentala.io.git
   ```

3. **Navigate to the Project Directory**:

   ```
   cd ihome.zentala.io
   ```

4. **Install dependencies**:

   ```
   npm install
   ```

5. **Start the dev server**:

   Run the following command to start the Hugo server:

   ```
   npm run dev
   ```

6. **Access Your Site**: By default, the Hugo server runs at `http://localhost:1313/`. Open this URL in your browser to view your site.


## Deployment

Deploymet to GitHub Pages with [Deploy GitHub Action](.github/workflows/deploy.yml)
