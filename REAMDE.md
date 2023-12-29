# SmartHome Blog Project Documentation

## Overview

Blog detailing my journey of creating a smart home in a 50m² apartment using Bone.IO (https://boneio.eu/), a Polish smart home system. It explores the implemented features, preparations for smart home technologies, and insights gained, aiming to assist others in their smart home endeavors.


## Technologies Used

| Category      | Technology |
| :------------ | :--------- |
| Environment   | ![GitHub](https://img.shields.io/badge/-GitHub-181717?logo=github&logoColor=white) &nbsp; ![EditorConfig](https://img.shields.io/badge/-EditorConfig-FEFEFE?logo=editorconfig&logoColor=black) &nbsp; ![gitignore.io](https://img.shields.io/badge/-gitignore.io-204ECF?logo=gitignoredotio&logoColor=white) |
| Front-end     | ![Jekyll](https://img.shields.io/badge/-Jekyll-CC0000?logo=bootstrap&logoColor=white) &nbsp; ![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?logo=bootstrap&logoColor=white) &nbsp; ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white) |
| DevOps        | ![GitHub Pages](https://img.shields.io/badge/-GitHubPages-222222?logo=githubpages&logoColor=white) &nbsp; ![SonarCloud](https://img.shields.io/badge/-SonarCloud-F3702A?logo=sonarcloud&logoColor=white) |
| Marketing     | ![Google Analytics](https://img.shields.io/badge/-GoogleAnalytics-4285F4?logo=googleanalytics&logoColor=white) &nbsp; ![Google AdSense](https://img.shields.io/badge/-GoogleAdSense-E37400?logo=googleadsense&logoColor=white) |
| IDE           | ![Visual Studio Code](https://img.shields.io/badge/-VisualStudioCode-007ACC?logo=visualstudiocode&logoColor=white) 

This project uses Jekyll with Bootstrap for the blog framework to ensure a responsive and visually appealing design.

## Installation and Setup

### Installing Ruby

1. **Update packages**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Ruby dependencies**:
   ```bash
   sudo apt install git curl libssl-dev libreadline-dev zlib1g-dev autoconf bison build-essential libyaml-dev libreadline-dev libncurses5-dev libffi-dev libgdbm-dev -y
   ```

3. **Install `rbenv` and `ruby-build`**:
   ```bash
   git clone https://github.com/rbenv/rbenv.git ~/.rbenv
   echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.zshrc
   echo 'eval "$(rbenv init - zsh)"' >> ~/.zshrc
   source ~/.zshrc
   git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build
   ```

4. **Install Ruby 3.3.0**:
   ```bash
   rbenv install 3.3.0
   rbenv global 3.3.0
   ```

5. **Verify Ruby installation**:
   ```bash
   ruby -v
   ```

### Installing Necessary Ruby Gems

1. **Install Jekyll and Bundler**:
   ```bash
   gem install jekyll bundler
   ```

2. **Install project dependencies**:
   Navigate to your project directory and run:
   ```bash
   bundle install
   ```

### Running the Project

1. **Serve the project locally**:
   ```bash
   bundle exec jekyll serve
   ```

2. **Access your site**:
   Open `http://localhost:4000` in a browser to view your site.

## Sources
* Theme from: https://medium.com/codex/how-to-add-bootstrap-5-to-jekyll-in-two-easy-ways-4d9dd3c8c895
* 