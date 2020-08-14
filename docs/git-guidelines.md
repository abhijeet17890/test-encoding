## Git Guidlines

0 – Don’t git push straight to master or develop.

1 - 'Develop' is main branch of development and should be with latest updated STABLE code. All the development related branches shoule
be cut from develop or develop inherited branches. Branch Name should be short, crisp and clear and should follow the below convention:
<storyid>-<titleNo.>-<taskName(spearated by hyphon if requied)>  
Ex: 679-62-fund-search-screen

2 - All developers after completion of work if they need to merge to develop:

2.1 - A pull request should be generated from respective branch to develop

2.2 - Code will be reviewed in pull request and then will be accepted/merged or rejected by reviewer

3 - Branch name should contain only feature name or story name with suffix such as : 'bug-fix','dev','test' etc) if reuired.

4 - Don't include developer name into any git branch name.

5 - Commit msg should be clear, proper and self descriptive.

6 - Commit msg format should be : <feature/module/component/snippet name>: <Verb(Added/deleted/edited/updated)> <name/description>

Ex: git commit -m "header: Updated menu options"

7 - Please removed unnessary and unwated code/console.log from all the js/styles/others before final push

8 - Please format and do the proper indentation before pushing the final code

9 - Try to create as less as possible temporary branches

10 - before start your work for the day : PLEASE TAKE PULL FROM DEVELOP branch
