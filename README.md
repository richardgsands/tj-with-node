# Tracy James - Website

This repo contains two NodeJS web applications:
- main - public website
- admin - private webapp for content management (to be run on same server on different port)

Note that the admin app should be in the same parent folder as the main app, so that relative paths between the two are correct. (The admin server is not necessary if you have another way to provide access to update files in main\client\cms). 

## Installation and running

### Configure new server

Start with a fresh Linux box with NodeJS and git installed.

Install Ruby, Sass, Grunt CLI and Node Forever

```
apt-get install ruby
gem install sass
npm install -g grunt-cli
npm install -g forever
```

### Install repo files

Clone repository and navigate to newly created folder:
```
git clone https://github.com/richardgsands/tj-with-node.git
cd tj-with-node
```

### Install and build main
```
cd main
npm install
bower install --allow-root
```
Run `grunt refresh` to compile Sass, etc. **This step needs to be done after any file changes to compile website** (See App Architecture below for details of files.)
```
grunt refresh
```

### Install and build admin
Switch to admin directory
```
cd ../admin
```

**Create settings file (admin app won't work without this):**
```
touch server/settings.json
```

Edit the settings file to set username and password. It should have the following format:
```json
{
  "adminUser": "admin",
  "adminPass": "password"
}
```
*If these are changed after starting the NodeJS server, a restart (of the NodeJS server) will be required*

Then install dependencies and build:
```
npm install
bower install --allow-root
grunt refresh
```

### Start web server...!

Start main and admin web servers using forever:
```
# go back to parent folder
cd ..
cd main
forever start server/app.js

cd ..
cd admin
forever start server/app.js
```

To stop website, run: `forever stopall`

To see forever process (and path to log file), run: `forever list`

Website should now be accessible on port 9000
Admin app shold be accessible on port 9001

### Redirect Port 80 to Port 9000

```
sudo /sbin/iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 9000
```
Now website will be available on standard HTTP port (80)

*Port 9001 will need to be open (or redirected to another port if preferred) as well for the admin app.*

## Local development

To make changes, fork the repository on GitHub (just need a free GitHub account for that). Then set up a server on a local machine (ideally Linux / Mac) with node and git installed. This can be done using instructions in Instructions to set up server above, but:
	- use your fork repository to for git clone command
	- no need to do port redirect
	- no need to run using forever, `grunt serve` will allow you to access server at http://localhost:9000).

## Deploying changes to server

Make the changes (see information about files below in App Architecture), then commit to the local git repository on your machine, and push to your remote repository. Then SSH into server, navigate to the `tj-with-node` folder, and run `git pull`.

Then, do the following to compile and deploy:

Run `grunt refresh` to compile Sass, etc, as before

Restart web server using forever:
forever restartall

App Architecture

App root directory is /root/tj-with-node (if server has been set up as above)

## Main App Architecture

Two main folders: server and client.

Server folder contains code running on the web server, and handles sending emails (for contact section)
Client folder contains all content and code which runs in the web browser accessing the website - and this is basically where most of the website is.

In client folder:
`main/client/`

  - index.html
  - app/app.js
  - app/main/main.controller.js
  - app/main/main.jade
  - app/views/
  - app/main/main.scss

index.html
The client part of website is written using AngularJS - so index.html is loaded in the browser, and that contains all code needed to load everything else

`app/app.js`
Javascript file to set up AngularJS - this file contains code to handle URL links to different pages on website

`app/main/main.controller.js`
Main javascript file containing code for website - i.e. to send HTTP requests to server for the Contact section, control audio playback, load up gallery images, define URL addresses that appear in navbar and point to particular views (in app/views)

`app/main/main.jade`
Layout for main page - including sidebar, and navbar

`app/views/`
Folder containing layouts for sections of website (in navbar) - i.e. home, biography, education, ensembles, contact, gallery, music, links. Each view file in here should be wired up to a URL in app/main/main.controller.js in navSections array

`app/main/main.scss`
Stylesheet for website - containing CSS classes that are used in Layout (jade) files

** NB: If any of these files are changed, `grunt refresh` must be run on command line to compile everything (Jade and SCSS files into HTML / CSS, etc - see Making changes above**

