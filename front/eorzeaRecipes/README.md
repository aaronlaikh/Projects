This is a simple project in ReactJS which will allow users to quickly search for crafted item recipes.

There are crafting sites already available, but they are more extensive in information and recipes are usually hidden under a few layers of information.  By contrast, this simple web application immediately shows the direct recipe information for each item; many crafters are looking for the recipe, so this will show them the information they want immediately and save them a bit of time.  Users can also add items to a shopping cart, which will keep track of the total amount of materials needed to craft each item, similar to a grocery or shopping list.


This project utilizes XIVDB's API in order to pull data.  This is simply a simplified and streamlined UI for grabbing recipe data faster.  If you want more extensive item information, please visit xivdb.  Since I am pulling data from the xivdb API, this site will fail to retrieve information whenever xivdb's API goes down.

Setting up the Project

This project is still in progress.  If you'd like to work on this project as well, the React Javascript files are available here.

If you're new to React, you'll need to have that set up first.  Look around for some tutorials, but I used npm.  Download NodeJS for that.

package.json contains the relevant node module dependencies I used.  If you want to pick up this project, you'll need them.  Babel and webpack are a given, with an HTML Webpack plugin and a few babel loaders for css.

Do an npm init to create an empty or starter project, then download the related node modules.  Pull my files down and start up a local server with npm run start.  Hopefully everything runs smoothly!

